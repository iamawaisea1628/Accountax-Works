import Link from "next/link";
import { site } from "@/content/site";
import { getPillars } from "@/lib/content";
import { Container, Wordmark } from "./ui";

export function Footer() {
  const link = "text-mist hover:text-gold-light";
  return (
    <footer className="bg-ink text-white">
      <Container className="grid gap-10 py-14 md:grid-cols-4">
        <div>
          <Wordmark />
          <p className="mt-4 text-sm text-mist">{site.tagline}</p>
          <p className="mt-4 text-sm"><a className={link} href={`mailto:${site.email}`}>{site.email}</a></p>
          {site.legalEntityName && <p className="mt-4 text-xs text-mist">Accountax is a trading name of {site.legalEntityName}.</p>}
        </div>
        <nav aria-label="Services" className="text-sm">
          <p className="font-semibold">Services</p>
          <ul className="mt-3 space-y-2">
            {getPillars().map((p) => <li key={p.id}><Link className={link} href={`/services/${p.slug}/`}>{p.title}</Link></li>)}
          </ul>
        </nav>
        <nav aria-label="Explore" className="text-sm">
          <p className="font-semibold">Explore</p>
          <ul className="mt-3 space-y-2">
            <li><Link className={link} href="/countries/">Countries &amp; Regions</Link></li>
            <li><Link className={link} href="/industries/">Industries</Link></li>
            <li><Link className={link} href="/about/">About</Link></li>
            <li><Link className={link} href="/contact/">Contact</Link></li>
          </ul>
        </nav>
        <nav aria-label="Legal" className="text-sm">
          <p className="font-semibold">Legal</p>
          <ul className="mt-3 space-y-2">
            <li><Link className={link} href="/privacy/">Privacy notice</Link></li>
            <li><Link className={link} href="/terms/">Website terms</Link></li>
            <li><Link className={link} href="/disclaimer/">Disclaimer</Link></li>
          </ul>
        </nav>
      </Container>
      <div className="border-t border-white/10">
        <Container className="py-6 text-xs text-mist">
          <p>Accounting • Taxation • Advisory • Finance • Analytics</p>
          <p className="mt-2">&copy; {new Date().getFullYear()} Accountax. Information on this website is general and is not a substitute for advice on your specific situation.</p>
        </Container>
      </div>
    </footer>
  );
}
