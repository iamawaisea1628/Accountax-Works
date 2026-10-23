"use client";
import { useState } from "react";
import { S } from "./data";

export default function ContactForm() {
  const [msg, setMsg] = useState<{ t: string; ok: boolean }>({ t: "", ok: false });
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = e.currentTarget;
    if (!f.checkValidity()) {
      const bad = Array.from(f.elements).find((x) => (x as HTMLInputElement).validity && !(x as HTMLInputElement).validity.valid) as HTMLInputElement | undefined;
      setMsg({ t: "Please complete: " + (bad?.labels?.[0]?.textContent ?? "required field") + ".", ok: false });
      bad?.focus();
      return;
    }
    const d = new FormData(f);
    setBusy(true);
    try {
      const r = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(d.entries())),
      });
      if (r.ok) { setMsg({ t: "Thank you. Your enquiry has been received.", ok: true }); f.reset(); }
      else if (r.status === 503) setMsg({ t: "Enquiry form is not connected yet, so nothing was sent.", ok: false });
      else setMsg({ t: "Your enquiry could not be sent. Please check your details and try again.", ok: false });
    } catch {
      setMsg({ t: "Network error. Your enquiry was not sent. Please try again.", ok: false });
    }
    setBusy(false);
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <div><label htmlFor="n">Name</label><input id="n" name="name" required autoComplete="name" maxLength={100} /></div>
      <div><label htmlFor="e">Business email</label><input id="e" name="email" type="email" required autoComplete="email" maxLength={150} /></div>
      <div><label htmlFor="c">Company (optional)</label><input id="c" name="company" autoComplete="organization" maxLength={120} /></div>
      <div><label htmlFor="k">Country or jurisdiction</label><input id="k" name="jurisdiction" required maxLength={80} /></div>
      <div className="f"><label htmlFor="sv">Service of interest</label>
        <select id="sv" name="service"><option>Not sure yet</option>{S.map((x) => <option key={x[0]}>{x[0]}</option>)}</select></div>
      <div className="f"><label htmlFor="m">Your requirements</label><textarea id="m" name="message" required maxLength={3000} /></div>
      <input className="hp" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <div className="f chk"><input id="ok" name="consent" type="checkbox" required /><label htmlFor="ok" style={{ fontWeight: 400 }}>I agree that my details may be used to respond to this enquiry. Privacy policy is in preparation.</label></div>
      <div className="f">
        <button className="btn" type="submit" disabled={busy}>{busy ? "Sending..." : "Send Enquiry ✦"}</button>
        <p id="st" role="status" aria-live="polite" style={{ margin: "14px 0 0", color: msg.ok ? "var(--g)" : "#e08a7d" }}>{msg.t}</p>
      </div>
    </form>
  );
}
