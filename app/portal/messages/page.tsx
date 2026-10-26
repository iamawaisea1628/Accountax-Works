import { Suspense } from "react";
import Shell from "../../../components/portal/Shell";
import { need } from "../../../lib/portal/session";
import { sendMessage } from "../actions";
import { fmtDate, type Msg } from "../../../lib/portal/format";

async function Content({ sp }: { sp: Promise<{ error?: string }> }) {
  const { error } = await sp;
  const { sb, me } = await need("client");
  const { data } = await sb.from("messages").select("id,client_id,sender_id,body,created_at").order("created_at", { ascending: false }).limit(100).returns<Msg[]>();
  const msgs = [...(data ?? [])].reverse();
  return (
    <Shell me={me} active="/portal/messages" title="Messages" error={error}>
      <div className="pcard">
        <div className="thread">{!msgs.length ? <p className="mu">No messages yet. Write to your Accountax team below.</p> : msgs.map((m) => (
          <div key={m.id} className={m.sender_id === me.id ? "bub me" : "bub"}><small className="mu">{m.sender_id === me.id ? "You" : "Accountax"} · {fmtDate(m.created_at)}</small><br />{m.body}</div>))}</div>
        <form className="pf" action={sendMessage} style={{ gridTemplateColumns: "1fr" }}>
          <input type="hidden" name="returnTo" value="/portal/messages" />
          <div><label htmlFor="mb">Message</label><textarea id="mb" name="body" required maxLength={4000} /></div>
          <div><button className="btn" type="submit">Send</button></div>
        </form>
      </div>
    </Shell>
  );
}
export default function Page({ searchParams }: { searchParams: Promise<{ error?: string }> }) { return <Suspense fallback={<p className="mu" style={{ padding: 40 }}>Loading...</p>}><Content sp={searchParams} /></Suspense>; }
