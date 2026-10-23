import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { getPillars } from "@/lib/content";
import { ButtonLink, Container, CtaBand, Faq, Section } from "@/components/ui";
import { site } from "@/content/site";

export const metadata = buildMetadata({
  title: "Accounting, Taxation, Finance & Analytics | Accountax",
  description: "Accountax brings accounting, taxation, advisory, finance, analytics and finance technology together to help businesses improve financial clarity and decision-making.",
  path: "/",
});

const steps = [
  ["Understand", "We learn about your business, current systems, goals, reporting needs, and the jurisdiction or jurisdictions involved."],
  ["Define", "We identify the relevant service, clarify deliverables and responsibilities, and agree the scope, timing, assumptions, and fees before work begins."],
  ["Deliver", "Work is carried out against the agreed scope, using appropriate processes and tools. Any dependencies or missing information are communicated clearly."],
  ["Review and improve", "Where included in the engagement, we review outputs with you and identify practical next steps or opportunities to improve the process."],
];

const faqs = [
  { question: "What services does Accountax provide?", answer: "Accountax's service framework covers accounting, taxation, advisory, finance, analytics, and finance technology. The precise scope depends on the service requested, your business, the relevant country, and current delivery availability." },
  { question: "Does Accountax work with businesses outside Pakistan?", answer: "The website is designed for selected international markets as well as Pakistan. Remote or local delivery is offered only where the service is available and permitted. Contact us with your country and requirements to discuss fit." },
  { question: "Can Accountax manage all our accounting and finance activities?", answer: "Potentially, depending on your requirements and the services currently available. We first review your needs and agree which activities, deliverables, responsibilities, and timelines are included." },
  { question: "Does Accountax provide audit or assurance services?", answer: "No. Audit and assurance services are not part of our current offering." },
  { question: "How do we get started?", answer: `Email ${site.email} or submit the consultation form. Share your business type, country, and the support you are seeking. Please do not send sensitive financial documents through the public enquiry form.` },
];

export default function Home() {
  const pillars = getPillars();
  return (
    <>
      <section className="bg-ink text-white">
        <Container className="py-20 sm:py-28">
          <p className="text-sm tracking-widest text-gold">{site.descriptor.join(" • ").toUpperCase()}</p>
          <h1 className="mt-6 max-w-4xl text-5xl font-semibold sm:text-7xl">Clearer Finances. Better Business Decisions.</h1>
          <p className="mt-8 max-w-2xl text-lg text-mist">
            Accountax helps businesses organize their financial information, understand performance, improve finance processes, and make more informed decisions. Our connected services span accounting, taxation, advisory, finance, analytics, and finance technology, scoped to your business needs and the requirements of the relevant jurisdiction.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href="/contact/">Discuss Your Business Needs</ButtonLink>
            <ButtonLink href="/services/" variant="ghost">Explore Our Services</ButtonLink>
          </div>
          <p className="mt-8 max-w-xl text-sm text-mist">Practical financial support for growing businesses, delivered locally or remotely where available.</p>
        </Container>
      </section>

      <Section heading="Financial services that work together" tone="paper">
        <div className="prose-ax text-lg">
          <p>Financial records, tax obligations, management decisions, and technology are connected. When these areas are handled in isolation, it can be harder to see the full picture.</p>
          <p>Accountax brings these disciplines together through a coordinated service model. Whether you need help organizing accounting records, planning finances, understanding business performance, or improving the systems behind your reporting, we start by understanding your situation and defining a clear scope of work.</p>
        </div>
        <ul className="mt-10 border-t-2 border-ink">
          {pillars.map((p) => (
            <li key={p.id} className="grid gap-2 border-b border-rule py-6 md:grid-cols-[14rem_1fr_auto] md:items-baseline md:gap-8">
              <h3 className="text-2xl font-semibold">{p.title}</h3>
              <p className="max-w-2xl text-stone">{p.summary}</p>
              <Link href={`/services/${p.slug}/`} className="font-semibold text-gold-deep underline underline-offset-4 hover:text-ink">
                Explore {p.title}
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section heading="Built around the way your business operates">
        <p className="max-w-2xl text-lg">Accountax&rsquo;s services can be scoped for businesses at different stages and across different operating models, including:</p>
        <ul className="mt-6 grid max-w-3xl gap-x-10 gap-y-2 text-lg sm:grid-cols-2">
          {["Startups and small or medium-sized businesses", "Ecommerce and retail operations", "Professional services, consultants, and agencies", "Property and real-estate businesses", "Technology and SaaS companies", "Businesses that need more useful management information", "Businesses improving accounting systems and finance workflows"].map((t) => (
            <li key={t} className="border-l-2 border-gold pl-3">{t}</li>
          ))}
        </ul>
        <p className="mt-6 max-w-2xl text-stone">The actual scope is agreed during consultation.</p>
      </Section>

      <Section heading="A clear process from the first conversation" tone="dark">
        <ol className="grid gap-8 md:grid-cols-4">
          {steps.map(([t, d], i) => (
            <li key={t}>
              <p className="text-sm text-gold">Step {i + 1}</p>
              <h3 className="mt-1 text-xl font-semibold">{t}</h3>
              <p className="mt-3 text-mist">{d}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section heading="More than separate financial tasks" tone="paper">
        <ul className="max-w-3xl space-y-3 text-lg">
          <li><strong>Reliable information:</strong> structured records and reconciliations support more useful reporting.</li>
          <li><strong>Useful reporting:</strong> financial statements and management reports can help explain what is happening in the business.</li>
          <li><strong>Forward planning:</strong> budgets and forecasts help owners consider upcoming cash needs and potential scenarios.</li>
          <li><strong>Better visibility:</strong> analytics can make trends and exceptions easier to identify.</li>
          <li><strong>More efficient processes:</strong> suitable systems and automation can reduce repetitive handling, when implemented and reviewed appropriately.</li>
        </ul>
      </Section>

      <Section heading="Country-aware service delivery">
        <p className="max-w-2xl text-lg">Accountax is developing services for clients in Pakistan, the United Kingdom, the United States, the United Arab Emirates, Saudi Arabia, Canada, and Australia. The exact services available in each market depend on client requirements, delivery capability, local rules, and any applicable authorization.</p>
        <div className="mt-6"><ButtonLink href="/countries/" variant="ghost-dark">Explore Countries &amp; Regions</ButtonLink></div>
      </Section>

      <Section heading="Common questions" tone="paper"><Faq items={faqs} /></Section>

      <CtaBand
        heading="Let's clarify what your business needs next"
        body="Tell us about your business, the challenge you want to address, and the country or countries involved. We'll use that information to assess whether the requested work fits our available services and define an appropriate next step."
      />
    </>
  );
}
