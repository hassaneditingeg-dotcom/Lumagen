"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MagneticLink } from "@/components/motion/MagneticLink";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/gallery", label: "Gallery" },
  { href: "/services", label: "Services" },
  { href: "/pricing", label: "Packages" },
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
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300",
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
          <span className="text-lg font-[700] tracking-[-0.02em] text-[color:var(--color-text-hi)]">
            Lumagine
            <span
              className="ml-1.5 align-[0.1em] text-[0.65em] font-[500] uppercase tracking-[0.2em]"
              style={{ color: "var(--color-gold-500)" }}
            >
              A.I
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {NAV.map((item) => {
            const active = pathname?.startsWith(item.href);
            return (
              <MagneticLink
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "nav-link text-sm transition-colors",
                  active
                    ? "text-[color:var(--color-text-hi)]"
                    : "text-[color:var(--color-text-mid)] hover:text-[color:var(--color-text-hi)]"
                )}
              >
                {item.label}
              </MagneticLink>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="hidden h-10 items-center rounded-full bg-[color:var(--color-gold-500)] px-5 text-sm font-semibold text-[color:var(--color-bg-0)] transition-[background-color,box-shadow,transform] hover:-translate-y-0.5 hover:bg-[color:var(--color-gold-400)] sm:inline-flex"
            style={{
              boxShadow: "var(--shadow-gold-sm), inset 0 1px 0 rgba(255,255,255,0.3)",
            }}
          >
            Start a Project
          </Link>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--color-border)] md:hidden"
            aria-label="Toggle navigation"
            aria-expanded={open}
            aria-controls="mobile-primary-navigation"
          >
            <BurgerIcon open={open} />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div
          className="max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain border-t border-[color:var(--color-border)] backdrop-blur-md md:hidden"
          style={{ backgroundColor: "rgba(6, 5, 4, 0.95)" }}
        >
          <nav id="mobile-primary-navigation" className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-6" aria-label="Mobile primary">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={pathname?.startsWith(item.href) ? "page" : undefined}
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
              Start a Project
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
      width="26"
      height="26"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M14 2 L24 8 L24 20 L14 26 L4 20 L4 8 Z"
        fill="none"
        stroke="var(--color-gold-500)"
        strokeWidth="1.5"
      />
      <circle cx="14" cy="14" r="3" fill="var(--color-gold-500)" />
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
          transition: "transform 200ms ease, y 200ms ease",
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
          transition: "opacity 200ms ease",
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
          transition: "transform 200ms ease, y 200ms ease",
        }}
      />
    </svg>
  );
}
