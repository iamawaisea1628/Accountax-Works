"use client";
import { useEffect, useState } from "react";

// Phone and tablet menu: a top bar with a hamburger that opens the sidebar as a slide-in drawer.
// On desktop this renders nothing visible (the CSS hides it).
export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("keydown", onKey); document.body.classList.remove("menu-open"); };
  }, [open]);

  return (
    <>
      <div className="mbar">
        <button type="button" className="burger" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="portal-side" onClick={() => setOpen(!open)}>
          <span /><span /><span />
        </button>
        <a className="logo" href="/" aria-label="Accountax home"><span>ACCOUNT<b>AX</b></span></a>
      </div>
      {open && <button type="button" className="scrim" aria-label="Close menu" onClick={() => setOpen(false)} />}
    </>
  );
}
