"use client";
import { useEffect, useRef } from "react";

// Animated process flow: steps appear one after another as they scroll into view,
// connected by a line that fills in. Works for 3 to 6 steps.
const ICONS: Record<string, React.ReactNode> = {
  chat: <path d="M4 5h16v11H9l-5 4z" />,
  search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
  doc: <><path d="M6 3h8l4 4v14H6z" /><path d="M14 3v4h4M9 13h6M9 17h6" /></>,
  lock: <><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></>,
  check: <><path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z" /><path d="m9 12 2 2 4-4" /></>,
  loop: <><path d="M20 12a8 8 0 1 1-2.3-5.7" /><path d="M20 4v5h-5" /></>,
  chart: <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />,
  star: <path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z" />,
};
const SETS: Record<number, string[]> = {
  3: ["chat", "doc", "check"],
  4: ["search", "doc", "check", "loop"],
  5: ["chat", "search", "doc", "check", "loop"],
  6: ["chat", "search", "doc", "lock", "check", "loop"],
};
export type FlowStep = { title: string; text: string; sub?: string };

export default function ProcessFlow({ steps }: { steps: FlowStep[] }) {
  const ref = useRef<HTMLOListElement>(null);
  useEffect(() => {
    const items = Array.from(ref.current?.children ?? []) as HTMLElement[];
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      items.forEach((i) => i.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
      { threshold: 0.3, rootMargin: "0px 0px -8% 0px" },
    );
    items.forEach((i) => io.observe(i));
    return () => io.disconnect();
  }, []);
  const n = steps.length;
  const icons = SETS[n] ?? SETS[6];
  return (
    <ol ref={ref} className={`flow n${n}`}>
      {steps.map((s, i) => (
        <li className="fs" key={s.title} style={{ "--i": i } as React.CSSProperties}>
          <div className="node">
            <span className="ring" aria-hidden="true" />
            <span className="core"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{ICONS[icons[i % icons.length]]}</svg></span>
            <b className="badge">{i + 1}</b>
          </div>
          <div className="ft"><h3>{s.title}</h3>{s.sub && <p className="sub">{s.sub}</p>}<p>{s.text}</p></div>
        </li>
      ))}
    </ol>
  );
}
