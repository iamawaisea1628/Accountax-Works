import { buildMetadata } from "@/lib/seo";
import { CtaBand, PageHeader, Prose, Section } from "@/components/ui";

export const metadata = buildMetadata({
  title: "About Accountax | Accounting, Finance & Analytics",
  description: "Learn about Accountax's connected approach to accounting, taxation, advisory, finance, analytics and finance technology.",
  path: "/about/",
});

const approach = [
  ["Understand the context", "Every business has its own operating model, systems, reporting requirements, and constraints. We start by understanding the situation rather than assuming one standard solution fits everyone."],
  ["Define the scope clearly", "Before work begins, the proposed deliverables, responsibilities, dependencies, timing, and limitations should be agreed. Country-specific or regulated work is only accepted when service availability and applicable requirements have been checked."],
  ["Make information useful", "Records and reports matter most when they help people understand the business. Our service framework connects the discipline of accounting with planning, analysis, and systems improvement."],
  ["Improve with purpose", "Technology and automation should solve a defined problem. Processes should remain understandable, appropriately controlled, and maintainable by the people responsible for them."],
];

export default function About() {
  return (
    <>
      <PageHeader crumbs={[{ name: "Home", href: "/" }, { name: "About" }]} h1="A Connected Approach to Business Finance" />
      <Section tone="paper"><Prose paragraphs={["Accountax brings accounting, taxation, advisory, finance, analytics, and finance technology together under one service framework. The aim is to help businesses organize financial information, understand performance, improve finance processes, and make better-informed decisions."]} /></Section>
      <Section heading="Our approach">
        <dl className="grid gap-8 md:grid-cols-2">
          {approach.map(([t, d]) => (<div key={t}><dt className="font-serif text-xl font-semibold">{t}</dt><dd className="mt-2 text-stone">{d}</dd></div>))}
        </dl>
      </Section>
      <Section heading="Our commitment" tone="paper">
        <Prose paragraphs={["Accountax aims to communicate clearly about scope, assumptions, dependencies, and limitations. We do not promise outcomes that depend on factors outside the agreed work or the information available."]} />
      </Section>
      <CtaBand heading="Talk to Accountax" body="Tell us about your business and what you want to improve." label="Talk to Accountax" />
    </>
  );
}
