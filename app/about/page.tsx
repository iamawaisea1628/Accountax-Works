import type { Metadata } from "next";
import { pageMeta } from "../../lib/seo";
import { Shell, PageHero, CtaBand } from "../../components/site/Parts";
import Photo from "../../components/Photo";
import { SERVICES } from "../../content/services";
import { VALUES } from "../../content/pages";
import { SITE } from "../../content/site";

export const metadata: Metadata = pageMeta(`About ${SITE.name}`, "A consultancy that brings accounting, taxation support, advisory, finance, analytics and fintech into one connected service.", "/about/");

export default function About() {
  return (
    <Shell>
      <PageHero crumbs={[["Home", "/"], ["About", "/about/"]]} eyebrow="About us" title="One connected team for the books, the numbers behind decisions, and the systems that support both" lead={`${SITE.name} helps businesses make better financial decisions through reliable accounting, compliant taxation support, strategic advisory and data-driven business intelligence.`} />
      <section><div className="w two al">
        <div className="im tall"><Photo file="about.webp" label="About image (900x1100)" alt="Finance team reviewing reports" sizes="(max-width:860px) 100vw, 560px" /></div>
        <div className="prose">
          <h2>Who we are</h2>
          <p>{SITE.short} is a finance and data consultancy. We combine accounting discipline with modern data tools, so your reports rest on clean books and your decisions rest on clear reports.</p>
          <p>We work remotely with businesses of different sizes and structures, from individuals and sole proprietors to companies and groups. Our delivery model is built around secure document exchange, written scopes and regular review.</p>
          <h2>Mission</h2>
          <p>To give business owners accurate records, clear reports and practical advice they can act on.</p>
          <h2>Vision</h2>
          <p>Finance functions that run smoothly in the background, so owners spend their time on the business rather than on its paperwork.</p>
        </div>
      </div></section>
      <section className="alt"><div className="w">
        <div className="sh"><span className="eb">Integrated service philosophy</span><h2>Six pillars that work from the same records</h2>
          <p>Each pillar stands on its own, and each works better alongside the others, because they draw on one set of reconciled figures.</p></div>
        <div className="g3">{SERVICES.map((s) => <a className="card" href={`/services/${s.slug}/`} key={s.slug}><h3>{s.name}</h3><p>{s.lead}</p></a>)}</div>
      </div></section>
      <section><div className="w">
        <div className="sh"><span className="eb">Working principles</span><h2>How we work</h2></div>
        <div className="g3">{VALUES.map(([t, d], i) => <div className="card" key={t}><i className="num">{String(i + 1).padStart(2, "0")}</i><h3>{t}</h3><p>{d}</p></div>)}</div>
      </div></section>
      <section className="alt"><div className="w two">
        <div className="prose"><h2>Quality control and confidentiality</h2>
          <p>Work is reviewed before it reaches you. Outputs produced with automation or AI assistance are always checked by a person. Client information is handled on a need-to-know basis and exchanged through the secure client portal.</p>
          <p>We confirm the scope and availability of every service for your jurisdiction before an engagement begins, and we do not claim to provide every service in every country.</p></div>
        <div className="prose"><h2>How an engagement works</h2>
          <p>Each engagement starts with a conversation, moves to a written scope, then to secure onboarding, delivery with review, and regular reporting.</p>
          <p><a className="btn o" href="/how-we-work/">See the full process</a></p></div>
      </div></section>
      <CtaBand />
    </Shell>
  );
}
