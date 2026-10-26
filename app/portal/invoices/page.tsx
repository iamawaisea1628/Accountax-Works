import { Suspense } from "react";
import Shell from "../../../components/portal/Shell";
import { need } from "../../../lib/portal/session";
import { fmtDate, money, pill, type Inv } from "../../../lib/portal/format";

async function Content() {
  const { sb, me } = await need("client");
  const { data } = await sb.from("invoices").select("id,client_id,number,description,amount,currency,due_date,status").order("created_at", { ascending: false }).limit(200).returns<Inv[]>();
  return (
    <Shell me={me} active="/portal/invoices" title="Invoices">
      <div className="pcard">
        {!data?.length ? <p className="mu">No invoices yet.</p> : (
          <div className="scroll"><table className="pt"><thead><tr><th>Number</th><th>Description</th><th>Amount</th><th>Due</th><th>Status</th></tr></thead><tbody>
            {data.map((i) => <tr key={i.id}><td>{i.number}</td><td>{i.description}</td><td>{money(i.amount, i.currency)}</td><td>{fmtDate(i.due_date)}</td><td><span className={`pill ${pill(i.status)}`}>{i.status}</span></td></tr>)}
          </tbody></table></div>)}
      </div>
      <p className="mu">Payment details are shared by your Accountax contact. Payment status is updated by the team.</p>
    </Shell>
  );
}
export default function Page() { return <Suspense fallback={<p className="mu" style={{ padding: 40 }}>Loading...</p>}><Content /></Suspense>; }
