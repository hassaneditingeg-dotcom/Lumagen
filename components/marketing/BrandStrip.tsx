import Image from "next/image";
import Link from "next/link";
import type { GalleryEntry } from "@/lib/gallery/manifest";

/**
 * Horizontal scroll strip of brand work — used on the home showcase and
 * any "preview row" surface. Mobile: ~70% width per tile so the next
 * one peeks in. Tablet: 42%. Desktop: 24% so four sit visible with a
 * peek of the fifth.
 */
export function BrandStrip({
  entries,
  href,
}: {
  entries: GalleryEntry[];
  href?: string;
}) {
  const tileShapes = [
    "aspect-[16/11] lg:basis-[31%]",
    "aspect-[4/5] lg:basis-[21%] lg:mt-10",
    "aspect-square lg:basis-[22%]",
    "aspect-[5/6] lg:basis-[22%] lg:mt-5",
  ];

  return (
    <div className="relative -mr-6 overflow-hidden lg:-mr-0">
      <div className="flex gap-4 overflow-x-auto pr-6 pb-4 snap-x snap-mandatory lg:gap-5 lg:pr-0 lg:snap-none">
        {entries.map((entry, i) => (
          <Link
            key={entry.id}
            href={href ?? "/gallery"}
            className={`group block min-w-0 basis-[72%] flex-none snap-start sm:basis-[44%] ${tileShapes[i % tileShapes.length]}`}
          >
            <div className="brand-strip-card h-full">
              <Image
                src={entry.variants["800"]}
                width={entry.width}
                height={entry.height}
                alt={entry.alt || ""}
                sizes="(min-width: 1024px) 30vw, (min-width: 640px) 44vw, 72vw"
                placeholder="blur"
                blurDataURL={entry.blurDataURL}
                unoptimized
                loading={i < 2 ? "eager" : "lazy"}
                className="h-full w-full object-cover transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-[1.035]"
              />
              <span className="brand-strip-label">
                <span>{entry.category === "white-bg" ? "Clean SKU" : entry.category}</span>
                <span>{String(i + 1).padStart(2, "0")}</span>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
