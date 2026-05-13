import type { MetadataRoute } from "next";
import { getAllBrandSlugs } from "@/lib/brands";
import { getAllSlugs } from "@/lib/services";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lumagine.ai";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/pricing",
    "/gallery",
    "/contact",
    "/privacy",
    "/terms",
  ];

  return [
    ...staticRoutes.map((path) => ({
      url: `${SITE}${path}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority:
        path === ""
          ? 1
          : path === "/pricing" || path === "/services" || path === "/contact"
            ? 0.9
            : path === "/privacy" || path === "/terms"
              ? 0.3
              : 0.8,
    })),
    ...getAllSlugs().map((slug) => ({
      url: `${SITE}/services/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...getAllBrandSlugs().map((slug) => ({
      url: `${SITE}/brands/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
