import Link from "next/link";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { getInsight, getInsights } from "@/lib/content";
import { pillars } from "@/content/pillars";
import { site } from "@/content/site";
import { CtaBand, JsonLd, PageHeader, Prose, Section, crumbsLd } from "@/components/ui";

export const dynamicParams = false;
// Next requires at least one param to build a dynamic route; with none published the route simply isn't generated.
export const generateStaticParams = () => getInsights().map((a) => ({ slug: a.slug }));

type P = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: P) {
  const a = getInsight((await params).slug);
  return a ? buildMetadata({ title: a.seoTitle, description: a.metaDescription, path: `/insights/${a.slug}/` }) : {};
}

export default async function Article({ params }: P) {
  const a = getInsight((await params).slug);
  if (!a) notFound();
  const pillar = a.pillarId ? pillars.find((p) => p.id === a.pillarId) : null;
  const path = `/insights/${a.slug}/`;
  const ld: Record<string, unknown> = {
    "@context": "https://schema.org", "@type": "Article", headline: a.h1, description: a.metaDescription,
    mainEntityOfPage: `${site.url}${path}`, publisher: { "@type": "Organization", name: "Accountax", url: site.url },
  };
  if (a.publishedAt) ld.datePublished = a.publishedAt;
  if (a.lastReviewedAt) ld.dateModified = a.lastReviewedAt;
  if (a.author) ld.author = { "@type": "Person", name: a.author };
  return (
    <>
      <JsonLd data={ld} />
      <JsonLd data={crumbsLd([{ name: "Home", path: "/" }, { name: "Insights", path: "/insights/" }, { name: a.title, path }])} />
      <PageHeader crumbs={[{ name: "Home", href: "/" }, { name: "Insights", href: "/insights/" }, { name: a.title }]} h1={a.h1} intro={a.summary}>
        {(a.publishedAt || a.lastReviewedAt) && (
          <p className="text-sm text-mist">
            {a.publishedAt && <>Published {a.publishedAt}. </>}{a.lastReviewedAt && <>Last reviewed {a.lastReviewedAt}.</>}
          </p>
        )}
      </PageHeader>
      {a.summaryPoints.length > 0 && (
        <Section heading="In short" tone="paper">
          <ul className="max-w-3xl list-disc space-y-2 pl-6 text-lg">{a.summaryPoints.map((s) => <li key={s}>{s}</li>)}</ul>
        </Section>
      )}
      {a.bodySections.map((b, i) => <Section key={b.heading} heading={b.heading} tone={i % 2 ? "paper" : "light"}><Prose paragraphs={b.body} /></Section>)}
      {a.sources.length > 0 && (
        <Section heading="Sources"><ul className="list-disc pl-6">{a.sources.map((s) => <li key={s.url}><a className="underline underline-offset-4" href={s.url}>{s.label}</a> (retrieved {s.retrievedAt})</li>)}</ul></Section>
      )}
      <CtaBand heading="Discuss your reporting needs" body={pillar ? `Related service area: ${pillar.title}.` : "Tell us about your business and what you want to improve."} />
      {pillar && <Section><p>Related: <Link className="underline underline-offset-4" href={`/services/${pillar.slug}/`}>{pillar.title}</Link></p></Section>}
    </>
  );
}
