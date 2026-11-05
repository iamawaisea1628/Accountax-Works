import type { Metadata, Viewport } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import { SITE } from "../content/site";

const fd = Playfair_Display({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--fd" });
const fb = DM_Sans({ subsets: ["latin"], variable: "--fb" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: "Accountax | Accounting, Taxation, Advisory, Finance, Analytics, Fintech",
  description: "Accounting, taxation support, financial advisory and business intelligence for companies ready to operate with greater clarity and control.",
  applicationName: SITE.name,
  alternates: { canonical: "/" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  openGraph: { title: SITE.name, description: "Clarity in your numbers. Confidence in your decisions.", url: "/", siteName: SITE.name, locale: "en_US", type: "website" },
  twitter: { card: "summary_large_image", title: SITE.name, description: "Clarity in your numbers. Confidence in your decisions." },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover" };

const ld = { "@context": "https://schema.org", "@type": "ProfessionalService", name: SITE.name, url: SITE.url, description: "Accounting, taxation support, financial advisory and business intelligence.", knowsAbout: ["Accounting", "Taxation", "Advisory", "Finance", "Analytics", "Fintech"] };

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
