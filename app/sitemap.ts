import type { MetadataRoute } from "next";
import { SERVICES } from "../content/services";
import { ARTICLES } from "../content/pages";
import { SITE } from "../content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const fixed = ["/", "/about/", "/services/", "/industries/", "/how-we-work/", "/insights/", "/contact/", "/careers/", "/privacy-policy/", "/terms-of-use/", "/professional-disclaimer/", "/cookie-policy/"];
  const paths = [...fixed, ...SERVICES.map((s) => `/services/${s.slug}/`), ...ARTICLES.map((a) => `/insights/${a.slug}/`)];
  return paths.map((p) => ({ url: `${SITE.url}${p}` }));
}
