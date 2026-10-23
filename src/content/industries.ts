import { z } from "zod";
import { industrySchema } from "./schema";

const i = (o: { slug: string; name: string; title: string; body: string[]; cta: string; status?: "published" | "draft"; intent: string }) => ({
  id: `industry-${o.slug}`, slug: o.slug, title: o.name, summary: o.body[0].split(". ")[0] + ".",
  status: o.status ?? ("published" as const),
  seoTitle: `${o.title} | Accountax`.slice(0, 70), metaDescription: o.body[0].slice(0, 190),
  primarySearchIntent: o.intent, keywords: [], faqs: [], publishedAt: null, lastReviewedAt: null, reviewDueAt: null,
  reviewer: null, sources: [], locale: "en", h1: o.title, body: o.body, ctaLabel: o.cta,
});

const raw = [
  i({ slug: "ecommerce", name: "Ecommerce and online retail", intent: "ecommerce accounting and reporting",
    title: "Accounting and Reporting Support for Ecommerce Businesses", cta: "Discuss Your Ecommerce Finance Needs",
    body: ["Ecommerce businesses may receive transactions through storefronts, marketplaces, payment processors, refunds, fees, and multiple settlement cycles. Understanding the relationship between sales activity, payment settlements, fees, refunds, inventory information, and accounting records can be important to reliable reporting.",
      "Accountax can discuss relevant bookkeeping, reconciliation, management reporting, analytics, and finance-workflow needs where those services are available. The exact scope depends on the platforms, data access, transaction volume, and reporting objectives."] }),
  i({ slug: "professional-services", name: "Professional services and agencies", intent: "agency financial reporting and planning",
    title: "Financial Reporting and Planning for Agencies and Service Businesses", cta: "Discuss Your Service Business",
    body: ["Service businesses often need visibility into revenue, delivery costs, utilization, operating expenses, receivables, and cash flow. A useful reporting process helps owners review business performance and plan for upcoming commitments.",
      "Accountax can discuss accounting, budgeting, management reporting, profitability analysis, and dashboard requirements based on the business's operating model and available information."] }),
  i({ slug: "startups-and-smes", name: "Startups and SMEs", intent: "accounting for startups and SMEs",
    title: "Accounting and Financial Clarity for Startups and SMEs", cta: "Discuss Your Business's Next Stage",
    body: ["Growing businesses need financial processes that can keep pace with changing transaction volumes, teams, products, and priorities. Establishing clear records and practical reporting routines can help owners understand performance and prepare for decisions.",
      "Accountax can discuss the appropriate combination of accounting, finance, advisory, analytics, and finance technology, subject to current availability and an agreed scope."] }),
  i({ slug: "property-and-real-estate", name: "Property and real estate", intent: "property business accounting and reporting",
    title: "Accounting and Financial Reporting for Property Businesses", cta: "Discuss Your Property Business",
    body: ["Property-related businesses may need to organize transactions by property, project, entity, or activity and understand how costs, income, financing, and cash flow relate. Reporting needs vary substantially by business model and jurisdiction.",
      "Accountax can discuss relevant accounting and reporting workflows, management information, or analytics. Valuation, legal conveyancing, and regulated investment advice are not part of this offering."] }),
  i({ slug: "retail-and-trading", name: "Retail and trading", intent: "retail and trading accounting",
    title: "Accounting and Management Reporting for Retail and Trading Businesses", cta: "Discuss Your Retail or Trading Operations",
    body: ["Retail and trading businesses may need clear information about sales, purchases, supplier balances, stock-related data, cash flow, and margins. Reporting quality depends on consistent records and a clear relationship between operational and financial data.",
      "Accountax can discuss bookkeeping, reconciliations, reporting, planning, and analytics requirements where available."] }),
  i({ slug: "technology-and-saas", name: "Technology and SaaS", intent: "finance and analytics for technology businesses",
    title: "Finance and Analytics Support for Technology Businesses", cta: "Discuss Your Technology Business",
    body: ["Technology businesses may need to review recurring revenue, customer activity, operating costs, cash runway, forecasts, and product or service performance. Useful reporting depends on clear definitions, reliable source data, and an agreed approach to measurement.",
      "Accountax can discuss accounting, forecasting, management reporting, data modelling, and dashboard needs according to the project scope and available services."] }),
  i({ slug: "multi-entity-and-international", name: "Multi-entity and international businesses", intent: "multi-entity and cross-border financial reporting",
    title: "Financial Reporting for Multi-Entity and Cross-Border Operations", cta: "Discuss Your Reporting Requirements",
    body: ["Businesses operating through multiple entities or across borders may need consistent reporting definitions, clear responsibility for source information, and visibility into how different parts of the business contribute to overall performance.",
      "Accountax can discuss reporting, accounting-process, analytics, and planning requirements. Consolidation, intercompany, tax, and jurisdiction-specific work are separately scoped and confirmed against capability and applicable requirements."] }),
  // Draft until the partner/white-label model is confirmed by the owner.
  i({ slug: "accounting-firms", name: "Accounting firms and delivery partners", status: "draft", intent: "white-label accounting delivery support",
    title: "Potential Delivery Support for Accounting Practices", cta: "Discuss Delivery Support",
    body: ["Draft only. Do not publish until the partner model, scope, terms, and operational capacity are confirmed."] }),
];

export const industries = z.array(industrySchema).parse(raw);
