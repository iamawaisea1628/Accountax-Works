import type { Me } from "../../lib/portal/session";

const CLIENT: [string, string][] = [["/portal", "Overview"], ["/portal/documents", "Documents"], ["/portal/requests", "Requests"], ["/portal/invoices", "Invoices"], ["/portal/messages", "Messages"]];
const STAFF: [string, string][] = [["/portal/admin", "Dashboard"], ["/portal/admin/clients", "Clients"]];

export default function Shell({ me, active, title, error, children }: { me: Me; active: string; title: string; error?: string; children: React.ReactNode }) {
  const staff = me.role === "staff";
  return (
    <div className="app">
      <aside className="side">
        <a className="logo" href="/"><span>ACCOUNT<b>AX</b></span></a>
        <p className="role">{staff ? "Admin workspace" : "Client portal"}</p>
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
