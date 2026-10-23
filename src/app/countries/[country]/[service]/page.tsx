import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { getCountries, getCountry, getCountryService, getCountryServices, getServices } from "@/lib/content";
import { pillars } from "@/content/pillars";
import { CtaBand, Faq, PageHeader, Prose, Section } from "@/components/ui";

export const dynamicParams = false;
export const generateStaticParams = () =>
  getCountryServices().flatMap((cs) => {
    const c = getCountries().find((x) => x.id === cs.countryId);
    const s = getServices().find((x) => x.id === cs.serviceId);
    return c && s ? [{ country: c.slug, service: s.slug }] : [];
  });

type P = { params: Promise<{ country: string; service: string }> };

export async function generateMetadata({ params }: P) {
  const { country, service } = await params;
  const cs = getCountryService(country, service);
  return cs ? buildMetadata({ title: cs.seoTitle, description: cs.metaDescription, path: `/countries/${country}/${service}/` }) : {};
}

export default async function CountryServicePage({ params }: P) {
  const { country, service } = await params;
  const c = getCountry(country);
  const cs = getCountryService(country, service);
  const s = cs && getServices().find((x) => x.id === cs.serviceId);
  const p = s && pillars.find((x) => x.id === s.pillarId);
  if (!c || !cs || !s || !p) notFound();
  return (
    <>
      <PageHeader crumbs={[{ name: "Home", href: "/" }, { name: "Countries & Regions", href: "/countries/" }, { name: c.countryName, href: `/countries/${c.slug}/` }, { name: s.title }]} h1={cs.title} intro={cs.availabilitySummary} />
      {cs.bodySections.map((b, i) => <Section key={b.heading} heading={b.heading} tone={i % 2 ? "paper" : "light"}><Prose paragraphs={b.body} /></Section>)}
      <Section heading="Scope and limitations" tone="paper"><Prose paragraphs={[cs.scope, ...cs.exclusions]} /></Section>
      <Section heading="Common questions"><Faq items={cs.faqs} /></Section>
      {cs.lastReviewedAt && <Section><p className="text-sm text-stone">Last reviewed: {cs.lastReviewedAt}</p></Section>}
      <CtaBand heading="Discuss this service" body="Tell us about your business and what you need." />
    </>
  );
}
