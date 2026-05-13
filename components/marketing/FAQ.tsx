"use client";

import { useState } from "react";
import { FAQ_DATA } from "@/lib/faq";

/**
 * FAQ — top seller questions, expandable accordion.
 * Paired with a FAQPage JSON-LD schema for Google rich snippets
 * (the calling page is responsible for inlining the schema).
 */

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="mx-auto max-w-3xl">
      {FAQ_DATA.map((faq, i) => {
        const open = openIndex === i;
        return (
          <div
            key={faq.question}
            className="border-b border-[color:var(--color-border)] last:border-b-0"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(open ? null : i)}
              className="flex w-full items-center justify-between gap-6 py-5 text-left transition-colors hover:text-[color:var(--color-gold-500)]"
              aria-expanded={open}
              aria-controls={`faq-${i}`}
            >
              <span className="text-[length:var(--text-display-md)] font-[600] tracking-[var(--text-display-md--letter-spacing)]">
                {faq.question}
              </span>
              <PlusIcon open={open} />
            </button>
            <div
              id={`faq-${i}`}
              className="grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out"
              style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
            >
              <div className="min-h-0">
                <p className="pb-6 pr-12 text-[color:var(--color-text-mid)] leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function PlusIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className="shrink-0 transition-transform duration-300"
      style={{ transform: open ? "rotate(45deg)" : "none" }}
    >
      <path
        d="M 10 4 L 10 16 M 4 10 L 16 10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
