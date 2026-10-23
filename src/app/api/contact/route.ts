import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/contact-schema";
import { site } from "@/content/site";

// In-memory limiter: best-effort only (per server instance). Replace with a shared store
// (e.g. Upstash Redis) before relying on it at scale. Cloudflare Turnstile is the main spam control.
const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;

function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) for (const [k, v] of hits) if (!v.some((t) => now - t < WINDOW_MS)) hits.delete(k);
  return recent.length > MAX_HITS;
}

async function turnstileOk(token: string | undefined, ip: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // not configured
  if (!token) return false;
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: new URLSearchParams({ secret, response: token, remoteip: ip }),
  });
  const data = (await res.json()) as { success?: boolean };
  return data.success === true;
}

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (Number(req.headers.get("content-length") ?? 0) > 20_000) return NextResponse.json({ error: "Request too large." }, { status: 413 });
  if (limited(ip)) return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });

  let body: unknown;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Invalid request." }, { status: 400 }); }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Please check the form and try again.", fields: parsed.error.flatten().fieldErrors }, { status: 400 });
  }
  const d = parsed.data;
  if (d.contactRef) return NextResponse.json({ ok: true }); // honeypot: pretend success
  if (!(await turnstileOk(d.turnstileToken || undefined, ip))) {
    return NextResponse.json({ error: "Spam check failed. Please reload and try again." }, { status: 400 });
  }

  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || site.email;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!key || !from) {
    if (process.env.NODE_ENV !== "production") {
      console.log("[contact] email provider not configured; enquiry validated (dev only, contents not logged).");
      return NextResponse.json({ ok: true, dev: true });
    }
    console.error("[contact] RESEND_API_KEY / CONTACT_FROM_EMAIL not configured.");
    return NextResponse.json({ error: `The form is temporarily unavailable. Please email ${site.email}.` }, { status: 503 });
  }

  const rows: [string, string | undefined][] = [
    ["Name", d.name], ["Email", d.email], ["Country", d.country], ["Business type", d.businessType], ["Service area", d.serviceArea],
    ["Company", d.company], ["Website", d.website], ["Preferred contact", d.preferredContact], ["Phone", d.phone],
    ["Timeframe", d.timeframe], ["Preferred time", d.preferredTime], ["Source page", d.sourcePage],
    ["UTM source", d.utmSource], ["UTM medium", d.utmMedium], ["UTM campaign", d.utmCampaign],
    ["Submitted", new Date().toISOString()], ["Message", d.message],
  ];
  const html = `<table cellpadding="6">${rows.filter(([, v]) => v).map(([k, v]) => `<tr><td><b>${k}</b></td><td>${esc(v!).replace(/\n/g, "<br>")}</td></tr>`).join("")}</table>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to: [to], reply_to: d.email, subject: `Accountax enquiry: ${d.serviceArea} (${d.country})`, html }),
  });
  if (!res.ok) {
    console.error("[contact] email provider error", res.status);
    return NextResponse.json({ error: `We could not send your enquiry. Please email ${site.email}.` }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
