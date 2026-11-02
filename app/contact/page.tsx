import type { Metadata } from "next";
import { Shell, PageHero } from "../../components/site/Parts";
import ContactForm from "../../components/ContactForm";
import { SITE } from "../../content/site";

export const metadata: Metadata = { title: `Contact | ${SITE.name}`, description: "Request a consultation. Tell us what you need and where your business operates." };

export default function Contact() {
  return (
    <Shell>
      <PageHero crumbs={[["Home", "/"], ["Contact", "/contact/"]]} eyebrow="Get in touch" title="Request a consultation" lead="Tell us what you need and where your business operates. We will confirm whether and how we can help." />
      <section><div className="w two">
        <div className="prose">
          <h2>What happens next</h2>
          <ol className="plain"><li>We read your enquiry and check the country and services involved.</li><li>We reply to discuss your needs and confirm whether we are a good fit.</li><li>If so, we send a written scope and proposal.</li></ol>
          <p className="note">Please do not send bank credentials, passwords, identity documents or financial records through this form. We will set up secure document exchange once an engagement starts.</p>
          {SITE.email && <p>Email: <a href={`mailto:${SITE.email}`}>{SITE.email}</a></p>}
          <p className="mu">Existing client? <a href="/portal/login/">Sign in to the client portal</a>.</p>
        </div>
        <div className="cbox"><ContactForm /></div>
      </div></section>
    </Shell>
  );
}
