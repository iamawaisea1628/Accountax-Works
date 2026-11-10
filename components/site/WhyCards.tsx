"use client";
import { useEffect, useRef } from "react";
import { Icon } from "./icons";

// Cards flip up into place, a gold bar sweeps across the top and each icon draws itself.
const KEYS = ["layers", "doc", "lock", "eye"];

export default function WhyCards({ items }: { items: [string, string][] }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const cards = Array.from(ref.current?.children ?? []) as HTMLElement[];
    cards.forEach((c, i) => {
      c.style.setProperty("--i", String(i));
      c.querySelectorAll("svg path, svg circle, svg rect, svg ellipse, svg line, svg polyline").forEach((n) => n.setAttribute("pathLength", "1"));
    });
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) { cards.forEach((c) => c.classList.add("in")); return; }
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: 0.25, rootMargin: "0px 0px -6% 0px" });
    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className="g4 why">
      {items.map(([t, d], i) => (
        <div key={t} className="wy">
          <span className="wy-bar" />
          <span className="wy-no" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
          <span className="wy-ico"><Icon k={KEYS[i % KEYS.length]} size={30} /></span>
          <h3>{t}</h3><p>{d}</p>
        </div>
      ))}
    </div>
  );
}
