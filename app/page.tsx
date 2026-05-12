import Link from "next/link";
import { BrandStrip } from "@/components/marketing/BrandStrip";
import { Divider } from "@/components/marketing/Divider";
import { Hero3D } from "@/components/marketing/Hero3D";
import { PlatformMarquee } from "@/components/marketing/PlatformMarquee";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { Reveal } from "@/components/motion/Reveal";
import { BRANDS } from "@/lib/brands";
import { MANIFEST } from "@/lib/gallery/manifest";

export default function HomePage() {
  return (
    <main className="relative z-10">
      {/* ===========================================================
          HERO
          =========================================================== */}
      <section className="relative px-6 pt-28 pb-12 sm:pt-32 lg:pt-40 lg:pb-16">
        <div className="mx-auto max-w-7xl">
          <div
            className="grid items-center gap-16 lg:grid-cols-[1.05fr_1fr] lg:gap-20"
            style={{ containerType: "inline-size" }}
          >
            <Reveal>
              <span className="status-pill">Available for new projects · May 2026</span>
              <span className="eyebrow mt-7 block">Zero to Hero Studio</span>
              <h1 className="mt-6 text-[length:var(--text-display-2xl)] font-[700] leading-[var(--text-display-2xl--line-height)] tracking-[var(--text-display-2xl--letter-spacing)]">
                One image.
                <br />
                Infinite possibilities.
              </h1>
              <p className="mt-7 max-w-xl text-[length:var(--text-body-lg)] leading-[var(--text-body-lg--line-height)] text-[color:var(--color-text-mid)]">
                Transform your product photography with AI-powered precision.
                Professional visuals for Amazon, eBay, Etsy, and social
                platforms &mdash; engineered for the shopper&rsquo;s
                two-second scan.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <MagneticButton href="/contact" className="btn-primary">
                  Start a project
                </MagneticButton>
                <Link href="/gallery" className="btn-secondary">
                  See the work
                </Link>
              </div>
            </Reveal>

            <div>
              <Hero3D />
            </div>
          </div>
        </div>
      </section>

      {/* ===========================================================
          PLATFORM MARQUEE
          =========================================================== */}
      <div className="relative mt-2 mb-8 lg:mt-6 lg:mb-16">
        <PlatformMarquee />
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <Divider />
      </div>

      {/* ===========================================================
          SERVICES
          =========================================================== */}
      <section className="relative px-6 py-24 lg:py-32">
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
                All services &rarr;
              </Link>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.04}>
                <article className="surface-card p-7">
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
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6">
        <Divider />
      </div>

      {/* ===========================================================
          SHOWCASE — Terra Lotus launch case study
          =========================================================== */}
      <section className="relative px-6 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
              <div>
                <span className="eyebrow">Launch case study</span>
                <h2 className="mt-4 max-w-2xl text-[length:var(--text-display-lg)] font-[700] leading-[var(--text-display-lg--line-height)] tracking-[var(--text-display-lg--letter-spacing)]">
                  {BRANDS[0].name} &mdash; botanical skincare, full creative system.
                </h2>
                <p className="mt-5 max-w-2xl text-[color:var(--color-text-mid)]">
                  {BRANDS[0].oneLiner}
                </p>
              </div>
              <Link
                href={`/brands/${BRANDS[0].slug}`}
                className="btn-secondary"
              >
                Read the case study
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

      <div className="mx-auto max-w-7xl px-6">
        <Divider />
      </div>

      {/* ===========================================================
          CTA BAND
          =========================================================== */}
      <section className="relative px-6 py-24 lg:py-32">
        <Reveal className="mx-auto max-w-4xl text-center">
          <span className="eyebrow">Ready when you are</span>
          <h2 className="mt-5 text-[length:var(--text-display-lg)] font-[700] leading-[var(--text-display-lg--line-height)] tracking-[var(--text-display-lg--letter-spacing)]">
            Send us your product. Get back a sample mockup within 48 hours.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-[length:var(--text-body-lg)] text-[color:var(--color-text-mid)]">
            No commitment, no template &mdash; a single hero image rendered
            for your actual SKU so you can see what we&rsquo;d deliver
            before signing anything.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <MagneticButton href="/contact" className="btn-primary">
              Request a sample
            </MagneticButton>
            <Link href="/gallery" className="btn-secondary">
              Browse the gallery
            </Link>
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
    body: "Branded multi-page storefronts with collection tiles, hero stories, and cross-sell rails that lift AOV.",
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
