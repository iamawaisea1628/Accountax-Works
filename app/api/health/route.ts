const REQUIRED = ["NEXT_PUBLIC_SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_ANON_KEY", "RESEND_API_KEY", "CONTACT_TO_EMAIL", "CONTACT_FROM_EMAIL"];

export function GET() {
  const missing = REQUIRED.filter((k) => !process.env[k]);
  return Response.json({ ok: missing.length === 0, missing }, { status: missing.length ? 503 : 200 });
}
