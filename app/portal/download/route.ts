import { supabaseServer } from "../../../lib/supabase/server";

export async function GET(req: Request) {
  const id = new URL(req.url).searchParams.get("id") ?? "";
  if (!/^[0-9a-f-]{36}$/i.test(id)) return new Response("Not found", { status: 404 });
  const sb = await supabaseServer();
  const { data: { user } } = await sb.auth.getUser();
  if (!user) return Response.redirect(new URL("/portal/login", req.url), 303);
  const { data: doc } = await sb.from("documents").select("path,name,org_id").eq("id", id).maybeSingle(); // RLS limits this to the owner or staff
  if (!doc) return new Response("Not found", { status: 404 });
  const { data, error } = await sb.storage.from("client-docs").createSignedUrl(doc.path, 60, { download: doc.name });
  if (error || !data) return new Response("Could not prepare download", { status: 500 });
  await sb.from("activity_log").insert({ org_id: doc.org_id, actor_id: user.id, action: "document_downloaded", detail: doc.name });
  return Response.redirect(data.signedUrl, 302);
}
