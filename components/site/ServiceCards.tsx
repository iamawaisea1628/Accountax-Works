"use client";
import { useEffect, useRef } from "react";
import { SERVICES } from "../../content/services";

// One drawn icon per service pillar.
const ICONS: Record<string, React.ReactNode> = {
  accounting: <><path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3z" /><path d="M5 17a3 3 0 0 1 3-3h11" /><path d="M9 8h6M9 11h4" /></>,
  taxation: <><path d="M7 3h8l4 4v14H7z" /><path d="M15 3v4h4" /><path d="m10 17 6-6" /><circle cx="10.5" cy="11.5" r="1" /><circle cx="15.5" cy="16.5" r="1" /></>,
  advisory: <><path d="M9 18h6M10 21h4" /><path d="M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z" /></>,
  finance: <><path d="M3 7a2 2 0 0 1 2-2h13v4" /><path d="M3 7v11a2 2 0 0 0 2 2h14a1 1 0 0 0 1-1v-9a1 1 0 0 0-1-1H5a2 2 0 0 1-2-2" /><circle cx="16" cy="14.5" r="1.2" /></>,
  analytics: <><path d="M4 4v16h16" /><rect x="7" y="12" width="3" height="5" /><rect x="12" y="8" width="3" height="9" /><rect x="17" y="5" width="3" height="12" /></>,
  fintech: <><rect x="7" y="7" width="10" height="10" rx="2" /><path d="M9 3v4M15 3v4M9 17v4M15 17v4M3 9h4M3 15h4M17 9h4M17 15h4" /><path d="m11 10-1.5 3h3L11 16" /></>,
};

export default function ServiceCards({ only, compact = false }: { only?: string[]; compact?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const items = Array.from(ref.current?.children ?? []) as HTMLElement[];
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      items.forEach((i) => i.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
      { threshold: 0.2, rootMargin: "0px 0px -6% 0px" },
    );
    items.forEach((i) => io.observe(i));
    return () => io.disconnect();
  }, []);
  const list = only ? SERVICES.filter((s) => only.includes(s.slug)) : SERVICES;
  return (
    <div ref={ref} className="g3 svcgrid">
      {list.map((s, i) => (
        <a key={s.slug} href={`/services/${s.slug}/`} className={compact ? "svc compact" : "svc"} style={{ "--i": i % 3 } as React.CSSProperties}>
          <span className="svc-in">
            <span className="svc-no" aria-hidden="true">{String(s.order).padStart(2, "0")}</span>
            <span className="svc-ico" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{ICONS[s.slug]}</svg></span>
            <h3>{s.name}</h3>
            <p>{s.lead}</p>
            {!compact && <ul className="svc-list">{s.offerings.slice(0, 3).map(([t]) => <li key={t}>{t}</li>)}</ul>}
            <span className="svc-go">Explore {s.name}<i aria-hidden="true">→</i></span>
          </span>
        </a>
      ))}
    </div>
  );
}
