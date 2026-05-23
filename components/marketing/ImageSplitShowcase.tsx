import Image from "next/image";
import Link from "next/link";
import type { GalleryEntry } from "@/lib/gallery/manifest";

export function ImageSplitShowcase({
  hero,
  support,
  detail,
}: {
  hero: GalleryEntry;
  support: GalleryEntry;
  detail: GalleryEntry;
}) {
  return (
    <section className="split-showcase relative px-6 py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
        <div>
          <span className="eyebrow">Image direction system</span>
          <h2 className="mt-4 max-w-xl text-[length:var(--text-display-lg)] font-[700] leading-[var(--text-display-lg--line-height)] tracking-[var(--text-display-lg--letter-spacing)]">
            One product, multiple buying moments.
          </h2>
          <p className="mt-5 max-w-xl text-[color:var(--color-text-mid)]">
            The strongest ecommerce sets do not repeat the same image style.
            They move from instant recognition, to lifestyle context, to proof
            details that make the shopper feel oriented.
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {["Hero SKU", "Lifestyle scene", "Proof tile", "Storefront crop"].map((label) => (
              <span
                key={label}
                className="rounded-full border border-[color:var(--color-border)] px-3 py-1 text-xs text-[color:var(--color-text-mid)]"
              >
                {label}
              </span>
            ))}
          </div>
          <Link href="/gallery" className="btn-secondary mt-9">
            Explore Image Systems
          </Link>
        </div>

        <div className="split-grid">
          <Link
            href="/gallery"
            className="split-image group block min-h-[24rem] lg:min-h-[34rem]"
            aria-label="Open gallery"
          >
            <Image
              src={hero.variants["1600"]}
              width={hero.width}
              height={hero.height}
              alt={hero.alt || "AI lifestyle product scene"}
              sizes="(min-width: 1024px) 54vw, 100vw"
              placeholder="blur"
              blurDataURL={hero.blurDataURL}
              unoptimized
              className="h-full w-full object-cover"
            />
            <span className="split-image-label">
              <span>01 / Context</span>
              <span>Scene-led visuals that make the product feel placed, not pasted.</span>
            </span>
          </Link>

          <div className="grid gap-4">
            {[support, detail].map((entry, index) => (
              <Link
                key={entry.id}
                href="/gallery"
                className="split-image group block min-h-[15rem]"
                aria-label="Open gallery"
              >
                <Image
                  src={entry.variants["800"]}
                  width={entry.width}
                  height={entry.height}
                  alt={entry.alt || "AI ecommerce product visual"}
                  sizes="(min-width: 1024px) 32vw, 100vw"
                  placeholder="blur"
                  blurDataURL={entry.blurDataURL}
                  unoptimized
                  className="h-full w-full object-cover"
                />
                <span className="split-image-label">
                  <span>{index === 0 ? "02 / Listing" : "03 / Detail"}</span>
                  <span>
                    {index === 0
                      ? "Marketplace crops built for fast scan behavior."
                      : "Detail frames for claims, texture, and ingredients."}
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
