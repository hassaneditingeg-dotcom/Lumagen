"use client";

import { useReportWebVitals } from "next/web-vitals";

/**
 * WebVitals — reports Core Web Vitals to the console in dev and
 * to a structured endpoint in production. Wire to Vercel Analytics,
 * Posthog, or Plausible later; for now we just log so we can
 * eyeball the numbers during local audits.
 *
 *   LCP — Largest Contentful Paint (target < 2.5s)
 *   INP — Interaction to Next Paint (target < 200ms)
 *   CLS — Cumulative Layout Shift (target < 0.1)
 *   FCP — First Contentful Paint (target < 1.8s)
 *   TTFB — Time to First Byte (target < 0.8s)
 */
export function WebVitals() {
  useReportWebVitals((metric) => {
    if (process.env.NODE_ENV !== "production") {
      console.log(`[web-vitals] ${metric.name}: ${metric.value.toFixed(1)} (${metric.rating})`);
      return;
    }
    // Production: queue for an analytics endpoint.
    // Replace this with Vercel Analytics / Posthog / Plausible when wired.
    if (typeof window !== "undefined" && "navigator" in window && "sendBeacon" in navigator) {
      const body = JSON.stringify({
        name: metric.name,
        value: metric.value,
        rating: metric.rating,
        id: metric.id,
        navigationType: metric.navigationType,
        url: window.location.pathname,
      });
      // Endpoint to be wired up later — silently no-op until then.
      try {
        navigator.sendBeacon?.("/api/vitals", body);
      } catch {
        // swallow
      }
    }
  });
  return null;
}
