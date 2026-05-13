/**
 * Structured-data helpers — JSON-LD schemas for SEO / rich results.
 *
 * Usage: each builder returns a plain object suitable for inlining via
 * <Script id="..." type="application/ld+json">{JSON.stringify(obj)}</Script>
 * or directly via a <JsonLd> component (see components/seo/JsonLd.tsx).
 *
 * Schemas implemented:
 *   - Organization        — site-wide (root layout)
 *   - WebSite             — site-wide with SearchAction
 *   - Service             — per service detail page
 *   - FAQPage             — home FAQ block
 *   - BreadcrumbList      — service detail + brand case study
 *   - CreativeWork        — brand case study (proof piece)
 */

export const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lumagine.ai";
export const ORG_NAME = "Lumagine A.I";
export const ORG_DESCRIPTION =
  "AI creative studio for Amazon, TikTok Shop, Shopify, eBay, and Etsy sellers. Listing imagery, A+ Content, storefronts, lifestyle scenes, and social-first creatives.";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE}/#organization`,
    name: ORG_NAME,
    alternateName: "Lumagine",
    description: ORG_DESCRIPTION,
    url: SITE,
    logo: `${SITE}/og`,
    image: `${SITE}/og`,
    foundingDate: "2026",
    slogan: "Zero to Hero Studio",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Cairo",
      addressCountry: "EG",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: "hello@lumagine.ai",
      areaServed: ["US", "CA", "GB", "AU", "EG"],
      availableLanguage: ["en"],
    },
    areaServed: [
      { "@type": "Country", name: "United States" },
      { "@type": "Country", name: "Canada" },
      { "@type": "Country", name: "United Kingdom" },
      { "@type": "Country", name: "Australia" },
    ],
    knowsAbout: [
      "Amazon listing optimization",
      "Amazon A+ Content",
      "TikTok Shop creatives",
      "Shopify storefront design",
      "Ecommerce product photography",
      "AI image generation for retail",
    ],
  } as const;
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE}/#website`,
    name: ORG_NAME,
    url: SITE,
    description: ORG_DESCRIPTION,
    publisher: { "@id": `${SITE}/#organization` },
    inLanguage: "en-US",
  } as const;
}

export function serviceSchema(input: {
  name: string;
  slug: string;
  description: string;
  tiers: { name: string; price: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE}/services/${input.slug}#service`,
    serviceType: input.name,
    name: input.name,
    description: input.description,
    provider: { "@id": `${SITE}/#organization` },
    areaServed: [
      { "@type": "Country", name: "United States" },
      { "@type": "Country", name: "Canada" },
      { "@type": "Country", name: "United Kingdom" },
      { "@type": "Country", name: "Australia" },
    ],
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      lowPrice: input.tiers[0]?.price.replace(/[^\d.]/g, "") ?? "0",
      offerCount: input.tiers.length,
      offers: input.tiers.map((t) => ({
        "@type": "Offer",
        name: t.name,
        price: t.price.replace(/[^\d.]/g, ""),
        priceCurrency: "USD",
      })),
    },
    url: `${SITE}/services/${input.slug}`,
  } as const;
}

export function faqPageSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  } as const;
}

export function breadcrumbSchema(crumbs: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: c.url,
    })),
  } as const;
}

export function caseStudySchema(input: {
  name: string;
  slug: string;
  description: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${SITE}/brands/${input.slug}#casestudy`,
    name: `${input.name} — Case Study`,
    headline: `${input.name} — Case Study`,
    description: input.description,
    creator: { "@id": `${SITE}/#organization` },
    publisher: { "@id": `${SITE}/#organization` },
    url: `${SITE}/brands/${input.slug}`,
    image: input.image,
  } as const;
}
