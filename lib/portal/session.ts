import { cache } from "react";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { supabaseServer } from "../supabase/server";

export type Me = { id: string; email: string | null; full_name: string | null; company: string | null; role: "client" | "staff"; firm_id: string | null; staff_role: string | null };
export type OrgRef = { id: string; name: string };

export const getCtx = cache(async () => {
  const sb = await supabaseServer();
  const { data: { user } } = await sb.auth.getUser();
  if (!user) redirect("/portal/login");
  const { data } = await sb.from("profiles").select("id,email,full_name,company,role,firm_id,staff_role").eq("id", user.id).maybeSingle<Me>();
  if (data?.role === "staff" && process.env.PORTAL_REQUIRE_STAFF_MFA === "true") {
    const { data: a } = await sb.auth.mfa.getAuthenticatorAssuranceLevel();
    if (a?.currentLevel !== "aal2") redirect("/portal/mfa"); // staff must complete two-factor
  }
  return { sb, user, me: data };
});

// Pages call this first: sends people to the right area for their role.
export async function need(role: "client" | "staff") {
  const c = await getCtx();
  if (!c.me) redirect("/portal/not-ready");
  if (c.me.role !== role) redirect(role === "staff" ? "/portal" : "/portal/admin");
  return { sb: c.sb, me: c.me };
}

// For pages both roles can open (profile, invoice view).
export async function needAny() {
  const c = await getCtx();
  if (!c.me) redirect("/portal/not-ready");
  return { sb: c.sb, me: c.me };
}

// Client pages: the signed-in client plus the organization they are currently working in.
export async function needClient() {
  const c = await getCtx();
  if (!c.me) redirect("/portal/not-ready");
  if (c.me.role !== "client") redirect("/portal/admin");
  const { data } = await c.sb.from("organizations").select("id,name").order("name").returns<OrgRef[]>();
  const orgs = data ?? [];
  const want = (await cookies()).get("portal_org")?.value;
  const org = orgs.find((o) => o.id === want) ?? orgs[0];
  if (!org) redirect("/portal/not-ready");
  return { sb: c.sb, me: c.me, orgs, org };
}
