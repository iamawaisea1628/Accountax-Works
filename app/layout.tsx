import type { Metadata, Viewport } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";

const fd = Playfair_Display({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--fd" });
const fb = DM_Sans({ subsets: ["latin"], variable: "--fb" });

export const metadata: Metadata = {
  title: "Accountax Consultants | Accounting, Taxation, Advisory and Analytics",
  description: "Accounting, tax support, financial advisory and business intelligence for companies ready to operate with greater clarity and control.",
  openGraph: { title: "Accountax Consultants", description: "Clarity in your numbers. Confidence in your decisions.", type: "website" },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover" };

const ld = { "@context": "https://schema.org", "@type": "ProfessionalService", name: "Accountax Consultants", description: "Accounting, taxation support, financial advisory and business intelligence." };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fd.variable} ${fb.variable}`}>
      <body>
        <script type="application/ld+json">{JSON.stringify(ld)}</script>
        {children}
      </body>
    </html>
  );
}
