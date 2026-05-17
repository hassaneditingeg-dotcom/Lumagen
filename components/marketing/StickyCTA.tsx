"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * StickyCTA — fades in after the user scrolls past the hero. Always
 * one tap away from starting a project on long pages. Hidden on the
 * /contact page itself so it doesn't compete with the real form.
 */
export function StickyCTA({ hideOn = [] }: { hideOn?: string[] }) {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname() ?? "";

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.85);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const shouldHide = hideOn.some((p) => pathname === p || pathname.startsWith(p));

  return (
    <AnimatePresence>
      {visible && !shouldHide && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.35, ease: [0.19, 1, 0.22, 1] }}
          className="pointer-events-none fixed inset-x-0 bottom-6 z-40 flex justify-center px-6"
        >
          <Link
            href="/contact"
            className="pointer-events-auto inline-flex items-center gap-3 rounded-full px-5 py-2.5 text-sm font-[600] backdrop-blur-md active:scale-[0.97] transition-transform duration-150"
            style={{
              background: "rgba(13, 12, 10, 0.82)",
              border: "1px solid var(--color-border-strong)",
              color: "var(--color-text-hi)",
              boxShadow: "0 12px 40px rgba(0,0,0,0.55), var(--shadow-gold-sm)",
            }}
          >
            <span
              className="sticky-status-dot inline-block h-1.5 w-1.5 rounded-full"
              style={{
                background: "var(--color-gold-500)",
              }}
            />
            <span>Start a Project</span>
            <span
              className="text-xs"
              style={{ color: "var(--color-text-lo)" }}
            >
              · Typical 48h sample
            </span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M3 7 H 11 M 8 4 L 11 7 L 8 10"
                stroke="var(--color-gold-500)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
