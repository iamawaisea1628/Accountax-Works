"use client";
import { useEffect, useRef } from "react";
import { INDUSTRIES } from "../../content/pages";
import { bySlug } from "../../content/services";
import { Icon } from "./icons";

const ICON: Record<string, string> = {
  "Startups and technology": "rocket",
  "Ecommerce and online sellers": "cart",
  "Professional services and agencies": "briefcase",
  "Real estate and property": "building",
  "Retail and trading": "store",
  "International and multi-entity groups": "globe",
  "Accounting practices": "users",
  "Manufacturing and distribution": "factory",
};

export default function IndustryCards({ detailed = false }: { detailed?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const cards = Array.from(el.children) as HTMLElement[];
    if (!("IntersectionObserver" in window)) { cards.forEach((c) => c.classList.add("in")); return; }
    const io = new IntersectionObserver((es) => { if (es.some((e) => e.isIntersecting)) { cards.forEach((c) => c.classList.add("in")); io.disconnect(); } }, { threshold: 0.05, rootMargin: "0px 0px -8% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const move = (e: React.PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <div className="g4 ind2" ref={ref}>
      {INDUSTRIES.map((i, n) => (
        <article className="ind2c" key={i.name} style={{ ["--i" as string]: n }} onPointerMove={move}>
          <span className="ind-ico"><Icon k={ICON[i.name] ?? "check"} size={30} /></span>
          <h3>{i.name}</h3>
          <p className="ind-b">{i.blurb}</p>
          {detailed && (
            <ul className="ind-needs">{i.problems.map((p) => <li key={p}>{p}</li>)}</ul>
          )}
          <p className="ind-pills">{i.pillars.map((p) => <a className="tag" key={p} href={`/services/${p}/`}>{bySlug(p)!.name}</a>)}</p>
        </article>
      ))}
    </div>
  );
}
