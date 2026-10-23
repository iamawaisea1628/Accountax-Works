# Accountax site: Next.js App Router files

Assumes a Next.js App Router + TypeScript repo with NO src/ folder (default create-next-app).
Extract this zip at the repo root. It overwrites:
- app/layout.tsx, app/page.tsx, app/globals.css
and adds: app/api/contact/route.ts, components/Header.tsx, components/ContactForm.tsx, components/data.ts, .env.example

If your repo uses src/, move app/ and components/ into src/ (imports are relative, so they keep working).

Env vars (Vercel > Settings > Environment Variables, and .env.local locally): see .env.example.
RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL (sender must be a verified Resend domain/address).

Not included: logo (temporary SVG in components/Header.tsx), privacy/terms/disclaimer pages, sitemap/robots/canonical (need final domain), rate limiting beyond a honeypot (add Cloudflare Turnstile before heavy traffic).
