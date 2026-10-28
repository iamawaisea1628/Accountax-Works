import type { Me, OrgRef } from "../../lib/portal/session";
import { switchOrg } from "../../app/portal/actions";
import IdleLogout from "./IdleLogout";

const CLIENT: [string, string][] = [["/portal", "Overview"], ["/portal/documents", "Documents"], ["/portal/requests", "Requests"], ["/portal/invoices", "Invoices"], ["/portal/messages", "Messages"], ["/portal/profile", "Profile"]];
const STAFF: [string, string][] = [["/portal/admin", "Dashboard"], ["/portal/admin/clients", "Clients"], ["/portal/profile", "Profile"]];

export default function Shell({ me, active, title, error, orgs, org, children }: { me: Me; active: string; title: string; error?: string; orgs?: OrgRef[]; org?: OrgRef; children: React.ReactNode }) {
  const staff = me.role === "staff";
  return (
    <div className="app">
      <IdleLogout />
      <aside className="side">
        <a className="logo" href="/"><span>ACCOUNT<b>AX</b></span></a>
        <p className="role">{staff ? "Admin workspace" : "Client portal"}</p>
        {!staff && org && <p style={{ margin: 0, fontWeight: 600 }}>{org.name}</p>}
        {!staff && orgs && orgs.length > 1 && (
          <form action={switchOrg} className="pf" style={{ gridTemplateColumns: "1fr", gap: 8 }}>
            <input type="hidden" name="returnTo" value={active} />
            <select name="org" defaultValue={org?.id} aria-label="Switch organization">{orgs.map((o) => <option key={o.id} value={o.id}>{o.name}</option>)}</select>
            <button className="btn o" type="submit" style={{ padding: "8px" }}>Switch</button>
          </form>)}
        <nav aria-label="Portal">
          {(staff ? STAFF : CLIENT).map(([h, t]) => <a key={h} href={h} className={active === h ? "on" : ""}>{t}</a>)}
        </nav>
        <div className="sidefoot">
          <span>{me.full_name || me.email}</span>
          <form method="post" action="/portal/signout"><button className="btn o" type="submit">Sign out</button></form>
        </div>
      </aside>
      <main className="main">
        <h1>{title}</h1>
        {error && <p className="err" role="alert">{error}</p>}
        {children}
      </main>
    </div>
  );
}
