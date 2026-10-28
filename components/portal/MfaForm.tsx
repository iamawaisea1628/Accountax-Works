"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "../../lib/supabase/browser";

type Mode = "loading" | "verify" | "enroll" | "scan";

export default function MfaForm() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("loading");
  const [factorId, setFactorId] = useState("");
  const [qr, setQr] = useState("");
  const [secret, setSecret] = useState("");
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await supabaseBrowser().auth.mfa.listFactors();
      const f = data?.totp?.[0];
      if (f) { setFactorId(f.id); setMode("verify"); } else setMode("enroll");
    })();
  }, []);

  async function start() {
    setBusy(true); setMsg("");
    const sb = supabaseBrowser();
    const { data: l } = await sb.auth.mfa.listFactors();
    for (const f of l?.all ?? []) if (f.status === "unverified") await sb.auth.mfa.unenroll({ factorId: f.id });
    const { data, error } = await sb.auth.mfa.enroll({ factorType: "totp", friendlyName: "Accountax portal" });
    setBusy(false);
    if (error || !data) { setMsg("Could not start setup. Check that two-factor (TOTP) is enabled in Supabase."); return; }
    setFactorId(data.id); setQr(data.totp.qr_code); setSecret(data.totp.secret); setMode("scan");
  }

  async function verify(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const code = String(new FormData(e.currentTarget).get("code")).replace(/\s/g, "");
    setBusy(true); setMsg("");
    const { error } = await supabaseBrowser().auth.mfa.challengeAndVerify({ factorId, code });
    setBusy(false);
    if (error) { setMsg("That code is not valid. Use the newest code from your authenticator app."); return; }
    router.replace("/portal"); router.refresh();
  }

  if (mode === "loading") return <p className="mu">Loading...</p>;
  if (mode === "enroll") return (
    <div className="pf" style={{ gridTemplateColumns: "1fr" }}>
      <p className="mu">Use an authenticator app such as Google Authenticator, Microsoft Authenticator or Authy.</p>
      <button className="btn" type="button" onClick={start} disabled={busy}>{busy ? "Starting..." : "Set Up Two-Factor"}</button>
      <p className="pmsg" role="status" style={{ color: "#e08a7d" }}>{msg}</p>
    </div>
  );
  return (
    <form className="pf" onSubmit={verify} style={{ gridTemplateColumns: "1fr" }}>
      {mode === "scan" && <>
        <p className="mu">Scan this code with your authenticator app, then enter the 6-digit code it shows.</p>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={qr} alt="Two-factor setup QR code" width={180} height={180} style={{ background: "#fff", padding: 8, borderRadius: 12 }} />
        <p className="mu" style={{ wordBreak: "break-all" }}>Cannot scan? Enter this key manually: <strong>{secret}</strong></p></>}
      <div><label htmlFor="mc">6-digit code</label><input id="mc" name="code" inputMode="numeric" autoComplete="one-time-code" required pattern="[0-9 ]{6,7}" /></div>
      <button className="btn" type="submit" disabled={busy}>{busy ? "Checking..." : "Verify"}</button>
      <p className="pmsg" role="status" style={{ color: "#e08a7d" }}>{msg}</p>
    </form>
  );
}
