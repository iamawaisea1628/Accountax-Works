import type { Metadata } from "next";
import { Shell, PageHero, CtaBand } from "../../components/site/Parts";
import Photo from "../../components/Photo";
import { ARTICLES, readingTime } from "../../content/pages";
import { SITE } from "../../content/site";

export const metadata: Metadata = { title: `Insights | ${SITE.name}`, description: "Practical guides on reporting, bookkeeping, forecasting and KPIs for growing businesses." };

export default async function Insights({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const { category } = await searchParams;
  const cats = [...new Set(ARTICLES.map((a) => a.category))];
  const list = ARTICLES.filter((a) => !category || a.category === category);
  return (
    <Shell>
      <PageHero crumbs={[["Home", "/"], ["Insights", "/insights/"]]} eyebrow="Insights" title="Practical finance guides" lead="General educational articles. They are not individual advice, and anything jurisdiction-specific will say which jurisdiction it applies to." />
      <section><div className="w">
        <div className="tabs2"><a href="/insights/" className={!category ? "on" : ""}>All</a>{cats.map((c) => <a key={c} href={`/insights/?category=${encodeURIComponent(c)}`} className={category === c ? "on" : ""}>{c}</a>)}</div>
        <div className="g3">{list.map((a) => (
          <a className="ac" href={`/insights/${a.slug}/`} key={a.slug}>
            <div className="im"><Photo file={a.image} label="Article image (1200x700)" alt={a.title} sizes="(max-width:860px) 100vw, 380px" /></div>
            <div className="ab"><span className="tag">{a.category}</span><h3>{a.title}</h3><p className="mu">{a.excerpt}</p><span className="soon">{readingTime(a)} min read</span></div>
          </a>))}</div>
      </div></section>
      <CtaBand />
    </Shell>
  );
}
