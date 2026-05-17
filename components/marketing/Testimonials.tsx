"use client";

import { useState } from "react";
import { Reveal } from "@/components/motion/Reveal";

const QUOTES = [
  {
    quote:
      "The listing system made the product feel consistent across Amazon and Shopify instead of looking like separate photoshoots.",
    name: "Diana Fray",
    role: "Founder, Field & Spruce",
    platform: "Amazon · Shopify",
    context: "Showcase brand example",
    initial: "DF",
  },
  {
    quote:
      "The A+ modules gave us a cleaner way to explain the product story without rebuilding the entire storefront first.",
    name: "Orin Voss",
    role: "Brand Director, North Pine Goods",
    platform: "Amazon · TikTok Shop",
    context: "Representative package use case",
    initial: "OV",
  },
  {
    quote:
      "The team treats every SKU like a chapter of the same book. Our store finally looks like one brand instead of twelve photoshoots stitched together.",
    name: "Romy Beltran",
    role: "Co-founder, Maison Cyra",
    platform: "Shopify · Etsy",
    context: "Brand consistency use case",
    initial: "RB",
  },
];

export function Testimonials() {
  const [active, setActive] = useState(0);

  if (QUOTES.length === 0) {
    return (
      <div className="mx-auto max-w-3xl py-16 text-center">
        <p className="text-sm text-[color:var(--color-text-lo)]">
          Testimonials coming soon.
        </p>
      </div>
    );
  }

  const q = QUOTES[active];

  return (
    <div className="mx-auto max-w-3xl">
      <Reveal>
        <div className="surface-card relative p-10 lg:p-12">
          <QuoteMark />
          <p className="mt-6 text-[length:var(--text-display-md)] font-[600] leading-[var(--text-display-md--line-height)] tracking-[var(--text-display-md--letter-spacing)] text-[color:var(--color-text-hi)]">
            &ldquo;{q.quote}&rdquo;
          </p>
          <div className="mt-8 flex items-center gap-4">
            <span
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-sm)] text-xs font-[700]"
              style={{
                background:
                  "linear-gradient(135deg, var(--color-gold-500), var(--color-gold-700))",
                color: "var(--color-bg-0)",
                letterSpacing: "0.02em",
              }}
            >
              {q.initial}
            </span>
            <div className="flex-1">
              <p className="text-sm font-[600] text-[color:var(--color-text-hi)]">
                {q.name}
              </p>
              <p className="text-xs text-[color:var(--color-text-lo)]">
                {q.role}
              </p>
            </div>
            <p className="text-[10px] font-[600] uppercase tracking-[0.18em] text-[color:var(--color-text-faint)]">
              {q.context}
            </p>
          </div>
        </div>
      </Reveal>

      <div className="mt-6 flex items-center justify-center gap-2" role="tablist" aria-label="Testimonial navigation">
        {QUOTES.map((_, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={active === i}
            aria-label={`Show testimonial ${i + 1}`}
            onClick={() => setActive(i)}
            className="h-2 rounded-full transition-all duration-300"
            style={{
              width: active === i ? 32 : 8,
              background:
                active === i
                  ? "var(--color-gold-500)"
                  : "var(--color-border-strong)",
            }}
          />
        ))}
      </div>
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
