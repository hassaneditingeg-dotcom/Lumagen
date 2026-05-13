import { Container } from "@/components/marketing/Container";

/**
 * Gallery loading skeleton — matches the editorial grid pattern in
 * GalleryGrid.tsx (every 5th tile is a 2×2 feature).
 */
export default function GalleryLoading() {
  return (
    <main className="relative z-10">
      <section className="relative px-6 pt-32 pb-12 lg:pt-44 lg:pb-16">
        <Container>
          <span className="eyebrow">Gallery · Volume 01</span>
          <h1 className="mt-6 text-[length:var(--text-display-2xl)] font-[700] leading-[var(--text-display-2xl--line-height)] tracking-[var(--text-display-2xl--letter-spacing)]">
            The work,
            <br />
            sorted.
          </h1>
        </Container>
      </section>

      <Container className="py-12">
        <div
          className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-5"
          style={{ gridAutoFlow: "dense", gridAutoRows: "minmax(180px, auto)" }}
        >
          {Array.from({ length: 16 }).map((_, i) => {
            const isFeature = i % 5 === 0;
            return (
              <div
                key={i}
                className={`skeleton overflow-hidden rounded-[var(--radius-md)] border border-[color:var(--color-border)] ${
                  isFeature
                    ? "col-span-2 row-span-2 lg:col-span-2 lg:row-span-2"
                    : "col-span-1 row-span-1"
                }`}
                style={{
                  aspectRatio: isFeature ? "1 / 1" : "4 / 5",
                  animationDelay: `${(i % 4) * 80}ms`,
                }}
              />
            );
          })}
        </div>
      </Container>
    </main>
  );
}
