import { Suspense } from "react";
import Shell from "../../../components/portal/Shell";
import { needClient } from "../../../lib/portal/session";
import { fmtDate, money, pill, pillarName, type Eng } from "../../../lib/portal/format";

async function Content() {
  const { sb, me, org, orgs } = await needClient();
  const { data } = await sb.from("engagements").select("id,org_id,pillar,title,description,status,start_date,end_date,fee_amount,fee_currency").eq("org_id", org.id).order("created_at", { ascending: false }).returns<Eng[]>();
  return (
    <Shell me={me} orgs={orgs} org={org} active="/portal/services" title="Your services">
      {!data?.length ? <div className="pcard"><p className="mu">Your engagements will appear here once Accountax has set them up.</p></div> : data.map((e) => (
        <div className="pcard" key={e.id}><h2>{e.title} <span className="pill">{pillarName(e.pillar)}</span> <span className={`pill ${pill(e.status)}`}>{e.status}</span></h2>
          {e.description && <p className="mu">{e.description}</p>}
          <p className="mu">{e.start_date ? `From ${fmtDate(e.start_date)}` : ""}{e.end_date ? ` to ${fmtDate(e.end_date)}` : ""}{e.fee_amount != null ? ` · Fee ${money(e.fee_amount, e.fee_currency)}` : ""}</p></div>))}
    </Shell>
  );
}
export default function Page() { return <Suspense fallback={<p className="mu" style={{ padding: 40 }}>Loading...</p>}><Content /></Suspense>; }
