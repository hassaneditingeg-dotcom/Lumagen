import Link from "next/link";
import { BeforeAfter } from "@/components/marketing/BeforeAfter";
import { BrandStrip } from "@/components/marketing/BrandStrip";
import { Container } from "@/components/marketing/Container";
import { Divider } from "@/components/marketing/Divider";
import { FAQ } from "@/components/marketing/FAQ";
import { Hero3D } from "@/components/marketing/Hero3D";
import { HowItWorks } from "@/components/marketing/HowItWorks";
import { PlatformLogos } from "@/components/marketing/PlatformLogos";
import { PlatformMarquee } from "@/components/marketing/PlatformMarquee";
import { PricingPreview } from "@/components/marketing/PricingPreview";
import { StatsStrip } from "@/components/marketing/StatsStrip";
import { Testimonials } from "@/components/marketing/Testimonials";
import { CTARow, ClaimNote, ProofMetric } from "@/components/marketing/TrustPrimitives";
import { Reveal } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { BRANDS } from "@/lib/brands";
import { FAQ_DATA } from "@/lib/faq";
import { MANIFEST } from "@/lib/gallery/manifest";
import { faqPageSchema } from "@/lib/seo";

export default function HomePage() {
  // Pick a vivid before/after pair from the gallery.
  // "Before" = a raw white-background product shot.
  // "After" = the AI-crafted lifestyle / in-context scene.
  const beforeEntry = MANIFEST["white-bg"][0];
  const afterEntry = MANIFEST.lifestyle[0];

  return (
    <main className="relative z-10">
      <JsonLd id="ld-faq" data={faqPageSchema(FAQ_DATA)} />

      {/* ===========================================================
          HERO
          =========================================================== */}
      <section className="relative overflow-hidden px-6 pt-28 pb-12 sm:pt-32 lg:pt-40 lg:pb-16">
        <div className="hero-mesh" aria-hidden="true">
          <span className="blob-1" />
          <span className="blob-2" />
          <span className="blob-3" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl">
          <div
            className="grid items-center gap-16 lg:grid-cols-[1.3fr_0.7fr] lg:gap-24"
            style={{ containerType: "inline-size" }}
          >
            <Reveal>
              <span className="status-pill hero-enter hero-enter-1">Accepting new ecommerce briefs · May 2026</span>
              <span className="eyebrow mt-7 block hero-enter hero-enter-2">Zero to Hero Studio</span>
              <h1 className="mt-6 text-[length:var(--text-display-2xl)] font-[700] leading-[var(--text-display-2xl--line-height)] tracking-[var(--text-display-2xl--letter-spacing)] hero-enter hero-enter-3">
                Product visuals that make shoppers{" "}
                <span className="accent-gold">trust the click.</span>
              </h1>
              <p className="mt-7 max-w-xl text-[length:var(--text-body-lg)] leading-[var(--text-body-lg--line-height)] text-[color:var(--color-text-mid)] hero-enter hero-enter-4">
                Lumagen A.I turns raw SKU photos into marketplace-ready
                listing carousels, lifestyle scenes, and storefront assets for
                Amazon, TikTok Shop, Shopify, eBay, and Etsy.
              </p>
              <div className="mt-8 grid max-w-xl gap-3 sm:grid-cols-3">
                <ProofMetric
                  value="48h"
                  label="Sample Direction"
                  note="Typical first visual sample for qualified SKU briefs."
                />
                <ProofMetric
                  value="5–9d"
                  label="Full Set"
                  note="Common production window after the direction is approved."
                />
                <ProofMetric
                  value="2x"
                  label="Revisions"
                  note="Included on fixed-scope packages before final export."
                />
              </div>
              <div className="mt-10">
                <CTARow
                  primaryLabel="Request a Sample"
                  secondaryHref="/gallery"
                  secondaryLabel="See the Work"
                  note="No subscription. One scoped project at a time."
                />
              </div>
            </Reveal>

            <div>
              <Hero3D />
            </div>
          </div>
        </div>
      </section>

      {/* ===========================================================
          TRUST STRIP — platform logos + stats
          =========================================================== */}
      <PlatformMarquee />
      <PlatformLogos />
      <StatsStrip />

      <Container>
        <Divider />
      </Container>

      {/* ===========================================================
          HOW IT WORKS
          =========================================================== */}
      <section className="section-ambient-warm px-6 py-28 lg:py-36">
        <Container>
          <Reveal>
            <div className="mb-16 max-w-3xl">
              <span className="eyebrow">How it works</span>
              <h2 className="mt-4 text-[length:var(--text-display-lg)] font-[700] leading-[var(--text-display-lg--line-height)] tracking-[var(--text-display-lg--letter-spacing)]">
                Brief to delivered in days, not months.
              </h2>
              <p className="mt-5 text-[color:var(--color-text-mid)]">
                The whole workflow from your inbox to launch-ready imagery —
                fewer agency handoffs, no studio booking dependency, and a
                clear scope before production starts.
              </p>
            </div>
          </Reveal>
          <HowItWorks />
        </Container>
      </section>

      <Container>
        <Divider />
      </Container>

      {/* ===========================================================
          BEFORE / AFTER
          =========================================================== */}
      {beforeEntry && afterEntry && (
        <section className="relative px-6 py-28 lg:py-36">
          <Container>
            <Reveal>
              <div className="mb-16 grid items-end gap-8 lg:grid-cols-[1fr_1fr]">
                <div>
                  <span className="eyebrow">The transformation</span>
                  <h2 className="mt-4 text-[length:var(--text-display-lg)] font-[700] leading-[var(--text-display-lg--line-height)] tracking-[var(--text-display-lg--letter-spacing)]">
                    From product photo to scroll-stopping listing.
                  </h2>
                </div>
                <p className="max-w-xl text-[color:var(--color-text-mid)] lg:text-right">
                  Drag the slider to compare a raw product photo with the
                  finished AI-crafted scene. Same SKU, same brand, rebuilt for
                  a clearer marketplace first impression.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <BeforeAfter before={beforeEntry} after={afterEntry} />
              <ClaimNote className="mt-4 max-w-3xl">
                Example transformation from the Terra Lotus showcase. Reported
                performance varies by category, traffic source, and offer
                quality; visual clarity is one part of the conversion system.
              </ClaimNote>
            </Reveal>
          </Container>
        </section>
      )}

      <Container>
        <Divider />
      </Container>

      {/* ===========================================================
          SERVICES
          =========================================================== */}
      <section className="relative px-6 py-28 lg:py-40">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="flex items-end justify-between gap-8">
              <div>
                <span className="eyebrow">What we make</span>
                <h2 className="mt-4 max-w-2xl text-[length:var(--text-display-lg)] font-[700] leading-[var(--text-display-lg--line-height)] tracking-[var(--text-display-lg--letter-spacing)]">
                  Six surfaces, one studio.
                </h2>
              </div>
              <Link
                href="/services"
                className="hidden text-sm text-[color:var(--color-text-mid)] hover:text-[color:var(--color-gold-500)] sm:inline-block"
              >
                All Services &rarr;
              </Link>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {SERVICES.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.04}>
                <TiltCard
                  as="article"
                  className={`surface-card p-7 ${i === 0 ? "md:col-span-2" : ""}`}
                >
                  <span className="text-xs font-[600] uppercase tracking-[0.22em] text-[color:var(--color-text-lo)]">
                    {String(i + 1).padStart(2, "0")} ·{" "}
                    <span style={{ color: "var(--color-gold-500)" }}>
                      {s.tag}
                    </span>
                  </span>
                  <h3 className="mt-5 text-[length:var(--text-display-md)] font-[600] tracking-[var(--text-display-md--letter-spacing)]">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-[color:var(--color-text-mid)]">
                    {s.body}
                  </p>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Container>
        <Divider />
      </Container>

      {/* ===========================================================
          SHOWCASE — Terra Lotus
          =========================================================== */}
      <section className="section-ambient-cool px-6 py-28 lg:py-36">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
              <div>
                <span className="eyebrow">Case study</span>
                <h2 className="mt-4 max-w-2xl text-[length:var(--text-display-lg)] font-[700] leading-[var(--text-display-lg--line-height)] tracking-[var(--text-display-lg--letter-spacing)]">
                  {BRANDS[0].name}: botanical skincare, full creative system.
                </h2>
                <p className="mt-5 max-w-2xl text-[color:var(--color-text-mid)]">
                  {BRANDS[0].oneLiner}
                </p>
              </div>
              <Link
                href={`/brands/${BRANDS[0].slug}`}
                className="btn-secondary"
              >
                Read the Case Study
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <BrandStrip
              entries={[
                ...MANIFEST["white-bg"].slice(0, 2),
                ...MANIFEST.lifestyle.slice(0, 3),
                ...MANIFEST.listings.slice(0, 3),
              ]}
              href={`/brands/${BRANDS[0].slug}`}
            />
          </Reveal>
        </div>
      </section>

      <Container>
        <Divider />
      </Container>

      {/* ===========================================================
          PRICING PREVIEW
          =========================================================== */}
      <section className="section-ambient-light px-6 py-28 lg:py-36">
        <Container>
          <Reveal>
            <div className="mb-16 text-center">
              <span className="eyebrow">Popular packages</span>
              <h2 className="mt-4 text-[length:var(--text-display-lg)] font-[700] leading-[var(--text-display-lg--line-height)] tracking-[var(--text-display-lg--letter-spacing)]">
                Pricing you can actually plan around.
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-[color:var(--color-text-mid)]">
                Fixed-scope packages with two revision rounds included.
                Volume discounts on 10+ SKU lines.
              </p>
            </div>
          </Reveal>

          <PricingPreview />

          <Reveal delay={0.2}>
            <p className="mt-10 text-center text-sm text-[color:var(--color-text-lo)]">
              See{" "}
              <Link
                href="/services"
                className="underline decoration-[color:var(--color-border-strong)] underline-offset-4 transition-colors hover:text-[color:var(--color-gold-500)] hover:decoration-[color:var(--color-gold-500)]"
              >
                full pricing across all six services &rarr;
              </Link>
            </p>
          </Reveal>
        </Container>
      </section>

      <Container>
        <Divider />
      </Container>

      {/* ===========================================================
          TESTIMONIALS
          =========================================================== */}
      <section className="section-ambient-cool overflow-hidden px-6 py-28 lg:py-36">
        <Container className="relative z-10">
          <Reveal>
            <div className="mb-16">
              <span className="eyebrow">What founders say</span>
              <h2 className="mt-4 max-w-2xl text-[length:var(--text-display-lg)] font-[700] leading-[var(--text-display-lg--line-height)] tracking-[var(--text-display-lg--letter-spacing)]">
                Trusted by sellers who scale.
              </h2>
            </div>
          </Reveal>
          <Testimonials />
          <ClaimNote className="mx-auto mt-6 max-w-3xl text-center">
            Testimonials are representative client-style outcomes from launch
            showcases and should be read as directional examples, not universal
            performance guarantees.
          </ClaimNote>
        </Container>
      </section>

      <Container>
        <Divider />
      </Container>

      {/* ===========================================================
          FAQ
          =========================================================== */}
      <section className="section-ambient-warm px-6 py-28 lg:py-40">
        <Container>
          <Reveal>
            <div className="mb-16 max-w-3xl">
              <span className="eyebrow">Common questions</span>
              <h2 className="mt-4 text-[length:var(--text-display-lg)] font-[700] leading-[var(--text-display-lg--line-height)] tracking-[var(--text-display-lg--letter-spacing)]">
                What sellers ask before they brief us.
              </h2>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <FAQ />
          </Reveal>
        </Container>
      </section>

      <Container>
        <Divider />
      </Container>

      {/* ===========================================================
          CTA BAND
          =========================================================== */}
      <section className="section-ambient-light px-6 py-28 lg:py-36">
        <Reveal className="mx-auto max-w-4xl text-center">
          <span className="eyebrow">Ready when you are</span>
          <h2 className="mt-5 text-[length:var(--text-display-lg)] font-[700] leading-[var(--text-display-lg--line-height)] tracking-[var(--text-display-lg--letter-spacing)]">
            Send us your product. Get back a qualified sample direction.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-[length:var(--text-body-lg)] text-[color:var(--color-text-mid)]">
            No commitment, no template. A single hero image rendered
            for your actual SKU so you can see what we&rsquo;d deliver
            before signing anything.
          </p>
          <div className="mt-10">
            <CTARow
              primaryLabel="Request a Sample"
              secondaryHref="/gallery"
              secondaryLabel="Browse the Gallery"
              note="Qualified briefs receive a scoped recommendation before production."
              centered
            />
          </div>
        </Reveal>
      </section>
    </main>
  );
}

const SERVICES = [
  {
    tag: "Listings",
    title: "Amazon & TikTok listings",
    body: "Hero shots, infographics, comparison tiles, and lifestyle scenes — built for the shopper's two-second scan.",
  },
  {
    tag: "A+ Content",
    title: "Amazon A+ modules",
    body: "Brand story panels beneath your detail page. Built to your category's conversion playbook.",
  },
  {
    tag: "Storefronts",
    title: "Shopify & Amazon storefronts",
    body: "Branded multi-page storefronts with collection tiles, hero stories, and cross-sell rails that make discovery easier.",
  },
  {
    tag: "Lifestyle",
    title: "Lifestyle photography",
    body: "AI-crafted in-context scenes — products in hands, on counters, in kitchens — without hiring a single model.",
  },
  {
    tag: "Social",
    title: "Social-first creatives",
    body: "Story-aspect Reels, TikTok unboxings, and static posts cut for the algorithm your customers actually use.",
  },
  {
    tag: "Packaging",
    title: "Packaging & label design",
    body: "Brand direction and label refreshes that make the unboxing as good as the imagery.",
  },
];
