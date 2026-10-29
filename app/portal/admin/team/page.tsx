import { Suspense } from "react";
import Shell from "../../../../components/portal/Shell";
import { need } from "../../../../lib/portal/session";
import { inviteStaff, setStaffRole } from "../../actions";
import { STAFF_ROLES } from "../../../../lib/portal/format";

async function Content({ sp }: { sp: Promise<{ error?: string }> }) {
  const { error } = await sp;
  const { sb, me } = await need("staff");
  const { data } = await sb.from("profiles").select("id,full_name,email,staff_role").eq("role", "staff").order("email").returns<{ id: string; full_name: string | null; email: string | null; staff_role: string | null }[]>();
  const owner = me.staff_role === "owner";
  return (
    <Shell me={me} active="/portal/admin/team" title="Team" error={error}>
      <p className="mu">Owners and managers see every client. Accountants, analysts and read-only staff see only the clients assigned to them (assign on each client's Team tab). Read-only staff cannot change anything.</p>
      <div className="pcard"><h2>Staff ({data?.length ?? 0})</h2>
        <div className="scroll"><table className="pt"><thead><tr><th>Name</th><th>Email</th><th>Role</th>{owner && <th />}</tr></thead><tbody>
          {(data ?? []).map((s) => <tr key={s.id}><td>{s.full_name}</td><td>{s.email}</td><td>{STAFF_ROLES.find(([k]) => k === s.staff_role)?.[1]}</td>
            {owner && <td><form action={setStaffRole} className="row"><input type="hidden" name="staff_id" value={s.id} />
              <select name="staff_role" defaultValue={s.staff_role ?? "readonly"} aria-label="Role">{STAFF_ROLES.map(([k, l]) => <option key={k} value={k}>{l}</option>)}</select><button className="btn o sm2" type="submit">Save</button></form></td>}</tr>)}
        </tbody></table></div></div>
      {owner && <div className="pcard"><h2>Add a staff member</h2>
        <form className="pf prow" action={inviteStaff}>
          <div><label htmlFor="sn">Full name</label><input id="sn" name="full_name" required maxLength={100} /></div>
          <div><label htmlFor="se">Email</label><input id="se" name="email" type="email" required maxLength={150} /></div>
          <div><label htmlFor="sr">Role</label><select id="sr" name="staff_role" defaultValue="accountant">{STAFF_ROLES.map(([k, l]) => <option key={k} value={k}>{l}</option>)}</select></div>
          <div><label htmlFor="sp">Password (optional, min 10)</label><input id="sp" name="password" type="text" minLength={10} autoComplete="off" placeholder="Blank = email an invitation" /></div>
          <div><button className="btn" type="submit">Add Staff Member</button></div></form></div>}
    </Shell>
  );
}
export default function Page({ searchParams }: { searchParams: Promise<{ error?: string }> }) { return <Suspense fallback={<p className="mu" style={{ padding: 40 }}>Loading...</p>}><Content sp={searchParams} /></Suspense>; }
