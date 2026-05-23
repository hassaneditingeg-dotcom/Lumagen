"use client";

import { useEffect, useRef } from "react";

/**
 * CursorGlow — two layered effects:
 *   1. A golden radial-gradient spotlight that follows the cursor across
 *      the page background (the "yellow background motion").
 *   2. A subtle lagging ring that adds depth without replacing the native
 *      cursor or hiding expected browser affordances.
 *
 * Only activates on fine-pointer (desktop mouse) devices and respects
 * prefers-reduced-motion by disabling entirely.
 */
export function CursorGlow() {
  const spotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const spot = spotRef.current;
    const ring = ringRef.current;
    if (!fine || reduced || !spot || !ring) return;

    spot.style.opacity = "1";
    ring.style.opacity = "1";

    let mx = -999, my = -999;
    let rx = -999, ry = -999;
    let ready = false;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (!ready) {
        rx = mx; ry = my;
        ready = true;
      }
      spot.style.background = `radial-gradient(620px circle at ${mx}px ${my}px, rgba(212,170,78,0.075) 0%, transparent 70%)`;
    };

    const onEnter = () => {
      ring.style.borderColor = "rgba(232, 200, 120, 0.8)";
      ring.style.width = "46px";
      ring.style.height = "46px";
    };
    const onLeave = () => {
      ring.style.borderColor = "rgba(212, 170, 78, 0.42)";
      ring.style.width = "34px";
      ring.style.height = "34px";
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.querySelectorAll("a,button,input,textarea,select,label,[role=button]")
      .forEach(el => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });

    let raf = 0;
    const tick = () => {
      if (ready) {
        rx += (mx - rx) * 0.10;
        ry += (my - ry) * 0.10;
        ring.style.transform = `translate3d(${rx - ring.offsetWidth / 2}px, ${ry - ring.offsetHeight / 2}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.querySelectorAll("a,button,input,textarea,select,label,[role=button]")
        .forEach(el => {
          el.removeEventListener("mouseenter", onEnter);
          el.removeEventListener("mouseleave", onLeave);
        });
    };
  }, []);

  return (
    <>
      {/* Page-level background spotlight */}
      <div
        ref={spotRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          opacity: 0,
          transition: "opacity 300ms ease, background 0.05s linear",
        }}
      />

      {/* Lagging ring */}
      <div
        ref={ringRef}
        className="cursor-ring"
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 34,
          height: 34,
          borderRadius: "50%",
          border: "1px solid rgba(212,170,78,0.42)",
          pointerEvents: "none",
          zIndex: 9998,
          opacity: 0,
          willChange: "transform",
          transition: "opacity 200ms ease, border-color 200ms ease, width 200ms ease, height 200ms ease",
        }}
      />
    </>
  );
}
