"use client";

import Link from "next/link";
import { TABS as MANIFEST_TABS } from "@/lib/gallery/manifest";

/**
 * GalleryTabs — three inline pills, no sticky bar.
 * Editorial direction: let the headline breathe, drop the sticky chrome,
 * trust the visitor to scroll. Tabs sit immediately under the page intro.
 */

type Tab = "listings" | "lifestyle" | "social";

const TABS: { id: Tab; label: string; count: number }[] = [
  { id: "listings", label: "Listings", count: MANIFEST_TABS.listings.length },
  { id: "lifestyle", label: "Lifestyle", count: MANIFEST_TABS.lifestyle.length },
  { id: "social", label: "Social", count: MANIFEST_TABS.social.length },
];

export function GalleryTabs({ activeTab }: { activeTab: Tab }) {
  return (
    <nav className="flex flex-wrap items-center gap-2 sm:gap-3" aria-label="Gallery sections">
      {TABS.map((tab) => {
        const active = activeTab === tab.id;
        return (
          <Link
            key={tab.id}
            href={`/gallery?tab=${tab.id}`}
            role="tab"
            aria-selected={active}
            className="group relative inline-flex items-baseline gap-2 rounded-full px-4 py-2 text-sm transition-colors"
            style={{
              background: active ? "var(--color-bg-2)" : "transparent",
              border: active
                ? "1px solid var(--color-border-strong)"
                : "1px solid var(--color-border)",
              color: active
                ? "var(--color-text-hi)"
                : "var(--color-text-mid)",
            }}
          >
            <span className="font-[600] tracking-[-0.005em]">{tab.label}</span>
            <span
              className="text-[10px] tabular-nums"
              style={{
                color: active
                  ? "var(--color-gold-500)"
                  : "var(--color-text-lo)",
              }}
            >
              {tab.count.toString().padStart(2, "0")}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
