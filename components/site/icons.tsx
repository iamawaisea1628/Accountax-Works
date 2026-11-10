// Drawn icons for the six pillars and for individual offerings.
const P: Record<string, React.ReactNode> = {
  book: <><path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3z" /><path d="M5 17a3 3 0 0 1 3-3h11M9 8h6" /></>,
  taxation: <><path d="M7 3h8l4 4v14H7z" /><path d="M15 3v4h4" /><path d="m10 17 6-6" /><circle cx="10.5" cy="11.5" r="1" /><circle cx="15.5" cy="16.5" r="1" /></>,
  advisory: <><path d="M9 18h6M10 21h4" /><path d="M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z" /></>,
  wallet: <><path d="M3 7a2 2 0 0 1 2-2h13v4" /><path d="M3 7v11a2 2 0 0 0 2 2h14a1 1 0 0 0 1-1v-9a1 1 0 0 0-1-1H5a2 2 0 0 1-2-2" /><circle cx="16" cy="14.5" r="1.2" /></>,
  bars: <><path d="M4 4v16h16" /><rect x="7" y="12" width="3" height="5" /><rect x="12" y="8" width="3" height="9" /><rect x="17" y="5" width="3" height="12" /></>,
  chip: <><rect x="7" y="7" width="10" height="10" rx="2" /><path d="M9 3v4M15 3v4M9 17v4M15 17v4M3 9h4M3 15h4M17 9h4M17 15h4" /><path d="m11 10-1.5 3h3L11 16" /></>,
  users: <><circle cx="9" cy="8" r="3" /><path d="M3 20a6 6 0 0 1 12 0" /><circle cx="17" cy="9" r="2.5" /><path d="M16 14.5a5 5 0 0 1 5 5" /></>,
  loop: <><path d="M20 12a8 8 0 1 1-2.3-5.7" /><path d="M20 4v5h-5" /></>,
  doc: <><path d="M7 3h8l4 4v14H7z" /><path d="M15 3v4h4M10 13h6M10 17h6" /></>,
  chart: <><path d="M4 4v16h16" /><path d="m7 15 4-4 3 3 5-6" /></>,
  trend: <><path d="M3 17l6-6 4 4 8-8" /><path d="M15 7h6v6" /></>,
  coins: <><ellipse cx="12" cy="6" rx="7" ry="3" /><path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6" /><path d="M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" /></>,
  calendar: <><rect x="4" y="5" width="16" height="16" rx="2" /><path d="M4 10h16M9 3v4M15 3v4" /></>,
  gear: <><circle cx="12" cy="12" r="3" /><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" /></>,
  link: <><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1" /><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" /></>,
  spark: <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" />,
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></>,
  shield: <path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z" />,
  check: <><circle cx="12" cy="12" r="9" /><path d="m8 12 3 3 5-6" /></>,
  calc: <><rect x="5" y="3" width="14" height="18" rx="2" /><path d="M8 7h8M8 12h.01M12 12h.01M16 12h.01M8 16h.01M12 16h.01M16 16h.01" /></>,
  percent: <><path d="m5 19 14-14" /><circle cx="7" cy="7" r="2" /><circle cx="17" cy="17" r="2" /></>,
  folder: <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />,
  compass: <><circle cx="12" cy="12" r="9" /><path d="m15.5 8.5-2 5-5 2 2-5z" /></>,
  pie: <><path d="M12 3v9h9" /><path d="M20.5 15A9 9 0 1 1 9 3.5" /></>,
  layers: <><path d="m12 3 9 5-9 5-9-5z" /><path d="m3 13 9 5 9-5" /></>,
  target: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.2" /></>,
  db: <><ellipse cx="12" cy="6" rx="7" ry="3" /><path d="M5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6" /><path d="M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3" /></>,
  code: <path d="m8 8-4 4 4 4M16 8l4 4-4 4M14 5l-4 14" />,
  filter: <path d="M3 5h18l-7 8v6l-4 2v-8z" />,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  move: <path d="M4 8h13l-3-3M20 16H7l3 3" />,
  grid: <><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M4 10h16M4 15h16M10 4v16" /></>,
  history: <><path d="M3 12a9 9 0 1 0 3-6.7" /><path d="M3 4v5h5" /><path d="M12 8v4l3 2" /></>,
  lock: <><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></>,
  eye: <><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></>,
  alert: <><circle cx="12" cy="12" r="9" /><path d="M12 8v5M12 16h.01" /></>,
  user: <><circle cx="12" cy="8" r="3.5" /><path d="M5 20a7 7 0 0 1 14 0" /></>,
};
const PILLAR: Record<string, string> = { accounting: "book", taxation: "taxation", advisory: "advisory", finance: "wallet", analytics: "bars", fintech: "chip" };
const RULES: [RegExp, string][] = [
  [/ai-assisted|document processing/i, "spark"], [/integration/i, "link"],
  [/automation|pipeline|implementation|migration|software|spreadsheet|optimi[sz]ation|process/i, "gear"],
  [/payroll/i, "users"], [/reconcil|catch-up|cleanup/i, "loop"], [/bookkeep/i, "book"],
  [/calendar|close/i, "calendar"], [/budget|forecast|planning|model|decision/i, "trend"],
  [/cash|working-capital|payables|receivables|funding|cfo|outsourced/i, "coins"],
  [/dashboard|power bi|looker|sql|python|kpi|analytic|analysis|profitab/i, "chart"],
  [/cross-border|research|vat|gst/i, "globe"], [/record|organization/i, "shield"],
  [/statement|report|computation|filing|preparation|management/i, "doc"],
];
const EXACT: Record<string, string> = {
  "Bookkeeping": "book", "Payroll accounting": "users", "Reconciliations": "loop", "Payables and receivables support": "coins", "Month-end close": "calendar",
  "Financial statements": "doc", "Management reporting": "bars", "Cleanup and catch-up": "history", "Accounting software support": "gear",
  "Preparation and filing support": "doc", "Computations": "calc", "VAT and GST support": "percent", "Compliance calendars": "calendar", "Records organization": "folder",
  "Planning within applicable law": "compass", "Cross-border research and coordination": "globe", "Payroll compliance support": "users",
  "Budgeting and forecasting": "trend", "Financial planning and analysis": "bars", "Cost and profitability analysis": "pie", "Business financial models": "layers", "KPI reporting": "target", "Business planning support": "compass",
  "Cash-flow management": "trend", "Working-capital management": "coins", "Payables and receivables management": "loop", "Outsourced finance and virtual CFO support": "users", "Finance process design": "gear", "Funding-readiness information": "folder",
  "Power BI dashboards": "bars", "Looker Studio reporting": "chart", "SQL-based analysis": "db", "Python-based workflows": "code", "Financial and operational KPIs": "target", "Revenue and profitability analytics": "pie", "Data cleaning and transformation": "filter", "Automated reporting": "clock",
  "Accounting system implementation": "gear", "Software migration": "move", "Reporting automation": "clock", "Spreadsheet automation": "grid", "Third-party integrations": "link", "Data pipelines": "db", "AI-assisted document processing": "spark", "Finance process optimization": "filter",
};
export const iconKey = (title: string) => EXACT[title] ?? RULES.find(([r]) => r.test(title))?.[1] ?? "check";

export function Icon({ k, size = 30 }: { k: string; size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{P[k] ?? P.check}</svg>;
}
export const PillarIcon = ({ slug, size }: { slug: string; size?: number }) => <Icon k={PILLAR[slug] ?? "check"} size={size} />;
