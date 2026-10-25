import type { EmailOtpType } from "@supabase/supabase-js";
import { supabaseServer } from "../../../../lib/supabase/server";

// Landing route for the links in Supabase's Invite and Reset Password emails (see email template setup).
const TYPES = ["recovery", "invite"];

export async function GET(req: Request) {
  const u = new URL(req.url);
  const token_hash = u.searchParams.get("token_hash") ?? "";
  const type = u.searchParams.get("type") ?? "";
  const next = u.searchParams.get("next") ?? "";
  const dest = /^\/portal\/[a-z0-9/_-]*$/i.test(next) ? next : "/portal/set-password";
  if (token_hash && TYPES.includes(type)) {
    const sb = await supabaseServer();
    const { error } = await sb.auth.verifyOtp({ type: type as EmailOtpType, token_hash });
    if (!error) return Response.redirect(new URL(dest, req.url), 303);
  }
  return Response.redirect(new URL("/portal/forgot?error=link", req.url), 303);
}
