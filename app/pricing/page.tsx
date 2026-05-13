import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/marketing/Container";
import { Divider } from "@/components/marketing/Divider";
import { PageHero } from "@/components/marketing/PageHero";
import { Section } from "@/components/marketing/Section";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { Reveal } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, SITE } from "@/lib/seo";
import { SERVICES } from "@/lib/services";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Transparent fixed-scope pricing across listings, A+ Content, storefronts, lifestyle imagery, social creatives, and packaging. Volume discounts on 10+ SKU lines.",
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  return (
    <main className="relative z-10" id="pricing-main">
      <JsonLd
        id="ld-breadcrumb-pricing"
        data={breadcrumbSchema([
          { name: "Home", url: SITE },
          { name: "Pricing", url: `${SITE}/pricing` },
        ])}
      />

      <PageHero
        eyebrow="Pricing"
        title="Fixed scope. Honest numbers."
        body="Every package ships with two revision rounds included. No hidden fees, no per-image surcharges, no minimum commitment. Volume discounts kick in at 10+ SKU lines."
      />

      <Section spacing="tight">
        <Container>
          <Reveal>
            <div className="grid gap-3 sm:grid-cols-3">
              <Highlight label="Sample delivery" value="48h" />
              <Highlight label="Full set delivery" value="5–9 days" />
              <Highlight label="Revisions included" value="2 rounds" />
            </div>
          </Reveal>
        </Container>
      </Section>

      <Container>
        <Divider />
      </Container>

      {SERVICES.map((service, idx) => (
        <Section key={service.slug} spacing="tight">
          <Container>
            <Reveal>
              <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <span className="eyebrow">
                    {String(idx + 1).padStart(2, "0")} · {service.tag}
                  </span>
                  <h2 className="mt-3 text-[length:var(--text-display-md)] font-[700] tracking-[var(--text-display-md--letter-spacing)]">
                    {service.title}
                  </h2>
                  <p className="mt-2 max-w-2xl text-[color:var(--color-text-mid)]">
                    {service.oneLiner}
                  </p>
                </div>
                <Link
                  href={`/services/${service.slug}`}
                  className="text-sm text-[color:var(--color-text-mid)] hover:text-[color:var(--color-gold-500)]"
                >
                  Full service details &rarr;
                </Link>
              </div>
            </Reveal>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {service.pricing.map((tier, i) => (
                <Reveal key={tier.tier} delay={i * 0.04}>
                  <TiltCard
                    className={`surface-card flex h-full flex-col p-7 ${
                      i === 1
                        ? "ring-1 ring-[color:var(--color-border-strong)]"
                        : ""
                    }`}
                  >
                    <h3 className="text-lg font-[600] tracking-[-0.02em]">
                      {tier.tier}
                    </h3>
                    <p className="mt-4 text-[length:var(--text-display-md)] font-[700] tracking-[var(--text-display-md--letter-spacing)]">
                      {tier.price}
                    </p>
                    <p className="mt-3 flex-1 text-sm text-[color:var(--color-text-mid)]">
                      {tier.description}
                    </p>
                  </TiltCard>
                </Reveal>
              ))}
            </div>
          </Container>

          {idx < SERVICES.length - 1 && (
            <Container className="mt-12">
              <Divider />
            </Container>
          )}
        </Section>
      ))}

      <Section>
        <Reveal className="mx-auto max-w-4xl text-center">
          <h2 className="text-[length:var(--text-display-lg)] font-[700] leading-[var(--text-display-lg--line-height)] tracking-[var(--text-display-lg--letter-spacing)]">
            Not sure which package fits?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-[length:var(--text-body-lg)] text-[color:var(--color-text-mid)]">
            Send a brief on what you&rsquo;re selling and where, and we&rsquo;ll
            tell you which layer to start with — usually it&rsquo;s the listing
            carousel, then A+, then storefront.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <MagneticButton href="/contact" className="btn-primary">
              Get a sample
            </MagneticButton>
            <Link href="/services" className="btn-secondary">
              Explore services
            </Link>
          </div>
        </Reveal>
      </Section>
    </main>
  );
}

function Highlight({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-l border-[color:var(--color-border-strong)] pl-4">
      <p className="text-[length:var(--text-display-md)] font-[700] tracking-[var(--text-display-md--letter-spacing)]">
        {value}
      </p>
      <p className="mt-1 text-xs uppercase tracking-[0.18em] text-[color:var(--color-text-lo)]">
        {label}
      </p>
    </div>
  );
}
