"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  type HTMLMotionProps,
} from "motion/react";
import Link from "next/link";
import { useRef, type ReactNode } from "react";

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
  ...rest
}: {
  href: string;
  className?: string;
  children: ReactNode;
  strength?: number;
} & Omit<HTMLMotionProps<"span">, "onAnimationStart" | "onDragStart" | "onDragEnd" | "onDrag">) {
  const ref = useRef<HTMLSpanElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 20, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 20, mass: 0.4 });

  const handleMove = (e: React.MouseEvent) => {
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
      <Link href={href} className={className}>
        <motion.span style={{ x: sx, y: sy, display: "inline-block" }} {...rest}>
          {children}
        </motion.span>
      </Link>
    </span>
  );
}
