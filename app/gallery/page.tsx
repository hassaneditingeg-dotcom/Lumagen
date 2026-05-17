import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/marketing/Container";
import { GalleryTabs } from "@/components/marketing/GalleryTabs";
import { Section } from "@/components/marketing/Section";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { Reveal } from "@/components/motion/Reveal";
import { TABS } from "@/lib/gallery/manifest";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Curated AI-crafted listing, lifestyle, and social media samples across Amazon, TikTok Shop, Shopify, eBay, and Etsy.",
  alternates: { canonical: "/gallery" },
};

type Search = Promise<{ tab?: string }>;

const VALID_TABS = ["listings", "lifestyle", "social"] as const;
type Tab = (typeof VALID_TABS)[number];

const TAB_COPY: Record<Tab, { eyebrow: string; subhead: string }> = {
  listings: {
    eyebrow: "Listings",
    subhead:
      "Hero shots, infographic tiles, and in-context scenes engineered for the marketplace carousel.",
  },
  lifestyle: {
    eyebrow: "Lifestyle",
    subhead:
      "AI-crafted in-context scenes — products in hands, on counters, in the moments that drive intent.",
  },
  social: {
    eyebrow: "Social",
    subhead:
      "Vertical-first creatives cut for the algorithm your customers actually scroll.",
  },
};

export default async function GalleryPage({
  searchParams,
}: {
  searchParams: Search;
}) {
  const { tab } = await searchParams;
  const activeTab: Tab = VALID_TABS.includes(tab as Tab)
    ? (tab as Tab)
    : "listings";

  const entries = TABS[activeTab];
  const copy = TAB_COPY[activeTab];

  return (
    <main className="relative z-10">
      {/* ===========================================================
          EDITORIAL MAST — left-aligned, generous whitespace.
          =========================================================== */}
      <section className="relative px-6 pt-32 pb-12 lg:pt-44 lg:pb-16">
        <Container>
          <Reveal>
            <div className="grid items-end gap-10 lg:grid-cols-[1.6fr_1fr]">
              <div>
                <span className="eyebrow">Gallery · Volume 01</span>
                <h1 className="mt-6 text-[length:var(--text-display-2xl)] font-[700] leading-[var(--text-display-2xl--line-height)] tracking-[var(--text-display-2xl--letter-spacing)]">
                  The work,
                  <br />
                  sorted.
                </h1>
              </div>
              <p className="max-w-md text-[length:var(--text-body-lg)] leading-[var(--text-body-lg--line-height)] text-[color:var(--color-text-mid)] lg:text-right">
                Thirty hand-picked samples from the Terra Lotus showcase &mdash;
                a sliver of the full library that lives on our CDN. Click any
                tile to view at scale.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ===========================================================
          TABS — inline pills, not sticky.
          =========================================================== */}
      <Container>
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6 border-b border-[color:var(--color-border)] pb-6">
            <GalleryTabs activeTab={activeTab} />
            <p className="max-w-md text-sm text-[color:var(--color-text-mid)] sm:text-right">
              <span
                className="font-[600] uppercase tracking-[0.18em]"
                style={{ color: "var(--color-gold-500)" }}
              >
                {copy.eyebrow}
              </span>{" "}
              &mdash; {copy.subhead}
            </p>
          </div>
        </Reveal>
      </Container>

      {/* ===========================================================
          EDITORIAL GRID
          =========================================================== */}
      <Section spacing="tight">
        <Container>
          <GalleryGrid entries={entries} />
        </Container>
      </Section>

      {/* ===========================================================
          CLOSING NOTE — keep the page quiet at the end.
          =========================================================== */}
      <Section spacing="tight" className="section-ambient-light">
        <Container className="max-w-2xl">
          <Reveal>
            <div className="border-t border-[color:var(--color-border-strong)] pt-12 text-center">
              <span className="eyebrow">For your brand</span>
              <h2 className="mt-3 text-[length:var(--text-display-md)] font-[700] tracking-[var(--text-display-md--letter-spacing)]">
                Want imagery this considered for your SKU line?
              </h2>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <MagneticButton href="/contact" className="btn-primary">
                  Request a Sample
                </MagneticButton>
                <Link href="/services" className="btn-secondary">
                  Browse Services
                </Link>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </main>
  );
}
