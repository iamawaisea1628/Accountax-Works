import type { Metadata } from "next";
import { Shell, PageHero } from "../../components/site/Parts";
import { SITE } from "../../content/site";

export const metadata: Metadata = { title: `Careers | ${SITE.name}`, description: "No vacancies are listed at the moment. You are welcome to introduce yourself." };

export default function Careers() {
  return (
    <Shell>
      <PageHero crumbs={[["Home", "/"], ["Careers", "/careers/"]]} eyebrow="Careers" title="Work with us" lead="We do not have any open vacancies right now. If you work in accounting, data or fintech and would like to hear about future roles, you are welcome to introduce yourself." />
      <section><div className="w narrow prose">
        <h2>Expression of interest</h2>
        <p>Tell us about your background, the kind of work you enjoy, and where you are based. We read every message, and we will contact you if a suitable role opens.</p>
        <p>{SITE.email ? <a className="btn" href={`mailto:${SITE.email}?subject=Expression%20of%20interest`}>Email Us</a> : <a className="btn" href="/contact/">Send a Message</a>}</p>
      </div></section>
    </Shell>
  );
}
