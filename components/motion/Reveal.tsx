"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";

/**
 * Reveal — wraps content with a staggered fade-up reveal on scroll.
 * Uses Framer/Motion's IntersectionObserver wrapper for performance.
 *
 *   <Reveal>...children stagger in...</Reveal>
 *   <Reveal delay={0.1}>...</Reveal>
 *
 * Each direct child gets a fade-up. Use as a section wrapper, not a leaf.
 */

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 38, scale: 0.985, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
    },
  },
};

export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
  amount = 0.2,
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "article";
  amount?: number;
  once?: boolean;
}) {
  const reducedMotion = useReducedMotion();
  const Tag = motion[as];

  // Always render motion wrappers to keep SSR/client DOM identical.
  // When reduced motion is active, collapse animations to instant.
  const resolvedItem: Variants = reducedMotion
    ? { hidden: { opacity: 1, y: 0, scale: 1, filter: "none" }, visible: { opacity: 1, y: 0, scale: 1, filter: "none" } }
    : itemVariants;

  return (
    <Tag
      className={className}
      variants={{
        ...containerVariants,
        visible: {
          ...containerVariants.visible,
          transition: {
            ...(containerVariants.visible as { transition: object }).transition,
            delayChildren: reducedMotion ? 0 : delay,
          },
        },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount, margin: "0px 0px -8% 0px" }}
    >
      {Array.isArray(children) ? (
        children.map((child, i) => (
          <motion.div key={i} variants={resolvedItem}>
            {child}
          </motion.div>
        ))
      ) : (
        <motion.div variants={resolvedItem}>{children}</motion.div>
      )}
    </Tag>
  );
}

/**
 * RevealItem — opt-in version when you want full control over which
 * descendants stagger. Use inside any motion container.
 */
export function RevealItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
}
