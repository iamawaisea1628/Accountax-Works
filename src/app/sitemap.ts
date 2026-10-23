import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { getCountries, getCountryServices, getIndustries, getPillars, getServices } from "@/lib/content";

// Published, indexable pages only. Legal pages are noindex and excluded.
export default function sitemap(): MetadataRoute.Sitemap {
  const u = (p: string) => ({ url: `${site.url}${p}` });
  const countries = getCountries();
  const services = getServices();
  return [
    "/", "/services/", "/countries/", "/industries/", "/about/", "/contact/",
    ...getPillars().map((p) => `/services/${p.slug}/`),
    ...services.flatMap((s) => { const p = getPillars().find((x) => x.id === s.pillarId); return p ? [`/services/${p.slug}/${s.slug}/`] : []; }),
    ...countries.map((c) => `/countries/${c.slug}/`),
    ...getCountryServices().flatMap((cs) => { const c = countries.find((x) => x.id === cs.countryId); const s = services.find((x) => x.id === cs.serviceId); return c && s ? [`/countries/${c.slug}/${s.slug}/`] : []; }),
    ...getIndustries().map((i) => `/industries/${i.slug}/`),
  ].map(u);
}
