import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { getIndustries } from "@/lib/content";
import { CtaBand, PageHeader, Section } from "@/components/ui";

export const metadata = buildMetadata({
  title: "Industries We Support | Accountax",
  description: "Explore how Accountax's accounting, finance, analytics and finance-technology services can be scoped around different business models.",
  path: "/industries/",
});

export default function Industries() {
  return (
    <>
      <PageHeader crumbs={[{ name: "Home", href: "/" }, { name: "Industries" }]} h1="Financial Services Shaped Around Your Business Model"
        intro="Different industries have different transaction patterns, reporting needs, operational systems, and planning questions. Accountax begins with how your business operates, then scopes the services and reporting that fit the actual need." />
      <Section tone="paper">
        <ul className="border-t-2 border-ink">
          {getIndustries().map((i) => (
            <li key={i.id} className="grid gap-2 border-b border-rule py-6 md:grid-cols-[18rem_1fr] md:gap-8">
              <h2 className="text-xl font-semibold"><Link href={`/industries/${i.slug}/`} className="underline-offset-4 hover:underline">{i.title}</Link></h2>
              <p className="max-w-2xl text-stone">{i.h1}</p>
            </li>
          ))}
        </ul>
      </Section>
      <CtaBand heading="Describe how your business operates" body="We will confirm which services fit before any work is scoped." />
    </>
  );
}
