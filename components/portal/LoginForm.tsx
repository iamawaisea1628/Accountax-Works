"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "../../lib/supabase/browser";

export default function LoginForm() {
  const router = useRouter();
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);
  const ready = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!ready) { setMsg("The client portal is not configured yet."); return; }
    const d = new FormData(e.currentTarget);
    setBusy(true); setMsg("");
    const { error } = await supabaseBrowser().auth.signInWithPassword({ email: String(d.get("email")).trim(), password: String(d.get("password")) });
    setBusy(false);
    if (error) { setMsg("Email or password is incorrect."); return; }
    router.replace("/portal"); router.refresh();
  }

  return (
    <form className="pf" onSubmit={onSubmit} style={{ gridTemplateColumns: "1fr" }}>
      <div><label htmlFor="le">Email</label><input id="le" name="email" type="email" required autoComplete="email" /></div>
      <div><label htmlFor="lp">Password</label><input id="lp" name="password" type="password" required autoComplete="current-password" /></div>
      <button className="btn" type="submit" disabled={busy}>{busy ? "Signing in..." : "Sign In"}</button>
      <p className="pmsg" role="status" style={{ color: "#e08a7d" }}>{msg}</p>
    </form>
  );
}
