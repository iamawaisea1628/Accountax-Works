import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export function GET() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", background: "#0d0d0e", display: "flex", flexDirection: "column", justifyContent: "center", padding: 80 }}>
        <div style={{ display: "flex", fontSize: 96, fontWeight: 700, letterSpacing: 8 }}>
          <span style={{ color: "#ffffff" }}>ACCOUNT</span>
          <span style={{ color: "#c9a24b" }}>TAX</span>
        </div>
        <div style={{ marginTop: 28, fontSize: 38, color: "#bdb9af" }}>Your Financial Success. Our Expertise.</div>
        <div style={{ marginTop: 56, width: 160, height: 4, background: "#c9a24b" }} />
        <div style={{ marginTop: 28, fontSize: 26, color: "#bdb9af" }}>Accounting • Taxation • Advisory • Finance • Analytics</div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
