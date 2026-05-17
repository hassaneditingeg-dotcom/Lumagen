import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/marketing/Container";
import { PageHero } from "@/components/marketing/PageHero";
import { Section } from "@/components/marketing/Section";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { Reveal } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { SERVICES } from "@/lib/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Listings, A+ Content, storefronts, lifestyle imagery, social creatives, and packaging — six creative surfaces for ecommerce brands.",
};

export default function ServicesIndexPage() {
  return (
    <main className="relative z-10">
      <PageHero
        eyebrow="Services"
        title="Six surfaces. One creative system."
        body="Every brand needs six imagery layers to win in modern ecommerce. We build them as one coherent system, not six disconnected jobs."
      />

      <Section spacing="tight">
        <Container>
          <div className="grid gap-5 md:grid-cols-2">
            {SERVICES.map((s, i) => (
              <Reveal key={s.slug} delay={i * 0.04}>
                <TiltCard className="surface-card group relative block">
                  <Link
                    href={`/services/${s.slug}`}
                    className="block p-8"
                  >
                    <div className="flex items-start justify-between gap-6">
                      <div className="flex-1">
                        <span className="text-xs font-[600] uppercase tracking-[0.22em] text-[color:var(--color-text-lo)]">
                          {String(i + 1).padStart(2, "0")} ·{" "}
                          <span style={{ color: "var(--color-gold-500)" }}>
                            {s.tag}
                          </span>
                        </span>
                        <h2 className="mt-4 text-[length:var(--text-display-md)] font-[600] tracking-[var(--text-display-md--letter-spacing)]">
                          {s.title}
                        </h2>
                        <p className="mt-3 text-[color:var(--color-text-mid)]">
                          {s.oneLiner}
                        </p>
                      </div>
                      <ArrowIcon />
                    </div>
                  </Link>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="section-ambient-warm">
        <Reveal className="mx-auto max-w-4xl text-center">
          <h2 className="text-[length:var(--text-display-lg)] font-[700] leading-[var(--text-display-lg--line-height)] tracking-[var(--text-display-lg--letter-spacing)]">
            Not sure which one you need?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-[length:var(--text-body-lg)] text-[color:var(--color-text-mid)]">
            Send a quick brief on what you&rsquo;re selling and where. We&rsquo;ll
            tell you which layer to start with and what the rest looks like.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <MagneticButton href="/contact" className="btn-primary">
              Tell Us About Your Brand
            </MagneticButton>
          </div>
        </Reveal>
      </Section>
    </main>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mt-1 shrink-0 text-[color:var(--color-text-lo)] transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[color:var(--color-gold-500)]"
      aria-hidden="true"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="13 6 19 12 13 18" />
    </svg>
  );
}
