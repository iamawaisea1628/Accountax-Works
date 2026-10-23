import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { getCountries } from "@/lib/content";
import { CtaBand, PageHeader, Section } from "@/components/ui";

export const metadata = buildMetadata({
  title: "Countries & Regions | Accountax",
  description: "Explore Accountax's target markets and discuss service availability by country, business needs, and applicable requirements.",
  path: "/countries/",
});

export default function Countries() {
  return (
    <>
      <PageHeader crumbs={[{ name: "Home", href: "/" }, { name: "Countries & Regions" }]} h1="Country-Aware Financial Services"
        intro="Businesses operating across borders can face different reporting practices, tax terminology, filing requirements, and professional rules. Accountax's country-aware approach is designed to make the relevant jurisdiction and service scope explicit before work begins." />
      <Section tone="paper">
        <p className="mb-8 max-w-2xl text-lg">We are developing service coverage for Pakistan, the United Kingdom, the United States, the United Arab Emirates, Saudi Arabia, Canada, and Australia. Inclusion on this page means a market is a target market; it does not automatically mean every service is currently available there.</p>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {getCountries().map((c) => (
            <li key={c.id} className="border border-rule p-5">
              <h2 className="text-xl font-semibold"><Link href={`/countries/${c.slug}/`} className="underline-offset-4 hover:underline">{c.countryName}</Link></h2>
              <p className="mt-2 text-stone">One of Accountax&rsquo;s target markets. Discuss your needs and confirm current service availability.</p>
            </li>
          ))}
        </ul>
      </Section>
      <CtaBand heading="Tell us which country is involved" body="We will confirm what is currently available for your situation before any work is scoped." />
    </>
  );
}
