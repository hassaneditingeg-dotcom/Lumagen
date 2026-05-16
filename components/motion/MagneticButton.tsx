"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, type HTMLMotionProps } from "motion/react";
import Link from "next/link";
import { useRef } from "react";

/**
 * MagneticButton — cursor-attract wrapper for primary CTAs.
 *
 * Renders as a button or Link based on whether `href` is provided.
 * The wrapped element gently translates toward the cursor when the
 * cursor enters its bounding box, with a soft spring on release.
 *
 * Subtle by design — strength defaults to 0.35 (max pull = 0.35 × half the box).
 */
export function MagneticButton({
  href,
  className,
  children,
  strength = 0.35,
  onClick,
  ariaLabel,
  type,
  ...rest
}: {
  href?: string;
  className?: string;
  children: React.ReactNode;
  strength?: number;
  onClick?: () => void;
  ariaLabel?: string;
  type?: "button" | "submit";
} & Omit<HTMLMotionProps<"button">, "onAnimationStart" | "onDragStart" | "onDragEnd" | "onDrag">) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const reducedMotion = useReducedMotion();
  const springX = useSpring(x, { stiffness: 180, damping: 18, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 180, damping: 18, mass: 0.6 });
  const wrapperRef = useRef<HTMLSpanElement>(null);

  const handleMove = (e: React.MouseEvent) => {
    if (reducedMotion) return;
    const el = wrapperRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const offsetX = e.clientX - (rect.left + rect.width / 2);
    const offsetY = e.clientY - (rect.top + rect.height / 2);
    x.set(offsetX * strength);
    y.set(offsetY * strength);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  const inner = (
    <motion.span
      style={{ x: reducedMotion ? 0 : springX, y: reducedMotion ? 0 : springY, display: "inline-flex" }}
      {...rest}
    >
      {children}
    </motion.span>
  );

  return (
    <span
      ref={wrapperRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="inline-flex"
    >
      {href ? (
        <Link href={href} className={className} aria-label={ariaLabel} onClick={onClick}>
          {inner}
        </Link>
      ) : (
        <button
          type={type ?? "button"}
          className={className}
          aria-label={ariaLabel}
          onClick={onClick}
        >
          {inner}
        </button>
      )}
    </span>
  );
}
