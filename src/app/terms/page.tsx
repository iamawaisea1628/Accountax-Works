import { buildMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/content/site";

export const metadata = buildMetadata({ title: "Website Terms | Accountax", description: "Terms for using the Accountax website.", path: "/terms/", noindex: true });

export default function Terms() {
  return (
    <LegalPage title="Website terms">
      <p>Full website terms are being finalised. In the meantime: the content on this website is general information and may change. A website visit or a general enquiry does not create a professional engagement. Specific work begins only after the responsible parties have agreed the engagement and its terms in writing.</p>
      <p>Questions: <a className="underline underline-offset-4" href={`mailto:${site.email}`}>{site.email}</a>.</p>
    </LegalPage>
  );
}
