import { Counter } from "@/components/motion/Counter";
import { Container } from "./Container";

/**
 * StatsStrip — three quick metrics above the fold to build credibility
 * before a visitor scrolls. Inspired by Shopify / Stripe trust strips.
 * Numbers animate up via <Counter> on intersection.
 */
const STATS = [
  { value: 12400, suffix: "+", label: "Images delivered" },
  { value: 48, suffix: "h", label: "Sample turnaround" },
  { value: 8, suffix: "", label: "Platforms covered" },
];

export function StatsStrip() {
  return (
    <Container className="py-10 lg:py-12">
      <div className="grid grid-cols-3 divide-x divide-[color:var(--color-border-strong)]">
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
    </Container>
  );
}
