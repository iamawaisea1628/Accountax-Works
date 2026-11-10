import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Shell, PageHero, Checks, Faq, CtaBand, JsonLd } from "../../../components/site/Parts";
import { pageMeta } from "../../../lib/seo";
import { SITE } from "../../../content/site";
import Photo from "../../../components/Photo";
import ProcessFlow from "../../../components/site/ProcessFlow";
import ServiceCards from "../../../components/site/ServiceCards";
import ToolsShowcase from "../../../components/site/ToolsShowcase";
import { OfferCards, Problems, Deliverables, Chips } from "../../../components/site/ServiceBlocks";
import { PillarIcon } from "../../../components/site/icons";
import { SERVICES, bySlug } from "../../../content/services";

export const dynamicParams = false;
export const generateStaticParams = () => SERVICES.map((s) => ({ slug: s.slug }));
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const s = bySlug((await params).slug);
  return s ? pageMeta(s.metaTitle, s.metaDescription, `/services/${s.slug}/`) : {};
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const s = bySlug((await params).slug);
  if (!s) notFound();
  return (
    <Shell>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Service", name: `${s.name} services`, serviceType: s.name, description: s.metaDescription, url: `${SITE.url}/services/${s.slug}/`, provider: { "@type": "ProfessionalService", name: SITE.name, url: SITE.url } }} />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: s.faqs.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) }} />
      <PageHero crumbs={[["Home", "/"], ["Services", "/services/"], [s.name, `/services/${s.slug}/`]]} icon={<PillarIcon slug={s.slug} size={38} />} eyebrow={`Pillar ${String(s.order).padStart(2, "0")}: ${s.name}`} title={s.h1} lead={s.lead}>
        <div className="cta"><a className="btn" href="/contact/">{s.cta} ✦</a><a className="btn o" href="/services/">All services</a></div>
      </PageHero>
      <section><div className="w two al">
        <div><span className="eb line">The challenge</span><h2>Problems this helps with</h2><Problems items={s.problems} /></div>
        <div className="im tall"><Photo file={s.image} label={s.name} alt={s.name} sizes="(max-width:860px) 100vw, 560px" /></div>
      </div></section>
      <section className="alt"><div className="w">
        <div className="sh"><span className="eb">What we offer</span><h2>Services within {s.name}</h2><p>The exact scope is agreed with you in writing before work starts.</p></div>
        <OfferCards items={s.offerings} />
      </div></section>
      <section><div className="w">
        <div className="sh"><span className="eb">What you receive</span><h2>Typical deliverables</h2></div>
        <Deliverables items={s.deliverables} />
        <div className="sh" style={{ marginTop: 56 }}><span className="eb">Who it is for</span><h2>Built for businesses like these</h2></div>
        <Chips items={s.clients} />
      </div></section>
      <section><div className="w">
        <div className="sh"><span className="eb">Our toolkit</span><h2>Tools we use for {s.name}</h2><p>Platforms and technologies behind this service. We confirm the tools for your engagement during scoping.</p></div>
        <ToolsShowcase pillar={s.slug} />
      </div></section>
      <section className="alt"><div className="w">
        <div className="sh"><span className="eb">How an engagement works</span><h2>A practical process</h2></div>
        <ProcessFlow steps={s.process.map(([title, text]) => ({ title, text }))} />
        <p style={{ marginTop: 24 }}><a href="/how-we-work/">Read the full engagement process</a></p>
      </div></section>
      <section><div className="w two">
        <div className="prose"><span className="eb">FAQ</span><h2>Common questions</h2><p className="mu">Something else? <a href="/contact/">Send us your question</a>.</p></div>
        <Faq items={s.faqs} />
      </div></section>
      <section className="alt"><div className="w">
        <div className="sh"><span className="eb">Related services</span><h2>Often combined with</h2></div>
        <ServiceCards only={s.related} compact />
      </div></section>
      <CtaBand label={s.cta} />
    </Shell>
  );
}
