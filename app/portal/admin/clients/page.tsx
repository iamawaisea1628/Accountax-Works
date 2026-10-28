import { Suspense } from "react";
import Shell from "../../../../components/portal/Shell";
import { need } from "../../../../lib/portal/session";
import { createClientAccount } from "../../actions";
import { TYPES, type OrgFull } from "../../../../lib/portal/format";

async function Content({ sp }: { sp: Promise<{ error?: string }> }) {
  const { error } = await sp;
  const { sb, me } = await need("staff");
  const [orgs, reqs, invs] = await Promise.all([
    sb.from("organizations").select("id,name,client_type,country,email,phone,status").order("name").limit(500).returns<OrgFull[]>(),
    sb.from("requests").select("org_id,status").neq("status", "done").limit(2000),
    sb.from("invoices").select("org_id,status").eq("status", "unpaid").limit(2000),
  ]);
  const tally = (rows: { org_id: string }[] | null, id: string) => (rows ?? []).filter((r) => r.org_id === id).length;
  const canAdd = me.staff_role === "owner" || me.staff_role === "manager";
  return (
    <Shell me={me} active="/portal/admin/clients" title="Clients" error={error}>
      {canAdd && <div className="pcard"><h2>Add a client</h2>
        <p className="mu">Creates the client record and its first login. Leave the password blank to email an invitation, or set one and share it privately.</p>
        <form className="pf prow" action={createClientAccount}>
          <div><label htmlFor="on">Client name (company or person)</label><input id="on" name="org_name" required maxLength={120} /></div>
          <div><label htmlFor="ty">Client type</label><select id="ty" name="client_type" defaultValue="company">{TYPES.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select></div>
          <div><label htmlFor="fn">Main contact name</label><input id="fn" name="full_name" required maxLength={100} /></div>
          <div><label htmlFor="em">Contact email</label><input id="em" name="email" type="email" required maxLength={150} /></div>
          <div><label htmlFor="ph">Phone</label><input id="ph" name="phone" maxLength={40} /></div>
          <div><label htmlFor="ct">Country</label><input id="ct" name="country" maxLength={80} /></div>
          <div><label htmlFor="pw">Temporary password (optional, min 10)</label><input id="pw" name="password" type="text" minLength={10} autoComplete="off" placeholder="Leave blank to email an invitation" /></div>
          <div><button className="btn" type="submit">Create Client</button></div>
        </form></div>}
      <div className="pcard"><h2>All clients ({orgs.data?.length ?? 0})</h2>
        {!orgs.data?.length ? <p className="mu">No clients yet.</p> : (
          <div className="scroll"><table className="pt"><thead><tr><th>Client</th><th>Type</th><th>Country</th><th>Status</th><th>Open requests</th><th>Unpaid invoices</th><th /></tr></thead><tbody>
            {orgs.data.map((o) => <tr key={o.id}><td>{o.name}</td><td>{TYPES.find(([v]) => v === o.client_type)?.[1]}</td><td>{o.country}</td><td>{o.status}</td><td>{tally(reqs.data, o.id)}</td><td>{tally(invs.data, o.id)}</td><td><a href={`/portal/admin/clients/${o.id}`}>Open workspace</a></td></tr>)}
          </tbody></table></div>)}</div>
    </Shell>
  );
}
export default function Page({ searchParams }: { searchParams: Promise<{ error?: string }> }) { return <Suspense fallback={<p className="mu" style={{ padding: 40 }}>Loading...</p>}><Content sp={searchParams} /></Suspense>; }
