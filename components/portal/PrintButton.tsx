"use client";
export default function PrintButton() {
  return <button className="btn noprint" type="button" onClick={() => window.print()}>Print or Save as PDF</button>;
}
