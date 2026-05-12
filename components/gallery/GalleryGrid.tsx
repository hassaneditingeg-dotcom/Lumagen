"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { GalleryEntry } from "@/lib/gallery/manifest";

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
      <div className="columns-1 gap-3 sm:columns-2 md:columns-3 lg:columns-4">
        {entries.map((entry, i) => (
          <button
            key={entry.id}
            type="button"
            onClick={() => setActiveIdx(i)}
            className="group mb-3 block w-full overflow-hidden rounded-[var(--radius-md)] border border-[color:var(--color-border)] break-inside-avoid"
            aria-label={`Open ${entry.alt || "image"} in lightbox`}
          >
            <Image
              src={entry.variants["800"]}
              width={entry.width}
              height={entry.height}
              alt={entry.alt || ""}
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              placeholder="blur"
              blurDataURL={entry.blurDataURL}
              unoptimized
              priority={i < 4}
              className="h-auto w-full transition-transform duration-500 ease-out group-hover:scale-[1.02]"
            />
          </button>
        ))}
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

  // Lock body scroll while open
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  // Keyboard nav
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, prev, next]);

  // Touch swipe (≥40px horizontal triggers nav)
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
        // Click on the backdrop (not the image) closes
        if (e.target === e.currentTarget) onClose();
      }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
      style={{ backgroundColor: "rgba(4, 4, 4, 0.92)", backdropFilter: "blur(10px)" }}
    >
      {/* Image */}
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
        className="max-h-[90vh] w-auto max-w-[92vw] rounded-[var(--radius-md)] object-contain"
      />

      {/* Close */}
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--color-border)] text-[color:var(--color-text-hi)] backdrop-blur-md transition-colors hover:bg-[color:var(--color-bg-2)] sm:right-6 sm:top-6"
        aria-label="Close"
        style={{ backgroundColor: "rgba(13, 11, 9, 0.6)" }}
      >
        <CloseIcon />
      </button>

      {/* Prev/next */}
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

      {/* Counter + caption */}
      <div className="pointer-events-none absolute inset-x-0 bottom-4 flex items-center justify-center gap-3 text-xs sm:bottom-6">
        <span
          className="rounded-full px-3 py-1.5 font-[600] text-[color:var(--color-text-mid)] backdrop-blur-md"
          style={{ backgroundColor: "rgba(13, 11, 9, 0.6)", border: "1px solid var(--color-border)" }}
        >
          {idx + 1} / {entries.length}
        </span>
      </div>
    </div>
  );
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M3 3 L15 15 M15 3 L3 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
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
      <path d="M11 4 L5 9 L11 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
