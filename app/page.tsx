import Link from "next/link";
import { Hero3D } from "@/components/marketing/Hero3D";

export default function HomePage() {
  return (
    <main className="relative z-10">
      {/* ===========================================================
          HERO
          =========================================================== */}
      <section className="relative px-6 pt-28 pb-24 sm:pt-32 lg:pt-40 lg:pb-32">
        <div className="mx-auto max-w-7xl">
          <div
            className="grid items-center gap-16 lg:grid-cols-[1.05fr_1fr] lg:gap-20"
            style={{ containerType: "inline-size" }}
          >
            <div>
              <span className="eyebrow">Zero to Hero Studio</span>
              <h1 className="mt-7 text-[length:var(--text-display-xl)] font-[700] leading-[var(--text-display-xl--line-height)] tracking-[var(--text-display-xl--letter-spacing)]">
                One image.
                <br />
                Infinite possibilities.
              </h1>
              <p className="mt-7 max-w-xl text-[length:var(--text-body-lg)] leading-[var(--text-body-lg--line-height)] text-[color:var(--color-text-mid)]">
                Transform your product photography with AI-powered precision.
                Professional visuals for Amazon, eBay, Etsy, and social
                platforms — engineered for the shopper&rsquo;s two-second scan.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <Link href="/contact" className="btn-primary">
                  Start a project
                </Link>
                <Link href="/gallery" className="btn-secondary">
                  See the work
                </Link>
              </div>
            </div>

            <Hero3D />
          </div>
        </div>
      </section>

      <div className="hairline mx-auto max-w-7xl" />

      {/* ===========================================================
          SERVICES
          =========================================================== */}
      <section className="relative px-6 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-end justify-between gap-8">
            <div>
              <span className="eyebrow">What we make</span>
              <h2 className="mt-4 max-w-2xl text-[length:var(--text-display-lg)] font-[700] leading-[var(--text-display-lg--line-height)] tracking-[var(--text-display-lg--letter-spacing)]">
                Six surfaces, one studio.
              </h2>
            </div>
            <Link
              href="/services"
              className="hidden text-sm text-[color:var(--color-text-mid)] hover:text-[color:var(--color-text-hi)] sm:inline-block"
            >
              All services &rarr;
            </Link>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s, i) => (
              <article key={s.title} className="surface-card p-7">
                <span
                  className="text-xs font-[600] uppercase tracking-[0.22em] text-[color:var(--color-text-lo)]"
                >
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
            ))}
          </div>
        </div>
      </section>

      <div className="hairline mx-auto max-w-7xl" />

      {/* ===========================================================
          CTA BAND
          =========================================================== */}
      <section className="relative px-6 py-24 lg:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <span className="eyebrow">Ready when you are</span>
          <h2 className="mt-5 text-[length:var(--text-display-lg)] font-[700] leading-[var(--text-display-lg--line-height)] tracking-[var(--text-display-lg--letter-spacing)]">
            Send us your product. Get back a sample mockup within 48 hours.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-[length:var(--text-body-lg)] text-[color:var(--color-text-mid)]">
            No commitment, no template — a single hero image rendered for your
            actual SKU so you can see what we&rsquo;d deliver before signing
            anything.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link href="/contact" className="btn-primary">
              Request a sample
            </Link>
            <Link href="/gallery" className="btn-secondary">
              Browse the gallery
            </Link>
          </div>
        </div>
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
