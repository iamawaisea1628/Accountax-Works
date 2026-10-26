// Email via Resend. Silent no-op until RESEND_API_KEY and CONTACT_FROM_EMAIL are set. Emails never contain file contents or message text.
export const portalUrl = (p = "/portal") => `${process.env.NEXT_PUBLIC_SITE_URL || "https://accountaxworks.vercel.app"}${p}`;

export async function notify(to: string | null | undefined, subject: string, text: string) {
  const key = process.env.RESEND_API_KEY, from = process.env.CONTACT_FROM_EMAIL;
  if (!key || !from || !to) return;
  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to: [to], subject: subject.replace(/[\r\n]/g, " ").slice(0, 150), text }),
    });
  } catch { /* a failed email must never block the portal action */ }
}
