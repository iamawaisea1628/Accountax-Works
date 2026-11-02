import type { Metadata } from "next";
import { Shell, PageHero, Checks, CtaBand } from "../../components/site/Parts";
import { INDUSTRIES } from "../../content/pages";
import { bySlug } from "../../content/services";
import { SITE } from "../../content/site";

export const metadata: Metadata = { title: `Industries | ${SITE.name}`, description: "How our six service pillars apply to startups, ecommerce, professional services, property, retail, multi-entity groups, accounting practices and manufacturing." };

export default function Industries() {
  return (
    <Shell>
      <PageHero crumbs={[["Home", "/"], ["Industries", "/industries/"]]} eyebrow="Industries" title="Support for the kinds of businesses we work with" lead="Each combination below is a starting point. We tailor the scope to your business, your systems and your jurisdiction." />
      <section><div className="w"><div className="g3">{INDUSTRIES.map((i) => (
        <div className="card" key={i.name}>
          <h3>{i.name}</h3><p>{i.blurb}</p>
          <p className="mu"><strong>Typical needs</strong></p><Checks items={i.problems} />
          <p className="row" style={{ marginTop: 14 }}>{i.pillars.map((p) => <a className="tag" key={p} href={`/services/${p}/`}>{bySlug(p)!.name}</a>)}</p>
        </div>))}</div></div></section>
      <CtaBand title="Do not see your sector?" text="We work with many kinds of businesses. Tell us about yours and we will tell you honestly whether we are a good fit." />
    </Shell>
  );
}
