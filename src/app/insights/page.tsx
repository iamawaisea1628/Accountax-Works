import Link from "next/link";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { getInsights } from "@/lib/content";
import { CtaBand, PageHeader, Section } from "@/components/ui";

export const metadata = buildMetadata({
  title: "Insights | Accountax",
  description: "Practical articles on accounting, reporting, planning, analytics and finance systems for business owners.",
  path: "/insights/",
});

export default function Insights() {
  const items = getInsights();
  if (!items.length) notFound(); // no empty pages
  return (
    <>
      <PageHeader crumbs={[{ name: "Home", href: "/" }, { name: "Insights" }]} h1="Insights" intro="Practical articles on accounting, reporting, planning, analytics and finance systems." />
      <Section tone="paper">
        <ul className="border-t-2 border-ink">
          {items.map((a) => (
            <li key={a.id} className="grid gap-2 border-b border-rule py-6 md:grid-cols-[14rem_1fr] md:gap-8">
              <p className="text-sm text-stone">{a.category}</p>
              <div>
                <h2 className="text-2xl font-semibold"><Link href={`/insights/${a.slug}/`} className="underline-offset-4 hover:underline">{a.title}</Link></h2>
                <p className="mt-2 max-w-2xl text-stone">{a.summary}</p>
              </div>
            </li>
          ))}
        </ul>
      </Section>
      <CtaBand heading="Have a question about your own situation?" body="Articles are general information. Tell us about your business and we can discuss what applies to you." />
    </>
  );
}
