"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getCtx } from "../../lib/portal/session";
import { supabaseAdmin } from "../../lib/supabase/admin";

const UUID = /^[0-9a-f-]{36}$/i;
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

export async function createClientAccount(f: FormData) {
  const ret = "/portal/admin/clients";
  await who(true);
  const email = txt(f, "email", 150).toLowerCase(), name = txt(f, "full_name", 100), password = String(f.get("password") ?? "");
  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) done(ret, "Enter a name and a valid email.");
  if (password.length < 10) done(ret, "Password must be at least 10 characters.");
  const admin = supabaseAdmin();
  if (!admin) done(ret, "Add SUPABASE_SERVICE_ROLE_KEY in Vercel (server-only) to create clients from here.");
  const { data, error } = await admin.auth.admin.createUser({ email, password, email_confirm: true, user_metadata: { full_name: name } });
  if (error || !data.user) done(ret, "Could not create the client. The email may already exist.");
  await admin.from("profiles").update({ full_name: name, company: txt(f, "company", 120) || null, phone: txt(f, "phone", 40) || null, country: txt(f, "country", 80) || null }).eq("id", data.user.id);
  done(`/portal/admin/clients/${data.user.id}`);
}

export async function createRequest(f: FormData) {
  const ret = txt(f, "returnTo"); const { sb, me } = await who(true);
  const client_id = txt(f, "client_id"), title = txt(f, "title", 200);
  if (!UUID.test(client_id) || !title) done(ret, "Enter a title for the request.");
  const { error } = await sb.from("requests").insert({ client_id, title, details: txt(f, "details", 2000) || null, due_date: txt(f, "due_date") || null, created_by: me.id });
  done(ret, error ? "Could not create the request." : undefined);
}

export async function setRequestStatus(f: FormData) {
  const ret = txt(f, "returnTo"); const { sb, me } = await who();
  const id = txt(f, "id"), status = txt(f, "status");
  if (!UUID.test(id) || !["open", "submitted", "done"].includes(status) || (me.role === "client" && status !== "submitted")) done(ret, "Invalid request.");
  const { error } = await sb.from("requests").update({ status }).eq("id", id);
  done(ret, error ? "Could not update the request." : undefined);
}

export async function createInvoice(f: FormData) {
  const ret = txt(f, "returnTo"); const { sb, me } = await who(true);
  const client_id = txt(f, "client_id"), number = txt(f, "number", 40), amount = Number(txt(f, "amount", 20));
  if (!UUID.test(client_id) || !number || !(amount > 0)) done(ret, "Enter an invoice number and an amount above zero.");
  const { error } = await sb.from("invoices").insert({ client_id, number, description: txt(f, "description", 300) || null, amount, currency: (txt(f, "currency", 3) || "PKR").toUpperCase(), due_date: txt(f, "due_date") || null, created_by: me.id });
  done(ret, error ? "Could not create the invoice (is the number already used?)." : undefined);
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
  const client_id = me.role === "client" ? me.id : txt(f, "client_id"), body = txt(f, "body", 4000);
  if (!UUID.test(client_id) || !body) done(ret, "Write a message first.");
  const { error } = await sb.from("messages").insert({ client_id, sender_id: me.id, body });
  done(ret, error ? "Could not send the message." : undefined);
}
