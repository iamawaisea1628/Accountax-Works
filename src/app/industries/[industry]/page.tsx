import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { getIndustries, getIndustry } from "@/lib/content";
import { ButtonLink, CtaBand, PageHeader, Prose, Section } from "@/components/ui";

export const dynamicParams = false;
export const generateStaticParams = () => getIndustries().map((i) => ({ industry: i.slug }));

export async function generateMetadata({ params }: { params: Promise<{ industry: string }> }) {
  const i = getIndustry((await params).industry);
  return i ? buildMetadata({ title: i.seoTitle, description: i.metaDescription, path: `/industries/${i.slug}/` }) : {};
}

export default async function IndustryPage({ params }: { params: Promise<{ industry: string }> }) {
  const i = getIndustry((await params).industry);
  if (!i) notFound();
  return (
    <>
      <PageHeader crumbs={[{ name: "Home", href: "/" }, { name: "Industries", href: "/industries/" }, { name: i.title }]} h1={i.h1}>
        <ButtonLink href="/contact/">{i.ctaLabel}</ButtonLink>
      </PageHeader>
      <Section tone="paper"><Prose paragraphs={i.body} /></Section>
      <CtaBand heading="Tell us about your business" body="Share what you need and the country involved. We will confirm whether it fits a currently available service." label={i.ctaLabel} />
    </>
  );
}
