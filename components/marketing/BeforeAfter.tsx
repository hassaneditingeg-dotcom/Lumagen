"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { GalleryEntry } from "@/lib/gallery/manifest";

/**
 * BeforeAfter — Photoroom-style drag-to-reveal comparison. The user
 * drags the gold divider (or clicks anywhere on the image) to wipe
 * between the "before" and "after" image. Touch + keyboard supported.
 */
export function BeforeAfter({
  before,
  after,
  beforeLabel = "Source photo",
  afterLabel = "Lumagine A.I",
}: {
  before: GalleryEntry;
  after: GalleryEntry;
  beforeLabel?: string;
  afterLabel?: string;
}) {
  const [position, setPosition] = useState(52);
  const containerRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const ratio = (clientX - rect.left) / rect.width;
    setPosition(Math.max(0, Math.min(100, ratio * 100)));
  }, []);

  const handlePointerMove = useCallback(
    (e: PointerEvent) => {
      if (!draggingRef.current) return;
      updateFromClientX(e.clientX);
    },
    [updateFromClientX],
  );

  const handlePointerUp = useCallback(() => {
    draggingRef.current = false;
  }, []);

  useEffect(() => {
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [handlePointerMove, handlePointerUp]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") setPosition((p) => Math.max(0, p - 2));
    else if (e.key === "ArrowRight") setPosition((p) => Math.min(100, p + 2));
    else if (e.key === "Home") setPosition(0);
    else if (e.key === "End") setPosition(100);
  };

  return (
    <div
      ref={containerRef}
      className="group relative aspect-[16/10] w-full overflow-hidden rounded-[var(--radius-lg)] border border-[color:var(--color-border)] select-none"
      onPointerDown={(e) => {
        e.currentTarget.setPointerCapture(e.pointerId);
        draggingRef.current = true;
        updateFromClientX(e.clientX);
      }}
      style={{ touchAction: "none" }}
    >
      {/* After image — full layer, behind */}
      <Image
        src={after.variants["1600"]}
        width={after.width}
        height={after.height}
        alt={afterLabel}
        sizes="(min-width: 1024px) 50vw, 100vw"
        placeholder="blur"
        blurDataURL={after.blurDataURL}
        unoptimized
        priority
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Before image — clipped to position% */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <Image
          src={before.variants["1600"]}
          width={before.width}
          height={before.height}
          alt={beforeLabel}
          sizes="(min-width: 1024px) 50vw, 100vw"
          placeholder="blur"
          blurDataURL={before.blurDataURL}
          unoptimized
          priority
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>

      {/* Labels */}
      <span
        className="pointer-events-none absolute left-4 top-4 rounded-full px-3 py-1.5 text-[10px] font-[600] uppercase tracking-[0.16em] backdrop-blur-md"
        style={{
          background: "rgba(13, 12, 10, 0.65)",
          color: "var(--color-text-mid)",
          border: "1px solid var(--color-border)",
        }}
      >
        {beforeLabel}
      </span>
      <span
        className="pointer-events-none absolute right-4 top-4 rounded-full px-3 py-1.5 text-[10px] font-[600] uppercase tracking-[0.16em] backdrop-blur-md"
        style={{
          background: "rgba(13, 12, 10, 0.65)",
          color: "var(--color-gold-500)",
          border: "1px solid var(--color-border-strong)",
        }}
      >
        {afterLabel}
      </span>

      {/* Divider line */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 w-px"
        style={{
          left: `${position}%`,
          background:
            "linear-gradient(180deg, transparent, var(--color-gold-500) 20%, var(--color-gold-500) 80%, transparent)",
          boxShadow: "0 0 18px rgba(201, 168, 76, 0.4)",
        }}
      />

      {/* Handle */}
      <button
        type="button"
        aria-label={`Drag to compare. Currently showing ${position.toFixed(0)}% before.`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(position)}
        aria-orientation="horizontal"
        role="slider"
        onKeyDown={handleKeyDown}
        onPointerDown={(e) => {
          e.stopPropagation();
          e.currentTarget.setPointerCapture(e.pointerId);
          draggingRef.current = true;
        }}
        className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize rounded-full backdrop-blur-md transition-transform duration-200 hover:scale-110 focus:scale-110"
        style={{
          left: `${position}%`,
          height: 44,
          width: 44,
          background: "rgba(13, 12, 10, 0.85)",
          border: "1.5px solid var(--color-gold-500)",
          boxShadow:
            "0 0 24px rgba(201, 168, 76, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.15)",
        }}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          aria-hidden="true"
          className="mx-auto"
        >
          <path
            d="M 7 4 L 3 9 L 7 14 M 11 4 L 15 9 L 11 14"
            stroke="var(--color-gold-500)"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </button>
    </div>
  );
}
