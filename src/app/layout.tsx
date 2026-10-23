import type { Metadata } from "next";
import "@fontsource-variable/source-serif-4";
import "@fontsource-variable/public-sans";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/ui";
import { site } from "@/content/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "Accountax", template: "%s" },
  description: "Accounting, taxation, advisory, finance, analytics and finance technology for businesses.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a href="#main" className="skip-link">Skip to main content</a>
        <JsonLd data={{ "@context": "https://schema.org", "@type": "Organization", name: "Accountax", url: site.url, email: site.email }} />
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
