import type { Metadata } from "next";
import { Shell, PageHero, CtaBand } from "../../components/site/Parts";
import Photo from "../../components/Photo";
import { SERVICES } from "../../content/services";
import { SITUATIONS } from "../../content/pages";
import { SITE } from "../../content/site";

export const metadata: Metadata = { title: `Services | ${SITE.name}`, description: "Six service pillars: Accounting, Taxation, Advisory, Finance, Analytics and Fintech. Scoped to your business and jurisdiction." };

export default function Services() {
  return (
    <Shell>
      <PageHero crumbs={[["Home", "/"], ["Services", "/services/"]]} eyebrow="What we do" title="Six service pillars built on accounting expertise and modern data tools" lead="Choose a single service or combine them. Scope and fees are agreed after we understand your jurisdiction, transaction volume and reporting needs." />
      <section><div className="w"><div className="g3">{SERVICES.map((s) => (
        <a className="sc" href={`/services/${s.slug}/`} key={s.slug}>
          <div className="im"><Photo file={s.image} label={s.name} alt={s.name} sizes="(max-width:860px) 100vw, 380px" /></div><div className="ov" />
          <div className="sb"><h3>{s.name}</h3><span className="ar" aria-hidden="true">→</span><div><p>{s.lead}</p><span className="tag">Pillar {String(s.order).padStart(2, "0")}</span></div></div>
        </a>))}</div></div></section>
      <section className="alt"><div className="w">
        <div className="sh"><span className="eb">Find the right service</span><h2>Start from your situation</h2></div>
        <div className="g3">{SITUATIONS.map(([t, slug]) => { const s = SERVICES.find((x) => x.slug === slug)!; return <a className="card" href={`/services/${slug}/`} key={t}><h3>{t}</h3><p>Start with <strong>{s.name}</strong></p></a>; })}</div>
        <p className="mu" style={{ marginTop: 24 }}>Not sure? <a href="/contact/">Tell us what you are trying to achieve</a> and we will suggest where to begin.</p>
      </div></section>
      <CtaBand />
    </Shell>
  );
}
