import type { Metadata } from "next";
import { pageMeta } from "../../lib/seo";
import { Shell, PageHero, CtaBand } from "../../components/site/Parts";
import ServiceCards from "../../components/site/ServiceCards";
import { SERVICES } from "../../content/services";
import { SITUATIONS } from "../../content/pages";
import { SITE } from "../../content/site";

export const metadata: Metadata = pageMeta(`Services | ${SITE.name}`, "Six service pillars: Accounting, Taxation, Advisory, Finance, Analytics and Fintech. Scoped to your business and jurisdiction.", "/services/");

export default function Services() {
  return (
    <Shell>
      <PageHero crumbs={[["Home", "/"], ["Services", "/services/"]]} eyebrow="What we do" title="Six service pillars built on accounting expertise and modern data tools" lead="Choose a single service or combine them. Scope and fees are agreed after we understand your jurisdiction, transaction volume and reporting needs." />
      <section><div className="w"><ServiceCards /></div></section>
      <section className="alt"><div className="w">
        <div className="sh"><span className="eb">Find the right service</span><h2>Start from your situation</h2></div>
        <div className="g3">{SITUATIONS.map(([t, slug]) => { const s = SERVICES.find((x) => x.slug === slug)!; return <a className="card" href={`/services/${slug}/`} key={t}><h3>{t}</h3><p>Start with <strong>{s.name}</strong></p></a>; })}</div>
        <p className="mu" style={{ marginTop: 24 }}>Not sure? <a href="/contact/">Tell us what you are trying to achieve</a> and we will suggest where to begin.</p>
      </div></section>
      <CtaBand />
    </Shell>
  );
}
