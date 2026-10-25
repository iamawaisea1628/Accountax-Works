import type { Metadata } from "next";
import "./portal.css";

export const metadata: Metadata = { title: "Client Portal | Accountax Consultants", robots: { index: false, follow: false } };

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return <div className="portal">{children}</div>;
}
