import { buildMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/LegalPage";

export const metadata = buildMetadata({ title: "General Disclaimer | Accountax", description: "General disclaimer for information published on the Accountax website.", path: "/disclaimer/", noindex: true });

export default function Disclaimer() {
  return (
    <LegalPage title="General disclaimer">
      <p>Information on this website is provided for general informational purposes. It is not a substitute for advice tailored to a particular business, transaction, taxpayer, or jurisdiction. Rules and requirements may change, and the relevance of any information depends on the facts and date involved.</p>
      <p>The services that Accountax can provide depend on the agreed scope, current delivery capability, the applicable jurisdiction, and any relevant professional or regulatory requirements. No professional engagement is formed solely by reading this website or submitting a general enquiry. Specific work begins only after the responsible parties have agreed the engagement and its terms.</p>
    </LegalPage>
  );
}
