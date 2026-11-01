"use client";
import { useState } from "react";
import { S } from "./data";

export default function Header() {
  const [on, setOn] = useState(false);
  const [svc, setSvc] = useState(false);
  const close = () => { setOn(false); setSvc(false); };
  const L = ({ h, t }: { h: string; t: string }) => <li><a href={h} onClick={close}>{t}</a></li>;
  // On phones "Services" expands its list; on desktop it stays a normal link with a hover dropdown.
  const servicesClick = (e: React.MouseEvent) => {
    if (window.matchMedia("(max-width: 860px)").matches) { e.preventDefault(); setSvc(!svc); } else close();
  };
  return (
    <header>
      <div className="w bar">
        <a className="logo" href="#top" aria-label="Accountax Consultants home">
          <svg viewBox="0 0 40 36" aria-hidden="true"><path fill="#D4AF57" fillRule="evenodd" d="M20 1 36 35h-7l-2-5H13l-2 5H4zM20 13l-4 11h8z" /><path d="M2 31Q22 12 39 9" stroke="#E7CA82" strokeWidth="2.4" fill="none" /></svg>
          <span>ACCOUNT<b>AX</b></span>
        </a>
        <button id="mb" type="button" aria-label={on ? "Close navigation" : "Open navigation"} aria-expanded={on} aria-controls="nv" onClick={() => { setOn(!on); setSvc(false); }}>
          <span /><span /><span />
        </button>
        <nav id="nv" aria-label="Main" className={on ? "on" : ""}>
          <ul>
            <L h="#top" t="Home" /><L h="#about" t="About" />
            <li className={svc ? "dd open" : "dd"}>
              <a href="#services" aria-haspopup="true" aria-expanded={svc} onClick={servicesClick}>Services<i className="chev" aria-hidden="true" /></a>
              <div className="dd-m">{S.map((x) => <a key={x[0]} href="#services" onClick={close}>{x[0]}</a>)}</div></li>
            <L h="#industries" t="Industries" /><L h="#insights" t="Insights" /><L h="#contact" t="Contact" />
            <li><a href="/portal/login" onClick={close}>Client Login</a></li>
            <li><a className="btn sm" href="#contact" onClick={close}>Get Started</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
