import Link from "next/link";

export default function HomePage() {
  return (
    <main className="relative z-10">
      {/* ===========================================================
          HERO — placeholder for 3D box / TikTok sign
          =========================================================== */}
      <section className="relative px-6 pt-28 pb-24 sm:pt-32 lg:pt-40 lg:pb-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-16 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
            <div>
              <span className="eyebrow">Zero to Hero Studio</span>
              <h1 className="mt-6 text-[length:var(--text-display-xl)] font-[800] leading-[var(--text-display-xl--line-height)] tracking-[var(--text-display-xl--letter-spacing)]">
                Listings that{" "}
                <span style={{ color: "var(--color-gold-500)" }}>convert</span>.
                <br />
                Storefronts that{" "}
                <span
                  className="italic"
                  style={{ color: "var(--color-cyan-400)" }}
                >
                  elevate
                </span>
                .
              </h1>
              <p className="mt-8 max-w-xl text-[length:var(--text-body-lg)] leading-[var(--text-body-lg--line-height)] text-[color:var(--color-text-mid)]">
                Lumagine A.I crafts listing imagery, storefronts, and A+ content
                for Amazon, TikTok Shop, and Shopify sellers. Engineered to lift
                click-through and conversion from day one.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link href="/contact" className="btn-primary">
                  Get a listing
                </Link>
                <Link href="/gallery" className="btn-secondary">
                  See the work
                </Link>
              </div>
            </div>

            {/* 3D placeholders — Phase 3 swaps these for WebM loops */}
            <div className="grid grid-cols-2 gap-5 sm:gap-6 lg:gap-8">
              <PlaceholderTile
                label="Amazon"
                hint="A+ listings"
                accent="gold"
                href="/gallery?tab=listings"
              />
              <PlaceholderTile
                label="TikTok Shop"
                hint="Shoppable creatives"
                accent="cyan"
                href="/gallery?tab=listings"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===========================================================
          SERVICES — what we make
          =========================================================== */}
      <section className="relative px-6 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <span className="eyebrow">What we make</span>
          <h2 className="mt-4 max-w-3xl text-[length:var(--text-display-lg)] font-[700] leading-[var(--text-display-lg--line-height)] tracking-[var(--text-display-lg--letter-spacing)]">
            Five surfaces, one studio.
          </h2>
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <article key={s.title} className="surface-card p-7">
                <span
                  className="eyebrow"
                  style={{ color: "var(--color-cyan-400)" }}
                >
                  {s.tag}
                </span>
                <h3 className="mt-4 text-2xl font-[700] tracking-[-0.02em]">
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

      {/* ===========================================================
          CTA BAND
          =========================================================== */}
      <section className="relative px-6 py-24 lg:py-32">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-[length:var(--text-display-lg)] font-[700] leading-[1.05] tracking-[-0.03em]">
            Ready to ship listings that{" "}
            <span style={{ color: "var(--color-gold-500)" }}>actually</span>{" "}
            move?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-[length:var(--text-body-lg)] text-[color:var(--color-text-mid)]">
            Tell us about your product. We&rsquo;ll come back with a sample
            mockup within 48 hours.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="btn-primary">
              Start a project
            </Link>
            <Link href="/gallery" className="btn-secondary">
              Explore the gallery
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

/* -----------------------------------------------------------------
   Local components — kept inline at Phase 1 scale; will graduate
   to /components/marketing when reused in Phase 2 gallery + about.
   ----------------------------------------------------------------- */

function PlaceholderTile({
  label,
  hint,
  accent,
  href,
}: {
  label: string;
  hint: string;
  accent: "gold" | "cyan";
  href: string;
}) {
  const accentVar = accent === "gold" ? "--color-gold-500" : "--color-cyan-400";
  const shadowVar = accent === "gold" ? "--shadow-gold" : "--shadow-cyan";

  return (
    <Link
      href={href}
      className="group relative aspect-square overflow-hidden rounded-[var(--radius-lg)] transition-transform duration-300 ease-out hover:-translate-y-1"
      style={{
        background:
          "linear-gradient(155deg, var(--color-bg-2), var(--color-bg-1) 60%, var(--color-bg-0))",
        boxShadow: `var(--shadow-lg), var(${shadowVar})`,
        border: "1px solid var(--color-border)",
      }}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-20 transition-opacity duration-500 group-hover:opacity-40"
        style={{
          background: `radial-gradient(circle at 50% 30%, var(${accentVar}), transparent 60%)`,
        }}
      />
      <div className="relative z-10 flex h-full flex-col justify-end p-6 sm:p-8">
        <span className="eyebrow" style={{ color: `var(${accentVar})` }}>
          {hint}
        </span>
        <span className="mt-2 block text-3xl font-[700] tracking-[-0.02em] sm:text-4xl">
          {label}
        </span>
      </div>
    </Link>
  );
}

const SERVICES = [
  {
    tag: "01 — Listings",
    title: "Amazon & TikTok listing images",
    body: "Hero shots, infographics, comparison tiles, and lifestyle scenes — engineered for the shopper's two-second scan.",
  },
  {
    tag: "02 — A+ Content",
    title: "Amazon A+ modules",
    body: "The brand story panels beneath your detail page that turn browsers into buyers. Built to your category's conversion playbook.",
  },
  {
    tag: "03 — Storefronts",
    title: "Shopify & Amazon storefronts",
    body: "Branded multi-page storefronts with collection tiles, hero stories, and cross-sell rails that lift average order value.",
  },
  {
    tag: "04 — Lifestyle",
    title: "Lifestyle photography",
    body: "AI-crafted in-context scenes — products in hands, on counters, in kitchens — without a single hired model.",
  },
  {
    tag: "05 — Social",
    title: "Social-first creatives",
    body: "Story-aspect Reels, TikTok unboxings, and static posts cut and graded for the algorithm your customers actually use.",
  },
  {
    tag: "06 — Coming soon",
    title: "Packaging & label design",
    body: "Brand-direction and label refreshes that make the unboxing as good as the imagery.",
  },
];
