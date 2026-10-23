import { z } from "zod";

export const statusSchema = z.enum(["draft", "in_review", "published", "paused", "retired"]);
export type Status = z.infer<typeof statusSchema>;

const sourceSchema = z.object({ label: z.string(), url: z.url(), retrievedAt: z.string() });
const faqSchema = z.object({ question: z.string(), answer: z.string() });
const sectionSchema = z.object({ heading: z.string(), body: z.array(z.string()).min(1) });
const dateOrNull = z.string().nullable();

const base = {
  id: z.string(),
  slug: z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/),
  title: z.string(),
  summary: z.string(),
  status: statusSchema,
  seoTitle: z.string().max(70),
  metaDescription: z.string().max(200),
  primarySearchIntent: z.string(),
  keywords: z.array(z.string()).default([]),
  faqs: z.array(faqSchema).default([]),
  publishedAt: dateOrNull.default(null),
  lastReviewedAt: dateOrNull.default(null),
  reviewDueAt: dateOrNull.default(null),
  reviewer: z.string().nullable().default(null),
  sources: z.array(sourceSchema).default([]),
  locale: z.string().default("en"),
};

export const pillarSchema = z.object({
  ...base,
  order: z.number().int(),
  h1: z.string(),
  intro: z.string(),
  sections: z.array(sectionSchema),
  process: z.object({ heading: z.string(), steps: z.array(z.string()) }).nullable(),
  ctaLabel: z.string(),
});

export const serviceSchema = z.object({
  ...base,
  pillarId: z.string(),
  deliverables: z.array(z.string()),
  audience: z.array(z.string()),
  scope: z.string(),
  exclusions: z.array(z.string()),
  clientResponsibilities: z.array(z.string()),
  countryAvailabilityIds: z.array(z.string()).default([]),
  bodySections: z.array(sectionSchema),
});

export const countrySchema = z.object({
  ...base,
  countryCode: z.string().length(2),
  countryName: z.string(),
  marketStatus: z.enum(["target", "active"]),
  h1: z.string(),
  body: z.array(z.string()).min(1),
  ctaLabel: z.string(),
  generalDisclaimer: z.string(),
  officialSources: z.array(sourceSchema).default([]),
});

export const countryServiceSchema = z
  .object({
    ...base,
    countryId: z.string(),
    serviceId: z.string(),
    availabilitySummary: z.string(),
    scope: z.string(),
    exclusions: z.array(z.string()),
    authorizationReviewStatus: z.enum(["not_required", "pending", "approved"]),
    bodySections: z.array(sectionSchema),
  })
  .superRefine((v, ctx) => {
    if (v.status !== "published") return;
    if (v.authorizationReviewStatus === "pending")
      ctx.addIssue({ code: "custom", message: "Published country-service needs authorization review." });
    if (!v.reviewer || !v.lastReviewedAt || !v.reviewDueAt)
      ctx.addIssue({ code: "custom", message: "Published country-service needs reviewer and review dates." });
  });

export const industrySchema = z.object({
  ...base,
  h1: z.string(),
  body: z.array(z.string()).min(1),
  ctaLabel: z.string(),
});

export type Pillar = z.infer<typeof pillarSchema>;
export type Service = z.infer<typeof serviceSchema>;
export type Country = z.infer<typeof countrySchema>;
export type CountryService = z.infer<typeof countryServiceSchema>;
export type Industry = z.infer<typeof industrySchema>;
