"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "../../lib/supabase/browser";

export default function SetPasswordForm() {
  const router = useRouter();
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const pw = String(d.get("password")), again = String(d.get("again"));
    if (pw.length < 10) return setMsg("Use at least 10 characters.");
    if (pw !== again) return setMsg("The two passwords do not match.");
    setBusy(true); setMsg("");
    const { error } = await supabaseBrowser().auth.updateUser({ password: pw });
    setBusy(false);
    if (error) return setMsg("Could not set the password. Your link may have expired. Request a new one.");
    router.replace("/portal"); router.refresh();
  }

  return (
    <form className="pf" onSubmit={onSubmit} style={{ gridTemplateColumns: "1fr" }}>
      <div><label htmlFor="np">New password (at least 10 characters)</label><input id="np" name="password" type="password" required minLength={10} autoComplete="new-password" /></div>
      <div><label htmlFor="na">Repeat password</label><input id="na" name="again" type="password" required minLength={10} autoComplete="new-password" /></div>
      <button className="btn" type="submit" disabled={busy}>{busy ? "Saving..." : "Save Password"}</button>
      <p className="pmsg" role="status" style={{ color: "#e08a7d" }}>{msg}</p>
    </form>
  );
}
