"use client";
import { useState } from "react";
import Script from "next/script";
import { BUSINESS_TYPES, CONTACT_METHODS, COUNTRY_OPTIONS, SERVICE_AREAS, TIMEFRAMES, contactSchema } from "@/lib/contact-schema";
import { site } from "@/content/site";

type Errors = Record<string, string>;
const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
const field = "mt-1 w-full border border-stone bg-white px-3 py-2.5 text-base text-ink";
const label = "block text-sm font-semibold";

function Field({ id, text, required, error, children }: { id: string; text: string; required?: boolean; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className={label}>{text}{required ? <span className="text-gold-deep"> (required)</span> : null}</label>
      {children}
      {error && <p id={`${id}-err`} className="mt-1 text-sm font-medium text-red-800">{error}</p>}
    </div>
  );
}

export function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [message, setMessage] = useState("");
  function attribution() {
    const q = new URLSearchParams(window.location.search);
    let sourcePage = "direct";
    try { if (document.referrer) sourcePage = new URL(document.referrer).pathname; } catch { /* keep default */ }
    return { sourcePage, utmSource: q.get("utm_source") ?? "", utmMedium: q.get("utm_medium") ?? "", utmCampaign: q.get("utm_campaign") ?? "" };
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const raw: Record<string, unknown> = Object.fromEntries(fd.entries());
    raw.consent = fd.get("consent") === "on";
    raw.turnstileToken = fd.get("cf-turnstile-response") ?? "";
    Object.assign(raw, attribution());
    const parsed = contactSchema.safeParse(raw);
    if (!parsed.success) {
      const errs: Errors = {};
      for (const i of parsed.error.issues) errs[String(i.path[0])] ??= i.message;
      setErrors(errs);
      setStatus("idle");
      document.getElementById(Object.keys(errs)[0])?.focus();
      return;
    }
    setErrors({});
    setStatus("sending");
    try {
      const res = await fetch("/api/contact/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(parsed.data) });
      const data = await res.json().catch(() => ({}));
      if (res.ok) { setStatus("done"); return; }
      setMessage(data.error ?? "Something went wrong. Please try again.");
      setStatus("error");
    } catch {
      setMessage(`Network error. Please try again or email ${site.email}.`);
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div role="status" className="border-l-4 border-gold bg-white p-6">
        <h2 className="text-2xl font-semibold">Thank you for contacting Accountax.</h2>
        <p className="mt-3 text-stone">Your enquiry has been submitted. The team will review the information and follow up if the request matches an available service.</p>
      </div>
    );
  }

  const aria = (id: string) => ({ "aria-invalid": errors[id] ? true : undefined, "aria-describedby": errors[id] ? `${id}-err` : undefined });

  return (
    <form onSubmit={onSubmit} noValidate className="grid max-w-2xl gap-5">
      {siteKey && <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer />}
      <p className="border-l-4 border-gold bg-white p-4 text-sm">Please do not include passwords, identity documents, bank statements, tax records, or other sensitive financial information in this form.</p>
      <Field id="name" text="Name" required error={errors.name}><input id="name" name="name" autoComplete="name" className={field} {...aria("name")} /></Field>
      <Field id="email" text="Work email" required error={errors.email}><input id="email" name="email" type="email" autoComplete="email" className={field} {...aria("email")} /></Field>
      <Field id="country" text="Country or countries relevant to the enquiry" required error={errors.country}>
        <select id="country" name="country" defaultValue="" className={field} {...aria("country")}><option value="" disabled>Select</option>{COUNTRY_OPTIONS.map((o) => <option key={o}>{o}</option>)}</select>
      </Field>
      <Field id="businessType" text="Business type" required error={errors.businessType}>
        <select id="businessType" name="businessType" defaultValue="" className={field} {...aria("businessType")}><option value="" disabled>Select</option>{BUSINESS_TYPES.map((o) => <option key={o}>{o}</option>)}</select>
      </Field>
      <Field id="serviceArea" text="Service area" required error={errors.serviceArea}>
        <select id="serviceArea" name="serviceArea" defaultValue="" className={field} {...aria("serviceArea")}><option value="" disabled>Select</option>{SERVICE_AREAS.map((o) => <option key={o}>{o}</option>)}</select>
      </Field>
      <Field id="message" text="Short description of the requirement" required error={errors.message}>
        <textarea id="message" name="message" rows={6} className={field} {...aria("message")} />
      </Field>
      <fieldset className="grid gap-5 border-t border-rule pt-5">
        <legend className="text-sm font-semibold text-stone">Optional details</legend>
        <Field id="company" text="Company name"><input id="company" name="company" autoComplete="organization" className={field} /></Field>
        <Field id="website" text="Website" error={errors.website}><input id="website" name="website" inputMode="url" autoComplete="url" className={field} /></Field>
        <Field id="timeframe" text="Approximate project timeframe"><select id="timeframe" name="timeframe" defaultValue="" className={field}><option value="">No preference</option>{TIMEFRAMES.map((o) => <option key={o}>{o}</option>)}</select></Field>
        <Field id="preferredContact" text="Preferred contact method"><select id="preferredContact" name="preferredContact" defaultValue="" className={field}><option value="">No preference</option>{CONTACT_METHODS.map((o) => <option key={o}>{o}</option>)}</select></Field>
        <Field id="phone" text="Phone number (only if you prefer a call)"><input id="phone" name="phone" type="tel" autoComplete="tel" className={field} /></Field>
        <Field id="preferredTime" text="Preferred contact time (include your time zone)"><input id="preferredTime" name="preferredTime" className={field} /></Field>
      </fieldset>
      {/* Honeypot: hidden from people and assistive tech */}
      <div aria-hidden="true" className="absolute -left-[9999px]"><label>Leave this empty<input name="contactRef" tabIndex={-1} autoComplete="off" /></label></div>
      {siteKey && <div className="cf-turnstile" data-sitekey={siteKey} />}
      <div>
        <label className="flex items-start gap-3 text-sm">
          <input id="consent" name="consent" type="checkbox" className="mt-1 h-5 w-5 accent-ink" {...aria("consent")} />
          <span>I have read the <a href="/privacy/" className="underline underline-offset-4">privacy notice</a> and agree that Accountax may use these details to respond to my enquiry.</span>
        </label>
        {errors.consent && <p id="consent-err" className="mt-1 text-sm font-medium text-red-800">{errors.consent}</p>}
      </div>
      <div aria-live="polite">{status === "error" && <p role="alert" className="font-medium text-red-800">{message}</p>}</div>
      <button type="submit" disabled={status === "sending"} className="min-h-11 bg-ink px-6 py-3 font-semibold text-white hover:bg-graphite disabled:opacity-60">
        {status === "sending" ? "Sending…" : "Request a Consultation"}
      </button>
    </form>
  );
}
