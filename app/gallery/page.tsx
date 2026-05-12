import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/marketing/Container";
import { GalleryTabs } from "@/components/marketing/GalleryTabs";
import { Section } from "@/components/marketing/Section";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { TABS } from "@/lib/gallery/manifest";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Curated AI-crafted listing, lifestyle, and social media samples across Amazon, TikTok Shop, Shopify, and beyond.",
};

type Search = Promise<{ tab?: string }>;

const VALID_TABS = ["listings", "lifestyle", "social"] as const;
type Tab = (typeof VALID_TABS)[number];

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
  const totalSamples = TABS.listings.length + TABS.lifestyle.length;

  return (
    <main className="relative z-10">
      <section className="relative px-6 pt-32 pb-10 lg:pt-40 lg:pb-12">
        <Container>
          <span className="eyebrow">Gallery</span>
          <h1 className="mt-6 text-[length:var(--text-display-xl)] font-[700] leading-[var(--text-display-xl--line-height)] tracking-[var(--text-display-xl--letter-spacing)]">
            The work, sorted.
          </h1>
          <p className="mt-7 max-w-2xl text-[length:var(--text-body-lg)] leading-[var(--text-body-lg--line-height)] text-[color:var(--color-text-mid)]">
            Hand-picked samples from the Terra Lotus showcase. The full library
            (500+ images across 5 product lines) migrates to our CDN next
            week &mdash; this is the curated preview.
          </p>
        </Container>
      </section>

      <GalleryTabs activeTab={activeTab} />

      <Section spacing="tight">
        <Container>
          <GalleryGrid entries={entries} />
        </Container>
      </Section>

      <Section spacing="tight">
        <Container className="max-w-3xl text-center">
          <div className="surface-card p-10">
            <span className="eyebrow">Want imagery for your brand?</span>
            <h2 className="mt-3 text-[length:var(--text-display-md)] font-[700] tracking-[var(--text-display-md--letter-spacing)]">
              Send us a SKU. We&rsquo;ll come back with a sample.
            </h2>
            <p className="mt-4 text-[color:var(--color-text-mid)]">
              Showing {entries.length} of {totalSamples}+ curated samples &mdash;
              full library lands with our Phase 2 CDN migration.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/contact" className="btn-primary">
                Request a mockup
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
