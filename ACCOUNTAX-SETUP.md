# Accountax homepage (Next.js App Router)

Assumes Next.js App Router + TypeScript, NO src/ folder. Extract this zip at the repo root.
It overwrites: app/layout.tsx, app/page.tsx, app/globals.css
It adds: app/api/contact/route.ts, components/*, public/images/README.txt, .env.example
If your repo uses src/, move app/ and components/ into src/ (imports are relative).

## Images
Put your images in public/images/ using the exact .webp file names listed in public/images/README.txt.
No code change needed: a labelled placeholder shows until the file exists.

## Env vars (Vercel + .env.local), see .env.example
RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL (verified sender). Missing = form says "not connected", sends nothing.
Optional: NEXT_PUBLIC_CONTACT_EMAIL, NEXT_PUBLIC_WHATSAPP.

## Not yet built
Detail pages (about, 6 service pages, industries, how-we-work, insights, careers, legal), logo (temporary SVG in components/Header.tsx),
sitemap/robots/canonical (need final domain), rate limiting beyond honeypot (add Cloudflare Turnstile).
Service and industry cards link to #contact until their detail pages exist.
