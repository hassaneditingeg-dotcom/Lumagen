"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { GalleryEntry } from "@/lib/gallery/manifest";
import { cn } from "@/lib/utils";

/**
 * GalleryGrid — editorial asymmetric grid (4-col on desktop, 2-col on mobile)
 * where every 5th tile becomes a 2×2 feature. CSS `grid-auto-flow: dense`
 * lets smaller tiles fill the natural gaps, producing a magazine-spread
 * rhythm instead of a uniform Pinterest column.
 *
 * Tiles open the lightbox on click — same behavior as before.
 */

export function GalleryGrid({ entries }: { entries: GalleryEntry[] }) {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  if (entries.length === 0) {
    return (
      <p className="text-center text-[color:var(--color-text-mid)]">
        Nothing here yet — check back soon.
      </p>
    );
  }

  return (
    <>
      <div
        className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-5"
        style={{
          gridAutoFlow: "dense",
          gridAutoRows: "minmax(180px, auto)",
        }}
      >
        {entries.map((entry, i) => {
          // Every 5th tile (starting at 0) becomes a feature spanning 2×2 on
          // desktop and a wide 2×1 on mobile. The rest fill the gaps.
          const isFeature = i % 5 === 0;
          return (
            <button
              key={entry.id}
              type="button"
              onClick={() => setActiveIdx(i)}
              className={cn(
                "group relative block w-full overflow-hidden rounded-[var(--radius-md)] border border-[color:var(--color-border)] transition-[border-color,transform] duration-500 ease-out hover:border-[color:var(--color-border-strong)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-gold-500)]",
                isFeature
                  ? "col-span-2 row-span-2 lg:col-span-2 lg:row-span-2"
                  : "col-span-1 row-span-1",
              )}
              style={{ aspectRatio: isFeature ? "1 / 1" : "4 / 5" }}
              aria-label={`Open ${entry.alt || "image"} in lightbox`}
            >
              <Image
                src={isFeature ? entry.variants["1600"] : entry.variants["800"]}
                width={entry.width}
                height={entry.height}
                alt={entry.alt || ""}
                sizes={
                  isFeature
                    ? "(min-width: 1024px) 50vw, 100vw"
                    : "(min-width: 1024px) 25vw, 50vw"
                }
                placeholder="blur"
                blurDataURL={entry.blurDataURL}
                unoptimized
                priority={i < 2}
                loading={i < 4 ? "eager" : "lazy"}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
              />
              {/* Vignette on hover — sells depth without overlay text */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 55%, rgba(6, 5, 4, 0.55))",
                }}
              />
              {/* Cursor caret — discoverable but quiet */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute right-3 bottom-3 inline-flex h-8 w-8 items-center justify-center rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: "rgba(13, 12, 10, 0.6)",
                  border: "1px solid var(--color-border-strong)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M 3 6 H 9 M 6 3 V 9"
                    stroke="var(--color-gold-500)"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </button>
          );
        })}
      </div>

      {activeIdx !== null && (
        <Lightbox
          entries={entries}
          startIdx={activeIdx}
          onClose={() => setActiveIdx(null)}
        />
      )}
    </>
  );
}

/* ============================================================
   LIGHTBOX
   ============================================================ */

function Lightbox({
  entries,
  startIdx,
  onClose,
}: {
  entries: GalleryEntry[];
  startIdx: number;
  onClose: () => void;
}) {
  const [idx, setIdx] = useState(startIdx);
  const dialogRef = useRef<HTMLDivElement>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const prev = useCallback(
    () => setIdx((i) => (i - 1 + entries.length) % entries.length),
    [entries.length],
  );
  const next = useCallback(
    () => setIdx((i) => (i + 1) % entries.length),
    [entries.length],
  );

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, prev, next]);

  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart.current) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touchStart.current.x;
    const dy = t.clientY - touchStart.current.y;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
      if (dx > 0) prev();
      else next();
    }
    touchStart.current = null;
  };

  const entry = entries[idx];

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
      style={{
        backgroundColor: "rgba(4, 4, 4, 0.94)",
        backdropFilter: "blur(14px)",
      }}
    >
      <Image
        key={entry.id}
        src={entry.variants["1600"]}
        width={entry.width}
        height={entry.height}
        alt={entry.alt || ""}
        placeholder="blur"
        blurDataURL={entry.blurDataURL}
        unoptimized
        priority
        className="max-h-[88vh] w-auto max-w-[92vw] rounded-[var(--radius-md)] object-contain"
      />

      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--color-border)] text-[color:var(--color-text-hi)] backdrop-blur-md transition-colors hover:bg-[color:var(--color-bg-2)] sm:right-6 sm:top-6"
        aria-label="Close"
        style={{ backgroundColor: "rgba(13, 11, 9, 0.6)" }}
      >
        <CloseIcon />
      </button>

      <button
        type="button"
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 inline-flex h-12 w-12 items-center justify-center rounded-full border border-[color:var(--color-border)] backdrop-blur-md transition-colors hover:bg-[color:var(--color-bg-2)] sm:left-6"
        aria-label="Previous"
        style={{ backgroundColor: "rgba(13, 11, 9, 0.6)" }}
      >
        <ArrowIcon direction="left" />
      </button>
      <button
        type="button"
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex h-12 w-12 items-center justify-center rounded-full border border-[color:var(--color-border)] backdrop-blur-md transition-colors hover:bg-[color:var(--color-bg-2)] sm:right-6"
        aria-label="Next"
        style={{ backgroundColor: "rgba(13, 11, 9, 0.6)" }}
      >
        <ArrowIcon direction="right" />
      </button>

      <div className="pointer-events-none absolute inset-x-0 bottom-4 flex items-center justify-center gap-3 text-xs sm:bottom-6">
        <span
          className="rounded-full px-3 py-1.5 font-[600] text-[color:var(--color-text-mid)] backdrop-blur-md"
          style={{
            backgroundColor: "rgba(13, 11, 9, 0.6)",
            border: "1px solid var(--color-border)",
          }}
        >
          {String(idx + 1).padStart(2, "0")} / {String(entries.length).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path
        d="M3 3 L15 15 M15 3 L3 15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      style={{ transform: direction === "right" ? "scaleX(-1)" : undefined }}
      aria-hidden="true"
    >
      <path
        d="M11 4 L5 9 L11 14"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
