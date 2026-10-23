import type { Metadata } from "next";
import { site } from "@/content/site";

export function buildMetadata(o: { title: string; description: string; path: string; noindex?: boolean }): Metadata {
  const url = `${site.url}${o.path}`;
  return {
    title: { absolute: o.title },
    description: o.description,
    alternates: { canonical: url },
    robots: o.noindex ? { index: false, follow: false } : undefined,
    openGraph: { title: o.title, description: o.description, url, siteName: "Accountax", type: "website", images: [{ url: `${site.url}/og/`, width: 1200, height: 630, alt: "Accountax" }] },
    twitter: { card: "summary_large_image", title: o.title, description: o.description, images: [`${site.url}/og/`] },
  };
}
