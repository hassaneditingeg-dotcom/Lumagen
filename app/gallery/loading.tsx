import { Container } from "@/components/marketing/Container";

export default function GalleryLoading() {
  return (
    <main className="relative z-10">
      <section className="relative px-6 pt-32 pb-10 lg:pt-40 lg:pb-12">
        <Container>
          <span className="eyebrow">Gallery</span>
          <h1 className="mt-6 text-[length:var(--text-display-xl)] font-[700] leading-[var(--text-display-xl--line-height)] tracking-[var(--text-display-xl--letter-spacing)]">
            The work, sorted.
          </h1>
        </Container>
      </section>

      <Container className="py-12">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="skeleton aspect-square overflow-hidden rounded-[var(--radius-md)] border border-[color:var(--color-border)]"
              style={{ animationDelay: `${(i % 4) * 80}ms` }}
            />
          ))}
        </div>
      </Container>
    </main>
  );
}
