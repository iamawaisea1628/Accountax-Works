import { buildMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/content/site";

export const metadata = buildMetadata({ title: "Privacy Notice | Accountax", description: "How Accountax handles information submitted through this website.", path: "/privacy/", noindex: true });

export default function Privacy() {
  return (
    <LegalPage title="Privacy notice">
      <p>The full privacy notice is being finalised. Until it is published, this page describes what the enquiry form on this website collects.</p>
      <p>When you submit the consultation form we receive your name, work email address, country, business type, service area, and the description you write. Optional fields (company, website, phone number, preferred contact method and time, timeframe) are collected only if you provide them. We also record the page you came from and any campaign tags in the link you used.</p>
      <p>We use this information to review and respond to your enquiry. Enquiries are delivered to us by email through a service provider, and a spam-protection service may process your connection details to verify the submission.</p>
      <p>Please do not send passwords, identity documents, bank statements, tax records, or other sensitive financial information through the form.</p>
      <p>For privacy questions, email <a className="underline underline-offset-4" href={`mailto:${site.email}`}>{site.email}</a>.</p>
    </LegalPage>
  );
}
