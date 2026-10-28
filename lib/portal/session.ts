import { cache } from "react";
import { redirect } from "next/navigation";
import { supabaseServer } from "../supabase/server";

export type Me = { id: string; email: string | null; full_name: string | null; company: string | null; role: "client" | "staff" };

export const getCtx = cache(async () => {
  const sb = await supabaseServer();
  const { data: { user } } = await sb.auth.getUser();
  if (!user) redirect("/portal/login");
  const { data } = await sb.from("profiles").select("id,email,full_name,company,role").eq("id", user.id).maybeSingle<Me>();
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
