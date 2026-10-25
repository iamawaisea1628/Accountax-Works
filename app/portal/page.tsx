import { Suspense } from "react";
import { redirect } from "next/navigation";
import { supabaseServer, portalConfigured } from "../../lib/supabase/server";
import UploadForm from "../../components/portal/UploadForm";

type Prof = { id: string; full_name: string | null; email: string | null; role: string };
type Doc = { id: string; name: string; size_bytes: number | null; created_at: string; client_id: string; uploaded_by: string };

const label = (p?: Prof) => (p ? p.full_name || p.email || "Client" : "Client");
const size = (n: number | null) => (n == null ? "" : n < 1048576 ? `${Math.max(1, Math.round(n / 1024))} KB` : `${(n / 1048576).toFixed(1)} MB`);

async function Content() {
  if (!portalConfigured())
    return <div className="pw"><div className="pcard"><h2>Client portal is not configured yet</h2><p className="mu">Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY, then redeploy.</p></div></div>;

  const sb = await supabaseServer();
  const { data: { user } } = await sb.auth.getUser();
  if (!user) redirect("/portal/login");

  const { data: me } = await sb.from("profiles").select("id,full_name,email,role").eq("id", user.id).maybeSingle<Prof>();
  if (!me) return <div className="pw"><div className="pcard"><h2>Account not ready</h2><p className="mu">Your profile has not been created. Please contact Accountax.</p></div></div>;
  const staff = me.role === "staff";

  const { data: docs } = await sb.from("documents").select("id,name,size_bytes,created_at,client_id,uploaded_by").order("created_at", { ascending: false }).limit(200).returns<Doc[]>();
  let people: Prof[] = [];
  if (staff) { const { data } = await sb.from("profiles").select("id,full_name,email,role").order("email").returns<Prof[]>(); people = data ?? []; }
  const byId = new Map(people.map((p) => [p.id, p]));
  const clients = people.filter((p) => p.role === "client").map((p) => ({ id: p.id, label: label(p) }));
  const from = (d: Doc) => (staff ? (byId.get(d.uploaded_by)?.role === "staff" ? "Accountax" : label(byId.get(d.uploaded_by))) : d.uploaded_by === user.id ? "You" : "Accountax");

  return (
    <>
      <div className="pbar">
        <a className="logo" href="/"><span>ACCOUNT<b>AX</b></span></a>
        <div><span className="who">{me.full_name || me.email}{staff ? " (staff)" : ""}</span>
          <form method="post" action="/portal/signout"><button className="btn o" style={{ padding: "9px 20px" }} type="submit">Sign out</button></form></div>
      </div>
      <div className="pw">
        <h1 style={{ fontSize: "2.2rem" }}>{staff ? "Client documents" : "Your documents"}</h1>
        <p className="mu">Files are stored privately and only visible to you and the Accountax team. Please do not upload passwords or bank login details.</p>
        <div className="pcard"><h2>Upload a file</h2><UploadForm userId={user.id} clients={staff ? clients : undefined} /></div>
        <div className="pcard"><h2>Documents</h2>
          {!docs?.length ? <p className="mu">No documents yet.</p> : (
            <div className="scroll"><table className="pt"><thead><tr><th>Name</th>{staff && <th>Client</th>}<th>From</th><th>Date</th><th>Size</th><th /></tr></thead>
              <tbody>{docs.map((d) => (
                <tr key={d.id}><td>{d.name}</td>{staff && <td>{label(byId.get(d.client_id))}</td>}<td>{from(d)}</td>
                  <td>{new Date(d.created_at).toLocaleDateString("en-GB")}</td><td>{size(d.size_bytes)}</td><td><a href={`/portal/download?id=${d.id}`}>Download</a></td></tr>))}</tbody></table></div>)}
        </div>
      </div>
    </>
  );
}

export default function PortalHome() {
  return <Suspense fallback={<div className="pw"><p className="mu">Loading...</p></div>}><Content /></Suspense>;
}
