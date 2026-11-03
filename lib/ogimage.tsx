import { ImageResponse } from "next/og";

// Branded 1200x630 card used when a page is shared on social networks or messaging apps.
export function brandCard() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "70px 80px", color: "#F6F3EC", background: "linear-gradient(135deg,#0B0B0B 0%,#241b0c 55%,#0B0B0B 100%)" }}>
        <div style={{ display: "flex", fontSize: 44, letterSpacing: 6, fontWeight: 700 }}>ACCOUNT<span style={{ color: "#D4AF57" }}>AX</span></div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, lineHeight: 1.08, fontWeight: 700, maxWidth: 980 }}>Clarity in Your Numbers.</div>
          <div style={{ fontSize: 76, lineHeight: 1.08, fontWeight: 700, color: "#D4AF57", maxWidth: 980 }}>Confidence in Your Decisions.</div>
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#B8B5AE", letterSpacing: 2 }}>Accounting · Taxation · Advisory · Finance · Analytics · Fintech</div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
