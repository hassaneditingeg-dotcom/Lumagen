import Image from "next/image";
import Link from "next/link";
import type { GalleryEntry } from "@/lib/gallery/manifest";

/**
 * Horizontal scroll strip of brand work — used on the home page and
 * other "showcase" surfaces. Snap-scrolls on mobile, fits all visible
 * on desktop.
 */
export function BrandStrip({
  entries,
  href,
}: {
  entries: GalleryEntry[];
  href?: string;
}) {
  return (
    <div className="relative -mr-6 overflow-hidden">
      <div className="flex gap-4 overflow-x-auto pr-6 pb-4 snap-x snap-mandatory lg:snap-none">
        {entries.map((entry, i) => {
          const tile = (
            <div
              className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-md)] border border-[color:var(--color-border)] snap-start"
              style={{ flex: "0 0 70%" }}
            >
              <Image
                src={entry.variants["800"]}
                width={entry.width}
                height={entry.height}
                alt={entry.alt || ""}
                sizes="(min-width: 1024px) 22vw, 70vw"
                placeholder="blur"
                blurDataURL={entry.blurDataURL}
                unoptimized
                priority={i < 2}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </div>
          );

          return (
            <Link
              key={entry.id}
              href={href ?? "/gallery"}
              className="group block min-w-0 sm:flex-[0_0_42%] lg:flex-[0_0_22%]"
              style={{ flexBasis: "70%" }}
            >
              {tile}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
