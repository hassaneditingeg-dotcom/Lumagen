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
  return (
    <div className="relative -mr-6 overflow-hidden">
      <div className="flex gap-4 overflow-x-auto pr-6 pb-4 snap-x snap-mandatory lg:snap-none">
        {entries.map((entry, i) => (
          <Link
            key={entry.id}
            href={href ?? "/gallery"}
            className="group block min-w-0 basis-[68%] flex-none snap-start sm:basis-[42%] lg:basis-[23%]"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-md)] border border-[color:var(--color-border)]">
              <Image
                src={entry.variants["800"]}
                width={entry.width}
                height={entry.height}
                alt={entry.alt || ""}
                sizes="(min-width: 1024px) 22vw, (min-width: 640px) 42vw, 68vw"
                placeholder="blur"
                blurDataURL={entry.blurDataURL}
                unoptimized
                loading={i < 2 ? "eager" : "lazy"}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
