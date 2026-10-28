import { Suspense } from "react";
import Shell from "../../../components/portal/Shell";
import { needClient } from "../../../lib/portal/session";
import { fmtDate, money, pill, type Inv } from "../../../lib/portal/format";

async function Content() {
  const { sb, me, org, orgs } = await needClient();
  const { data } = await sb.from("invoices").select("id,org_id,number,description,amount,currency,due_date,status").eq("org_id", org.id).order("created_at", { ascending: false }).limit(200).returns<Inv[]>();
  return (
    <Shell me={me} orgs={orgs} org={org} active="/portal/invoices" title="Invoices">
      <div className="pcard">
        {!data?.length ? <p className="mu">No invoices yet.</p> : (
          <div className="scroll"><table className="pt"><thead><tr><th>Number</th><th>Description</th><th>Amount</th><th>Due</th><th>Status</th></tr></thead><tbody>
            {data.map((i) => <tr key={i.id}><td><a href={`/portal/invoices/${i.id}`}>{i.number}</a></td><td>{i.description}</td><td>{money(i.amount, i.currency)}</td><td>{fmtDate(i.due_date)}</td><td><span className={`pill ${pill(i.status)}`}>{i.status}</span></td></tr>)}
          </tbody></table></div>)}
      </div>
      <p className="mu">Payment details are shared by your Accountax contact. Payment status is updated by the team.</p>
    </Shell>
  );
}
export default function Page() { return <Suspense fallback={<p className="mu" style={{ padding: 40 }}>Loading...</p>}><Content /></Suspense>; }
