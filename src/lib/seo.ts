import type { Metadata } from "next";
import { site } from "@/content/site";

export function buildMetadata(o: { title: string; description: string; path: string; noindex?: boolean }): Metadata {
  const url = `${site.url}${o.path}`;
  return {
    title: { absolute: o.title },
    description: o.description,
    alternates: { canonical: url },
    robots: o.noindex ? { index: false, follow: false } : undefined,
    openGraph: { title: o.title, description: o.description, url, siteName: "Accountax", type: "website" },
  };
}
