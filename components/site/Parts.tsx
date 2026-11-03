import Header from "../Header";
import Footer from "../Footer";
import { SITE } from "../../content/site";

export function Shell({ children }: { children: React.ReactNode }) {
  return <><Header /><main id="top">{children}</main><Footer /></>;
}

export function Crumbs({ items }: { items: [string, string][] }) {
  const ld = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: items.map(([n, h], i) => ({ "@type": "ListItem", position: i + 1, name: n, item: `${SITE.url}${h}` })) };
  return (
    <div className="crumbs" role="navigation" aria-label="Breadcrumb">
      <ol>{items.map(([n, h], i) => <li key={h}>{i < items.length - 1 ? <a href={h}>{n}</a> : <span aria-current="page">{n}</span>}</li>)}</ol>
      <script type="application/ld+json">{JSON.stringify(ld)}</script>
    </div>
  );
}

export function PageHero({ crumbs, eyebrow, title, lead, children }: { crumbs?: [string, string][]; eyebrow?: string; title: string; lead?: string; children?: React.ReactNode }) {
  return (
    <section className="phero"><div className="w">
      {crumbs && <Crumbs items={crumbs} />}
      {eyebrow && <span className="eb">{eyebrow}</span>}
      <h1>{title}</h1>
      {lead && <p className="lead">{lead}</p>}
      {children}
    </div></section>
  );
}

export function JsonLd({ data }: { data: object }) { return <script type="application/ld+json">{JSON.stringify(data)}</script>; }

export function Checks({ items }: { items: string[] }) { return <ul className="checks">{items.map((x) => <li key={x}>{x}</li>)}</ul>; }

export function Faq({ items }: { items: [string, string][] }) {
  return <div className="faqs">{items.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div>;
}

export function CtaBand({ title = "Ready to bring clarity to your numbers?", text = "Tell us what you need and where your business operates. We will confirm whether and how we can help.", label = "Request a Consultation" }: { title?: string; text?: string; label?: string }) {
  return (
    <section className="ctaband"><div className="w">
      <h2>{title}</h2><p>{text}</p>
      <a className="btn" href="/contact/">{label} ✦</a>
    </div></section>
  );
}
