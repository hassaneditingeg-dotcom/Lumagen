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
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.75,
      ease: [0.19, 1, 0.22, 1], // ease-out-expo
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

  if (reducedMotion) {
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <Tag
      className={className}
      variants={{
        ...containerVariants,
        visible: {
          ...containerVariants.visible,
          transition: {
            ...(containerVariants.visible as { transition: object }).transition,
            delayChildren: delay,
          },
        },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
    >
      {Array.isArray(children) ? (
        children.map((child, i) => (
          <motion.div key={i} variants={itemVariants}>
            {child}
          </motion.div>
        ))
      ) : (
        <motion.div variants={itemVariants}>{children}</motion.div>
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
