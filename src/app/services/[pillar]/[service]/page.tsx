import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { getPillar, getPillars, getService, getServicesForPillar } from "@/lib/content";
import { CtaBand, Faq, PageHeader, Prose, Section } from "@/components/ui";

export const dynamicParams = false;
export const generateStaticParams = () =>
  getPillars().flatMap((p) => getServicesForPillar(p.id).map((s) => ({ pillar: p.slug, service: s.slug })));

type P = { params: Promise<{ pillar: string; service: string }> };

export async function generateMetadata({ params }: P) {
  const { pillar, service } = await params;
  const s = getService(pillar, service);
  return s ? buildMetadata({ title: s.seoTitle, description: s.metaDescription, path: `/services/${pillar}/${s.slug}/` }) : {};
}

export default async function ServicePage({ params }: P) {
  const { pillar, service } = await params;
  const p = getPillar(pillar);
  const s = getService(pillar, service);
  if (!p || !s) notFound();
  return (
    <>
      <PageHeader crumbs={[{ name: "Home", href: "/" }, { name: "Services", href: "/services/" }, { name: p.title, href: `/services/${p.slug}/` }, { name: s.title }]} h1={s.title} intro={s.summary} />
      {s.bodySections.map((b, i) => <Section key={b.heading} heading={b.heading} tone={i % 2 ? "paper" : "light"}><Prose paragraphs={b.body} /></Section>)}
      <Section heading="What the service may include" tone="paper"><ul className="list-disc space-y-2 pl-6 text-lg">{s.deliverables.map((d) => <li key={d}>{d}</li>)}</ul></Section>
      <Section heading="Scope and limitations"><Prose paragraphs={[s.scope, ...s.exclusions]} /></Section>
      <Section heading="Common questions" tone="paper"><Faq items={s.faqs} /></Section>
      <CtaBand heading="Discuss this service" body="Tell us about your business and the country involved." />
    </>
  );
}
