"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type HTMLMotionProps,
} from "motion/react";
import Link from "next/link";
import { useRef, type AriaAttributes, type ReactNode } from "react";

/**
 * MagneticLink — the lighter cousin of MagneticButton, sized for nav links
 * and inline CTAs. Smaller pull radius and gentler spring so it doesn't
 * fight the rest of the page when the cursor sweeps across the header.
 */
export function MagneticLink({
  href,
  className,
  children,
  strength = 0.18,
  "aria-current": ariaCurrent,
  ...rest
}: {
  href: string;
  className?: string;
  children: ReactNode;
  strength?: number;
  "aria-current"?: AriaAttributes["aria-current"];
} & Omit<HTMLMotionProps<"span">, "onAnimationStart" | "onDragStart" | "onDragEnd" | "onDrag">) {
  const ref = useRef<HTMLSpanElement>(null);
  const reducedMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 20, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 20, mass: 0.4 });

  const handleMove = (e: React.MouseEvent) => {
    if (reducedMotion) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <span
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="inline-flex"
    >
      <Link href={href} className={className} aria-current={ariaCurrent}>
        <motion.span
          style={{ x: reducedMotion ? 0 : sx, y: reducedMotion ? 0 : sy, display: "inline-block" }}
          {...rest}
        >
          {children}
        </motion.span>
      </Link>
    </span>
  );
}
