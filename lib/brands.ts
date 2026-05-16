export type Brand = {
  slug: string;
  name: string;
  tagline: string;
  category: string;
  oneLiner: string;
  story: string;
  approach: string[];
  scope: string[];
  stats: { value: number; suffix?: string; label: string }[];
  galleryCategories: ("listings" | "lifestyle" | "white-bg")[];
};

export const BRANDS: Brand[] = [
  {
    slug: "terra-lotus",
    name: "Terra Lotus",
    tagline: "Botanical skincare, reimagined.",
    category: "Skincare · 5 SKUs",
    oneLiner:
      "A botanical skincare brand launching across Amazon, TikTok Shop, and Shopify with a full AI-crafted creative system.",
    story:
      "Terra Lotus came to us with five products — Balm, Soap, Deodorant, Hair Oil, and Sunscreen — and a launch window that didn't allow for traditional photoshoots. The brand needed listing imagery, A+ Content, a Shopify storefront, and social-first creatives all coherent across SKUs and platforms.",
    approach: [
      "Built a brand visual system first: palette, type direction, lighting recipe, and shot library structure.",
      "Curated a broad AI-crafted image library across listings, lifestyle, and social formats with one unified aesthetic.",
      "Designed Amazon listing carousels for each SKU plus a full A+ Content module set for the hero product.",
      "Built a Shopify storefront with collection rails and product story panels that match the listing visual system.",
    ],
    scope: [
      "Listing carousels for 5 SKUs (35 images)",
      "Amazon A+ Content modules (7 modules × hero product)",
      "Lifestyle library across home, bath, and kitchen scenes",
      "Shopify storefront design (5 pages)",
      "Social-first creatives (Reels + TikTok + Stories)",
    ],
    stats: [
      { value: 30, suffix: "+", label: "Public showcase images" },
      { value: 5, label: "Product SKUs" },
      { value: 3, label: "Platforms covered" },
      { value: 12, suffix: " days", label: "Showcase production window" },
    ],
    galleryCategories: ["white-bg", "lifestyle", "listings"],
  },
];

export function getBrand(slug: string) {
  return BRANDS.find((b) => b.slug === slug);
}

export function getAllBrandSlugs() {
  return BRANDS.map((b) => b.slug);
}
