import type { Metadata } from "next";
import { pageMeta } from "../../lib/seo";
import { Shell, PageHero, Checks, CtaBand } from "../../components/site/Parts";
import ProcessFlow from "../../components/site/ProcessFlow";
import { PROCESS, CLIENT_DUTIES, OUR_COMMITMENTS } from "../../content/pages";
import { SITE } from "../../content/site";

export const metadata: Metadata = pageMeta(`How We Work | ${SITE.name}`, "A clear six-step engagement process: discussion, eligibility, written scope, secure onboarding, reviewed delivery and regular reporting.", "/how-we-work/");

export default function HowWeWork() {
  return (
    <Shell>
      <PageHero crumbs={[["Home", "/"], ["How We Work", "/how-we-work/"]]} eyebrow="How we work" title="A clear process, no surprises" lead="Agreed scope, defined responsibilities and reviewed deliverables keep every engagement predictable." />
      <section><div className="w"><ProcessFlow steps={PROCESS.map(([title, sub, text]) => ({ title, sub, text }))} /></div></section>
      <section className="alt"><div className="w two">
        <div className="prose"><h2>What we ask of you</h2><Checks items={CLIENT_DUTIES} /></div>
        <div className="prose"><h2>What you can expect from us</h2><Checks items={OUR_COMMITMENTS} /></div>
      </div></section>
      <CtaBand />
    </Shell>
  );
}
