import { buildMetadata } from "@/lib/seo";
import { ContactForm } from "@/components/ContactForm";
import { Faq, PageHeader, Section } from "@/components/ui";
import { site } from "@/content/site";

export const metadata = buildMetadata({
  title: "Contact Accountax | Discuss Your Business Finance Needs",
  description: "Contact Accountax to discuss accounting, taxation, advisory, finance, analytics or finance-technology requirements.",
  path: "/contact/",
});

const faqs = [
  { question: "What should I include in my enquiry?", answer: "Describe your business, the country involved, the support you need, and any relevant timeframe. Please do not include sensitive financial or identity information in the public form." },
  { question: "Can I request more than one service?", answer: "Yes. Explain the outcomes you need; the scope can then be considered across the relevant service areas." },
  { question: "Can I send documents?", answer: "Please do not send sensitive files through the public form. If documents are required, an appropriate secure method should be agreed first." },
];

export default function Contact() {
  return (
    <>
      <PageHeader crumbs={[{ name: "Home", href: "/" }, { name: "Contact" }]} h1="Tell Us What Your Business Needs"
        intro="Share a little about your business, the country involved, and the challenge you want to address. We'll review the information to understand whether the request fits a service that is currently available and what further discussion may be useful." />
      <Section tone="paper">
        <p className="mb-8">Email: <a className="font-semibold underline underline-offset-4" href={`mailto:${site.email}`}>{site.email}</a></p>
        <ContactForm />
      </Section>
      <Section heading="Before you write"><Faq items={faqs} /></Section>
    </>
  );
}
