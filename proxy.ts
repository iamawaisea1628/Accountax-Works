import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const PUBLIC = ["/portal/login", "/portal/forgot", "/portal/auth/confirm"];

// Refreshes the Supabase session and keeps /portal private. (Next.js 16 name for middleware.)
export async function proxy(req: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL, key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return NextResponse.next();
  let res = NextResponse.next({ request: req });
  const sb = createServerClient(url, key, {
    cookies: {
      getAll: () => req.cookies.getAll(),
      setAll: (list) => {
        list.forEach(({ name, value }) => req.cookies.set(name, value));
        res = NextResponse.next({ request: req });
        list.forEach(({ name, value, options }) => res.cookies.set(name, value, options));
      },
    },
  });
  const { data: { user } } = await sb.auth.getUser();
  const p = req.nextUrl.pathname.replace(/\/+$/, "") || "/"; // tolerate trailingSlash: true
  if (!user && !PUBLIC.includes(p)) { const u = req.nextUrl.clone(); u.pathname = "/portal/login"; u.search = ""; return NextResponse.redirect(u); }
  if (user && p === "/portal/login") { const u = req.nextUrl.clone(); u.pathname = "/portal"; return NextResponse.redirect(u); }
  return res;
}
export const config = { matcher: ["/portal/:path*"] };
