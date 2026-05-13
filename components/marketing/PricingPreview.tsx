import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";

/**
 * PricingPreview — three popular packages, no public dollar amounts.
 * Premium positioning: package contents + scope, with a "Get a quote"
 * CTA into the contact form. Keeps the package shape from lib/services.ts
 * without committing to subscription-style pricing.
 */
const PACKAGES = [
  {
    name: "Starter Listing",
    summary:
      "One product, one purpose. Hero shot + supporting tiles. Perfect for a single-SKU launch.",
    bullets: [
      "1 hero image (marketplace-compliant)",
      "3 infographic tiles",
      "2 revision rounds",
      "Source files + multi-platform exports",
    ],
    href: "/services/listings",
    featured: false,
  },
  {
    name: "Full Listing Carousel",
    summary:
      "Our most-shipped package. The complete listing system designed as one coherent story.",
    bullets: [
      "1 hero + 5 infographic tiles",
      "2 lifestyle / in-context scenes",
      "1 comparison / scale image",
      "Amazon + TikTok Shop exports",
      "2 revision rounds",
    ],
    href: "/services/listings",
    featured: true,
  },
  {
    name: "A+ Content Set",
    summary:
      "Brand story panels beneath your detail page. Built to your category's conversion playbook.",
    bullets: [
      "5–7 A+ modules",
      "Brand story sequence",
      "Comparison vs. category competitors",
      "Mobile-first layouts",
      "All Amazon-spec exports",
    ],
    href: "/services/a-plus",
    featured: false,
  },
];

export function PricingPreview() {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {PACKAGES.map((tier, i) => (
        <Reveal key={tier.name} delay={i * 0.05}>
          <TiltCard
            className={`surface-card relative flex h-full flex-col p-8 ${
              tier.featured ? "ring-1 ring-[color:var(--color-border-strong)]" : ""
            }`}
          >
            {tier.featured && (
              <span
                className="absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-[10px] font-[600] uppercase tracking-[0.18em]"
                style={{
                  background: "var(--color-gold-500)",
                  color: "var(--color-bg-0)",
                  boxShadow: "0 0 24px rgba(201, 168, 76, 0.4)",
                }}
              >
                Most shipped
              </span>
            )}
            <h3 className="text-xl font-[600] tracking-[-0.02em]">{tier.name}</h3>
            <p className="mt-4 text-sm text-[color:var(--color-text-mid)]">
              {tier.summary}
            </p>
            <ul className="mt-7 flex-1 space-y-2.5 text-sm text-[color:var(--color-text-mid)]">
              {tier.bullets.map((b) => (
                <li key={b} className="flex gap-2.5">
                  <CheckIcon />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/contact"
              className={`mt-8 inline-flex h-11 items-center justify-center rounded-full text-sm font-[600] transition-colors ${
                tier.featured
                  ? "bg-[color:var(--color-gold-500)] text-[color:var(--color-bg-0)] hover:bg-[color:var(--color-gold-400)]"
                  : "border border-[color:var(--color-border-strong)] text-[color:var(--color-text-hi)] hover:bg-[rgba(201,168,76,0.06)] hover:border-[color:var(--color-border-bright)]"
              }`}
            >
              Get a quote
            </Link>
          </TiltCard>
        </Reveal>
      ))}
    </div>
  );
}

function CheckIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      className="mt-0.5 shrink-0"
      aria-hidden="true"
    >
      <circle cx="7" cy="7" r="7" fill="rgba(201, 168, 76, 0.12)" />
      <path
        d="M4 7 L6.3 9.2 L10 5"
        stroke="var(--color-gold-500)"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
