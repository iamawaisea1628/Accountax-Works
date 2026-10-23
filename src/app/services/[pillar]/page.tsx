import Link from "next/link";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { getPillar, getPillars, getServicesForPillar } from "@/lib/content";
import { ButtonLink, CtaBand, Faq, PageHeader, Prose, Section, JsonLd, crumbsLd } from "@/components/ui";

export const dynamicParams = false;
export const generateStaticParams = () => getPillars().map((p) => ({ pillar: p.slug }));

export async function generateMetadata({ params }: { params: Promise<{ pillar: string }> }) {
  const p = getPillar((await params).pillar);
  if (!p) return {};
  return buildMetadata({ title: p.seoTitle, description: p.metaDescription, path: `/services/${p.slug}/` });
}

export default async function PillarPage({ params }: { params: Promise<{ pillar: string }> }) {
  const p = getPillar((await params).pillar);
  if (!p) notFound();
  const services = getServicesForPillar(p.id);
  const path = `/services/${p.slug}/`;
  return (
    <>
      <JsonLd data={crumbsLd([{ name: "Home", path: "/" }, { name: "Services", path: "/services/" }, { name: p.title, path }])} />
      <PageHeader crumbs={[{ name: "Home", href: "/" }, { name: "Services", href: "/services/" }, { name: p.title }]} h1={p.h1} intro={p.intro}>
        <ButtonLink href="/contact/">{p.ctaLabel}</ButtonLink>
      </PageHeader>
      {services.length > 0 && (
        <Section heading={`${p.title} services`} tone="paper">
          <ul className="grid gap-4 sm:grid-cols-2">
            {services.map((s) => (
              <li key={s.id} className="border border-rule p-5">
                <h3 className="text-xl font-semibold"><Link href={`${path}${s.slug}/`} className="underline-offset-4 hover:underline">{s.title}</Link></h3>
                <p className="mt-2 text-stone">{s.summary}</p>
              </li>
            ))}
          </ul>
        </Section>
      )}
      {p.sections.map((s, i) => (
        <Section key={s.heading} heading={s.heading} tone={i % 2 === 0 ? "light" : "paper"}><Prose paragraphs={s.body} /></Section>
      ))}
      {p.process && (
        <Section heading={p.process.heading} tone="dark">
          <ol className="max-w-3xl list-decimal space-y-3 pl-6 text-lg marker:text-gold">
            {p.process.steps.map((s) => <li key={s}>{s}</li>)}
          </ol>
        </Section>
      )}
      <Section heading="Common questions" tone="paper"><Faq items={p.faqs} /></Section>
      <CtaBand heading="Talk through your requirements" body="Tell us about your business and the country involved. We will confirm whether the work fits a currently available service." label={p.ctaLabel} />
    </>
  );
}
