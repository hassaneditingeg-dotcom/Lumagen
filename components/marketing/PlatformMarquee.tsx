/**
 * PlatformMarquee — auto-scrolling row of platform names beneath the hero.
 * Inspired by the "as seen in" strips on Linear / Vercel marketing.
 * Pauses on hover (handled in globals.css .marquee:hover).
 */

const PLATFORMS = [
  "Amazon",
  "TikTok Shop",
  "Shopify",
  "eBay",
  "Etsy",
  "Walmart",
  "Instagram",
  "Meta Ads",
  "Pinterest",
  "Reels",
  "Storefronts",
  "A+ Content",
];

export function PlatformMarquee() {
  // Duplicate the list so the scroll loop is seamless.
  const tracks = [...PLATFORMS, ...PLATFORMS];

  return (
    <div className="marquee py-8" aria-hidden="true">
      <div className="marquee-track">
        {tracks.map((label, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-3 text-sm font-[500] tracking-[-0.005em] text-[color:var(--color-text-mid)] uppercase whitespace-nowrap"
            style={{ letterSpacing: "0.04em" }}
          >
            <Dot />
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

function Dot() {
  return (
    <span
      className="inline-block h-1 w-1 rounded-full"
      style={{ background: "var(--color-gold-500)" }}
    />
  );
}
