import Link from "next/link";
import type { ReactNode } from "react";
import { site } from "@/content/site";

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-sans text-xl font-bold tracking-[0.14em] ${className}`} aria-label="Accountax">
      <span className="text-white">ACCOUNT</span>
      <span className="text-gold">TAX</span>
    </span>
  );
}

export function ButtonLink({ href, children, variant = "primary" }: { href: string; children: ReactNode; variant?: "primary" | "ghost" | "ghost-dark" }) {
  const styles = {
    primary: "bg-gold text-ink hover:bg-gold-light",
    ghost: "border border-white/40 text-white hover:border-gold hover:text-gold-light",
    "ghost-dark": "border border-ink/40 text-ink hover:border-ink hover:bg-ink hover:text-white",
  }[variant];
  return (
    <Link href={href} className={`inline-flex min-h-11 items-center justify-center px-6 py-3 text-sm font-semibold transition-colors ${styles}`}>
      {children}
    </Link>
  );
}

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-page px-5 sm:px-8 ${className}`}>{children}</div>;
}

export function Breadcrumbs({ items }: { items: { name: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-mist">
      <ol className="flex flex-wrap gap-x-2">
        {items.map((it, i) => (
          <li key={it.name} className="flex gap-x-2">
            {it.href ? <Link href={it.href} className="underline-offset-4 hover:text-gold-light hover:underline">{it.name}</Link> : <span aria-current="page" className="text-white">{it.name}</span>}
            {i < items.length - 1 && <span aria-hidden="true">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function PageHeader({ crumbs, h1, intro, children }: { crumbs?: { name: string; href?: string }[]; h1: string; intro?: string; children?: ReactNode }) {
  return (
    <section className="bg-ink text-white">
      <Container className="py-14 sm:py-20">
        {crumbs && <Breadcrumbs items={crumbs} />}
        <h1 className="mt-6 max-w-3xl text-4xl font-semibold sm:text-5xl">{h1}</h1>
        {intro && <p className="mt-6 max-w-2xl text-lg text-mist">{intro}</p>}
        {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
      </Container>
    </section>
  );
}

export function Section({ heading, children, tone = "light", id }: { heading?: string; children: ReactNode; tone?: "light" | "paper" | "dark"; id?: string }) {
  const bg = { light: "bg-ivory on-light", paper: "bg-paper on-light", dark: "bg-charcoal text-white" }[tone];
  return (
    <section id={id} className={bg}>
      <Container className="py-14 sm:py-16">
        {heading && <h2 className="mb-6 max-w-3xl text-2xl font-semibold sm:text-3xl">{heading}</h2>}
        {children}
      </Container>
    </section>
  );
}

export function Prose({ paragraphs }: { paragraphs: string[] }) {
  return <div className="prose-ax text-lg">{paragraphs.map((p) => <p key={p.slice(0, 40)}>{p}</p>)}</div>;
}

export function Faq({ items }: { items: { question: string; answer: string }[] }) {
  if (!items.length) return null;
  return (
    <div className="max-w-3xl divide-y divide-rule border-y border-rule">
      {items.map((f) => (
        <details key={f.question} className="group py-4">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-semibold">
            {f.question}
            <span aria-hidden="true" className="text-gold-deep transition-transform group-open:rotate-45">+</span>
          </summary>
          <p className="mt-3 text-stone">{f.answer}</p>
        </details>
      ))}
    </div>
  );
}

export function CtaBand({ heading, body, label = "Request a Consultation", href = "/contact/" }: { heading: string; body: string; label?: string; href?: string }) {
  return (
    <section className="bg-ink text-white">
      <Container className="py-14 sm:py-16">
        <h2 className="max-w-2xl text-3xl font-semibold">{heading}</h2>
        <p className="mt-4 max-w-2xl text-mist">{body}</p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <ButtonLink href={href}>{label}</ButtonLink>
          <a href={`mailto:${site.email}`} className="text-gold-light underline underline-offset-4">{site.email}</a>
        </div>
      </Container>
    </section>
  );
}

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

export function crumbsLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: `${site.url}${it.path}` })),
  };
}
