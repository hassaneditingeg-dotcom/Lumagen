/**
 * Phase 2 — one-shot asset migration.
 *
 * Walks `_legacy/assets/sorted/` (the existing 1.8GB curated library), generates
 * three WebP variants (400/800/1600px wide) with `sharp`, encodes a blurhash for
 * each, uploads everything to Supabase Storage `gallery-public`, and writes a
 * typed `lib/gallery/manifest.ts` keyed by category.
 *
 * Run locally only — never in CI, never in production:
 *   pnpm tsx scripts/migrate-assets.ts
 *
 * Prerequisites:
 *   1. Supabase project provisioned (Pro tier — 1.5GB+ public storage).
 *   2. .env.local has NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY.
 *   3. `npm install -D sharp blurhash tsx` (deferred from Phase 1 to keep deps lean).
 *
 * Idempotency: skips an image when its `gallery-public/<category>/<slug>-1600.webp`
 * already exists in Storage. Safe to re-run after partial failure.
 */

import { createClient } from "@supabase/supabase-js";
import { promises as fs } from "node:fs";
import { join, basename, extname } from "node:path";

// ---- Configuration ---------------------------------------------------------

const SOURCE_ROOT = "_legacy/assets/sorted";
const BUCKET = "gallery-public";
const VARIANTS = [400, 800, 1600] as const;
const CATEGORIES = [
  "ecommerce-listing",
  "ecommerce-lifestyle",
  "main-listing-white-bg",
] as const;

// Defaults if a category-specific brand can't be inferred from the filename.
const DEFAULT_BRAND = "terra-lotus";

// ---- Types -----------------------------------------------------------------

type ManifestEntry = {
  id: string;
  category: (typeof CATEGORIES)[number];
  brand: string;
  slug: string;
  width: number;
  height: number;
  blurDataURL: string;
  variants: Record<(typeof VARIANTS)[number], string>;
};

type Manifest = Record<(typeof CATEGORIES)[number], ManifestEntry[]>;

// ---- Main ------------------------------------------------------------------

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY. Set them in .env.local.",
    );
  }

  // Late-import heavy deps so type-check passes without them installed yet.
  const sharp = (await dynamicImport<typeof import("sharp")>("sharp")).default;
  const { encode } = await dynamicImport<typeof import("blurhash")>("blurhash");

  const supabase = createClient(url, serviceKey, {
    auth: { persistSession: false },
  });

  // Ensure bucket exists.
  const { data: buckets } = await supabase.storage.listBuckets();
  if (!buckets?.some((b) => b.name === BUCKET)) {
    const { error } = await supabase.storage.createBucket(BUCKET, {
      public: true,
      fileSizeLimit: "20MB",
      allowedMimeTypes: ["image/webp", "image/jpeg", "image/png"],
    });
    if (error) throw error;
    console.log(`[migrate] created bucket ${BUCKET}`);
  }

  const manifest: Manifest = {
    "ecommerce-listing": [],
    "ecommerce-lifestyle": [],
    "main-listing-white-bg": [],
  };

  for (const category of CATEGORIES) {
    const dir = join(SOURCE_ROOT, category);
    let files: string[];
    try {
      files = (await fs.readdir(dir)).filter((f) =>
        /\.(jpe?g|png|webp)$/i.test(f),
      );
    } catch (err) {
      console.warn(`[migrate] skipping ${category} (${(err as Error).message})`);
      continue;
    }

    console.log(`[migrate] ${category}: ${files.length} files`);

    let i = 0;
    for (const file of files) {
      i++;
      const src = join(dir, file);
      const slug = sanitizeSlug(basename(file, extname(file)));
      const brand = inferBrand(file) ?? DEFAULT_BRAND;
      const id = `${category}/${slug}`;

      // Idempotency: check if the largest variant is already uploaded.
      const largestPath = `${category}/${slug}-${Math.max(...VARIANTS)}.webp`;
      const { data: existing } = await supabase.storage
        .from(BUCKET)
        .list(category, { search: `${slug}-${Math.max(...VARIANTS)}.webp` });
      if (existing?.some((f) => f.name === `${slug}-${Math.max(...VARIANTS)}.webp`)) {
        // Already uploaded — pull dimensions from a metadata call.
        const meta = await sharp(src).metadata();
        manifest[category].push({
          id,
          category,
          brand,
          slug,
          width: meta.width ?? 0,
          height: meta.height ?? 0,
          blurDataURL: "",
          variants: Object.fromEntries(
            VARIANTS.map((w) => [w, `${category}/${slug}-${w}.webp`]),
          ) as ManifestEntry["variants"],
        });
        continue;
      }

      const meta = await sharp(src).metadata();
      const aspect = (meta.height ?? 1) / (meta.width ?? 1);

      // Generate variants
      for (const width of VARIANTS) {
        const buffer = await sharp(src)
          .resize({ width, withoutEnlargement: true })
          .webp({ quality: 78, effort: 5 })
          .toBuffer();
        const path = `${category}/${slug}-${width}.webp`;
        const { error } = await supabase.storage
          .from(BUCKET)
          .upload(path, buffer, { contentType: "image/webp", upsert: true });
        if (error) {
          console.error(`  ✗ ${path}: ${error.message}`);
          continue;
        }
      }

      // Generate blurhash from 32px resize
      const { data: raw, info } = await sharp(src)
        .resize(32, Math.round(32 * aspect), { fit: "inside" })
        .raw()
        .ensureAlpha()
        .toBuffer({ resolveWithObject: true });
      const blurDataURL = `blurhash://${encode(
        new Uint8ClampedArray(raw),
        info.width,
        info.height,
        4,
        3,
      )}`;

      manifest[category].push({
        id,
        category,
        brand,
        slug,
        width: meta.width ?? 0,
        height: meta.height ?? 0,
        blurDataURL,
        variants: Object.fromEntries(
          VARIANTS.map((w) => [w, `${category}/${slug}-${w}.webp`]),
        ) as ManifestEntry["variants"],
      });

      if (i % 25 === 0) {
        console.log(`  · ${i}/${files.length} (${largestPath})`);
      }
    }
  }

  // Write typed manifest
  const manifestPath = "lib/gallery/manifest.ts";
  const out = `// AUTO-GENERATED by scripts/migrate-assets.ts — do not edit by hand.
// Re-run the script to refresh after adding new assets.

export type GalleryCategory = ${CATEGORIES.map((c) => `"${c}"`).join(" | ")};

export type GalleryEntry = {
  id: string;
  category: GalleryCategory;
  brand: string;
  slug: string;
  width: number;
  height: number;
  blurDataURL: string;
  variants: Record<${VARIANTS.join(" | ")}, string>;
};

export const MANIFEST: Record<GalleryCategory, GalleryEntry[]> = ${JSON.stringify(
    manifest,
    null,
    2,
  )};
`;
  await fs.mkdir("lib/gallery", { recursive: true });
  await fs.writeFile(manifestPath, out, "utf-8");
  console.log(`[migrate] wrote ${manifestPath}`);

  const total = Object.values(manifest).reduce((sum, arr) => sum + arr.length, 0);
  console.log(`[migrate] done — ${total} entries across ${CATEGORIES.length} categories`);
}

// ---- Helpers ---------------------------------------------------------------

function sanitizeSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function inferBrand(filename: string): string | null {
  const lower = filename.toLowerCase();
  if (lower.includes("terra")) return "terra-lotus";
  if (lower.includes("balm")) return "terra-lotus";
  if (lower.includes("soap")) return "terra-lotus";
  if (lower.includes("oil")) return "terra-lotus";
  if (lower.includes("sunscreen")) return "terra-lotus";
  if (lower.includes("deod")) return "terra-lotus";
  return null;
}

// dynamic import wrapper so heavy deps aren't required at typecheck time
async function dynamicImport<T>(mod: string): Promise<T> {
  return (await import(mod)) as T;
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
