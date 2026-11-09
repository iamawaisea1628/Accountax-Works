"use client";
import { useEffect, useRef } from "react";
import { Icon, iconKey } from "./icons";

// Children fade and slide in one after another as they scroll into view.
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const items = Array.from(ref.current?.children ?? []) as HTMLElement[];
    items.forEach((el, i) => el.style.setProperty("--i", String(i % 4)));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) { items.forEach((i) => i.classList.add("in")); return; }
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: 0.2, rootMargin: "0px 0px -6% 0px" });
    items.forEach((i) => io.observe(i));
    return () => io.disconnect();
  }, []);
  return ref;
}

export function OfferCards({ items }: { items: [string, string][] }) {
  const ref = useReveal();
  return (
    <div ref={ref} className="g3 rv">
      {items.map(([t, d], i) => (
        <div key={t} className="svc offer"><span className="svc-in">
          <span className="svc-no" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
          <span className="svc-ico" aria-hidden="true"><Icon k={iconKey(t)} /></span>
          <h3>{t}</h3><p>{d}</p>
        </span></div>
      ))}
    </div>
  );
}

export function Problems({ items }: { items: string[] }) {
  const ref = useReveal();
  return <div ref={ref} className="rv probs">{items.map((t) => <div key={t} className="prob"><span className="pico"><Icon k="alert" size={20} /></span><span>{t}</span></div>)}</div>;
}

export function Deliverables({ items }: { items: string[] }) {
  const ref = useReveal();
  return <div ref={ref} className="rv dels">{items.map((t) => <div key={t} className="del"><span className="pico ok"><Icon k="check" size={20} /></span><span>{t}</span></div>)}</div>;
}

export function Chips({ items }: { items: string[] }) {
  const ref = useReveal();
  return <div ref={ref} className="rv chipset">{items.map((t) => <span key={t} className="chip"><Icon k="user" size={16} />{t}</span>)}</div>;
}
