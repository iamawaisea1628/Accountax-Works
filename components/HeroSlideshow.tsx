"use client";
import { useEffect, useState } from "react";

// Crossfading hero background. Auto-advances every 6s, can be paused, and stays still for reduced-motion users.
export default function HeroSlideshow({ slides }: { slides: React.ReactNode[] }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || slides.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((n) => (n + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, [paused, slides.length]);

  return (
    <div className="hs" role="group" aria-roledescription="carousel" aria-label="Hero images">
      {slides.map((s, n) => (
        <div key={n} className={n === i ? "slide on" : "slide"} aria-hidden={n !== i}>{s}</div>
      ))}
      <div className="dots">
        {slides.map((_, n) => (
          <button key={n} type="button" aria-label={`Show slide ${n + 1}`} aria-current={n === i} onClick={() => setI(n)} />
        ))}
        <button type="button" className="pp" aria-label={paused ? "Play slideshow" : "Pause slideshow"} onClick={() => setPaused(!paused)}>
          {paused ? "▶" : "❚❚"}
        </button>
      </div>
    </div>
  );
}
