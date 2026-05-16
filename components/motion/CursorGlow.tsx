"use client";

import { useEffect, useRef, useState } from "react";

/**
 * CursorGlow — two layered effects:
 *   1. A golden radial-gradient spotlight that follows the cursor across
 *      the page background (the "yellow background motion").
 *   2. A small dot + lagging ring custom cursor, gold on hover over
 *      interactive elements.
 *
 * Only activates on fine-pointer (desktop mouse) devices and respects
 * prefers-reduced-motion by disabling entirely.
 */
export function CursorGlow() {
  const [active, setActive] = useState(false);
  const spotRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    setActive(true);

    let mx = -999, my = -999;
    let dx = -999, dy = -999;   // dot (fast)
    let rx = -999, ry = -999;   // ring (slow lag)
    let ready = false;

    const spot = spotRef.current;
    const dot = dotRef.current;
    const ring = ringRef.current;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (!ready) {
        dx = mx; dy = my;
        rx = mx; ry = my;
        ready = true;
      }
      // Update background spotlight immediately (CSS var approach is fast)
      if (spot) {
        spot.style.background = `radial-gradient(600px circle at ${mx}px ${my}px, rgba(212,170,78,0.07) 0%, transparent 70%)`;
      }
    };

    const onEnter = () => document.body.setAttribute("data-cursor-hover", "1");
    const onLeave = () => document.body.removeAttribute("data-cursor-hover");

    window.addEventListener("mousemove", onMove, { passive: true });
    document.querySelectorAll("a,button,input,textarea,select,label,[role=button]")
      .forEach(el => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });

    let raf = 0;
    const tick = () => {
      if (ready && dot && ring) {
        dx += (mx - dx) * 0.22;
        dy += (my - dy) * 0.22;
        rx += (mx - rx) * 0.10;
        ry += (my - ry) * 0.10;
        dot.style.transform = `translate(${dx - 4}px, ${dy - 4}px)`;
        ring.style.transform = `translate(${rx - 18}px, ${ry - 18}px)`;
      }
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.querySelectorAll("a,button,input,textarea,select,label,[role=button]")
        .forEach(el => {
          el.removeEventListener("mouseenter", onEnter);
          el.removeEventListener("mouseleave", onLeave);
        });
    };
  }, []);

  if (!active) return null;

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
          transition: "background 0.05s linear",
        }}
      />

      {/* Dot cursor */}
      <div
        ref={dotRef}
        className="cursor-dot"
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "var(--color-gold-500, #d4aa4e)",
          pointerEvents: "none",
          zIndex: 9999,
          willChange: "transform",
          mixBlendMode: "screen",
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
          width: 36,
          height: 36,
          borderRadius: "50%",
          border: "1px solid rgba(212,170,78,0.5)",
          pointerEvents: "none",
          zIndex: 9998,
          willChange: "transform",
          transition: "border-color 0.2s, transform 0.05s",
        }}
      />

      <style>{`
        body[data-cursor-hover] .cursor-dot {
          transform: scale(1.8);
          background: #f0cc6e;
        }
        body[data-cursor-hover] .cursor-ring {
          border-color: rgba(212,170,78,0.9);
          transform: scale(1.4);
        }
        body:has(.cursor-dot) * { cursor: none !important; }
      `}</style>
    </>
  );
}
