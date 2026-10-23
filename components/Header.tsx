"use client";
import { useState } from "react";

export default function Header() {
  const [on, setOn] = useState(false);
  const links: [string, string][] = [["#top", "Home"], ["#about", "About"], ["#services", "Services"], ["#industries", "Industries"], ["#faq", "FAQ"]];
  return (
    <header>
      <div className="w bar">
        <a className="logo" href="#top" aria-label="Accountax Consultants home">
          <svg viewBox="0 0 40 36" aria-hidden="true"><path fill="#D4AF57" fillRule="evenodd" d="M20 1 36 35h-7l-2-5H13l-2 5H4zM20 13l-4 11h8z" /><path d="M2 31Q22 12 39 9" stroke="#E7CA82" strokeWidth="2.4" fill="none" /></svg>
          <span>ACCOUNT<b>AX</b></span>
        </a>
        <button id="mb" aria-expanded={on} aria-controls="nv" onClick={() => setOn(!on)}>Menu</button>
        <nav id="nv" aria-label="Main" className={on ? "on" : ""}>
          <ul>
            {links.map(([h, t]) => (<li key={h}><a href={h} onClick={() => setOn(false)}>{t}</a></li>))}
            <li><a className="btn" href="#contact" onClick={() => setOn(false)}>Get Started ✦</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
