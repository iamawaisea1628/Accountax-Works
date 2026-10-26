import { Suspense } from "react";
import { notFound } from "next/navigation";
import Shell from "../../../../../components/portal/Shell";
import UploadForm from "../../../../../components/portal/UploadForm";
import { need } from "../../../../../lib/portal/session";
import { createRequest, setRequestStatus, createInvoice, setInvoiceStatus, sendMessage } from "../../../actions";
import { fmtDate, fmtSize, money, who, pill, type Prof, type Doc, type Req, type Inv, type Msg } from "../../../../../lib/portal/format";

const TABS: [string, string][] = [["documents", "Documents"], ["requests", "Requests"], ["invoices", "Invoices"], ["messages", "Messages"], ["activity", "Activity"]];
const hid = (n: string, v: string) => <input type="hidden" name={n} value={v} />;

async function Content({ params, sp }: { params: Promise<{ id: string }>; sp: Promise<{ tab?: string; error?: string }> }) {
  const { id } = await params;
  const { tab: t, error } = await sp;
  const tab = TABS.some(([k]) => k === t) ? (t as string) : "documents";
  const { sb, me } = await need("staff");
  if (!/^[0-9a-f-]{36}$/i.test(id)) notFound();
  const { data: c } = await sb.from("profiles").select("id,email,full_name,company,phone,country,role").eq("id", id).eq("role", "client").maybeSingle<Prof>();
  if (!c) notFound();
  const ret = `/portal/admin/clients/${id}?tab=${tab}`;
  const q = (table: string, cols: string) => sb.from(table).select(cols).eq("client_id", id).order("created_at", { ascending: false }).limit(200);
  const [docs, reqs, invs, msgs, act] = await Promise.all([
    tab === "documents" ? q("documents", "id,name,size_bytes,created_at,client_id,uploaded_by").returns<Doc[]>() : null,
    tab === "requests" ? q("requests", "id,client_id,title,details,due_date,status,created_at").returns<Req[]>() : null,
    tab === "invoices" ? q("invoices", "id,client_id,number,description,amount,currency,due_date,status").returns<Inv[]>() : null,
    tab === "messages" ? q("messages", "id,client_id,sender_id,body,created_at").returns<Msg[]>() : null,
    tab === "activity" ? sb.from("activity_log").select("id,actor_id,action,detail,created_at").eq("client_id", id).order("created_at", { ascending: false }).limit(150).returns<{ id: number; actor_id: string | null; action: string; detail: string | null; created_at: string }[]>() : null,
  ]);
  return (
    <Shell me={me} active="/portal/admin/clients" title={who(c)} error={error}>
      <p className="mu">{c.full_name} · {c.email}{c.phone ? ` · ${c.phone}` : ""}{c.country ? ` · ${c.country}` : ""} · <a href="/portal/admin/clients">All clients</a></p>
      <div className="tabs">{TABS.map(([k, l]) => <a key={k} href={`/portal/admin/clients/${id}?tab=${k}`} className={tab === k ? "on" : ""}>{l}</a>)}</div>

      {tab === "documents" && <>
        <div className="pcard"><h2>Upload for this client</h2><UploadForm userId={me.id} target={id} /></div>
        <div className="pcard"><h2>Files</h2>{!docs?.data?.length ? <p className="mu">No documents yet.</p> : (
          <div className="scroll"><table className="pt"><thead><tr><th>Name</th><th>From</th><th>Date</th><th>Size</th><th /></tr></thead><tbody>
            {docs.data.map((d) => <tr key={d.id}><td>{d.name}</td><td>{d.uploaded_by === id ? "Client" : "Accountax"}</td><td>{fmtDate(d.created_at)}</td><td>{fmtSize(d.size_bytes)}</td><td><a href={`/portal/download?id=${d.id}`}>Download</a></td></tr>)}
          </tbody></table></div>)}</div></>}

      {tab === "requests" && <>
        <div className="pcard"><h2>New request</h2>
          <form className="pf" action={createRequest} style={{ gridTemplateColumns: "1fr" }}>{hid("client_id", id)}{hid("returnTo", ret)}
            <div><label htmlFor="rt">What do you need from the client?</label><input id="rt" name="title" required maxLength={200} /></div>
            <div><label htmlFor="rd">Details (optional)</label><textarea id="rd" name="details" maxLength={2000} /></div>
            <div><label htmlFor="rdd">Due date (optional)</label><input id="rdd" name="due_date" type="date" /></div>
            <div><button className="btn" type="submit">Send Request</button></div></form></div>
        {!reqs?.data?.length ? <div className="pcard"><p className="mu">No requests yet.</p></div> : reqs.data.map((r) => (
          <div className="pcard" key={r.id}><h2>{r.title} <span className={`pill ${pill(r.status)}`}>{r.status}</span></h2>
            {r.details && <p className="mu">{r.details}</p>}<p className="mu">{r.due_date ? `Due ${fmtDate(r.due_date)}` : "No due date"}</p>
            <div className="row">{(["open", "submitted", "done"] as const).filter((s) => s !== r.status).map((s) => (
              <form key={s} action={setRequestStatus}>{hid("id", r.id)}{hid("status", s)}{hid("returnTo", ret)}<button className="btn o" type="submit">Mark {s}</button></form>))}</div></div>))}</>}

      {tab === "invoices" && <>
        <div className="pcard"><h2>New invoice</h2>
          <form className="pf prow" action={createInvoice}>{hid("client_id", id)}{hid("returnTo", ret)}
            <div><label htmlFor="in">Invoice number</label><input id="in" name="number" required maxLength={40} /></div>
            <div><label htmlFor="ia">Amount</label><input id="ia" name="amount" type="number" step="0.01" min="0.01" required /></div>
            <div><label htmlFor="ic">Currency (3 letters)</label><input id="ic" name="currency" defaultValue="PKR" maxLength={3} /></div>
            <div><label htmlFor="id2">Due date</label><input id="id2" name="due_date" type="date" /></div>
            <div style={{ gridColumn: "1/-1" }}><label htmlFor="ide">Description</label><input id="ide" name="description" maxLength={300} /></div>
            <div><button className="btn" type="submit">Create Invoice</button></div></form></div>
        <div className="pcard"><h2>Invoices</h2>{!invs?.data?.length ? <p className="mu">No invoices yet.</p> : (
          <div className="scroll"><table className="pt"><thead><tr><th>Number</th><th>Description</th><th>Amount</th><th>Due</th><th>Status</th><th /></tr></thead><tbody>
            {invs.data.map((i) => <tr key={i.id}><td><a href={`/portal/invoices/${i.id}`}>{i.number}</a></td><td>{i.description}</td><td>{money(i.amount, i.currency)}</td><td>{fmtDate(i.due_date)}</td><td><span className={`pill ${pill(i.status)}`}>{i.status}</span></td>
              <td><div className="row">{(["unpaid", "paid", "void"] as const).filter((s) => s !== i.status).map((s) => <form key={s} action={setInvoiceStatus}>{hid("id", i.id)}{hid("status", s)}{hid("returnTo", ret)}<button className="btn o sm2" type="submit">{s}</button></form>)}</div></td></tr>)}
          </tbody></table></div>)}</div></>}

      {tab === "messages" && (
        <div className="pcard"><div className="thread">{!msgs?.data?.length ? <p className="mu">No messages yet.</p> : [...msgs.data].reverse().map((m) => (
          <div key={m.id} className={m.sender_id === id ? "bub" : "bub me"}><small className="mu">{m.sender_id === id ? "Client" : "Accountax"} · {fmtDate(m.created_at)}</small><br />{m.body}</div>))}</div>
          <form className="pf" action={sendMessage} style={{ gridTemplateColumns: "1fr" }}>{hid("client_id", id)}{hid("returnTo", ret)}
            <div><label htmlFor="mb">Reply to client</label><textarea id="mb" name="body" required maxLength={4000} /></div>
            <div><button className="btn" type="submit">Send</button></div></form></div>)}
      {tab === "activity" && (
        <div className="pcard"><h2>Activity log</h2>{!act?.data?.length ? <p className="mu">No activity recorded yet.</p> : (
          <div className="scroll"><table className="pt"><thead><tr><th>When</th><th>By</th><th>Action</th><th>Detail</th></tr></thead><tbody>
            {act.data.map((a) => <tr key={a.id}><td>{new Date(a.created_at).toLocaleString("en-GB")}</td><td>{a.actor_id === id ? "Client" : a.actor_id ? "Accountax" : "System"}</td><td>{a.action.replace(/_/g, " ")}</td><td>{a.detail}</td></tr>)}
          </tbody></table></div>)}</div>)}
    </Shell>
  );
}
export default function Page({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ tab?: string; error?: string }> }) {
  return <Suspense fallback={<p className="mu" style={{ padding: 40 }}>Loading...</p>}><Content params={params} sp={searchParams} /></Suspense>;
}
