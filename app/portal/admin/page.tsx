import { Suspense } from "react";
import Shell from "../../../components/portal/Shell";
import { need } from "../../../lib/portal/session";
import { fmtDate, money, who, pill, type Prof, type Req, type Inv, type Msg, type Doc } from "../../../lib/portal/format";

async function Content() {
  const { sb, me } = await need("staff");
  const [profs, reqs, invs, msgs, docs, act] = await Promise.all([
    sb.from("profiles").select("id,email,full_name,company,role").eq("role", "client").limit(500).returns<Prof[]>(),
    sb.from("requests").select("id,client_id,title,details,due_date,status,created_at").neq("status", "done").order("created_at", { ascending: false }).limit(200).returns<Req[]>(),
    sb.from("invoices").select("id,client_id,number,description,amount,currency,due_date,status").eq("status", "unpaid").order("due_date").limit(200).returns<Inv[]>(),
    sb.from("messages").select("id,client_id,sender_id,body,created_at").order("created_at", { ascending: false }).limit(30).returns<Msg[]>(),
    sb.from("documents").select("id,name,size_bytes,created_at,client_id,uploaded_by").order("created_at", { ascending: false }).limit(6).returns<Doc[]>(),
    sb.from("activity_log").select("id,client_id,actor_id,action,detail,created_at").order("created_at", { ascending: false }).limit(10).returns<{ id: number; client_id: string | null; actor_id: string | null; action: string; detail: string | null; created_at: string }[]>(),
  ]);
  const by = new Map((profs.data ?? []).map((p) => [p.id, p]));
  const link = (id: string, tab: string, text: string) => <a href={`/portal/admin/clients/${id}?tab=${tab}`}>{text}</a>;
  const review = (reqs.data ?? []).filter((r) => r.status === "submitted");
  const fromClients = (msgs.data ?? []).filter((m) => by.has(m.sender_id)).slice(0, 5);
  return (
    <Shell me={me} active="/portal/admin" title="Dashboard">
      <div className="kpis">
        <a className="card kpi" href="/portal/admin/clients"><b>{profs.data?.length ?? 0}</b><span>Clients</span></a>
        <div className="card kpi"><b>{(reqs.data ?? []).filter((r) => r.status === "open").length}</b><span>Open requests</span></div>
        <div className="card kpi"><b>{review.length}</b><span>Awaiting your review</span></div>
        <div className="card kpi"><b>{invs.data?.length ?? 0}</b><span>Unpaid invoices</span></div>
      </div>
      <div className="pcard"><h2>Submitted by clients, awaiting review</h2>
        {!review.length ? <p className="mu">Nothing to review.</p> : review.map((r) => <p key={r.id}>{link(r.client_id, "requests", r.title)} <span className="mu">{who(by.get(r.client_id))}</span> <span className={`pill ${pill(r.status)}`}>{r.status}</span></p>)}</div>
      <div className="pcard"><h2>Unpaid invoices</h2>
        {!invs.data?.length ? <p className="mu">All invoices are settled.</p> : invs.data.slice(0, 8).map((i) => <p key={i.id}>{link(i.client_id, "invoices", i.number)} <span className="mu">{who(by.get(i.client_id))}, {money(i.amount, i.currency)}{i.due_date ? `, due ${fmtDate(i.due_date)}` : ""}</span></p>)}</div>
      <div className="pcard"><h2>Latest client messages</h2>
        {!fromClients.length ? <p className="mu">No client messages yet.</p> : fromClients.map((m) => <p key={m.id}>{link(m.client_id, "messages", who(by.get(m.client_id)))} <span className="mu">{m.body.slice(0, 120)}</span></p>)}</div>
      <div className="pcard"><h2>Recent uploads</h2>
        {!docs.data?.length ? <p className="mu">No documents yet.</p> : docs.data.map((d) => <p key={d.id}>{link(d.client_id, "documents", d.name)} <span className="mu">{who(by.get(d.client_id))}, {fmtDate(d.created_at)}</span></p>)}</div>
      <div className="pcard"><h2>Recent activity</h2>
        {!act.data?.length ? <p className="mu">Activity will appear here once the activity log SQL has been run.</p> : act.data.map((a) => <p key={a.id}><span className="mu">{fmtDate(a.created_at)}</span> {a.action.replace(/_/g, " ")}{a.detail ? `: ${a.detail}` : ""} {a.client_id && link(a.client_id, "activity", who(by.get(a.client_id)))}</p>)}</div>
    </Shell>
  );
}
export default function Page() { return <Suspense fallback={<p className="mu" style={{ padding: 40 }}>Loading...</p>}><Content /></Suspense>; }
