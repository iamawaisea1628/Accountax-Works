// Needs env vars: RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL (verified Resend sender)

const clean = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(req: Request) {
  const { RESEND_API_KEY: key, CONTACT_TO_EMAIL: to, CONTACT_FROM_EMAIL: from } = process.env;
  if (!key || !to || !from) return Response.json({ error: "not_configured" }, { status: 503 });

  let b: Record<string, unknown>;
  try { b = await req.json(); } catch { return Response.json({ error: "bad_request" }, { status: 400 }); }

  if (clean(b.website, 50)) return Response.json({ ok: true }); // honeypot: pretend success, send nothing

  const name = clean(b.name, 100), email = clean(b.email, 150), message = clean(b.message, 3000);
  const jurisdiction = clean(b.jurisdiction, 80), company = clean(b.company, 120), service = clean(b.service, 120);
  if (!name || !message || !jurisdiction || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !b.consent)
    return Response.json({ error: "invalid" }, { status: 400 });

  const text = `Name: ${name}\nEmail: ${email}\nCompany: ${company}\nJurisdiction: ${jurisdiction}\nService: ${service}\n\n${message}`;
  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to: [to], reply_to: email, subject: `Consultation request: ${name}`.replace(/[\r\n]/g, " "), text }),
  });
  if (!r.ok) return Response.json({ error: "send_failed" }, { status: 502 });
  return Response.json({ ok: true });
}
