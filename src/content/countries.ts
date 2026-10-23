import { z } from "zod";
import { countrySchema } from "./schema";

const disclaimer =
  "This page is general information, not tax, legal or regulatory advice. Inclusion as a target market does not mean every service is available in this country. Availability is confirmed during consultation.";

const c = (o: {
  code: string; slug: string; name: string; seoTitle: string; meta: string; h1: string;
  body: string[]; cta: string; summary: string;
}) => ({
  id: `country-${o.slug}`, slug: o.slug, title: o.name, summary: o.summary, status: "published" as const,
  seoTitle: o.seoTitle, metaDescription: o.meta, primarySearchIntent: `accounting and finance support ${o.name}`,
  keywords: [], faqs: [], publishedAt: null, lastReviewedAt: null, reviewDueAt: null, reviewer: null, sources: [], locale: "en",
  countryCode: o.code, countryName: o.name, marketStatus: "target" as const, h1: o.h1, body: o.body,
  ctaLabel: o.cta, generalDisclaimer: disclaimer, officialSources: [],
});

const raw = [
  c({ code: "PK", slug: "pakistan", name: "Pakistan",
    summary: "Target market. Discuss your needs and confirm current service availability.",
    seoTitle: "Business Accounting & Financial Support in Pakistan | Accountax",
    meta: "Discuss accounting, financial reporting, analytics and other business finance needs in Pakistan. Confirm current service scope and availability with Accountax.",
    h1: "Business Financial Support in Pakistan",
    body: ["Accountax's target markets include Pakistan. We aim to help businesses improve the organization of financial information, reporting processes, management visibility, and finance workflows through services that are confirmed as available.",
      "The right scope depends on your business structure, activities, records, systems, and objectives. For tax-related or other jurisdiction-specific work, requirements and authorization must be checked before the engagement is confirmed.",
      "Discuss with us: bookkeeping and reporting needs, financial planning, management information, analytics, or finance-system improvement."],
    cta: "Discuss Your Requirements in Pakistan" }),
  c({ code: "GB", slug: "united-kingdom", name: "United Kingdom",
    summary: "Target market. Discuss your needs and confirm current service availability.",
    seoTitle: "Business Accounting & Finance Support in the UK | Accountax",
    meta: "Discuss business accounting, financial reporting, analytics and finance-process needs relating to the UK. Services depend on confirmed availability and applicable requirements.",
    h1: "Financial Support for Businesses with UK Requirements",
    body: ["The United Kingdom is one of Accountax's target markets. Businesses with UK-related needs may require support with organised financial records, management reporting, planning, analytics, or finance workflows. The appropriate service depends on the business's circumstances and the work Accountax has confirmed it can deliver.",
      "Tax and regulatory requirements can change and may depend on entity type, activity, and circumstances. For current UK rules, refer to the relevant official sources."],
    cta: "Discuss Your UK-Related Requirements" }),
  c({ code: "US", slug: "united-states", name: "United States",
    summary: "Target market. Discuss your needs and confirm current service availability.",
    seoTitle: "Accounting & Financial Reporting Support in the US | Accountax",
    meta: "Discuss accounting, reporting, analytics and finance workflow needs involving the United States. Confirm service availability and scope before engagement.",
    h1: "Financial Support for Businesses with US Requirements",
    body: ["The United States is one of Accountax's target markets. Businesses may need clearer accounting records, management reporting, planning, analytics, or improved finance workflows. Services are assessed against the business's needs, relevant state or federal context where applicable, and Accountax's confirmed delivery capabilities.",
      "Tax treatment and compliance requirements can vary according to the taxpayer, entity, location, activities, and reporting period. We do not currently advertise preparing, signing, or representing tax matters in the US."],
    cta: "Discuss Your US-Related Requirements" }),
  c({ code: "AE", slug: "united-arab-emirates", name: "United Arab Emirates",
    summary: "Target market. Discuss your needs and confirm current service availability.",
    seoTitle: "Business Accounting & Finance Support in the UAE | Accountax",
    meta: "Discuss business accounting, reporting, analytics and finance-process needs relating to the UAE, subject to confirmed service availability and local requirements.",
    h1: "Financial Support for Businesses with UAE Requirements",
    body: ["The United Arab Emirates is one of Accountax's target markets. We can discuss business needs involving accounting processes, financial reporting, planning, analytics, or finance systems, subject to current service availability and applicable requirements.",
      "UAE tax and business rules depend on the circumstances and can change. For current rules, refer to the relevant official sources."],
    cta: "Discuss Your UAE-Related Requirements" }),
  c({ code: "SA", slug: "saudi-arabia", name: "Saudi Arabia",
    summary: "Target market. Discuss your needs and confirm current service availability.",
    seoTitle: "Business Accounting & Finance Support in Saudi Arabia | Accountax",
    meta: "Discuss accounting, financial reporting, analytics and finance workflow needs relating to Saudi Arabia, subject to verified service scope and local requirements.",
    h1: "Financial Support for Businesses with Saudi Requirements",
    body: ["Saudi Arabia is one of Accountax's target markets. Businesses with Saudi-related requirements can contact us to discuss their reporting, accounting-process, planning, analytics, or finance-technology needs. Each engagement is scoped according to the requested work, current delivery capability, and applicable local requirements."],
    cta: "Discuss Your Saudi-Related Requirements" }),
  c({ code: "CA", slug: "canada", name: "Canada",
    summary: "Target market. Discuss your needs and confirm current service availability.",
    seoTitle: "Business Accounting & Financial Support in Canada | Accountax",
    meta: "Discuss accounting, reporting, planning, analytics and finance-process needs involving Canada. Confirm service scope and availability before engagement.",
    h1: "Financial Support for Businesses with Canadian Requirements",
    body: ["Canada is one of Accountax's target markets. Depending on the business's needs and the services confirmed as available, discussions may cover accounting records, management reporting, financial planning, analytics, or finance workflow improvement.",
      "Canadian requirements can differ by province or territory, entity type, activity, and reporting context."],
    cta: "Discuss Your Canadian Requirements" }),
  c({ code: "AU", slug: "australia", name: "Australia",
    summary: "Target market. Discuss your needs and confirm current service availability.",
    seoTitle: "Business Accounting & Financial Support in Australia | Accountax",
    meta: "Discuss accounting, financial reporting, analytics and finance workflow needs relating to Australia, subject to confirmed service availability and applicable requirements.",
    h1: "Financial Support for Businesses with Australian Requirements",
    body: ["Australia is one of Accountax's target markets. Businesses may contact us to discuss accounting processes, financial reporting, budgeting, analytics, or finance systems. The proposed scope depends on the business's situation and the services Accountax has confirmed it can deliver.",
      "Australian tax and reporting requirements may depend on the entity, activity, circumstances, and reporting period."],
    cta: "Discuss Your Australian Requirements" }),
];

export const countries = z.array(countrySchema).parse(raw);
