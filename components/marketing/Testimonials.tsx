import { Reveal } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";

/**
 * Testimonials — three quote cards. Placeholder quotes for now;
 * swap with real ones as they come in from Terra Lotus and the
 * next two launches.
 */
const QUOTES = [
  {
    quote:
      "The listing system made the product feel consistent across Amazon and Shopify instead of looking like separate photoshoots.",
    name: "Sarah Patel",
    role: "Founder, Terra Lotus",
    platform: "Amazon · Shopify",
    context: "Showcase brand example",
    initial: "SP",
  },
  {
    quote:
      "The A+ modules gave us a cleaner way to explain the product story without rebuilding the entire storefront first.",
    name: "Marcus Wei",
    role: "Brand Director, North Pine",
    platform: "Amazon · TikTok Shop",
    context: "Representative package use case",
    initial: "MW",
  },
  {
    quote:
      "The team treats every SKU like a chapter of the same book. Our store finally looks like one brand instead of twelve photoshoots stitched together.",
    name: "Layla Hassan",
    role: "Co-founder, Maison Cyra",
    platform: "Shopify · Etsy",
    context: "Brand consistency use case",
    initial: "LH",
  },
];

export function Testimonials() {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {QUOTES.map((q, i) => (
        <Reveal key={q.name} delay={i * 0.06}>
          <TiltCard as="article" className="surface-card relative h-full p-7">
            <QuoteMark />
            <p className="mt-5 text-[length:var(--text-body-lg)] leading-[var(--text-body-lg--line-height)] text-[color:var(--color-text-hi)]">
              &ldquo;{q.quote}&rdquo;
            </p>
            <div className="mt-7 flex items-center gap-3">
              <span
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-[700]"
                style={{
                  background:
                    "linear-gradient(135deg, var(--color-gold-500), var(--color-gold-700))",
                  color: "var(--color-bg-0)",
                  letterSpacing: "0.02em",
                }}
              >
                {q.initial}
              </span>
              <div>
                <p className="text-sm font-[600] text-[color:var(--color-text-hi)]">
                  {q.name}
                </p>
                <p className="text-xs text-[color:var(--color-text-lo)]">
                  {q.role}
                </p>
              </div>
            </div>
            <p className="mt-4 text-[10px] font-[600] uppercase tracking-[0.18em] text-[color:var(--color-text-faint)]">
              {q.context} · {q.platform}
            </p>
          </TiltCard>
        </Reveal>
      ))}
    </div>
  );
}

function QuoteMark() {
  return (
    <svg
      width="32"
      height="24"
      viewBox="0 0 32 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M 4 14 C 4 9 7 5 12 4 L 12 8 C 9 9 8 11 8 14 L 12 14 L 12 20 L 4 20 Z"
        fill="var(--color-gold-500)"
        opacity="0.6"
      />
      <path
        d="M 20 14 C 20 9 23 5 28 4 L 28 8 C 25 9 24 11 24 14 L 28 14 L 28 20 L 20 20 Z"
        fill="var(--color-gold-500)"
        opacity="0.6"
      />
    </svg>
  );
}
