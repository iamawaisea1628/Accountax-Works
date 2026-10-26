import { Suspense } from "react";
import Shell from "../../../components/portal/Shell";
import SetPasswordForm from "../../../components/portal/SetPasswordForm";
import { needAny } from "../../../lib/portal/session";
import { updateProfile } from "../actions";
import type { Prof } from "../../../lib/portal/format";

async function Content({ sp }: { sp: Promise<{ error?: string; saved?: string }> }) {
  const { error, saved } = await sp;
  const { sb, me } = await needAny();
  const { data: p } = await sb.from("profiles").select("id,email,full_name,company,phone,country").eq("id", me.id).maybeSingle<Prof>();
  return (
    <Shell me={me} active="/portal/profile" title="Profile" error={error}>
      {saved && <p className="pmsg" style={{ color: "var(--g)" }}>Profile saved.</p>}
      <div className="pcard"><h2>Your details</h2>
        <form className="pf prow" action={updateProfile}>
          <div><label htmlFor="pe">Email (sign-in)</label><input id="pe" value={p?.email ?? ""} readOnly /></div>
          <div><label htmlFor="pn">Full name</label><input id="pn" name="full_name" defaultValue={p?.full_name ?? ""} required maxLength={100} /></div>
          <div><label htmlFor="pc">Company</label><input id="pc" name="company" defaultValue={p?.company ?? ""} maxLength={120} /></div>
          <div><label htmlFor="pp">Phone</label><input id="pp" name="phone" defaultValue={p?.phone ?? ""} maxLength={40} /></div>
          <div><label htmlFor="pk">Country</label><input id="pk" name="country" defaultValue={p?.country ?? ""} maxLength={80} /></div>
          <div><button className="btn" type="submit">Save Details</button></div>
        </form></div>
      <div className="pcard"><h2>Change password</h2><SetPasswordForm /></div>
    </Shell>
  );
}
export default function Page({ searchParams }: { searchParams: Promise<{ error?: string; saved?: string }> }) { return <Suspense fallback={<p className="mu" style={{ padding: 40 }}>Loading...</p>}><Content sp={searchParams} /></Suspense>; }
