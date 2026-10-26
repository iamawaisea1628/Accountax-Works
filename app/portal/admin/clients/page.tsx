import { Suspense } from "react";
import Shell from "../../../../components/portal/Shell";
import { need } from "../../../../lib/portal/session";
import { createClientAccount } from "../../actions";
import { who, type Prof } from "../../../../lib/portal/format";

async function Content({ sp }: { sp: Promise<{ error?: string }> }) {
  const { error } = await sp;
  const { sb, me } = await need("staff");
  const [profs, reqs, invs] = await Promise.all([
    sb.from("profiles").select("id,email,full_name,company,phone,country,role").eq("role", "client").order("company").limit(500).returns<Prof[]>(),
    sb.from("requests").select("client_id,status").neq("status", "done").limit(2000),
    sb.from("invoices").select("client_id,status").eq("status", "unpaid").limit(2000),
  ]);
  const tally = (rows: { client_id: string }[] | null, id: string) => (rows ?? []).filter((r) => r.client_id === id).length;
  return (
    <Shell me={me} active="/portal/admin/clients" title="Clients" error={error}>
      <div className="pcard"><h2>Add a client</h2>
        <p className="mu">Creates a verified client login. Share the password with the client privately.</p>
        <form className="pf prow" action={createClientAccount}>
          <div><label htmlFor="fn">Full name</label><input id="fn" name="full_name" required maxLength={100} /></div>
          <div><label htmlFor="em">Email</label><input id="em" name="email" type="email" required maxLength={150} /></div>
          <div><label htmlFor="co">Company</label><input id="co" name="company" maxLength={120} /></div>
          <div><label htmlFor="ph">Phone</label><input id="ph" name="phone" maxLength={40} /></div>
          <div><label htmlFor="ct">Country</label><input id="ct" name="country" maxLength={80} /></div>
          <div><label htmlFor="pw">Temporary password (min 10 characters)</label><input id="pw" name="password" type="text" required minLength={10} autoComplete="off" /></div>
          <div><button className="btn" type="submit">Create Client</button></div>
        </form></div>
      <div className="pcard"><h2>All clients ({profs.data?.length ?? 0})</h2>
        {!profs.data?.length ? <p className="mu">No clients yet.</p> : (
          <div className="scroll"><table className="pt"><thead><tr><th>Client</th><th>Email</th><th>Country</th><th>Open requests</th><th>Unpaid invoices</th><th /></tr></thead><tbody>
            {profs.data.map((p) => <tr key={p.id}><td>{who(p)}</td><td>{p.email}</td><td>{p.country}</td><td>{tally(reqs.data, p.id)}</td><td>{tally(invs.data, p.id)}</td><td><a href={`/portal/admin/clients/${p.id}`}>Open workspace</a></td></tr>)}
          </tbody></table></div>)}</div>
    </Shell>
  );
}
export default function Page({ searchParams }: { searchParams: Promise<{ error?: string }> }) { return <Suspense fallback={<p className="mu" style={{ padding: 40 }}>Loading...</p>}><Content sp={searchParams} /></Suspense>; }
