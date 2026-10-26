import { Suspense } from "react";
import Shell from "../../components/portal/Shell";
import { need } from "../../lib/portal/session";
import { fmtDate, money, pill, type Req, type Inv, type Msg } from "../../lib/portal/format";

async function Content() {
  const { sb, me } = await need("client");
  const [reqs, invs, docs, msgs] = await Promise.all([
    sb.from("requests").select("id,client_id,title,details,due_date,status,created_at", { count: "exact" }).neq("status", "done").order("due_date", { ascending: true, nullsFirst: false }).limit(5).returns<Req[]>(),
    sb.from("invoices").select("id,client_id,number,description,amount,currency,due_date,status", { count: "exact" }).eq("status", "unpaid").order("due_date").limit(5).returns<Inv[]>(),
    sb.from("documents").select("id", { count: "exact", head: true }),
    sb.from("messages").select("id,client_id,sender_id,body,created_at").order("created_at", { ascending: false }).limit(3).returns<Msg[]>(),
  ]);
  return (
    <Shell me={me} active="/portal" title={`Welcome, ${me.full_name || me.email}`}>
      <div className="kpis">
        <a className="card kpi" href="/portal/requests"><b>{reqs.count ?? 0}</b><span>Open requests</span></a>
        <a className="card kpi" href="/portal/invoices"><b>{invs.count ?? 0}</b><span>Unpaid invoices</span></a>
        <a className="card kpi" href="/portal/documents"><b>{docs.count ?? 0}</b><span>Documents</span></a>
      </div>
      <div className="pcard"><h2>Waiting on you</h2>
        {!reqs.data?.length ? <p className="mu">Nothing is waiting on you right now.</p> : reqs.data.map((r) => (
          <p key={r.id}><strong>{r.title}</strong> <span className={`pill ${pill(r.status)}`}>{r.status}</span> {r.due_date && <span className="mu">due {fmtDate(r.due_date)}</span>}</p>))}
        <a href="/portal/requests">See all requests</a></div>
      <div className="pcard"><h2>Unpaid invoices</h2>
        {!invs.data?.length ? <p className="mu">No unpaid invoices.</p> : invs.data.map((i) => <p key={i.id}>{i.number} <span className="mu">{money(i.amount, i.currency)}{i.due_date ? `, due ${fmtDate(i.due_date)}` : ""}</span></p>)}</div>
      <div className="pcard"><h2>Latest messages</h2>
        {!msgs.data?.length ? <p className="mu">No messages yet.</p> : msgs.data.map((m) => <p key={m.id}>{m.sender_id === me.id ? "You" : "Accountax"}: <span className="mu">{m.body.slice(0, 140)}</span></p>)}
        <a href="/portal/messages">Open messages</a></div>
    </Shell>
  );
}
export default function Page() { return <Suspense fallback={<p className="mu" style={{ padding: 40 }}>Loading...</p>}><Content /></Suspense>; }
