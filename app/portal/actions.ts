"use server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getCtx } from "../../lib/portal/session";
import { supabaseAdmin } from "../../lib/supabase/admin";
import { notify, portalUrl } from "../../lib/portal/notify";

const UUID = /^[0-9a-f-]{36}$/i;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CLIENT_TYPES = ["company", "individual", "sole_proprietor", "partnership", "non_profit", "other"];
const txt = (f: FormData, k: string, max = 500) => String(f.get(k) ?? "").trim().slice(0, max);
const safe = (p: string) => (/^\/portal[a-z0-9/_?=&.-]*$/i.test(p) ? p : "/portal");

function done(ret: string, err?: string): never {
  const base = safe(ret).replace(/[?&]error=[^&]*/, "");
  if (err) redirect(`${base}${base.includes("?") ? "&" : "?"}error=${encodeURIComponent(err)}`);
  revalidatePath(base.split("?")[0]);
  redirect(base);
}
async function who(staffOnly = false) {
  const { sb, me } = await getCtx();
  if (!me) redirect("/portal/not-ready");
  if (staffOnly && me.role !== "staff") redirect("/portal");
  return { sb, me };
}
type SB = Awaited<ReturnType<typeof getCtx>>["sb"];
const managerOf = (role: string | null) => role === "owner" || role === "manager";
const staffInbox = () => process.env.CONTACT_TO_EMAIL;

// The organization a client user is currently working in (cookie, verified against their memberships).
async function clientOrgId(sb: SB) {
  const { data } = await sb.from("organizations").select("id").order("name").returns<{ id: string }[]>();
  const want = (await cookies()).get("portal_org")?.value;
  return (data ?? []).find((o) => o.id === want)?.id ?? data?.[0]?.id ?? "";
}
async function orgEmails(sb: SB, org: string) {
  const { data } = await sb.from("org_members").select("member_role, profiles(email)").eq("org_id", org).in("member_role", ["admin", "member"]).returns<{ profiles: { email: string | null } | null }[]>();
  return (data ?? []).map((r) => r.profiles?.email).filter((e): e is string => !!e);
}
const notifyOrg = async (sb: SB, org: string, subject: string, text: string) => {
  await Promise.all((await orgEmails(sb, org)).map((e) => notify(e, subject, text)));
};

export async function switchOrg(f: FormData) {
  const { sb } = await who();
  const org = txt(f, "org");
  const { data } = UUID.test(org) ? await sb.from("organizations").select("id").eq("id", org).maybeSingle() : { data: null };
  if (data) (await cookies()).set("portal_org", org, { httpOnly: true, sameSite: "lax", secure: true, path: "/portal" });
  done(txt(f, "returnTo") || "/portal");
}

// Creates the login (password or invitation email). Needs SUPABASE_SERVICE_ROLE_KEY.
async function makeUser(email: string, name: string, password: string, firmId: string | null) {
  const admin = supabaseAdmin();
  if (!admin) return { admin: null, id: null, error: "Add SUPABASE_SERVICE_ROLE_KEY in Vercel (server-only) to create logins from here." };
  const { data, error } = password
    ? await admin.auth.admin.createUser({ email, password, email_confirm: true, user_metadata: { full_name: name } })
    : await admin.auth.admin.inviteUserByEmail(email, { data: { full_name: name }, redirectTo: portalUrl("/portal/set-password") });
  if (error || !data.user) return { admin, id: null, error: "Could not create the login. The email may already exist." };
  await admin.from("profiles").update({ full_name: name, firm_id: firmId }).eq("id", data.user.id);
  return { admin, id: data.user.id, error: null };
}

export async function createClientAccount(f: FormData) {
  const ret = "/portal/admin/clients";
  const { me } = await who(true);
  if (!managerOf(me.staff_role)) done(ret, "Only owners and managers can add clients.");
  const orgName = txt(f, "org_name", 120), name = txt(f, "full_name", 100), email = txt(f, "email", 150).toLowerCase(), password = String(f.get("password") ?? "");
  const type = CLIENT_TYPES.includes(txt(f, "client_type")) ? txt(f, "client_type") : "company";
  if (!orgName || !name || !EMAIL.test(email)) done(ret, "Enter the client name, a contact name and a valid email.");
  if (password && password.length < 10) done(ret, "Password must be at least 10 characters, or leave it blank to email an invitation.");
  const u = await makeUser(email, name, password, me.firm_id);
  if (u.error || !u.admin || !u.id) done(ret, u.error ?? "Could not create the client.");
  const country = txt(f, "country", 80) || null, phone = txt(f, "phone", 40) || null;
  const { data: org, error } = await u.admin.from("organizations").insert({ firm_id: me.firm_id, name: orgName, client_type: type, country, email, phone }).select("id").single();
  if (error || !org) done(ret, "The login was created but the client record failed. Please contact support before retrying.");
  await u.admin.from("org_members").insert({ org_id: org.id, user_id: u.id, member_role: "admin" });
  await u.admin.from("profiles").update({ company: orgName, phone, country }).eq("id", u.id);
  done(`/portal/admin/clients/${org.id}`);
}

export async function addOrgMember(f: FormData) {
  const ret = txt(f, "returnTo"); const { sb, me } = await who(true);
  if (!managerOf(me.staff_role)) done(ret, "Only owners and managers can add team members.");
  const org = txt(f, "org_id"), name = txt(f, "full_name", 100), email = txt(f, "email", 150).toLowerCase(), password = String(f.get("password") ?? "");
  const role = ["admin", "member", "viewer"].includes(txt(f, "member_role")) ? txt(f, "member_role") : "member";
  if (!UUID.test(org) || !name || !EMAIL.test(email)) done(ret, "Enter a name and a valid email.");
  if (password && password.length < 10) done(ret, "Password must be at least 10 characters, or leave it blank to email an invitation.");
  const { data: ok } = await sb.from("organizations").select("id").eq("id", org).maybeSingle(); // RLS: must be an org you manage
  if (!ok) done(ret, "Client not found.");
  const u = await makeUser(email, name, password, me.firm_id);
  if (u.error || !u.admin || !u.id) done(ret, u.error ?? "Could not add the team member.");
  await u.admin.from("org_members").insert({ org_id: org, user_id: u.id, member_role: role });
  done(ret);
}

export async function assignStaff(f: FormData) {
  const ret = txt(f, "returnTo"); const { sb } = await who(true);
  const org_id = txt(f, "org_id"), staff_id = txt(f, "staff_id");
  if (!UUID.test(org_id) || !UUID.test(staff_id)) done(ret, "Choose a staff member.");
  const { error } = await sb.from("org_staff").insert({ org_id, staff_id });
  done(ret, error ? "Could not assign (already assigned, or you do not have permission)." : undefined);
}
export async function unassignStaff(f: FormData) {
  const ret = txt(f, "returnTo"); const { sb } = await who(true);
  const org_id = txt(f, "org_id"), staff_id = txt(f, "staff_id");
  if (!UUID.test(org_id) || !UUID.test(staff_id)) done(ret, "Invalid request.");
  const { error } = await sb.from("org_staff").delete().eq("org_id", org_id).eq("staff_id", staff_id);
  done(ret, error ? "Could not remove the assignment." : undefined);
}

export async function createRequest(f: FormData) {
  const ret = txt(f, "returnTo"); const { sb, me } = await who(true);
  const org_id = txt(f, "org_id"), title = txt(f, "title", 200);
  if (!UUID.test(org_id) || !title) done(ret, "Enter a title for the request.");
  const { error } = await sb.from("requests").insert({ org_id, title, details: txt(f, "details", 2000) || null, due_date: txt(f, "due_date") || null, created_by: me.id });
  if (error) done(ret, "Could not create the request.");
  await notifyOrg(sb, org_id, "New request in your Accountax portal", `Hello,\n\nAccountax has added a new request for you: "${title}".\n\nOpen your portal: ${portalUrl("/portal/requests")}\n\nAccountax Consultants`);
  done(ret);
}

export async function setRequestStatus(f: FormData) {
  const ret = txt(f, "returnTo"); const { sb, me } = await who();
  const id = txt(f, "id"), status = txt(f, "status");
  if (!UUID.test(id) || !["open", "submitted", "done"].includes(status) || (me.role === "client" && status !== "submitted")) done(ret, "Invalid request.");
  const { data, error } = await sb.from("requests").update({ status }).eq("id", id).select("org_id").maybeSingle<{ org_id: string }>();
  if (error || !data) done(ret, "Could not update the request.");
  if (me.role === "client" && status === "submitted") await notify(staffInbox(), `Request submitted by ${me.full_name || me.email}`, `A client marked a request as submitted.\n\nReview it: ${portalUrl(`/portal/admin/clients/${data.org_id}?tab=requests`)}`);
  done(ret);
}

export async function createInvoice(f: FormData) {
  const ret = txt(f, "returnTo"); const { sb, me } = await who(true);
  const org_id = txt(f, "org_id"), number = txt(f, "number", 40), amount = Number(txt(f, "amount", 20));
  if (!UUID.test(org_id) || !number || !(amount > 0)) done(ret, "Enter an invoice number and an amount above zero.");
  const { error } = await sb.from("invoices").insert({ org_id, number, description: txt(f, "description", 300) || null, amount, currency: (txt(f, "currency", 3) || "PKR").toUpperCase(), due_date: txt(f, "due_date") || null, created_by: me.id });
  if (error) done(ret, "Could not create the invoice (is the number already used?).");
  await notifyOrg(sb, org_id, `New invoice ${number} from Accountax`, `Hello,\n\nA new invoice (${number}) is available in your portal.\n\nView it: ${portalUrl("/portal/invoices")}\n\nAccountax Consultants`);
  done(ret);
}

export async function setInvoiceStatus(f: FormData) {
  const ret = txt(f, "returnTo"); const { sb } = await who(true);
  const id = txt(f, "id"), status = txt(f, "status");
  if (!UUID.test(id) || !["unpaid", "paid", "void"].includes(status)) done(ret, "Invalid invoice.");
  const { error } = await sb.from("invoices").update({ status }).eq("id", id);
  done(ret, error ? "Could not update the invoice." : undefined);
}

export async function sendMessage(f: FormData) {
  const ret = txt(f, "returnTo"); const { sb, me } = await who();
  const org_id = me.role === "client" ? await clientOrgId(sb) : txt(f, "org_id"), body = txt(f, "body", 4000);
  if (!UUID.test(org_id) || !body) done(ret, "Write a message first.");
  const { error } = await sb.from("messages").insert({ org_id, sender_id: me.id, body });
  if (error) done(ret, "Could not send the message.");
  if (me.role === "client") await notify(staffInbox(), `New message from ${me.full_name || me.email}`, `You have a new portal message.\n\nOpen it: ${portalUrl(`/portal/admin/clients/${org_id}?tab=messages`)}`);
  else await notifyOrg(sb, org_id, "New message from Accountax", `Hello,\n\nYou have a new message in your Accountax portal.\n\nRead it: ${portalUrl("/portal/messages")}\n\nAccountax Consultants`);
  done(ret);
}

export async function updateProfile(f: FormData) {
  const ret = "/portal/profile"; const { sb, me } = await who();
  const full_name = txt(f, "full_name", 100);
  if (!full_name) done(ret, "Enter your name.");
  const { error } = await sb.from("profiles").update({ full_name, company: txt(f, "company", 120) || null, phone: txt(f, "phone", 40) || null, country: txt(f, "country", 80) || null }).eq("id", me.id);
  if (error) done(ret, "Could not save your details.");
  done("/portal/profile?saved=1");
}
