import { Suspense } from "react";
import Shell from "../../../components/portal/Shell";
import { needClient } from "../../../lib/portal/session";
import { decideApproval } from "../actions";
import { fmtDate, pill, type Appr } from "../../../lib/portal/format";

async function Content({ sp }: { sp: Promise<{ error?: string }> }) {
  const { error } = await sp;
  const { sb, me, org, orgs } = await needClient();
  const [a, m] = await Promise.all([
    sb.from("approvals").select("id,org_id,title,details,document_id,status,comment,decided_at,created_at").eq("org_id", org.id).order("created_at", { ascending: false }).returns<Appr[]>(),
    sb.from("org_members").select("member_role").eq("org_id", org.id).eq("user_id", me.id).maybeSingle<{ member_role: string }>(),
  ]);
  const canDecide = m.data?.member_role === "admin";
  return (
    <Shell me={me} orgs={orgs} org={org} active="/portal/approvals" title="Approvals" error={error}>
      <p className="mu">Items Accountax needs you to review and sign off. Your decision is recorded with your name and the date.{!canDecide && " Only a client admin can approve; you can read them here."}</p>
      {!a.data?.length ? <div className="pcard"><p className="mu">Nothing needs your approval.</p></div> : a.data.map((x) => (
        <div className="pcard" key={x.id}><h2>{x.title} <span className={`pill ${pill(x.status)}`}>{x.status}</span></h2>
          {x.details && <p className="mu">{x.details}</p>}
          {x.document_id && <p><a href={`/portal/download?id=${x.document_id}`}>Open attached document</a></p>}
          {x.decided_at && <p className="mu">Decided {fmtDate(x.decided_at)}{x.comment ? `: ${x.comment}` : ""}</p>}
          {x.status === "pending" && canDecide && (
            <form className="pf" action={decideApproval} style={{ gridTemplateColumns: "1fr" }}><input type="hidden" name="id" value={x.id} />
              <div><label htmlFor={`c${x.id}`}>Comment (optional)</label><textarea id={`c${x.id}`} name="comment" maxLength={1000} /></div>
              <div className="row"><button className="btn" type="submit" name="decision" value="approved">Approve</button><button className="btn o" type="submit" name="decision" value="rejected">Reject</button></div></form>)}
        </div>))}
    </Shell>
  );
}
export default function Page({ searchParams }: { searchParams: Promise<{ error?: string }> }) { return <Suspense fallback={<p className="mu" style={{ padding: 40 }}>Loading...</p>}><Content sp={searchParams} /></Suspense>; }
