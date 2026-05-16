import { Counter } from "@/components/motion/Counter";
import { Container } from "./Container";

/**
 * StatsStrip — three quick metrics above the fold to build credibility
 * before a visitor scrolls. Inspired by Shopify / Stripe trust strips.
 * Numbers animate up via <Counter> on intersection.
 */
const STATS = [
  { value: 3, suffix: "", label: "Marketplace formats shown" },
  { value: 48, suffix: "h", label: "Typical sample window" },
  { value: 2, suffix: "", label: "Revision rounds included" },
];

export function StatsStrip() {
  return (
    <Container className="py-10 lg:py-12">
      <div className="grid grid-cols-3 divide-x divide-[color:var(--color-border-proof)]">
        {STATS.map((s) => (
          <div key={s.label} className="px-4 text-center first:pl-0 last:pr-0">
            <p className="text-[length:var(--text-display-md)] font-[700] tracking-[var(--text-display-md--letter-spacing)] text-[color:var(--color-text-hi)]">
              <Counter value={s.value} suffix={s.suffix} duration={1.8} />
            </p>
            <p className="mt-2 text-xs uppercase tracking-[0.16em] text-[color:var(--color-text-lo)] sm:text-sm">
              {s.label}
            </p>
          </div>
        ))}
      </div>
      <p className="mx-auto mt-5 max-w-2xl text-center text-xs leading-relaxed text-[color:var(--color-text-lo)]">
        Proof strip reflects the current public gallery and common package
        terms. Final scope depends on SKU count, platform specs, and approval
        speed.
      </p>
    </Container>
  );
}
