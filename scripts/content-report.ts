/* Content review gate. Run: npm run content:report
   Exits 1 on hard failures so it can run in CI before deploy. */
import { pillars } from "../src/content/pillars";
import { countries } from "../src/content/countries";
import { industries } from "../src/content/industries";
import { insights } from "../src/content/insights";
import { services, countryServices } from "../src/content/services";

type Row = { kind: string; id: string; status: string; reviewer: string | null; lastReviewedAt: string | null; reviewDueAt: string | null; sources: unknown[] };
const today = new Date().toISOString().slice(0, 10);

const all: Row[] = [
  ...pillars.map((x) => ({ kind: "pillar", ...x })),
  ...countries.map((x) => ({ kind: "country", ...x })),
  ...industries.map((x) => ({ kind: "industry", ...x })),
  ...services.map((x) => ({ kind: "service", ...x })),
  ...countryServices.map((x) => ({ kind: "country-service", ...x })),
  ...insights.map((x) => ({ kind: "insight", ...x })),
];

const count: Record<string, Record<string, number>> = {};
for (const r of all) { count[r.kind] ??= {}; count[r.kind][r.status] = (count[r.kind][r.status] ?? 0) + 1; }
console.log("Status by type:");
for (const [k, v] of Object.entries(count)) console.log(`  ${k.padEnd(16)} ${Object.entries(v).map(([s, n]) => `${s}:${n}`).join("  ")}`);

const hard: string[] = [];
const soft: string[] = [];
for (const r of all) {
  const published = r.status === "published";
  const sensitive = r.kind === "country-service" || r.kind === "insight" || r.kind === "service";
  if (published && sensitive && (!r.reviewer || !r.lastReviewedAt || !r.reviewDueAt)) hard.push(`${r.kind} ${r.id}: published without reviewer/review dates`);
  if (published && r.reviewDueAt && r.reviewDueAt < today) hard.push(`${r.kind} ${r.id}: review overdue (${r.reviewDueAt}); pause or re-review`);
  if (published && !sensitive && !r.lastReviewedAt) soft.push(`${r.kind} ${r.id}: published general copy has no recorded review`);
  if (r.status === "in_review") soft.push(`${r.kind} ${r.id}: waiting for approval`);
  if (published && r.kind === "country-service" && r.sources.length === 0) hard.push(`${r.kind} ${r.id}: published with no sources`);
}
if (soft.length) { console.log("\nNeeds attention:"); soft.forEach((s) => console.log("  - " + s)); }
if (hard.length) { console.log("\nBLOCKING:"); hard.forEach((s) => console.log("  x " + s)); process.exit(1); }
console.log("\nNo blocking issues.");
