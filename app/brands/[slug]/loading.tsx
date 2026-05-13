import { Container } from "@/components/marketing/Container";

export default function BrandLoading() {
  return (
    <main className="relative z-10">
      <section className="relative px-6 pt-32 pb-16 lg:pt-40 lg:pb-20">
        <Container>
          <span className="text-sm text-[color:var(--color-text-mid)]">
            &larr; All work
          </span>
          <div className="mt-8 grid gap-12 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <span className="eyebrow">Case study</span>
              <div
                className="skeleton mt-5 h-20 w-3/4 rounded-md"
                style={{ animationDelay: "0ms" }}
              />
              <div
                className="skeleton mt-4 h-5 w-1/2 rounded-md"
                style={{ animationDelay: "120ms" }}
              />
            </div>
            <div
              className="skeleton aspect-square rounded-[var(--radius-lg)]"
              style={{ animationDelay: "200ms" }}
            />
          </div>
        </Container>
      </section>
    </main>
  );
}
