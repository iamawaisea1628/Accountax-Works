import { describe, expect, it } from "vitest";
import { pillars } from "@/content/pillars";
import { countries } from "@/content/countries";
import { industries } from "@/content/industries";
import { insights } from "@/content/insights";
import { countryServiceSchema } from "@/content/schema";
import { getCountries, getIndustries, getInsights, getPillars } from "@/lib/content";
import sitemap from "@/app/sitemap";

const FORBIDDEN = ["our experts", "world-class", "risk-free", "100% compliance", "leading firm", "best in the world", "guaranteed savings"];
const publishedText = () =>
  JSON.stringify([getPillars(), getCountries(), getIndustries(), getInsights()]).toLowerCase();

describe("pillars", () => {
  it("has the six permanent pillars in the agreed order", () => {
    expect(pillars.map((p) => p.title)).toEqual(["Accounting", "Taxation", "Advisory", "Finance", "Analytics", "Finance Technology"]);
    expect(getPillars().map((p) => p.order)).toEqual([1, 2, 3, 4, 5, 6]);
  });
});

describe("countries", () => {
  it("covers the seven target markets", () => {
    expect(countries.map((c) => c.countryCode).sort()).toEqual(["AE", "AU", "CA", "GB", "PK", "SA", "US"]);
  });
});

describe("publication rules", () => {
  it("keeps the accounting-firms industry page unpublished", () => {
    expect(industries.find((i) => i.slug === "accounting-firms")?.status).toBe("draft");
    expect(getIndustries().some((i) => i.slug === "accounting-firms")).toBe(false);
  });
  it("keeps unreviewed insights out of public lists", () => {
    expect(insights.every((i) => i.status !== "published" || (i.reviewer && i.lastReviewedAt))).toBe(true);
  });
  it("rejects a published country-service without review metadata", () => {
    const r = countryServiceSchema.safeParse({
      id: "cs1", slug: "x", title: "t", summary: "s", status: "published", seoTitle: "t", metaDescription: "d",
      primarySearchIntent: "i", countryId: "c", serviceId: "s", availabilitySummary: "a", scope: "s", exclusions: [],
      authorizationReviewStatus: "pending", bodySections: [],
    });
    expect(r.success).toBe(false);
  });
  it("accepts a reviewed published country-service", () => {
    const r = countryServiceSchema.safeParse({
      id: "cs1", slug: "x", title: "t", summary: "s", status: "published", seoTitle: "t", metaDescription: "d",
      primarySearchIntent: "i", countryId: "c", serviceId: "s", availabilitySummary: "a", scope: "s", exclusions: [],
      authorizationReviewStatus: "approved", reviewer: "A", lastReviewedAt: "2026-10-23", reviewDueAt: "2027-04-23", bodySections: [],
    });
    expect(r.success).toBe(true);
  });
});

describe("copy rules", () => {
  it("contains no banned claims", () => {
    const text = publishedText();
    for (const phrase of FORBIDDEN) expect(text).not.toContain(phrase);
  });
  it("shows no unresolved placeholders", () => {
    const text = publishedText();
    for (const p of ["[registered", "lorem", "tbd", "to be added"]) expect(text).not.toContain(p);
  });
  it("has unique SEO titles and descriptions across published pages", () => {
    const all = [...getPillars(), ...getCountries(), ...getIndustries(), ...getInsights()];
    expect(new Set(all.map((p) => p.seoTitle)).size).toBe(all.length);
    expect(new Set(all.map((p) => p.metaDescription)).size).toBe(all.length);
  });
});

describe("sitemap", () => {
  it("lists only published, indexable pages", () => {
    const urls = sitemap().map((s) => s.url);
    expect(urls).toContain("https://accountaxworks.com/services/taxation/");
    expect(urls.some((u) => u.includes("accounting-firms"))).toBe(false);
    expect(urls.some((u) => /privacy|terms|disclaimer/.test(u))).toBe(false);
    expect(urls.some((u) => u.includes("/insights/"))).toBe(false); // none published yet
  });
});
