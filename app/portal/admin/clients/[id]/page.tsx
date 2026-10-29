import { Suspense } from "react";
import { notFound } from "next/navigation";
import Shell from "../../../../../components/portal/Shell";
import UploadForm from "../../../../../components/portal/UploadForm";
import { need } from "../../../../../lib/portal/session";
import { EngagementsTab, OnboardingTab, ApprovalsTab, NotesTab } from "../../../../../components/portal/AdminTabs";
import { createRequest, setRequestStatus, createInvoice, setInvoiceStatus, sendMessage, addOrgMember, assignStaff, unassignStaff } from "../../../actions";
import { fmtDate, fmtSize, money, pill, catLabel, TYPES, type OrgFull, type Doc, type Req, type Inv, type Msg } from "../../../../../lib/portal/format";

const TABS: [string, string][] = [["engagements", "Engagements"], ["onboarding", "Onboarding"], ["documents", "Documents"], ["requests", "Requests"], ["approvals", "Approvals"], ["invoices", "Invoices"], ["messages", "Messages"], ["notes", "Notes"], ["activity", "Activity"], ["team", "Team"]];
const hid = (n: string, v: string) => <input type="hidden" name={n} value={v} />;

async function Content({ params, sp }: { params: Promise<{ id: string }>; sp: Promise<{ tab?: string; error?: string }> }) {
  const { id } = await params;
  const { tab: t, error } = await sp;
  const tab = TABS.some(([k]) => k === t) ? (t as string) : "engagements";
  const { sb, me } = await need("staff");
  if (!/^[0-9a-f-]{36}$/i.test(id)) notFound();
  const { data: c } = await sb.from("organizations").select("id,name,client_type,country,email,phone,status").eq("id", id).maybeSingle<OrgFull>();
  if (!c) notFound();
  const ret = `/portal/admin/clients/${id}?tab=${tab}`;
  const q = (table: string, cols: string) => sb.from(table).select(cols).eq("org_id", id).order("created_at", { ascending: false }).limit(200);
  const [docs, reqs, invs, msgs, act, staffRows, members, assigned] = await Promise.all([
    tab === "documents" ? q("documents", "id,name,size_bytes,created_at,org_id,uploaded_by,category").returns<Doc[]>() : null,
    tab === "requests" ? q("requests", "id,org_id,title,details,due_date,status,created_at").returns<Req[]>() : null,
    tab === "invoices" ? q("invoices", "id,org_id,number,description,amount,currency,due_date,status").returns<Inv[]>() : null,
    tab === "messages" ? q("messages", "id,org_id,sender_id,body,created_at").returns<Msg[]>() : null,
    tab === "activity" ? sb.from("activity_log").select("id,actor_id,action,detail,created_at").eq("org_id", id).order("created_at", { ascending: false }).limit(150).returns<{ id: number; actor_id: string | null; action: string; detail: string | null; created_at: string }[]>() : null,
    sb.from("profiles").select("id,full_name,email,staff_role").eq("role", "staff").returns<{ id: string; full_name: string | null; email: string | null; staff_role: string | null }[]>(),
    tab === "team" ? sb.from("org_members").select("user_id,member_role,profiles(full_name,email)").eq("org_id", id).returns<{ user_id: string; member_role: string; profiles: { full_name: string | null; email: string | null } | null }[]>() : null,
    tab === "team" ? sb.from("org_staff").select("staff_id").eq("org_id", id).returns<{ staff_id: string }[]>() : null,
  ]);
  const staffIds = new Set((staffRows.data ?? []).map((x) => x.id));
  const canManage = me.staff_role === "owner" || me.staff_role === "manager";
  return (
    <Shell me={me} active="/portal/admin/clients" title={c.name} error={error}>
      <p className="mu">{TYPES.find(([v]) => v === c.client_type)?.[1]} · {c.email}{c.phone ? ` · ${c.phone}` : ""}{c.country ? ` · ${c.country}` : ""} · {c.status} · <a href="/portal/admin/clients">All clients</a></p>
      <div className="tabs">{TABS.map(([k, l]) => <a key={k} href={`/portal/admin/clients/${id}?tab=${k}`} className={tab === k ? "on" : ""}>{l}</a>)}</div>

      {tab === "engagements" && <EngagementsTab sb={sb} id={id} ret={ret} />}
      {tab === "onboarding" && <OnboardingTab sb={sb} id={id} ret={ret} />}
      {tab === "approvals" && <ApprovalsTab sb={sb} id={id} ret={ret} />}
      {tab === "notes" && <NotesTab sb={sb} id={id} ret={ret} meId={me.id} />}

      {tab === "documents" && <>
        <div className="pcard"><h2>Upload for this client</h2><UploadForm userId={me.id} orgId={id} /></div>
        <div className="pcard"><h2>Files</h2>{!docs?.data?.length ? <p className="mu">No documents yet.</p> : (
          <div className="scroll"><table className="pt"><thead><tr><th>Name</th><th>From</th><th>Date</th><th>Size</th><th /></tr></thead><tbody>
            {docs.data.map((d) => <tr key={d.id}><td>{d.name} <span className="pill">{catLabel(d.category)}</span></td><td>{staffIds.has(d.uploaded_by) ? "Accountax" : "Client"}</td><td>{fmtDate(d.created_at)}</td><td>{fmtSize(d.size_bytes)}</td><td><a href={`/portal/download?id=${d.id}`}>Download</a></td></tr>)}
          </tbody></table></div>)}</div></>}

      {tab === "requests" && <>
        <div className="pcard"><h2>New request</h2>
          <form className="pf" action={createRequest} style={{ gridTemplateColumns: "1fr" }}>{hid("org_id", id)}{hid("returnTo", ret)}
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
          <form className="pf prow" action={createInvoice}>{hid("org_id", id)}{hid("returnTo", ret)}
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
          <div key={m.id} className={staffIds.has(m.sender_id) ? "bub me" : "bub"}><small className="mu">{staffIds.has(m.sender_id) ? "Accountax" : "Client"} · {fmtDate(m.created_at)}</small><br />{m.body}</div>))}</div>
          <form className="pf" action={sendMessage} style={{ gridTemplateColumns: "1fr" }}>{hid("org_id", id)}{hid("returnTo", ret)}
            <div><label htmlFor="mb">Reply to client</label><textarea id="mb" name="body" required maxLength={4000} /></div>
            <div><button className="btn" type="submit">Send</button></div></form></div>)}
      {tab === "activity" && (
        <div className="pcard"><h2>Activity log</h2>{!act?.data?.length ? <p className="mu">No activity recorded yet.</p> : (
          <div className="scroll"><table className="pt"><thead><tr><th>When</th><th>By</th><th>Action</th><th>Detail</th></tr></thead><tbody>
            {act.data.map((a) => <tr key={a.id}><td>{new Date(a.created_at).toLocaleString("en-GB")}</td><td>{a.actor_id ? (staffIds.has(a.actor_id) ? "Accountax" : "Client") : "System"}</td><td>{a.action.replace(/_/g, " ")}</td><td>{a.detail}</td></tr>)}
          </tbody></table></div>)}</div>)}
      {tab === "team" && <>
        <div className="pcard"><h2>Client team</h2>{!members?.data?.length ? <p className="mu">No logins yet.</p> : (
          <div className="scroll"><table className="pt"><thead><tr><th>Name</th><th>Email</th><th>Access</th></tr></thead><tbody>
            {members.data.map((m) => <tr key={m.user_id}><td>{m.profiles?.full_name}</td><td>{m.profiles?.email}</td><td>{m.member_role}</td></tr>)}
          </tbody></table></div>)}
          <p className="mu">Admin: full access for the client. Member: can upload, message and submit requests. Viewer: read only.</p></div>
        {canManage && <div className="pcard"><h2>Add a person to this client</h2>
          <form className="pf prow" action={addOrgMember}>{hid("org_id", id)}{hid("returnTo", ret)}
            <div><label htmlFor="tn">Full name</label><input id="tn" name="full_name" required maxLength={100} /></div>
            <div><label htmlFor="te">Email</label><input id="te" name="email" type="email" required maxLength={150} /></div>
            <div><label htmlFor="tr">Access</label><select id="tr" name="member_role" defaultValue="member"><option value="admin">Admin</option><option value="member">Member</option><option value="viewer">Viewer</option></select></div>
            <div><label htmlFor="tp">Password (optional, min 10)</label><input id="tp" name="password" type="text" minLength={10} autoComplete="off" placeholder="Blank = email an invitation" /></div>
            <div><button className="btn" type="submit">Add Person</button></div></form></div>}
        <div className="pcard"><h2>Assigned staff</h2>
          <p className="mu">Owners and managers always see every client. Accountants, analysts and read-only staff see only the clients assigned to them.</p>
          {(assigned?.data ?? []).map((a) => { const st = (staffRows.data ?? []).find((x) => x.id === a.staff_id); return (
            <div className="row" key={a.staff_id} style={{ marginBottom: 8 }}><span>{st?.full_name || st?.email} <span className="pill">{st?.staff_role}</span></span>
              {canManage && <form action={unassignStaff}>{hid("org_id", id)}{hid("staff_id", a.staff_id)}{hid("returnTo", ret)}<button className="btn o sm2" type="submit">Remove</button></form>}</div>); })}
          {!assigned?.data?.length && <p className="mu">No one assigned yet.</p>}
          {canManage && <form className="pf" action={assignStaff} style={{ gridTemplateColumns: "1fr", marginTop: 14 }}>{hid("org_id", id)}{hid("returnTo", ret)}
            <div><label htmlFor="as">Assign a staff member</label><select id="as" name="staff_id" required defaultValue=""><option value="" disabled>Select staff</option>
              {(staffRows.data ?? []).filter((x) => !(assigned?.data ?? []).some((a) => a.staff_id === x.id)).map((x) => <option key={x.id} value={x.id}>{x.full_name || x.email} ({x.staff_role})</option>)}</select></div>
            <div><button className="btn" type="submit">Assign</button></div></form>}</div></>}
    </Shell>
  );
}
export default function Page({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ tab?: string; error?: string }> }) {
  return <Suspense fallback={<p className="mu" style={{ padding: 40 }}>Loading...</p>}><Content params={params} sp={searchParams} /></Suspense>;
}
