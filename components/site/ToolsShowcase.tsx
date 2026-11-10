"use client";
import { useEffect, useRef, useState } from "react";
import { TOOLS_LIST, toolsFor } from "../../content/tools";
import { PillarIcon } from "./icons";

const PILLARS: [string, string][] = [["accounting", "Accounting"], ["taxation", "Taxation"], ["advisory", "Advisory"], ["finance", "Finance"], ["analytics", "Analytics"], ["fintech", "Fintech"]];

// Pass `pillar` to show only that service's tools (no filter tabs). Otherwise visitors can filter by service.
export default function ToolsShowcase({ pillar }: { pillar?: string }) {
  const [f, setF] = useState("all");
  const [seen, setSeen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) { setSeen(true); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } }, { threshold: 0.12 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const active = pillar ?? f;
  const list = active === "all" ? TOOLS_LIST : toolsFor(active);
  const label = PILLARS.find(([k]) => k === active)?.[1];
  return (
    <div ref={ref} className={seen ? "tools2 in" : "tools2"}>
      {!pillar && (
        <div className="tabs2 ttabs" role="tablist" aria-label="Filter tools by service">
          {[["all", "All services"], ...PILLARS].map(([k, l]) => (
            <button key={k} type="button" role="tab" aria-selected={f === k} className={f === k ? "on" : ""} onClick={() => setF(k)}>
              {k !== "all" && <PillarIcon slug={k} size={16} />}{l}
            </button>
          ))}
        </div>
      )}
      <p className="mu tcount" aria-live="polite">{list.length} tools{label ? ` for ${label}` : " across all six services"}</p>
      <ul className="tgrid" key={active}>
        {list.map((t, i) => (
          <li key={t.id} className="tool" style={{ "--i": i } as React.CSSProperties}>
            <span className={t.wide ? "tbadge wide" : "tbadge"}>{/* eslint-disable-next-line @next/next/no-img-element */}<img src={`/tools/${t.id}.svg`} alt="" width={44} height={44} loading="lazy" /></span>
            <span className="tname">{t.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
