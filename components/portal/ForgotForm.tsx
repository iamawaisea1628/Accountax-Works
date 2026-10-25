"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { supabaseBrowser } from "../../lib/supabase/browser";

export default function ForgotForm() {
  const bad = useSearchParams().get("error") === "link";
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const ready = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!ready) return;
    const email = String(new FormData(e.currentTarget).get("email")).trim();
    setBusy(true);
    await supabaseBrowser().auth.resetPasswordForEmail(email); // same message either way: never reveal which emails have accounts
    setBusy(false); setDone(true);
  }

  return (
    <form className="pf" onSubmit={onSubmit} style={{ gridTemplateColumns: "1fr" }}>
      {bad && <p className="pmsg" style={{ color: "#e08a7d" }}>That link has expired or was already used. Request a new one below.</p>}
      <div><label htmlFor="fe">Email</label><input id="fe" name="email" type="email" required autoComplete="email" /></div>
      <button className="btn" type="submit" disabled={busy || done}>{busy ? "Sending..." : "Send Reset Link"}</button>
      <p className="pmsg" role="status" style={{ color: "var(--g)" }}>{done ? "If that email has a portal account, a reset link is on its way." : ""}</p>
      <a href="/portal/login" className="mu">Back to sign in</a>
    </form>
  );
}
