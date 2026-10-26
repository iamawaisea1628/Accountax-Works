import { z } from "zod";
import { pillarSchema } from "./schema";

const common = { status: "published" as const, keywords: [], publishedAt: null, lastReviewedAt: null, reviewDueAt: null, reviewer: null, sources: [], locale: "en" };

const raw = [
  {
    ...common, id: "pillar-accounting", slug: "accounting", order: 1, title: "Accounting",
    summary: "Build a more dependable view of your financial position with structured bookkeeping, reconciliations, reporting support, and accounting-process improvement.",
    seoTitle: "Business Accounting & Bookkeeping Services | Accountax",
    metaDescription: "Improve the organization and usefulness of your financial records with bookkeeping, reconciliations, reporting support and accounting-process improvement.",
    primarySearchIntent: "business accounting and bookkeeping services",
    h1: "Accounting That Gives Your Business a Clearer Financial Picture",
    intro: "Good decisions depend on financial information that is organized, consistent, and understandable. Accountax's accounting services are designed to help businesses maintain clearer records, improve routine accounting processes, and prepare useful financial information for management and other agreed purposes.",
    sections: [
      { heading: "Start with the records", body: ["We begin by understanding your current accounting method, transaction volume, systems, reporting needs, and the state of the existing records. We then agree what needs to be organized, reconciled, reviewed, or reported and identify any information that must be supplied by your team."] },
      { heading: "What the engagement may include", body: ["Depending on the agreed scope, work may include transaction processing, reconciliation schedules, exception lists, close checklists, reporting packs, and documentation of recurring procedures. Deliverables and review responsibilities are stated in the engagement agreement."] },
    ],
    process: { heading: "A practical process", steps: ["Review current records and systems.", "Agree the period, accounts, deliverables, and responsibilities.", "Process and reconcile the agreed information.", "Communicate exceptions and missing documents.", "Deliver the agreed outputs and next-step recommendations."] },
    ctaLabel: "Discuss Your Accounting Needs",
    faqs: [
      { question: "Can you clean up historical bookkeeping?", answer: "Historical cleanup may be considered after the volume, period, condition of records, systems, and deadline are reviewed." },
      { question: "Which accounting software do you support?", answer: "Support depends on the specific system and what you need done. Tell us which software you use and we will confirm during scoping." },
      { question: "Will I receive financial statements?", answer: "The engagement scope specifies which reports or statements are included and what review or approval is required." },
    ],
  },
  {
    ...common, id: "pillar-taxation", slug: "taxation", order: 2, title: "Taxation",
    summary: "Understand your tax-related requirements and organize the information needed for relevant filings and compliance work. Services are scoped by jurisdiction and subject to applicable authorization and capability.",
    seoTitle: "Business Tax Support & Tax Compliance | Accountax",
    metaDescription: "Discuss business tax preparation, tax records and jurisdiction-specific compliance support, subject to confirmed service availability and local requirements.",
    primarySearchIntent: "business tax support and compliance",
    h1: "Tax Support Scoped to Your Business and Jurisdiction",
    intro: "Tax requirements depend on where a business operates, its legal structure, its activities, and its circumstances. Accountax's taxation pillar is designed to help clients identify the relevant scope of tax-related support and organize the information required for agreed work.",
    sections: [
      { heading: "Scope and safeguards", body: ["Tax work is country-specific. Before confirming an engagement, we establish the jurisdiction, type of taxpayer, relevant period, requested work, deadlines, source documentation, and whether any professional authorization is required.", "We do not claim to provide representation, sign returns, give regulated advice, or act before a tax authority unless the relevant permission and service have been confirmed for that jurisdiction."] },
    ],
    process: { heading: "How tax-related work is scoped", steps: ["Identify the country and the type of tax-related question.", "Clarify the requested deliverable and applicable period.", "Confirm service availability, authorization requirements, and the information needed.", "Agree the scope and responsibilities.", "Complete only the approved work and communicate any issues or referrals."] },
    ctaLabel: "Discuss a Tax-Related Requirement",
    faqs: [
      { question: "Does tax support differ by country?", answer: "Yes. Rules, terminology, deadlines, and professional requirements vary by jurisdiction, so scope and availability are checked for each country." },
      { question: "Can you guarantee compliance?", answer: "No. The engagement defines the work performed, the information supplied by the client, limitations, and responsibilities." },
      { question: "Do you provide tax authority representation?", answer: "We do not currently advertise representation before tax authorities. Tell us the country and what you need, and we will confirm what is available." },
      { question: "Do you publish current tax rates and deadlines here?", answer: "Not on this page. Where tax information is published on this site, it will cite official sources and show a review date. For current rules, check the relevant tax authority." },
    ],
  },
  {
    ...common, id: "pillar-advisory", slug: "advisory", order: 3, title: "Advisory",
    summary: "Turn financial information into practical business questions, options, and action plans, from profitability analysis to process improvement and business planning.",
    seoTitle: "Business & Financial Advisory Services | Accountax",
    metaDescription: "Explore practical business and financial advisory support, including profitability analysis, business planning and process improvement, subject to agreed scope.",
    primarySearchIntent: "business and financial advisory services",
    h1: "Practical Financial Insight for Business Decisions",
    intro: "Business decisions are stronger when assumptions, financial implications, and operational realities are considered together. Accountax's advisory services help structure business questions, interpret available information, compare options, and identify practical next steps.",
    sections: [
      { heading: "What advisory work may involve", body: ["An engagement may begin with a defined business question, review of available records, discussion of assumptions, and analysis of possible options. The final deliverable may be a report, presentation, action plan, or working session, depending on the agreed scope."] },
    ],
    process: null,
    ctaLabel: "Discuss a Business Decision",
    faqs: [
      { question: "What should I bring to an advisory discussion?", answer: "A short description of the decision, business context, relevant figures, constraints, and the outcome you need." },
      { question: "Do you make decisions for the business?", answer: "No. Management retains responsibility for its decisions. Accountax can provide analysis and recommendations within the agreed scope." },
      { question: "Can advisory be combined with accounting or analytics?", answer: "Where available, related services can be scoped together to connect records, analysis, and action planning." },
    ],
  },
  {
    ...common, id: "pillar-finance", slug: "finance", order: 4, title: "Finance",
    summary: "Improve visibility over budgets, forecasts, cash flow, and management reporting so decisions are supported by a clearer financial picture.",
    seoTitle: "Financial Planning, Forecasting & Management Reporting | Accountax",
    metaDescription: "Improve financial visibility with budgeting, forecasting, cash-flow planning and management reporting support, based on an agreed business scope.",
    primarySearchIntent: "financial planning, forecasting and management reporting",
    h1: "Plan Ahead with Clearer Financial Information",
    intro: "Historical results explain part of a business's story; budgets, forecasts, and cash-flow views help leaders consider what may come next. Accountax's finance services focus on organizing forward-looking information and management reports that support planning and decisions.",
    sections: [
      { heading: "Make assumptions visible", body: ["A useful forecast explains its assumptions, inputs, limitations, and update process. We aim to make the basis of a report clear so the business can review what has changed and understand which assumptions need attention."] },
    ],
    process: null,
    ctaLabel: "Discuss Your Finance and Planning Needs",
    faqs: [
      { question: "Can you prepare a budget from scratch?", answer: "This can be considered after reviewing the business model, available historical information, planning horizon, and required level of detail." },
      { question: "How often should a forecast be updated?", answer: "It depends on business volatility, decision needs, available data, and the agreed engagement." },
      { question: "Is a forecast a guarantee of future results?", answer: "No. Forecasts are based on assumptions and should be treated as planning tools, not guarantees." },
    ],
  },
  {
    ...common, id: "pillar-analytics", slug: "analytics", order: 5, title: "Analytics",
    summary: "Use data models, dashboards, and analysis to make business information easier to explore, compare, and act on.",
    seoTitle: "Business Intelligence, Financial Analytics & Dashboards | Accountax",
    metaDescription: "Turn business and finance data into clearer reporting through analytics, dashboards, data modelling and reporting automation, where available.",
    primarySearchIntent: "business intelligence and financial analytics dashboards",
    h1: "Turn Business Data into Useful Insight",
    intro: "Businesses often have useful data spread across accounting systems, spreadsheets, ecommerce platforms, and operational tools. Accountax's analytics pillar focuses on organizing relevant data and presenting it in ways that make trends, exceptions, and performance easier to examine.",
    sections: [
      { heading: "Start with the decision, not the chart", body: ["An effective dashboard starts with the questions users need to answer. We identify the intended audience, definitions, data sources, refresh needs, access requirements, and limitations before shaping the reporting experience."] },
      { heading: "Possible deliverables", body: ["Depending on scope: KPI definitions, data mapping, transformation logic, dashboards, reconciliation checks, documentation, and user handover. The engagement clarifies data ownership, access, refresh responsibility, and maintenance arrangements."] },
    ],
    process: null,
    ctaLabel: "Discuss a Reporting or Analytics Project",
    faqs: [
      { question: "Can you combine data from multiple sources?", answer: "This depends on source access, data quality, technical constraints, permissions, and the agreed project scope." },
      { question: "Can dashboards replace accounting controls?", answer: "No. Dashboards support analysis but do not replace sound accounting records, reconciliations, access controls, or review procedures." },
      { question: "Will the dashboard update automatically?", answer: "Refresh behavior depends on the data sources, infrastructure, licenses, and setup. It is specified and tested, not assumed." },
    ],
  },
  {
    ...common, id: "pillar-finance-technology", slug: "finance-technology", order: 6, title: "Finance Technology",
    summary: "Improve the systems behind finance through accounting software setup, integrations, workflow design, and appropriately scoped automation.",
    seoTitle: "Accounting Systems, Finance Automation & Integrations | Accountax",
    metaDescription: "Improve finance workflows with accounting-system setup, integrations, process design and appropriately scoped automation.",
    primarySearchIntent: "accounting systems, finance automation and integrations",
    h1: "Better Systems for More Connected Finance Work",
    intro: "Finance teams rely on systems and processes to collect transactions, maintain records, produce reports, and coordinate work. Accountax's Finance Technology pillar focuses on making these workflows more coherent through suitable accounting tools, integrations, documentation, and automation.",
    sections: [
      { heading: "Automate with controls", body: ["Automation should have a defined purpose, appropriate access, validation, exception handling, and a clear human review path. Sensitive financial actions are not automated without suitable authorization, testing, monitoring, and fallback procedures."] },
    ],
    process: { heading: "How a systems project runs", steps: ["Map the current workflow and its pain points.", "Define requirements, systems, permissions, and data flows.", "Design a proportionate solution.", "Test expected outcomes, exceptions, and access controls.", "Document the workflow and agree support responsibilities."] },
    ctaLabel: "Discuss a Finance Technology Project",
    faqs: [
      { question: "Can you automate every finance process?", answer: "No. Some processes require human judgment, authorization, or controls. Suitability is assessed before implementation." },
      { question: "Will you work with our existing software?", answer: "Compatibility depends on the product, access, integrations, and requirements. We confirm the specific system during scoping." },
      { question: "Does automation eliminate review?", answer: "No. Appropriate review, reconciliation, monitoring, and exception handling remain important." },
    ],
  },
];

export const pillars = z.array(pillarSchema).parse(raw);
