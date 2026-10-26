const REQUIRED = ["NEXT_PUBLIC_SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_ANON_KEY", "RESEND_API_KEY", "CONTACT_TO_EMAIL", "CONTACT_FROM_EMAIL"];

// Shows which env vars are missing and which Supabase project the site is talking to (no secrets returned).
export async function GET() {
  const missing = REQUIRED.filter((k) => !process.env[k]);
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  let supabase: Record<string, unknown> = { configured: false };

  if (url && key) {
    let host = "invalid URL";
    try { host = new URL(url).host; } catch { /* keep default */ }
    let keyRole: string | null = null;
    try { keyRole = JSON.parse(Buffer.from(key.split(".")[1], "base64url").toString()).role ?? null; } catch { /* publishable keys are not JWTs */ }
    supabase = { host, keyRole, reachable: false };
    try {
      const r = await fetch(`${url.replace(/\/+$/, "")}/auth/v1/settings`, { headers: { apikey: key }, cache: "no-store", signal: AbortSignal.timeout(5000) });
      supabase = { ...supabase, reachable: r.ok, status: r.status };
      if (r.ok) {
        const s = await r.json();
        supabase = { ...supabase, emailLogin: s?.external?.email ?? null, signupsDisabled: s?.disable_signup ?? null };
      }
    } catch { /* reachable stays false */ }
    if (keyRole === "service_role") supabase = { ...supabase, warning: "SERVICE ROLE KEY IN A PUBLIC VARIABLE. Replace it with the anon key and rotate the key." };
  }
  return Response.json({ ok: missing.length === 0, missing, supabase }, { status: missing.length ? 503 : 200 });
}
