import { ButtonLink, Container } from "@/components/ui";

export const metadata = { title: "Page not found | Accountax", robots: { index: false } };

export default function NotFound() {
  return (
    <section className="bg-ink text-white">
      <Container className="py-24">
        <h1 className="text-4xl font-semibold">This page could not be found</h1>
        <p className="mt-4 max-w-xl text-mist">The page may have moved or may not be available. Try the services overview or contact us.</p>
        <div className="mt-8 flex gap-3"><ButtonLink href="/services/">View services</ButtonLink><ButtonLink href="/contact/" variant="ghost">Contact us</ButtonLink></div>
      </Container>
    </section>
  );
}
