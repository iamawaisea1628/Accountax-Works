import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Shell, Crumbs, CtaBand, JsonLd } from "../../../components/site/Parts";
import { pageMeta } from "../../../lib/seo";
import { SITE } from "../../../content/site";
import { ARTICLES, articleBySlug, readingTime } from "../../../content/pages";
import { bySlug } from "../../../content/services";

export const dynamicParams = false;
export const generateStaticParams = () => ARTICLES.map((a) => ({ slug: a.slug }));
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const a = articleBySlug((await params).slug);
  if (!a) return {};
  const full = `${a.title} | ${SITE.name}`;
  return pageMeta(full.length <= 70 ? full : a.title, a.excerpt, `/insights/${a.slug}/`, { type: "article" });
}

export default async function Article({ params }: { params: Promise<{ slug: string }> }) {
  const a = articleBySlug((await params).slug);
  if (!a) notFound();
  const more = ARTICLES.filter((x) => x.slug !== a.slug).slice(0, 3);
  return (
    <Shell>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Article", headline: a.title, description: a.excerpt, mainEntityOfPage: `${SITE.url}/insights/${a.slug}/`, publisher: { "@type": "Organization", name: SITE.name } }} />
      <section className="phero"><div className="w narrow">
        <Crumbs items={[["Home", "/"], ["Insights", "/insights/"], [a.title, `/insights/${a.slug}/`]]} />
        <span className="tag">{a.category}</span>
        <h1>{a.title}</h1><p className="lead">{a.excerpt}</p><p className="mu">{readingTime(a)} min read</p>
      </div></section>
      <section><div className="w narrow prose art">
        {a.body.map((b, i) => <div key={i}>{b.h && <h2>{b.h}</h2>}{b.p?.map((t) => <p key={t}>{t}</p>)}{b.ul && <ul>{b.ul.map((t) => <li key={t}>{t}</li>)}</ul>}</div>)}
        <p className="note">This article is general information and is not individual accounting, taxation, legal or investment advice.</p>
        <h2>Related services</h2>
        <p className="row">{a.related.map((r) => <a className="tag" key={r} href={`/services/${r}/`}>{bySlug(r)!.name}</a>)}</p>
      </div></section>
      <section className="alt"><div className="w"><div className="sh"><h2>More to read</h2></div>
        <div className="g3">{more.map((x) => <a className="card" key={x.slug} href={`/insights/${x.slug}/`}><span className="tag">{x.category}</span><h3 style={{ marginTop: 12 }}>{x.title}</h3><p>{x.excerpt}</p></a>)}</div></div></section>
      <CtaBand />
    </Shell>
  );
}
