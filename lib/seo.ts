import type { Metadata } from "next";
import { SITE } from "../content/site";

// One place for page metadata: title, description, canonical URL, Open Graph and Twitter cards.
export const pageMeta = (title: string, description: string, path: string, opts: { type?: "website" | "article"; index?: boolean } = {}): Metadata => ({
  title,
  description,
  alternates: { canonical: path },
  openGraph: { title, description, url: path, siteName: SITE.name, locale: "en_US", type: opts.type ?? "website", images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: `${SITE.name}: accounting, taxation, advisory, finance, analytics and fintech` }] },
  twitter: { card: "summary_large_image", title, description, images: ["/twitter-image"] },
  ...(opts.index === false ? { robots: { index: false, follow: true } } : {}),
});
