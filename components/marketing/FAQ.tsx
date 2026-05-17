"use client";

import { useState } from "react";
import { FAQ_DATA } from "@/lib/faq";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
      <div className="space-y-1">
        {FAQ_DATA.map((faq, i) => {
          const open = openIndex === i;
          return (
            <button
              key={faq.question}
              type="button"
              onClick={() => setOpenIndex(open ? null : i)}
              className="block w-full rounded-[var(--radius-sm)] px-4 py-3 text-left transition-all duration-200"
              style={{
                background: open
                  ? "var(--color-bg-2)"
                  : "transparent",
                borderLeft: open
                  ? "2px solid var(--color-gold-500)"
                  : "2px solid transparent",
              }}
              aria-expanded={open}
              aria-controls={`faq-panel-${i}`}
            >
              <span
                className="text-sm font-[600] transition-colors"
                style={{
                  color: open
                    ? "var(--color-text-hi)"
                    : "var(--color-text-mid)",
                }}
              >
                {faq.question}
              </span>
            </button>
          );
        })}
      </div>

      <div className="min-h-[180px]">
        {FAQ_DATA.map((faq, i) => {
          const open = openIndex === i;
          if (!open) return null;
          return (
            <div
              key={faq.question}
              id={`faq-panel-${i}`}
              className="surface-card p-8"
            >
              <span className="eyebrow">Answer</span>
              <h3 className="mt-4 text-[length:var(--text-display-md)] font-[600] tracking-[var(--text-display-md--letter-spacing)]">
                {faq.question}
              </h3>
              <p className="mt-4 text-[color:var(--color-text-mid)] leading-relaxed">
                {faq.answer}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
