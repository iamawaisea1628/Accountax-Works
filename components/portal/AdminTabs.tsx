import { createEngagement, setEngagementStatus, toggleOnboarding, createApproval, withdrawApproval, addNote, deleteNote } from "../../app/portal/actions";
import { fmtDate, money, pill, PILLARS, pillarName, type Eng, type Onb, type Appr, type Note } from "../../lib/portal/format";
import type { need } from "../../lib/portal/session";

type SB = Awaited<ReturnType<typeof need>>["sb"];
const hid = (n: string, v: string) => <input type="hidden" name={n} value={v} />;
const loading = <p className="mu">Nothing here yet.</p>;

export async function EngagementsTab({ sb, id, ret }: { sb: SB; id: string; ret: string }) {
  const { data } = await sb.from("engagements").select("id,org_id,pillar,title,description,status,start_date,end_date,fee_amount,fee_currency").eq("org_id", id).order("created_at", { ascending: false }).returns<Eng[]>();
  return <>
    <div className="pcard"><h2>New engagement</h2>
      <form className="pf prow" action={createEngagement}>{hid("org_id", id)}{hid("returnTo", ret)}
        <div><label htmlFor="ep">Service pillar</label><select id="ep" name="pillar" required defaultValue="">
          <option value="" disabled>Choose a pillar</option>{PILLARS.map(([k, l]) => <option key={k} value={k}>{l}</option>)}</select></div>
        <div><label htmlFor="et">Title</label><input id="et" name="title" required maxLength={200} placeholder="e.g. Monthly bookkeeping and reporting" /></div>
        <div><label htmlFor="es">Start date</label><input id="es" name="start_date" type="date" /></div>
        <div><label htmlFor="ee">End date</label><input id="ee" name="end_date" type="date" /></div>
        <div><label htmlFor="ef">Fee (optional)</label><input id="ef" name="fee_amount" type="number" min="0" step="0.01" /></div>
        <div><label htmlFor="ec">Currency</label><input id="ec" name="fee_currency" defaultValue="PKR" maxLength={3} /></div>
        <div style={{ gridColumn: "1/-1" }}><label htmlFor="ed">Scope (visible to the client)</label><textarea id="ed" name="description" maxLength={1500} /></div>
        <div><button className="btn" type="submit">Create Engagement</button></div></form></div>
    {!data?.length ? <div className="pcard">{loading}</div> : data.map((e) => (
      <div className="pcard" key={e.id}><h2>{e.title} <span className="pill">{pillarName(e.pillar)}</span> <span className={`pill ${pill(e.status)}`}>{e.status}</span></h2>
        {e.description && <p className="mu">{e.description}</p>}
        <p className="mu">{e.start_date ? `From ${fmtDate(e.start_date)}` : "No start date"}{e.end_date ? ` to ${fmtDate(e.end_date)}` : ""}{e.fee_amount != null ? ` · Fee ${money(e.fee_amount, e.fee_currency)}` : ""}</p>
        <div className="row">{(["proposed", "active", "paused", "completed"] as const).filter((s) => s !== e.status).map((s) => (
          <form key={s} action={setEngagementStatus}>{hid("id", e.id)}{hid("status", s)}{hid("returnTo", ret)}<button className="btn o sm2" type="submit">Mark {s}</button></form>))}</div></div>))}
  </>;
}

export async function OnboardingTab({ sb, id, ret }: { sb: SB; id: string; ret: string }) {
  const { data } = await sb.from("onboarding_items").select("id,org_id,title,position,done,done_at").eq("org_id", id).order("position").returns<Onb[]>();
  const n = data?.filter((x) => x.done).length ?? 0;
  return <div className="pcard"><h2>Onboarding checklist ({n} of {data?.length ?? 0} done)</h2>
    {!data?.length ? loading : data.map((o) => (
      <div className="row" key={o.id} style={{ marginBottom: 10, alignItems: "center" }}>
        <span style={{ flex: 1 }}>{o.done ? "Done: " : ""}{o.title}{o.done_at ? <span className="mu"> ({fmtDate(o.done_at)})</span> : null}</span>
        <form action={toggleOnboarding}>{hid("id", o.id)}{hid("done", o.done ? "0" : "1")}{hid("returnTo", ret)}<button className="btn o sm2" type="submit">{o.done ? "Undo" : "Mark done"}</button></form></div>))}</div>;
}

export async function ApprovalsTab({ sb, id, ret }: { sb: SB; id: string; ret: string }) {
  const [a, d] = await Promise.all([
    sb.from("approvals").select("id,org_id,title,details,document_id,status,comment,decided_at,created_at").eq("org_id", id).order("created_at", { ascending: false }).returns<Appr[]>(),
    sb.from("documents").select("id,name").eq("org_id", id).order("created_at", { ascending: false }).limit(100).returns<{ id: string; name: string }[]>(),
  ]);
  return <>
    <div className="pcard"><h2>Request an approval</h2>
      <p className="mu">For example: sign-off on financial statements or a tax computation. A client admin approves or rejects it, and it is logged.</p>
      <form className="pf" action={createApproval} style={{ gridTemplateColumns: "1fr" }}>{hid("org_id", id)}{hid("returnTo", ret)}
        <div><label htmlFor="at">What needs approval?</label><input id="at" name="title" required maxLength={200} /></div>
        <div><label htmlFor="ad">Details (optional)</label><textarea id="ad" name="details" maxLength={2000} /></div>
        <div><label htmlFor="ado">Attach an uploaded document (optional)</label><select id="ado" name="document_id" defaultValue=""><option value="">None</option>{(d.data ?? []).map((x) => <option key={x.id} value={x.id}>{x.name}</option>)}</select></div>
        <div><button className="btn" type="submit">Send for Approval</button></div></form></div>
    {!a.data?.length ? <div className="pcard">{loading}</div> : a.data.map((x) => (
      <div className="pcard" key={x.id}><h2>{x.title} <span className={`pill ${pill(x.status)}`}>{x.status}</span></h2>
        {x.details && <p className="mu">{x.details}</p>}
        {x.document_id && <p><a href={`/portal/download?id=${x.document_id}`}>Open attached document</a></p>}
        {x.decided_at && <p className="mu">Decided {fmtDate(x.decided_at)}{x.comment ? `: ${x.comment}` : ""}</p>}
        <form action={withdrawApproval}>{hid("id", x.id)}{hid("returnTo", ret)}<button className="btn o sm2" type="submit">Withdraw</button></form></div>))}
  </>;
}

export async function NotesTab({ sb, id, ret, meId }: { sb: SB; id: string; ret: string; meId: string }) {
  const [n, s] = await Promise.all([
    sb.from("org_notes").select("id,org_id,author_id,body,created_at").eq("org_id", id).order("created_at", { ascending: false }).limit(100).returns<Note[]>(),
    sb.from("profiles").select("id,full_name,email").eq("role", "staff").returns<{ id: string; full_name: string | null; email: string | null }[]>(),
  ]);
  const name = (u: string) => { const p = s.data?.find((x) => x.id === u); return p?.full_name || p?.email || "Staff"; };
  return <>
    <div className="pcard"><h2>Internal notes</h2><p className="mu">Only your staff can see these. Clients never can.</p>
      <form className="pf" action={addNote} style={{ gridTemplateColumns: "1fr" }}>{hid("org_id", id)}{hid("returnTo", ret)}
        <div><label htmlFor="nb">New note</label><textarea id="nb" name="body" required maxLength={4000} /></div>
        <div><button className="btn" type="submit">Save Note</button></div></form></div>
    {!n.data?.length ? <div className="pcard">{loading}</div> : n.data.map((x) => (
      <div className="pcard" key={x.id}><p className="mu">{name(x.author_id)} · {new Date(x.created_at).toLocaleString("en-GB")}</p><p style={{ whiteSpace: "pre-wrap" }}>{x.body}</p>
        {x.author_id === meId && <form action={deleteNote}>{hid("id", x.id)}{hid("returnTo", ret)}<button className="btn o sm2" type="submit">Delete</button></form>}</div>))}
  </>;
}
