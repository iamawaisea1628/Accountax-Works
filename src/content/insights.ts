import { z } from "zod";
import { insightSchema } from "./schema";

// Articles stay in_review until a human has checked them. Nothing here is tax or legal guidance.
const raw = [
  {
    id: "insight-regular-financial-reports", slug: "financial-reports-small-business-should-review", status: "in_review" as const,
    title: "What Financial Reports Should a Small Business Review Regularly?",
    h1: "What Financial Reports Should a Small Business Review Regularly?",
    summary: "A plain-English guide to the core reports owners can review each month, and the question each one helps answer.",
    seoTitle: "Financial Reports a Small Business Should Review | Accountax",
    metaDescription: "The core financial reports small business owners can review regularly, what each shows, and the questions to ask when reading them.",
    primarySearchIntent: "what financial reports should a small business review",
    category: "Financial reporting and month-end processes", pillarId: "pillar-accounting",
    keywords: [], faqs: [], publishedAt: null, lastReviewedAt: null, reviewDueAt: null, reviewer: null, sources: [], locale: "en",
    summaryPoints: [
      "The income statement shows performance over a period; the balance sheet shows position at a date.",
      "A cash-flow view explains why cash moved, which profit alone does not.",
      "Receivables and payables ageing show who owes you and whom you owe.",
    ],
    bodySections: [
      { heading: "Start with the question, not the report", body: ["Owners tend to get more from reports when they read them with a question in mind: Are we profitable? Do we have enough cash for the next few months? Who is slow to pay? Each of the reports below answers a different question."] },
      { heading: "Income statement (profit and loss)", body: ["The income statement summarizes revenue and expenses over a period. Comparing months, or comparing against a budget, usually tells you more than a single month on its own. Look for categories that moved unexpectedly and ask what changed."] },
      { heading: "Balance sheet", body: ["The balance sheet shows what the business owns and owes at a point in time. It is where unreconciled balances and unusual items tend to show up, which is one reason regular reconciliation matters."] },
      { heading: "Cash flow", body: ["A business can be profitable and still run short of cash if customers pay late or spending is front-loaded. A cash-flow view, even a simple one, helps you see the timing of money in and out."] },
      { heading: "Receivables and payables ageing", body: ["Ageing reports group unpaid invoices by how long they have been outstanding. They help you decide where to follow up and what you will need to pay soon."] },
      { heading: "Limits of this guide", body: ["Which reports matter most depends on your business model and your reporting obligations. This article is general information and not advice for your situation."] },
    ],
  },
];

export const insights = z.array(insightSchema).parse(raw);
