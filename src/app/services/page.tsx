import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { getPillars } from "@/lib/content";
import { CtaBand, PageHeader, Section } from "@/components/ui";

export const metadata = buildMetadata({
  title: "Business Services | Accounting, Tax, Finance & Analytics | Accountax",
  description: "Explore Accountax services across accounting, taxation, advisory, finance, analytics and finance technology for business needs and country-specific requirements.",
  path: "/services/",
});

export default function Services() {
  return (
    <>
      <PageHeader crumbs={[{ name: "Home", href: "/" }, { name: "Services" }]} h1="Connected Services for Better Financial Clarity"
        intro="Accountax's services are organized into six connected pillars. Each pillar addresses a different part of the financial operating model, from maintaining records and understanding obligations to planning performance, interpreting data, and improving systems." />
      <Section tone="paper">
        <p className="mb-8 max-w-2xl text-lg">You do not need to select the perfect service name before contacting us. Describe your business and the challenge you are facing; the initial conversation can help identify an appropriate scope.</p>
        <ul className="border-t-2 border-ink">
          {getPillars().map((p) => (
            <li key={p.id} className="grid gap-2 border-b border-rule py-6 md:grid-cols-[14rem_1fr_auto] md:items-baseline md:gap-8">
              <h2 className="text-2xl font-semibold">{p.title}</h2>
              <p className="max-w-2xl text-stone">{p.summary}</p>
              <Link href={`/services/${p.slug}/`} className="font-semibold text-gold-deep underline underline-offset-4 hover:text-ink">Explore {p.title}</Link>
            </li>
          ))}
        </ul>
      </Section>
      <CtaBand heading="Not sure which service fits?" body="Tell us what you need to improve, which systems you use, and which country is involved. We can discuss the appropriate scope and whether it is currently available." label="Discuss Your Requirements" />
    </>
  );
}
