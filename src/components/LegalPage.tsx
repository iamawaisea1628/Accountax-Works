import { Container, PageHeader } from "./ui";

export function LegalPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <>
      <PageHeader crumbs={[{ name: "Home", href: "/" }, { name: title }]} h1={title} />
      <section className="bg-paper on-light">
        <Container className="py-12">
          <p role="note" className="mb-8 max-w-3xl border-l-4 border-gold bg-ivory p-4 text-sm">
            This page is a draft holding notice and is pending legal review. It is not the final legal text.
          </p>
          <div className="prose-ax max-w-3xl text-lg">{children}</div>
        </Container>
      </section>
    </>
  );
}
