import { Suspense } from "react";
import Shell from "../../../components/portal/Shell";
import { need } from "../../../lib/portal/session";
import { setRequestStatus } from "../actions";
import { fmtDate, pill, type Req } from "../../../lib/portal/format";

async function Content({ sp }: { sp: Promise<{ error?: string }> }) {
  const { error } = await sp;
  const { sb, me } = await need("client");
  const { data } = await sb.from("requests").select("id,client_id,title,details,due_date,status,created_at").order("created_at", { ascending: false }).limit(200).returns<Req[]>();
  return (
    <Shell me={me} active="/portal/requests" title="Requests" error={error}>
      <p className="mu">Things Accountax needs from you. Upload what is asked under Documents, then mark the request as submitted.</p>
      {!data?.length ? <div className="pcard"><p className="mu">No requests yet.</p></div> : data.map((r) => (
        <div className="pcard" key={r.id}>
          <h2>{r.title} <span className={`pill ${pill(r.status)}`}>{r.status}</span></h2>
          {r.details && <p className="mu">{r.details}</p>}
          <p className="mu">{r.due_date ? `Due ${fmtDate(r.due_date)}` : "No due date"}</p>
          {r.status === "open" && (
            <form action={setRequestStatus}><input type="hidden" name="id" value={r.id} /><input type="hidden" name="status" value="submitted" /><input type="hidden" name="returnTo" value="/portal/requests" /><button className="btn" type="submit">Mark as submitted</button></form>)}
        </div>))}
    </Shell>
  );
}
export default function Page({ searchParams }: { searchParams: Promise<{ error?: string }> }) { return <Suspense fallback={<p className="mu" style={{ padding: 40 }}>Loading...</p>}><Content sp={searchParams} /></Suspense>; }
