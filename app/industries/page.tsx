import type { Metadata } from "next";
import { pageMeta } from "../../lib/seo";
import IndustryCards from "../../components/site/IndustryCards";
import { Shell, PageHero, CtaBand } from "../../components/site/Parts";
import { SITE } from "../../content/site";

export const metadata: Metadata = pageMeta(`Industries | ${SITE.name}`, "How our six service pillars apply to startups, ecommerce, professional services, property, retail, multi-entity groups, accounting practices and manufacturing.", "/industries/");

export default function Industries() {
  return (
    <Shell>
      <PageHero crumbs={[["Home", "/"], ["Industries", "/industries/"]]} eyebrow="Industries" title="Support for the kinds of businesses we work with" lead="Each combination below is a starting point. We tailor the scope to your business, your systems and your jurisdiction." />
      <section><div className="w"><IndustryCards detailed /></div></section>
      <CtaBand title="Do not see your sector?" text="We work with many kinds of businesses. Tell us about yours and we will tell you honestly whether we are a good fit." />
    </Shell>
  );
}
