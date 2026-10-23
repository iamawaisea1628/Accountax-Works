import { pillars } from "@/content/pillars";
import { countries } from "@/content/countries";
import { industries } from "@/content/industries";
import { services, countryServices } from "@/content/services";
import { insights } from "@/content/insights";

const pub = <T extends { status: string }>(xs: T[]) => xs.filter((x) => x.status === "published");

export const getPillars = () => pub(pillars).sort((a, b) => a.order - b.order);
export const getPillar = (slug: string) => getPillars().find((p) => p.slug === slug);
export const getCountries = () => pub(countries);
export const getCountry = (slug: string) => getCountries().find((c) => c.slug === slug);
export const getIndustries = () => pub(industries);
export const getIndustry = (slug: string) => getIndustries().find((i) => i.slug === slug);
export const getServices = () => pub(services);
export const getServicesForPillar = (pillarId: string) => getServices().filter((s) => s.pillarId === pillarId);
export const getService = (pillarSlug: string, slug: string) => {
  const p = getPillar(pillarSlug);
  return p ? getServices().find((s) => s.pillarId === p.id && s.slug === slug) : undefined;
};
export const getCountryServices = () => pub(countryServices);
export const getCountryServicesFor = (countryId: string) => getCountryServices().filter((cs) => cs.countryId === countryId);
export const getCountryService = (countrySlug: string, serviceSlug: string) => {
  const c = getCountry(countrySlug);
  const s = getServices().find((x) => x.slug === serviceSlug);
  return c && s ? getCountryServices().find((cs) => cs.countryId === c.id && cs.serviceId === s.id) : undefined;
};
export const getInsights = () => pub(insights).sort((a, b) => (b.publishedAt ?? "").localeCompare(a.publishedAt ?? ""));
export const getInsight = (slug: string) => getInsights().find((i) => i.slug === slug);
