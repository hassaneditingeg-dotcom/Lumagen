import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/marketing/Container";
import { Divider } from "@/components/marketing/Divider";
import { PageHero } from "@/components/marketing/PageHero";
import { Section } from "@/components/marketing/Section";
import { Counter } from "@/components/motion/Counter";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { Reveal } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";

export const metadata: Metadata = {
  title: "About",
  description:
    "Cairo-based AI creative studio building listing imagery, storefronts, and A+ content for ecommerce sellers worldwide.",
};

const STATS = [
  { value: 30, suffix: "+", label: "Public gallery samples" },
  { value: 5, suffix: "", label: "Showcase brands planned" },
  { value: 48, suffix: "h", label: "Typical sample direction window" },
  { value: 2, suffix: "", label: "Revision rounds in core packages" },
];

const VALUES = [
  {
    title: "Conversion first",
    body: "Every image is engineered for the two-second scan that decides whether a shopper clicks. We design for the metric, not the moodboard.",
  },
  {
    title: "Brand consistency",
    body: "We treat every SKU like a chapter in the same book — type, palette, lighting, and layout stay coherent across listings, storefronts, and social.",
  },
  {
    title: "Speed without sacrifice",
    body: "AI tooling lets us deliver in days what used to take weeks. The trade-off used to be quality. We've removed it.",
  },
];

export default function AboutPage() {
  return (
    <main className="relative z-10">
      <PageHero
        eyebrow="About"
        title="From Cairo, for the world's products."
        body="Lumagine A.I is a creative studio for ecommerce brands. We build the imagery that turns scrollers into buyers — listing hero shots, A+ Content modules, storefronts, lifestyle scenes, and social-first creatives — using AI tooling sharpened by years of editorial craft."
      />

      <Section spacing="tight">
        <Container>
          <Reveal>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {STATS.map((s) => (
                <div
                  key={s.label}
                  className="border-l border-[color:var(--color-border-strong)] pl-5"
                >
                  <p className="text-[length:var(--text-display-md)] font-[700] tracking-[var(--text-display-md--letter-spacing)]">
                    <Counter value={s.value} suffix={s.suffix} />
                  </p>
                  <p className="mt-2 text-sm text-[color:var(--color-text-mid)]">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </Section>

      <Container>
        <Divider />
      </Container>

      <Section>
        <Container>
          <Reveal>
            <div className="grid gap-16 lg:grid-cols-[1fr_1.4fr]">
              <div>
                <span className="eyebrow">The story</span>
                <h2 className="mt-4 text-[length:var(--text-display-lg)] font-[700] leading-[var(--text-display-lg--line-height)] tracking-[var(--text-display-lg--letter-spacing)]">
                  Built by editors who got tired of waiting on photoshoots.
                </h2>
              </div>
              <div className="space-y-6 text-[length:var(--text-body-lg)] leading-[var(--text-body-lg--line-height)] text-[color:var(--color-text-mid)]">
                <p>
                  Lumagine A.I started where most sellers get stuck: between a
                  great product and a great listing. The product was finished;
                  the imagery wasn&rsquo;t. Studios were booked months out, prices
                  were closer to ad spend than craft costs, and the round-trip
                  between shot, edit, and revision could swallow a launch window.
                </p>
                <p>
                  The new generation of AI tooling collapses that loop into days.
                  But it doesn&rsquo;t replace taste &mdash; it amplifies it. We pair
                  trained creative direction with the speed of AI generation so
                  brands get imagery that feels considered, branded, and
                  conversion-aware, not the uncanny first-draft look most AI
                  outputs settle for.
                </p>
                <p>
                  We start with brands that punch above their weight and grow
                  with them. Terra Lotus is our first showcase &mdash; five SKUs,
                  full listing system, lifestyle library, and A+ Content. More
                  brands launch on the gallery over the coming weeks.
                </p>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Container>
        <Divider />
      </Container>

      <Section>
        <Container>
          <Reveal>
            <span className="eyebrow">How we work</span>
            <h2 className="mt-4 max-w-2xl text-[length:var(--text-display-lg)] font-[700] leading-[var(--text-display-lg--line-height)] tracking-[var(--text-display-lg--letter-spacing)]">
              Three principles, hard-coded.
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.05}>
                <TiltCard as="article" className="surface-card p-7">
                  <h3 className="text-[length:var(--text-display-md)] font-[600] tracking-[var(--text-display-md--letter-spacing)]">
                    {v.title}
                  </h3>
                  <p className="mt-3 text-[color:var(--color-text-mid)]">
                    {v.body}
                  </p>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Reveal className="mx-auto max-w-4xl text-center">
          <h2 className="text-[length:var(--text-display-lg)] font-[700] leading-[var(--text-display-lg--line-height)] tracking-[var(--text-display-lg--letter-spacing)]">
            Want to see what we&rsquo;d do with your product?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-[length:var(--text-body-lg)] text-[color:var(--color-text-mid)]">
            Send us a SKU. Qualified briefs get a sample direction path before
            production &mdash; no commitment.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <MagneticButton href="/contact" className="btn-primary">
              Request a Sample
            </MagneticButton>
            <Link href="/gallery" className="btn-secondary">
              See the gallery
            </Link>
          </div>
        </Reveal>
      </Section>
    </main>
  );
}
