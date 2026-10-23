"use client";
import Link from "next/link";
import { useState } from "react";
import { Wordmark } from "./ui";

const baseNav = [
  { href: "/services/", label: "Services" },
  { href: "/countries/", label: "Countries & Regions" },
  { href: "/industries/", label: "Industries" },
  { href: "/about/", label: "About" },
];
const insightsLink = { href: "/insights/", label: "Insights" };

export function Header({ showInsights = false }: { showInsights?: boolean }) {
  const [open, setOpen] = useState(false);
  const nav = showInsights ? [...baseNav.slice(0, 3), insightsLink, ...baseNav.slice(3)] : baseNav;
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink">
      <div className="mx-auto flex h-16 max-w-page items-center justify-between px-5 sm:px-8">
        <Link href="/" aria-label="Accountax home"><Wordmark /></Link>
        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
          {nav.map((n) => <Link key={n.href} href={n.href} className="text-sm text-white/90 hover:text-gold-light">{n.label}</Link>)}
          <Link href="/contact/" className="bg-gold px-4 py-2 text-sm font-semibold text-ink hover:bg-gold-light">Get a Consultation</Link>
        </nav>
        <button type="button" className="min-h-11 px-3 text-sm text-white lg:hidden" aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen(!open)}>
          {open ? "Close" : "Menu"}
        </button>
      </div>
      {open && (
        <nav id="mobile-nav" aria-label="Primary mobile" className="border-t border-white/10 bg-ink px-5 pb-6 lg:hidden">
          <ul>
            {[...nav, { href: "/contact/", label: "Get a Consultation" }].map((n) => (
              <li key={n.href}><Link href={n.href} onClick={() => setOpen(false)} className="block py-3 text-white">{n.label}</Link></li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
