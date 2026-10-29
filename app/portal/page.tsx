import { Suspense } from "react";
import Shell from "../../components/portal/Shell";
import { needClient } from "../../lib/portal/session";
import { toggleOnboarding } from "./actions";
import { fmtDate, money, pill, type Req, type Inv, type Msg, type Onb } from "../../lib/portal/format";

async function Content() {
  const { sb, me, org, orgs } = await needClient();
  const [reqs, invs, docs, msgs, onb, pend] = await Promise.all([
    sb.from("requests").select("id,org_id,title,details,due_date,status,created_at", { count: "exact" }).eq("org_id", org.id).neq("status", "done").order("due_date", { ascending: true, nullsFirst: false }).limit(5).returns<Req[]>(),
    sb.from("invoices").select("id,org_id,number,description,amount,currency,due_date,status", { count: "exact" }).eq("org_id", org.id).eq("status", "unpaid").order("due_date").limit(5).returns<Inv[]>(),
    sb.from("documents").select("id", { count: "exact", head: true }).eq("org_id", org.id),
    sb.from("messages").select("id,org_id,sender_id,body,created_at").eq("org_id", org.id).order("created_at", { ascending: false }).limit(3).returns<Msg[]>(),
    sb.from("onboarding_items").select("id,org_id,title,position,done,done_at").eq("org_id", org.id).order("position").returns<Onb[]>(),
    sb.from("approvals").select("id", { count: "exact", head: true }).eq("org_id", org.id).eq("status", "pending"),
  ]);
  const todo = (onb.data ?? []).filter((o) => !o.done);
  return (
    <Shell me={me} orgs={orgs} org={org} active="/portal" title={`Welcome, ${me.full_name || me.email}`}>
      <div className="kpis">
        <a className="card kpi" href="/portal/requests"><b>{reqs.count ?? 0}</b><span>Open requests</span></a>
        <a className="card kpi" href="/portal/approvals"><b>{pend.count ?? 0}</b><span>Awaiting your approval</span></a>
        <a className="card kpi" href="/portal/invoices"><b>{invs.count ?? 0}</b><span>Unpaid invoices</span></a>
        <a className="card kpi" href="/portal/documents"><b>{docs.count ?? 0}</b><span>Documents</span></a>
      </div>
      {todo.length > 0 && <div className="pcard"><h2>Getting started ({(onb.data?.length ?? 0) - todo.length} of {onb.data?.length ?? 0} done)</h2>
        {(onb.data ?? []).map((o) => (
          <div className="row" key={o.id} style={{ marginBottom: 10, alignItems: "center" }}>
            <span style={{ flex: 1 }}>{o.done ? "Done: " : ""}{o.title}</span>
            <form action={toggleOnboarding}><input type="hidden" name="id" value={o.id} /><input type="hidden" name="done" value={o.done ? "0" : "1"} /><input type="hidden" name="returnTo" value="/portal" /><button className="btn o sm2" type="submit">{o.done ? "Undo" : "Mark done"}</button></form></div>))}</div>}
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
