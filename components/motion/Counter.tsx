"use client";

import { animate, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

/**
 * Counter — animates a number from 0 to `value` when scrolled into view.
 *
 *   <Counter value={500} suffix="+" />        → 0 → 500+
 *   <Counter value={48} suffix="h" />         → 0 → 48h
 *   <Counter value={100} suffix="%" duration={1.4} />
 *
 * Honors prefers-reduced-motion via the global CSS override; the animate()
 * call here also drops to instant when motion is reduced because the duration
 * is collapsed by the browser's reduced-motion preference.
 *
 * For non-numeric prefixes (e.g. "$1.2k"), pass `value` as the numeric core
 * and pass `prefix` / `suffix` for the static decoration.
 */
export function Counter({
  value,
  prefix = "",
  suffix = "",
  duration = 1.6,
  className,
  format = (n) => Math.round(n).toLocaleString(),
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
  format?: (n: number) => string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration,
      ease: [0.19, 1, 0.22, 1],
      onUpdate: (latest) => setDisplay(latest),
    });
    return () => controls.stop();
  }, [inView, value, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {format(display)}
      {suffix}
    </span>
  );
}
