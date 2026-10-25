import { supabaseServer } from "../../../lib/supabase/server";

export async function POST(req: Request) {
  const sb = await supabaseServer();
  await sb.auth.signOut();
  return Response.redirect(new URL("/portal/login", req.url), 303);
}
