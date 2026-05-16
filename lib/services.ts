export type Service = {
  slug: string;
  tag: string;
  title: string;
  oneLiner: string;
  body: string;
  deliverables: string[];
  process: { step: string; title: string; body: string }[];
  pricing: { tier: string; price: string; description: string }[];
};

export const SERVICES: Service[] = [
  {
    slug: "listings",
    tag: "Listings",
    title: "Amazon & TikTok listing images",
    oneLiner:
      "Hero shots, infographics, comparison tiles, lifestyle scenes — built for the two-second scan.",
    body: "The listing carousel is the deal-closer of every product page. We design the full set — hero, infographic, lifestyle, comparison, and packaging — to be coherent, on-brand, and ruthlessly conversion-aware. Built to your category's playbook and your brand's voice.",
    deliverables: [
      "1 hero image (white/clean background, marketplace-compliant)",
      "3–5 infographic tiles (feature callouts, ingredient breakdowns, use cases)",
      "2 lifestyle / in-context scenes",
      "1 comparison or scale image",
      "Source files + 2x export sizes (Amazon, TikTok Shop)",
    ],
    process: [
      {
        step: "01",
        title: "Brief & references",
        body: "Send your SKU, audience, references, and brand assets. We come back with fit notes and a direction path in about 1 business day.",
      },
      {
        step: "02",
        title: "Sample direction",
        body: "For qualified briefs, we render a first hero direction for your actual product so you can judge the approach before committing.",
      },
      {
        step: "03",
        title: "Full set",
        body: "Approve and we ship the complete listing carousel in the agreed production window. Two revision rounds included.",
      },
      {
        step: "04",
        title: "Variants & versions",
        body: "Need a Mother's Day variant or a square-crop for Etsy? We keep your assets versioned and ready.",
      },
    ],
    pricing: [
      {
        tier: "Starter",
        price: "$280",
        description: "1 hero + 3 infographic tiles. Perfect for a single SKU launch.",
      },
      {
        tier: "Full carousel",
        price: "$640",
        description: "Hero + 5 infographics + 2 lifestyle + comparison. Standard package.",
      },
      {
        tier: "Catalog",
        price: "From $480 / SKU",
        description: "10+ SKUs at once. Volume discount, consistent direction across the line.",
      },
    ],
  },
  {
    slug: "a-plus",
    tag: "A+ Content",
    title: "Amazon A+ Content modules",
    oneLiner:
      "The brand-story panels beneath your detail page that turn browsers into buyers.",
    body: "A+ Content is often underused real estate on Amazon. We design module sets that support conversion by walking the shopper through your story, differentiation, and proof — visually, in seconds, on mobile.",
    deliverables: [
      "5–7 A+ modules (header banner, comparison chart, lifestyle, FAQs)",
      "Mobile-optimized layouts (≥70% of Amazon traffic)",
      "Brand story sequence (3 hero panels)",
      "Comparison chart vs. category competitors",
      "All Amazon-spec exports (970×600, 1464×600, etc.)",
    ],
    process: [
      {
        step: "01",
        title: "Conversion audit",
        body: "We map your current page (or competitor pages) and identify the three biggest objections to purchase.",
      },
      {
        step: "02",
        title: "Module architecture",
        body: "We design the panel order: hook → story → proof → spec → social — calibrated for your category.",
      },
      {
        step: "03",
        title: "Design & ship",
        body: "Full A+ set delivered in the agreed production window, with Amazon-ready exports and a Loom walkthrough.",
      },
    ],
    pricing: [
      {
        tier: "A+ Module Set",
        price: "$890",
        description: "Full 5–7 module pack, all Amazon-spec exports, mobile-first.",
      },
      {
        tier: "Premium A+",
        price: "$1,650",
        description: "Premium A+ with brand story, comparison chart, video panel slot, hover modules.",
      },
    ],
  },
  {
    slug: "storefronts",
    tag: "Storefronts",
    title: "Shopify & Amazon storefronts",
    oneLiner:
      "Branded multi-page storefronts with collection tiles and cross-sell rails built to support larger orders.",
    body: "Your storefront is the only listing real estate that lets you tell your full brand story. We design multi-page Amazon Brand Storefronts and Shopify themes that turn one-product purchases into category-discovery sessions.",
    deliverables: [
      "Home page with hero, collection rails, and brand story panel",
      "Category landing pages (one per product line)",
      "Featured product pages with cross-sell modules",
      "About / Our Story brand page",
      "Full asset library for both desktop and mobile",
    ],
    process: [
      {
        step: "01",
        title: "Information architecture",
        body: "We map your product lines, audience segments, and primary entry paths. The IA decides the layout.",
      },
      {
        step: "02",
        title: "Page-by-page design",
        body: "Each page built around one job-to-be-done — discover, decide, or convert.",
      },
      {
        step: "03",
        title: "Launch + analytics setup",
        body: "We ship a Looker dashboard so you can see what's clicking, what's stalling, and where to iterate.",
      },
    ],
    pricing: [
      {
        tier: "Amazon Storefront",
        price: "$1,400",
        description: "3-page Amazon Brand Storefront with collection tiles and featured products.",
      },
      {
        tier: "Shopify theme",
        price: "$2,800",
        description: "Custom-designed Shopify theme (Dawn-based) with full brand styling.",
      },
    ],
  },
  {
    slug: "lifestyle",
    tag: "Lifestyle",
    title: "Lifestyle photography",
    oneLiner:
      "AI-crafted in-context scenes — products in hands, on counters, in kitchens — without a single hired model.",
    body: "Lifestyle imagery sells the daydream. We craft scenes that show your product in the moments your customer wants to live in — without studio rentals, model day rates, or three-week revision loops.",
    deliverables: [
      "10–20 lifestyle scenes per package",
      "Multiple settings (home, outdoors, hands-on, group)",
      "Diverse model representation",
      "Square + portrait + landscape variants",
      "Source files + retouched final exports",
    ],
    process: [
      {
        step: "01",
        title: "Mood direction",
        body: "We agree on tone, palette, and settings. You pick references; we pin the direction.",
      },
      {
        step: "02",
        title: "Scene generation",
        body: "We generate 30–50 candidates and curate to the strongest 20.",
      },
      {
        step: "03",
        title: "Refinement & delivery",
        body: "Final retouch pass + multi-aspect exports. Two revision rounds included.",
      },
    ],
    pricing: [
      {
        tier: "Lifestyle Pack",
        price: "$520",
        description: "10 scenes, 2 settings. Great for a single product launch.",
      },
      {
        tier: "Lifestyle Library",
        price: "$1,200",
        description: "20 scenes, 4–6 settings. Year of social + listing variety.",
      },
    ],
  },
  {
    slug: "social",
    tag: "Social",
    title: "Social-first creatives",
    oneLiner:
      "Reels, TikTok unboxings, and static posts cut for the algorithm your customers actually use.",
    body: "Social isn't a leftover format — it's its own discipline. We design vertical-first creatives that look native on Reels, TikTok, and Stories: hook in the first frame, payoff before the swipe.",
    deliverables: [
      "10 vertical static posts (9:16)",
      "5 short-form video creatives (15–30s, hook → product → CTA)",
      "Carousel post templates (1:1) for repurposing",
      "Cover frames + captions sheet",
      "Source PSD/AE files for in-house remixing",
    ],
    process: [
      {
        step: "01",
        title: "Channel + audience",
        body: "Where does your buyer scroll, and what makes them stop? We design to that, not to genre conventions.",
      },
      {
        step: "02",
        title: "Hooks & beats",
        body: "Each creative pinned to one hook and one beat. No multi-message posts.",
      },
      {
        step: "03",
        title: "Variants & A/B",
        body: "Two variants per creative so you can A/B and let the metric pick the winner.",
      },
    ],
    pricing: [
      {
        tier: "Social Starter",
        price: "$420",
        description: "10 static posts + 3 short-form videos. One product line.",
      },
      {
        tier: "Always-on Social",
        price: "$1,100 / mo",
        description: "Rolling content engine: 20 statics + 8 videos every month.",
      },
    ],
  },
  {
    slug: "packaging",
    tag: "Packaging",
    title: "Packaging & label design",
    oneLiner:
      "Brand-direction and label refreshes that make the unboxing as good as the imagery.",
    body: "We design labels, boxes, and inserts that match the brand identity we build for your listings — so the moment the customer opens the package, the imagery they bought into shows up in their hands.",
    deliverables: [
      "Primary label design (front + back + ingredients)",
      "Shipping carton + insert card",
      "Print-ready files (dieline + CMYK + bleed)",
      "Mockup renders for marketing use",
    ],
    process: [
      {
        step: "01",
        title: "Brand alignment",
        body: "If we did your listings, packaging is downstream of the same direction. If not, we audit the line first.",
      },
      {
        step: "02",
        title: "Label + dieline",
        body: "Front, back, ingredients panel, regulatory copy. Print-ready CMYK on standard substrates.",
      },
      {
        step: "03",
        title: "Mockup deliverable",
        body: "Photorealistic mockups for marketing use and listing imagery.",
      },
    ],
    pricing: [
      {
        tier: "Single SKU",
        price: "$680",
        description: "Front + back label + shipping carton. Print-ready.",
      },
      {
        tier: "Line refresh",
        price: "From $480 / SKU",
        description: "5+ SKU lines at once with consistent system design.",
      },
    ],
  },
];

export function getService(slug: string) {
  return SERVICES.find((s) => s.slug === slug);
}

export function getAllSlugs() {
  return SERVICES.map((s) => s.slug);
}
