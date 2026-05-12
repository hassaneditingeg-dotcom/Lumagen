import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/marketing/Container";
import { GalleryTabs } from "@/components/marketing/GalleryTabs";
import { Section } from "@/components/marketing/Section";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "500+ AI-crafted listing, lifestyle, and social media samples — across Amazon, TikTok Shop, Shopify, and beyond.",
};

type Params = Promise<{ tab?: string }>;
type Search = Promise<{ tab?: string }>;

export default async function GalleryPage({
  searchParams,
}: {
  params?: Params;
  searchParams: Search;
}) {
  const { tab } = await searchParams;
  const activeTab =
    tab === "lifestyle" || tab === "social" ? tab : "listings";

  return (
    <main className="relative z-10">
      <section className="relative px-6 pt-32 pb-12 lg:pt-40 lg:pb-16">
        <Container>
          <span className="eyebrow">Gallery</span>
          <h1 className="mt-6 text-[length:var(--text-display-xl)] font-[700] leading-[var(--text-display-xl--line-height)] tracking-[var(--text-display-xl--letter-spacing)]">
            The work, sorted.
          </h1>
          <p className="mt-7 max-w-2xl text-[length:var(--text-body-lg)] leading-[var(--text-body-lg--line-height)] text-[color:var(--color-text-mid)]">
            Over 500 curated AI-crafted samples across listings, lifestyle, and
            social media. The full library is migrating to our CDN this week
            &mdash; preview cards below until then.
          </p>
        </Container>
      </section>

      <GalleryTabs activeTab={activeTab} />

      <Section spacing="tight">
        <Container>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <PreviewCard key={i} index={i} tab={activeTab} />
            ))}
          </div>
        </Container>
      </Section>

      <Section spacing="tight">
        <Container className="max-w-3xl text-center">
          <div className="surface-card p-10">
            <span className="eyebrow">Coming this week</span>
            <h2 className="mt-3 text-[length:var(--text-display-md)] font-[700] tracking-[var(--text-display-md--letter-spacing)]">
              Full library, with lightbox + filter by brand.
            </h2>
            <p className="mt-4 text-[color:var(--color-text-mid)]">
              We&rsquo;re migrating 500+ samples (353 lifestyle · 116 listings ·
              44 white-bg heroes) into our CDN with blur-up previews. Drop your
              email and we&rsquo;ll ping you when it goes live.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/contact" className="btn-primary">
                Get notified
              </Link>
              <Link href="/services" className="btn-secondary">
                Browse services
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}

function PreviewCard({
  index,
  tab,
}: {
  index: number;
  tab: "listings" | "lifestyle" | "social";
}) {
  const labels = {
    listings: ["Hero shot", "Infographic", "Comparison", "Lifestyle tile", "Scale", "A+ panel"],
    lifestyle: ["Kitchen", "Bathroom", "Outdoor", "Hands-on", "Studio", "Travel"],
    social: ["Reel cover", "Story", "Carousel", "Static post", "TikTok", "Ad creative"],
  } as const;
  const samples = labels[tab];
  const sample = samples[index % samples.length];
  const aspect =
    tab === "social" ? "aspect-[9/16]" : tab === "listings" ? "aspect-square" : "aspect-[4/5]";

  // Synthesized gradient + product-tone for visual variety until real images load
  const gradients = [
    "linear-gradient(135deg, #2a2620 0%, #1a1a19 60%, #0d0b09 100%)",
    "linear-gradient(155deg, #3a3328 0%, #1d1915 100%)",
    "linear-gradient(195deg, #2a2620 0%, #131210 100%)",
    "linear-gradient(170deg, #1a1a19 0%, #0e0d0b 100%)",
    "linear-gradient(145deg, #34322d 0%, #15120f 100%)",
  ];
  const bg = gradients[index % gradients.length];

  return (
    <div
      className={`group relative ${aspect} overflow-hidden rounded-[var(--radius-md)] border border-[color:var(--color-border)]`}
      style={{ background: bg }}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-30 transition-opacity duration-500 group-hover:opacity-50"
        style={{
          background:
            "radial-gradient(circle at 50% 40%, rgba(201, 168, 76, 0.18), transparent 70%)",
        }}
      />
      <div className="absolute inset-x-3 bottom-3 z-10 flex items-center justify-between gap-2 text-xs">
        <span className="rounded-full bg-[color:var(--color-bg-0)]/70 px-2.5 py-1 font-[500] text-[color:var(--color-text-hi)] backdrop-blur-md">
          {sample}
        </span>
        <span
          className="rounded-full px-2 py-1 text-[10px] font-[600] uppercase tracking-[0.16em]"
          style={{ color: "var(--color-gold-500)" }}
        >
          Preview
        </span>
      </div>
    </div>
  );
}
