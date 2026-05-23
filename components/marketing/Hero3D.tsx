"use client";

import Link from "next/link";
import { useEffect, useRef, type ReactNode } from "react";

export function Hero3D() {
  return (
    <div className="grid grid-cols-2 gap-5 sm:gap-6 lg:gap-8">
      <Hero3DTile
        href="/gallery?tab=listings"
        label="Amazon"
        hint="Listings · A+ Content"
      >
        <AmazonBox />
      </Hero3DTile>
      <Hero3DTile
        href="/gallery?tab=listings"
        label="TikTok Shop"
        hint="Shoppable creatives"
      >
        <TikTokSign />
      </Hero3DTile>
    </div>
  );
}

function Hero3DTile({
  href,
  label,
  hint,
  children,
}: {
  href: string;
  label: string;
  hint: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
        const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
        el.style.setProperty("--rx", `${-y * 7}deg`);
        el.style.setProperty("--ry", `${x * 9}deg`);
      });
    };

    const onLeave = () => {
      cancelAnimationFrame(raf);
      el.style.setProperty("--rx", "0deg");
      el.style.setProperty("--ry", "0deg");
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <Link ref={ref} href={href} className="hero-3d-tile" aria-label={`Browse ${label} work`}>
      <div className="hero-3d-circuit" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="hero-3d-scene" aria-hidden="true">
        {children}
      </div>
      <div className="hero-3d-floor" aria-hidden="true" />
      <div className="hero-3d-label">
        <span className="eyebrow">{hint}</span>
        <span className="hero-3d-title">{label}</span>
      </div>
    </Link>
  );
}

/* ============================================================
   AMAZON BOX — 3D cardboard cube
   ============================================================ */

function AmazonBox() {
  return (
    <div className="amazon-box">
      <div className="face front">
        <AmazonSmile />
      </div>
      <div className="face back">
        <AmazonSmile />
      </div>
      <div className="face right" />
      <div className="face left" />
      <div className="face top">
        <div className="box-flap" />
        <div className="box-flap right" />
        <div className="box-tape" />
      </div>
      <div className="face bottom" />
    </div>
  );
}

function AmazonSmile() {
  return (
    <svg
      className="amazon-smile"
      viewBox="0 0 100 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <text
        x="50"
        y="14"
        fill="var(--color-bg-0)"
        fontFamily="var(--font-display), sans-serif"
        fontSize="11"
        fontWeight="700"
        textAnchor="middle"
        letterSpacing="-0.04em"
      >
        prime
      </text>
      <path
        d="M 14 22 Q 50 38 86 22"
        stroke="var(--color-bg-0)"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 82 19 L 86 22 L 82 26"
        stroke="var(--color-bg-0)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

/* ============================================================
   TIKTOK SIGN — 3D plaque with signature glitch-shadow note
   ============================================================ */

function TikTokSign() {
  return (
    <div className="tiktok-sign">
      <div className="face front">
        <TikTokNote />
        <span className="tiktok-wordmark">TikTok Shop</span>
      </div>
      <div className="face back" />
      <div className="face top" />
      <div className="face bottom" />
      <div className="face right" />
      <div className="face left" />
    </div>
  );
}

function TikTokNote() {
  // A stylized music-note glyph with the signature cyan/magenta offset shadows.
  // Kept abstract enough to avoid trademark issues; reads as "TikTok-shop" at a glance.
  const path =
    "M 36 8 v 32 a 10 10 0 1 1 -7 -9.5 v -10 a 16 16 0 0 0 12 5 v -8 a 12 12 0 0 1 -5 -9.5 z";
  return (
    <svg
      className="tiktok-note"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g transform="translate(-3 3)">
        <path d={path} fill="#25f4ee" opacity="0.85" />
      </g>
      <g transform="translate(3 -3)">
        <path d={path} fill="#fe2c55" opacity="0.85" />
      </g>
      <path d={path} fill="#ffffff" />
    </svg>
  );
}
