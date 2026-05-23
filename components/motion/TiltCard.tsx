"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { useRef, useState, type ReactNode } from "react";

/**
 * TiltCard — wraps a card with subtle 3D mouse-tilt + a gold radial
 * spotlight that follows the cursor. Same family of motion as the Hero3D
 * tiles, applied lightly enough to feel premium on every surface card
 * without screaming "kinetic".
 *
 * Defaults:
 *   maxTilt = 6° on each axis
 *   spotlight = true (gold 220px radial, fades in on hover)
 */
export function TiltCard({
  children,
  className,
  maxTilt = 6,
  spotlight = true,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  spotlight?: boolean;
  as?: "div" | "article" | "li" | "section";
}) {
  const reducedMotion = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const [hovered, setHovered] = useState(false);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const cx = useMotionValue(50);
  const cy = useMotionValue(50);

  const rx = useSpring(rotateX, { stiffness: 145, damping: 24, mass: 0.62 });
  const ry = useSpring(rotateY, { stiffness: 145, damping: 24, mass: 0.62 });

  const spotlightBg = useMotionTemplate`radial-gradient(260px circle at ${cx}% ${cy}%, rgba(201, 168, 76, 0.14), rgba(127, 207, 185, 0.05) 34%, transparent 72%)`;

  const handleMove = (e: React.MouseEvent) => {
    if (reducedMotion) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const xRatio = (e.clientX - rect.left) / rect.width;
    const yRatio = (e.clientY - rect.top) / rect.height;
    rotateY.set((xRatio - 0.5) * 2 * maxTilt);
    rotateX.set((0.5 - yRatio) * 2 * maxTilt);
    cx.set(xRatio * 100);
    cy.set(yRatio * 100);
  };

  const handleEnter = () => setHovered(true);

  const handleLeave = () => {
    setHovered(false);
    rotateX.set(0);
    rotateY.set(0);
    cx.set(50);
    cy.set(50);
  };

  const Tag = motion[as];

  return (
    <Tag
      ref={ref as React.RefObject<never>}
      onMouseMove={handleMove}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className={className}
      style={{
        rotateX: reducedMotion ? 0 : rx,
        rotateY: reducedMotion ? 0 : ry,
        transformStyle: "preserve-3d",
        perspective: 1200,
        willChange: hovered && !reducedMotion ? "transform" : "auto",
      }}
    >
      {spotlight && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{
            background: spotlightBg,
            opacity: hovered ? 1 : 0,
            transition: "opacity 320ms cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        />
      )}
      {children}
    </Tag>
  );
}
