import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Codex's in-app browser opens 127.0.0.1 by default; allow that dev origin
  // so HMR and client hydration work during local review.
  allowedDevOrigins: ["127.0.0.1"],

  // Tree-shake motion + lucide imports — these libs export many icons / hooks
  // and bringing them in via barrel imports can pull more than needed.
  experimental: {
    optimizePackageImports: ["motion"],
  },

  // Compression is on by default; explicit for clarity.
  compress: true,

  // Static assets in /public/gallery + /public/hero are pre-optimized WebPs
  // with stable content hashes (filenames include the size). Cache them for
  // a year — they're immutable until the optimizer script reruns.
  async headers() {
    const isProd = process.env.NODE_ENV === "production";
    const cacheImmutable = {
      key: "Cache-Control",
      value: "public, max-age=31536000, immutable",
    };
    return [
      // Cache-Control only in production — Next.js dev mode warns when we
      // override headers on /_next/static because it breaks HMR.
      ...(isProd
        ? [
            {
              source: "/gallery/:path*",
              headers: [cacheImmutable],
            },
            {
              source: "/(.*).webp",
              headers: [cacheImmutable],
            },
          ]
        : []),
      {
        source: "/:path*",
        headers: [
          // Security baseline — keeps third parties from framing the site
          // and protects against MIME-sniff attacks.
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },

  // Strict TS enforced at build time.
  typescript: { ignoreBuildErrors: false },

  // Power-by header off — small surface-area reduction, prevents fingerprinting.
  poweredByHeader: false,
};

export default nextConfig;
