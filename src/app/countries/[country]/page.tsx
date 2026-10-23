import Link from "next/link";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { getCountries, getCountry, getCountryServicesFor, getServices } from "@/lib/content";
import { ButtonLink, CtaBand, PageHeader, Prose, Section, JsonLd, crumbsLd } from "@/components/ui";

export const dynamicParams = false;
export const generateStaticParams = () => getCountries().map((c) => ({ country: c.slug }));

export async function generateMetadata({ params }: { params: Promise<{ country: string }> }) {
  const c = getCountry((await params).country);
  return c ? buildMetadata({ title: c.seoTitle, description: c.metaDescription, path: `/countries/${c.slug}/` }) : {};
}

export default async function CountryPage({ params }: { params: Promise<{ country: string }> }) {
  const c = getCountry((await params).country);
  if (!c) notFound();
  const path = `/countries/${c.slug}/`;
  const available = getCountryServicesFor(c.id);
  const services = getServices();
  return (
    <>
      <JsonLd data={crumbsLd([{ name: "Home", path: "/" }, { name: "Countries & Regions", path: "/countries/" }, { name: c.countryName, path }])} />
      <PageHeader crumbs={[{ name: "Home", href: "/" }, { name: "Countries & Regions", href: "/countries/" }, { name: c.countryName }]} h1={c.h1}>
        <ButtonLink href="/contact/">{c.ctaLabel}</ButtonLink>
      </PageHeader>
      <Section tone="paper"><Prose paragraphs={c.body} /></Section>
      {available.length > 0 && (
        <Section heading={`Services for ${c.countryName}`}>
          <ul className="grid gap-4 sm:grid-cols-2">
            {available.map((cs) => {
              const s = services.find((x) => x.id === cs.serviceId);
              return s ? <li key={cs.id} className="border border-rule p-5"><h3 className="text-xl font-semibold"><Link href={`${path}${s.slug}/`}>{s.title}</Link></h3><p className="mt-2 text-stone">{cs.availabilitySummary}</p></li> : null;
            })}
          </ul>
        </Section>
      )}
      <Section>
        <p className="max-w-3xl text-sm text-stone">{c.generalDisclaimer}</p>
      </Section>
      <CtaBand heading={`Discuss your ${c.countryName}-related needs`} body="Share your business type and what you need. We will confirm whether it fits a currently available service." label={c.ctaLabel} />
    </>
  );
}
