"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/gallery", label: "Gallery" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled
          ? "backdrop-blur-md"
          : "bg-transparent"
      )}
      style={
        scrolled
          ? {
              backgroundColor: "rgba(6, 5, 4, 0.72)",
              borderBottom: "1px solid var(--color-border)",
            }
          : undefined
      }
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:h-20">
        <Link
          href="/"
          className="group flex items-center gap-2.5"
          aria-label="Lumagine A.I home"
        >
          <Logomark />
          <span className="text-lg font-[700] tracking-[-0.02em]">
            Lumagine
            <span style={{ color: "var(--color-gold-500)" }}>.A.I</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {NAV.map((item) => {
            const active = pathname?.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm transition-colors",
                  active
                    ? "text-[color:var(--color-text-hi)]"
                    : "text-[color:var(--color-text-mid)] hover:text-[color:var(--color-text-hi)]"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="hidden h-10 items-center rounded-full bg-[color:var(--color-gold-500)] px-5 text-sm font-semibold text-[color:var(--color-bg-0)] transition-transform hover:-translate-y-0.5 sm:inline-flex"
            style={{
              boxShadow: "var(--shadow-gold), inset 0 1px 0 rgba(255,255,255,0.3)",
            }}
          >
            Start a project
          </Link>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--color-border)] md:hidden"
            aria-label="Toggle navigation"
            aria-expanded={open}
          >
            <BurgerIcon open={open} />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div
          className="border-t border-[color:var(--color-border)] backdrop-blur-md md:hidden"
          style={{ backgroundColor: "rgba(6, 5, 4, 0.95)" }}
        >
          <nav className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-6" aria-label="Mobile primary">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-md py-2 text-base text-[color:var(--color-text-mid)] hover:text-[color:var(--color-text-hi)]"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-3 inline-flex h-11 items-center justify-center rounded-full bg-[color:var(--color-gold-500)] px-5 text-sm font-semibold text-[color:var(--color-bg-0)]"
            >
              Start a project
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

function Logomark() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="lum-gradient" x1="0" y1="0" x2="28" y2="28">
          <stop offset="0%" stopColor="var(--color-gold-400)" />
          <stop offset="100%" stopColor="var(--color-cyan-400)" />
        </linearGradient>
      </defs>
      <path
        d="M14 2 L24 8 L24 20 L14 26 L4 20 L4 8 Z"
        fill="none"
        stroke="url(#lum-gradient)"
        strokeWidth="2"
      />
      <circle cx="14" cy="14" r="3.5" fill="url(#lum-gradient)" />
    </svg>
  );
}

function BurgerIcon({ open }: { open: boolean }) {
  return (
    <svg width="18" height="14" viewBox="0 0 18 14" fill="none" aria-hidden="true">
      <line
        x1="1"
        y1={open ? "7" : "2"}
        x2="17"
        y2={open ? "7" : "2"}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        style={{
          transform: open ? "rotate(45deg)" : "none",
          transformOrigin: "center",
          transition: "all 200ms",
        }}
      />
      <line
        x1="1"
        y1="7"
        x2="17"
        y2="7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        style={{
          opacity: open ? 0 : 1,
          transition: "all 200ms",
        }}
      />
      <line
        x1="1"
        y1={open ? "7" : "12"}
        x2="17"
        y2={open ? "7" : "12"}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        style={{
          transform: open ? "rotate(-45deg)" : "none",
          transformOrigin: "center",
          transition: "all 200ms",
        }}
      />
    </svg>
  );
}
