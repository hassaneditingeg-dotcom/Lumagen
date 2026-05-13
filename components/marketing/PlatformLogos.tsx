/**
 * PlatformLogos — "Built for sellers on" trust strip.
 *
 * Replaces the earlier text marquee. Stylized SVG wordmarks/marks
 * for each major marketplace — recognizable but trademark-safe
 * because we use simplified type-only or geometric versions rather
 * than the official protected logos. Each renders in --color-text-lo
 * by default, gold on hover.
 */

const PLATFORMS = [
  { name: "Amazon", Mark: AmazonMark },
  { name: "Shopify", Mark: ShopifyMark },
  { name: "TikTok Shop", Mark: TikTokShopMark },
  { name: "Walmart", Mark: WalmartMark },
  { name: "eBay", Mark: EbayMark },
  { name: "Etsy", Mark: EtsyMark },
  { name: "Meta Ads", Mark: MetaMark },
  { name: "Pinterest", Mark: PinterestMark },
];

export function PlatformLogos() {
  return (
    <div className="border-y border-[color:var(--color-border)] py-8 lg:py-10">
      <div className="mx-auto max-w-7xl px-6">
        <p className="mb-7 text-center text-[length:var(--text-eyebrow)] font-[600] uppercase tracking-[var(--text-eyebrow--letter-spacing)] text-[color:var(--color-text-lo)]">
          Built for sellers on
        </p>
        <ul className="grid grid-cols-2 items-center gap-y-7 gap-x-4 sm:grid-cols-4 lg:grid-cols-8">
          {PLATFORMS.map(({ name, Mark }) => (
            <li
              key={name}
              className="flex items-center justify-center text-[color:var(--color-text-lo)] transition-colors duration-300 hover:text-[color:var(--color-gold-500)]"
              aria-label={name}
              title={name}
            >
              <Mark />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* =============================================================
   Simplified, trademark-safe marks. All accept currentColor so
   they recolor on hover via the parent <li>.
   ============================================================= */

function AmazonMark() {
  return (
    <svg
      width="92"
      height="28"
      viewBox="0 0 92 28"
      fill="none"
      aria-hidden="true"
    >
      <text
        x="46"
        y="16"
        fill="currentColor"
        fontFamily="var(--font-display), serif"
        fontSize="17"
        fontWeight="700"
        textAnchor="middle"
        letterSpacing="-0.02em"
      >
        amazon
      </text>
      <path
        d="M 14 22 Q 46 30 78 22"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 74 19.5 L 78 22 L 74 25"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

function ShopifyMark() {
  return (
    <svg width="98" height="22" viewBox="0 0 98 22" fill="none" aria-hidden="true">
      <path
        d="M 6 6 C 7 4 9 3 11 3 C 14 3 14 6 14 6 L 18 5 L 16 19 L 4 17 L 6 6 Z"
        fill="currentColor"
        opacity="0.9"
      />
      <text
        x="26"
        y="16"
        fill="currentColor"
        fontFamily="var(--font-display), serif"
        fontSize="16"
        fontWeight="600"
        letterSpacing="-0.01em"
      >
        Shopify
      </text>
    </svg>
  );
}

function TikTokShopMark() {
  return (
    <svg
      width="110"
      height="22"
      viewBox="0 0 110 22"
      fill="none"
      aria-hidden="true"
    >
      <text
        x="0"
        y="16"
        fill="currentColor"
        fontFamily="var(--font-display), serif"
        fontSize="15"
        fontWeight="700"
        letterSpacing="-0.02em"
      >
        TikTok Shop
      </text>
    </svg>
  );
}

function WalmartMark() {
  return (
    <svg
      width="96"
      height="22"
      viewBox="0 0 96 22"
      fill="none"
      aria-hidden="true"
    >
      <g transform="translate(2 11)">
        {Array.from({ length: 6 }).map((_, i) => {
          const angle = (i * 60 * Math.PI) / 180;
          return (
            <line
              key={i}
              x1="0"
              y1="0"
              x2={Math.cos(angle) * 7}
              y2={Math.sin(angle) * 7}
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          );
        })}
      </g>
      <text
        x="18"
        y="16"
        fill="currentColor"
        fontFamily="var(--font-display), serif"
        fontSize="15"
        fontWeight="600"
        letterSpacing="-0.005em"
      >
        Walmart
      </text>
    </svg>
  );
}

function EbayMark() {
  return (
    <svg width="60" height="22" viewBox="0 0 60 22" fill="none" aria-hidden="true">
      <text
        x="0"
        y="17"
        fontFamily="var(--font-display), serif"
        fontSize="20"
        fontWeight="700"
        letterSpacing="-0.04em"
      >
        <tspan fill="currentColor">e</tspan>
        <tspan fill="currentColor" opacity="0.85">b</tspan>
        <tspan fill="currentColor" opacity="0.7">a</tspan>
        <tspan fill="currentColor" opacity="0.55">y</tspan>
      </text>
    </svg>
  );
}

function EtsyMark() {
  return (
    <svg width="58" height="22" viewBox="0 0 58 22" fill="none" aria-hidden="true">
      <text
        x="0"
        y="16"
        fill="currentColor"
        fontFamily="var(--font-display), serif"
        fontSize="17"
        fontWeight="700"
        fontStyle="italic"
        letterSpacing="-0.02em"
      >
        Etsy
      </text>
    </svg>
  );
}

function MetaMark() {
  return (
    <svg width="84" height="22" viewBox="0 0 84 22" fill="none" aria-hidden="true">
      <path
        d="M 2 14 Q 6 4 11 8 Q 16 14 21 8"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <text
        x="26"
        y="16"
        fill="currentColor"
        fontFamily="var(--font-display), serif"
        fontSize="15"
        fontWeight="600"
      >
        Meta Ads
      </text>
    </svg>
  );
}

function PinterestMark() {
  return (
    <svg
      width="96"
      height="22"
      viewBox="0 0 96 22"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="10" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
      <line
        x1="10"
        y1="11"
        x2="7"
        y2="19"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <text
        x="22"
        y="16"
        fill="currentColor"
        fontFamily="var(--font-display), serif"
        fontSize="15"
        fontWeight="600"
      >
        Pinterest
      </text>
    </svg>
  );
}
