"use client";

import Link from "next/link";
import { Container } from "./Container";
import { TABS as MANIFEST_TABS } from "@/lib/gallery/manifest";

const TABS = [
  { id: "listings", label: "Listings", count: MANIFEST_TABS.listings.length },
  { id: "lifestyle", label: "Lifestyle", count: MANIFEST_TABS.lifestyle.length },
  { id: "social", label: "Social Media", count: MANIFEST_TABS.social.length },
] as const;

export function GalleryTabs({
  activeTab,
}: {
  activeTab: "listings" | "lifestyle" | "social";
}) {
  return (
    <div className="sticky top-16 z-30 border-y border-[color:var(--color-border)] backdrop-blur-md lg:top-20"
      style={{ backgroundColor: "rgba(8, 8, 8, 0.85)" }}
    >
      <Container>
        <div className="-mx-2 flex items-center gap-1 overflow-x-auto py-3 sm:mx-0 sm:gap-2 sm:py-4" role="tablist">
          {TABS.map((tab) => {
            const active = activeTab === tab.id;
            return (
              <Link
                key={tab.id}
                href={`/gallery?tab=${tab.id}`}
                role="tab"
                aria-selected={active}
                className="group relative shrink-0 rounded-full px-4 py-2.5 transition-colors sm:px-5"
                style={{
                  background: active
                    ? "var(--color-bg-2)"
                    : "transparent",
                  border: active
                    ? "1px solid var(--color-border-strong)"
                    : "1px solid transparent",
                }}
              >
                <span
                  className={`text-sm font-[600] tracking-[-0.005em] ${
                    active
                      ? "text-[color:var(--color-text-hi)]"
                      : "text-[color:var(--color-text-mid)] group-hover:text-[color:var(--color-text-hi)]"
                  }`}
                >
                  {tab.label}
                </span>
                <span
                  className="ml-2 text-xs text-[color:var(--color-text-lo)]"
                  aria-hidden="true"
                >
                  {tab.count}
                </span>
              </Link>
            );
          })}
        </div>
      </Container>
    </div>
  );
}
