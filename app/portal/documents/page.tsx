import { Suspense } from "react";
import Shell from "../../../components/portal/Shell";
import UploadForm from "../../../components/portal/UploadForm";
import { needClient } from "../../../lib/portal/session";
import { fmtDate, fmtSize, catLabel, type Doc } from "../../../lib/portal/format";

async function Content() {
  const { sb, me, org, orgs } = await needClient();
  const { data: docs } = await sb.from("documents").select("id,name,size_bytes,created_at,org_id,uploaded_by,category").eq("org_id", org.id).order("created_at", { ascending: false }).limit(200).returns<Doc[]>();
  return (
    <Shell me={me} orgs={orgs} org={org} active="/portal/documents" title="Documents">
      <p className="mu">Files are private to you and the Accountax team. Please do not upload passwords or bank login details.</p>
      <div className="pcard"><h2>Upload a file</h2><UploadForm userId={me.id} orgId={org.id} /></div>
      <div className="pcard"><h2>Your files</h2>
        {!docs?.length ? <p className="mu">No documents yet.</p> : (
          <div className="scroll"><table className="pt"><thead><tr><th>Name</th><th>From</th><th>Date</th><th>Size</th><th /></tr></thead><tbody>
            {docs.map((d) => <tr key={d.id}><td>{d.name} <span className="pill">{catLabel(d.category)}</span></td><td>{d.uploaded_by === me.id ? "You" : "Accountax"}</td><td>{fmtDate(d.created_at)}</td><td>{fmtSize(d.size_bytes)}</td><td><a href={`/portal/download?id=${d.id}`}>Download</a></td></tr>)}
          </tbody></table></div>)}</div>
    </Shell>
  );
}
export default function Page() { return <Suspense fallback={<p className="mu" style={{ padding: 40 }}>Loading...</p>}><Content /></Suspense>; }
