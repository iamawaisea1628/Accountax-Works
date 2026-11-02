export type Block = { h?: string; p?: string[]; ul?: string[] };

export const SITUATIONS: [string, string][] = [
  ["My books are behind or I do not trust the numbers", "accounting"],
  ["I need to understand what applies to me in a country", "taxation"],
  ["I need a budget, forecast or model to decide something", "advisory"],
  ["Cash is tight or unpredictable", "finance"],
  ["I want dashboards instead of manual reports", "analytics"],
  ["I am changing software or want to automate routine work", "fintech"],
];

export const INDUSTRIES: { name: string; blurb: string; problems: string[]; pillars: string[] }[] = [
  { name: "Startups and technology", blurb: "Early-stage and growing technology businesses that need reliable numbers before they have a finance team.", problems: ["Reporting that investors and boards can rely on", "Tracking cash runway and burn", "Subscription and recurring-revenue reporting"], pillars: ["accounting", "advisory", "analytics"] },
  { name: "Ecommerce and online sellers", blurb: "Sellers working across marketplaces, payment platforms and carriers.", problems: ["Reconciling marketplace and payment-platform payouts", "Margin by product and channel", "Sales obligations across several countries"], pillars: ["accounting", "analytics", "fintech"] },
  { name: "Professional services and agencies", blurb: "Firms that sell time and expertise.", problems: ["Project and client profitability", "Recurring revenue and utilization reporting", "Billing and collection routines"], pillars: ["advisory", "analytics", "finance"] },
  { name: "Real estate and property", blurb: "Property owners, developers and managers.", problems: ["Property-level reporting", "Rental income and deposit records", "Records ready for filings"], pillars: ["accounting", "taxation", "finance"] },
  { name: "Retail and trading", blurb: "Businesses that buy and sell goods.", problems: ["Stock and cost records that match the ledger", "Margin visibility by line", "Records organized for filings"], pillars: ["accounting", "taxation", "analytics"] },
  { name: "International and multi-entity groups", blurb: "Groups with several companies, currencies or countries.", problems: ["Consolidated reporting", "Cross-border obligations and coordination", "Consistent processes across entities"], pillars: ["taxation", "advisory", "fintech"] },
  { name: "Accounting practices", blurb: "Practices that need extra delivery capacity without hiring.", problems: ["Outsourced bookkeeping and reporting delivery", "White-label support under your own brand", "Automation of repetitive client work"], pillars: ["accounting", "fintech", "analytics"] },
  { name: "Manufacturing and distribution", blurb: "Producers and distributors with stock and production costs.", problems: ["Cost tracking and stock valuation", "Margin reporting by product", "Purchasing and supplier payment planning"], pillars: ["accounting", "advisory", "finance"] },
];

export const PROCESS: [string, string, string][] = [
  ["Initial discussion", "We listen first.", "A short conversation about your business, your markets, what is not working and what you would like to see. There is no obligation, and no pressure to commit."],
  ["Requirements and eligibility", "We confirm that we are the right fit.", "We confirm the country or countries involved, the services you need, and whether we can do that work there. If we cannot, we say so and, where possible, point you elsewhere."],
  ["Scope and proposal", "Everything in writing.", "You receive a proposal covering deliverables, timelines, the information we need from you, and fees. Fees depend on scope, transaction volume, jurisdiction and complexity."],
  ["Secure onboarding", "Access and confidentiality first.", "We set up secure document exchange through the client portal. Please do not send bank logins, passwords or identity documents by email or through the contact form."],
  ["Delivery and review", "Work checked against the scope.", "We deliver in the agreed rhythm. Work is reviewed before it reaches you, and outputs produced with automation or AI assistance are checked by a person."],
  ["Reporting and improvement", "Regular reporting, steady improvement.", "We review how the engagement is going, tidy what slowed us down, and adjust the scope as your business changes."],
];
export const CLIENT_DUTIES = ["Provide complete and accurate information, and tell us about changes that matter.", "Respond to questions and document requests within the agreed timeframe.", "Review deliverables and approve them where approval is required.", "Keep access credentials secure, and share documents only through the portal."];
export const OUR_COMMITMENTS = ["Agree the scope, deliverables and deadlines in writing before work starts.", "Handle your information on a need-to-know basis.", "Review work before delivery, including anything produced with automation or AI assistance.", "Tell you early when something is missing or a deadline is at risk."];

export const VALUES: [string, string][] = [
  ["Accuracy before speed", "A late correct number is more useful than a fast wrong one. We reconcile and review before we report."],
  ["Plain language", "Reports should be understood by the people who make decisions, not only by accountants."],
  ["Written scope", "Clear agreements protect both sides. We write down what is included, what is not, and who does what."],
  ["Confidentiality", "Client information is handled on a need-to-know basis and shared only through secure channels."],
  ["Human review", "Technology speeds up the work. A person reviews what matters."],
];

export type Article = { slug: string; title: string; category: string; excerpt: string; body: Block[]; related: string[]; image: string };
export const ARTICLES: Article[] = [
  {
    slug: "monthly-financial-reporting", category: "Reporting", image: "insight-1.webp", related: ["accounting", "analytics"],
    title: "How monthly financial reporting improves business decisions",
    excerpt: "A steady monthly rhythm turns accounting records into decisions. Here is what a useful monthly pack contains and how to start.",
    body: [
      { h: "Why a monthly rhythm matters", p: ["Most businesses look at their numbers when something goes wrong: a filing deadline, a bank query, a cash shortage. A monthly rhythm changes that. When figures arrive on the same schedule, trends become visible, and small problems are noticed while they are still small.", "Monthly reporting also makes the accounts better. Questions are asked while memories are fresh, missing documents are chased early, and errors are corrected before they accumulate."] },
      { h: "What a useful monthly pack contains", ul: ["Profit and loss for the month and the year to date, compared with the prior period and with budget if you have one", "A balance sheet with the main balances explained", "A cash summary: what came in, what went out, and the closing position", "Aged receivables and payables", "A short commentary on what changed and why", "A small set of KPIs defined once and reported the same way each month"] },
      { h: "Common mistakes", ul: ["Producing a large pack nobody reads instead of a short one people use", "Changing definitions from month to month, which destroys comparability", "Skipping reconciliations so the numbers cannot be trusted", "Reporting without commentary, which leaves readers to guess"] },
      { h: "Getting started", p: ["Start small. Agree a close date, list the five questions you most want the numbers to answer, and build the pack around those. Improve it each month. A modest report delivered reliably is worth more than an impressive one that arrives late."] },
    ],
  },
  {
    slug: "bookkeeping-vs-management-accounting", category: "Accounting", image: "insight-2.webp", related: ["accounting", "advisory"],
    title: "Bookkeeping vs. management accounting",
    excerpt: "The two are often confused. One records what happened, the other helps you decide what to do next.",
    body: [
      { h: "Bookkeeping: recording what happened", p: ["Bookkeeping is the accurate, timely recording of transactions: sales, purchases, payments, payroll and bank movements. Its job is to produce records that are complete, consistent and reconciled to the bank and other external evidence.", "Good bookkeeping is the foundation. Everything built on top, from financial statements to forecasts, is only as reliable as the records underneath."] },
      { h: "Management accounting: informing decisions", p: ["Management accounting uses those records to answer forward-looking questions. Which products earn the best margin? What will cash look like in three months? Is this client worth the time they take? It involves budgets, forecasts, cost analysis and performance reporting designed for the people running the business."] },
      { h: "How they fit together", ul: ["Bookkeeping answers: what happened, and are the records right?", "Financial statements answer: how did the business perform over a period?", "Management accounting answers: what should we do next, and what might happen?"] },
      { h: "Which do you need first?", p: ["If your records are behind or do not reconcile, start with bookkeeping. If the records are sound but you are making decisions without a budget or forecast, the next step is management accounting. Many businesses need both, in that order."] },
    ],
  },
  {
    slug: "build-a-cash-flow-forecast", category: "Advisory", image: "insight-3.webp", related: ["finance", "advisory"],
    title: "How to build a useful cash-flow forecast",
    excerpt: "A forecast does not need to be complicated. It needs to be honest, regular and updated.",
    body: [
      { h: "Start with the bank balance", p: ["Begin with the cash you actually have today, taken from the bank rather than from the ledger. Every forecast is a story about how that figure changes."] },
      { h: "List the inflows and outflows", ul: ["Expected customer receipts, based on when customers really pay rather than on due dates", "Regular outgoings: payroll, rent, subscriptions, loan repayments", "Supplier payments, based on your payment terms", "Periodic items: filings, insurance, annual renewals", "One-off items: equipment, deposits, planned hires"] },
      { h: "Make it a rolling forecast", p: ["Forecast week by week for the next 13 weeks, then month by month beyond that. Each week, replace last week's forecast with what actually happened and add a new week at the end. The difference between forecast and actual is the most useful information you will get."] },
      { h: "Test the uncomfortable cases", p: ["Ask what happens if your biggest customer pays a month late, or if sales are 20 percent below plan. Knowing your low point in advance lets you act early, with a conversation or a plan, instead of in a crisis."] },
      { h: "Keep it simple", p: ["A forecast that is updated every week beats a sophisticated model that nobody maintains. Choose a format you will keep using."] },
    ],
  },
  {
    slug: "financial-kpis-for-growing-businesses", category: "Reporting", image: "insight-1.webp", related: ["analytics", "advisory"],
    title: "Financial KPIs every growing business should monitor",
    excerpt: "Choose a few measures, define them once and track them consistently. Here are the usual starting points.",
    body: [
      { h: "Fewer, better measures", p: ["Dashboards fail when they try to show everything. A handful of well-defined measures, reviewed regularly, will serve you better than thirty that nobody acts on."] },
      { h: "Common starting points", ul: ["Revenue growth, compared with the previous period and the same period last year", "Gross margin, by product, service or channel", "Operating profit margin", "Cash balance and a rolling view of cash runway", "Days sales outstanding: how long customers take to pay", "Days payable outstanding: how long you take to pay suppliers", "Recurring revenue and churn, if you sell subscriptions", "Revenue per employee or per billable hour, if you sell expertise"] },
      { h: "Define each measure once", p: ["Write down how each KPI is calculated, which accounts feed it and who owns it. When definitions change quietly, comparisons stop meaning anything."] },
      { h: "Connect them to decisions", p: ["For each KPI, ask what you would do if it moved sharply. If the answer is nothing, it probably does not belong on the page."] },
    ],
  },
];
export const articleBySlug = (s: string) => ARTICLES.find((a) => a.slug === s);
export const readingTime = (a: Article) => {
  const words = a.body.flatMap((b) => [...(b.p ?? []), ...(b.ul ?? [])]).join(" ").split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
};

export const LEGAL: Record<string, { title: string; intro: string; sections: Block[] }> = {
  "privacy-policy": {
    title: "Privacy Policy", intro: "This is a draft template that has not yet been reviewed by a lawyer. Bracketed items must be completed before it is relied on.",
    sections: [
      { h: "Who we are", p: ["This website is operated by [Registered company name], referred to as Accountax, we or us. Our registered address is [Registered address]. You can contact us about privacy at [Privacy contact email]."] },
      { h: "Information we collect", ul: ["Details you give us through the contact form: name, business email, country, company, telephone number and your message", "Account details for the client portal: name, email and the documents you or we upload", "Basic technical information needed to run and secure the site"] },
      { h: "What we do not want you to send us", p: ["Please do not send bank logins, passwords, identity documents or financial records through the contact form or by email. Use the client portal once your engagement has started."] },
      { h: "How we use information", ul: ["To respond to your enquiry", "To provide and manage the services you request", "To keep the site and portal secure", "To meet our legal obligations"] },
      { h: "Who we share it with", p: ["We use service providers to host the website, store portal data and send email. They process information only on our instructions. [List providers and their locations before publication.]"] },
      { h: "How long we keep it", p: ["[State retention periods before publication.]"] },
      { h: "Your rights", p: ["Depending on where you live, you may have rights to access, correct or delete your information. Contact us at [Privacy contact email] to make a request. [Add jurisdiction-specific wording before publication.]"] },
    ],
  },
  "terms-of-use": {
    title: "Terms of Use", intro: "This is a draft template that has not yet been reviewed by a lawyer. Bracketed items must be completed before it is relied on.",
    sections: [
      { h: "About these terms", p: ["These terms govern your use of this website and the client portal operated by [Registered company name]. Our professional services are provided under a separate written engagement agreement."] },
      { h: "Website content", p: ["The content on this website is general information. It is not individual accounting, taxation, legal or investment advice. Do not rely on it for decisions without taking advice on your own circumstances."] },
      { h: "Acceptable use", ul: ["Do not attempt to gain unauthorized access to the website or portal", "Do not upload malicious files", "Keep your portal login confidential and tell us promptly if you think it has been compromised"] },
      { h: "Intellectual property", p: ["The website content, design and branding belong to [Registered company name] unless stated otherwise."] },
      { h: "Limitation of liability", p: ["[Add limitation wording reviewed by a lawyer before publication.]"] },
      { h: "Governing law", p: ["[State the governing law and courts before publication.]"] },
    ],
  },
  "professional-disclaimer": {
    title: "Professional Disclaimer", intro: "This is a draft template that has not yet been reviewed by a lawyer.",
    sections: [
      { h: "General information only", p: ["Information on this website is provided for general information. It does not take your circumstances into account and is not individual advice."] },
      { h: "Jurisdiction", p: ["Accounting, taxation and related rules differ by country. We confirm the scope and availability of any service for your jurisdiction before an engagement begins. We do not claim to provide every service in every country."] },
      { h: "Services we do not provide", p: ["We do not provide regulated investment advice. We do not give legal advice."] },
      { h: "Engagement terms", p: ["The services we provide, their limits and each party's responsibilities are set out in a written engagement agreement. Where this website and an engagement agreement differ, the agreement applies."] },
      { h: "Accuracy", p: ["We aim to keep the site accurate, but rules change. Check current requirements with the relevant authority before acting."] },
    ],
  },
  "cookie-policy": {
    title: "Cookie Policy", intro: "This is a draft template that has not yet been reviewed by a lawyer.",
    sections: [
      { h: "What cookies are", p: ["Cookies are small files stored on your device by a website."] },
      { h: "What this site uses", p: ["The public pages of this website do not use advertising or analytics cookies. The client portal uses essential cookies that keep you signed in and keep your session secure. These are necessary for the portal to work and do not require consent in most places."] },
      { h: "If this changes", p: ["If we add analytics or other non-essential cookies, we will update this policy and ask for your consent first where the law requires it."] },
      { h: "Contact", p: ["Questions about cookies can be sent to [Privacy contact email]."] },
    ],
  },
};
