"use client";
import { useEffect } from "react";

// Signs the user out after a period with no activity.
export default function IdleLogout({ minutes = 30 }: { minutes?: number }) {
  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    const out = async () => { try { await fetch("/portal/signout/", { method: "POST" }); } catch { /* still leave */ } window.location.href = "/portal/login/"; };
    const reset = () => { clearTimeout(t); t = setTimeout(out, minutes * 60_000); };
    const events = ["mousemove", "keydown", "click", "scroll", "touchstart"];
    events.forEach((e) => window.addEventListener(e, reset, { passive: true }));
    reset();
    return () => { clearTimeout(t); events.forEach((e) => window.removeEventListener(e, reset)); };
  }, [minutes]);
  return null;
}
