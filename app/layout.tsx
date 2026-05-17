import type { Metadata } from "next";
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";
import { SiteHeader } from "@/components/marketing/SiteHeader";
import { SiteFooter } from "@/components/marketing/SiteFooter";
import { StickyCTA } from "@/components/marketing/StickyCTA";
import { CursorGlow } from "@/components/motion/CursorGlow";
import { WebVitals } from "@/components/perf/WebVitals";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationSchema, websiteSchema } from "@/lib/seo";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const instrument = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Lumagen A.I — Zero to Hero Studio",
    template: "%s · Lumagen A.I",
  },
  description:
    "AI creative studio for Amazon, TikTok Shop, Shopify, eBay, and Etsy sellers. Listing imagery, A+ Content, storefronts, lifestyle scenes, and social creatives built to support buyer confidence.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://lumagen.ai"),
  alternates: { canonical: "/" },
  applicationName: "Lumagen A.I",
  authors: [{ name: "Lumagen A.I" }],
  creator: "Lumagen A.I",
  publisher: "Lumagen A.I",
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    title: "Lumagen A.I — Zero to Hero Studio",
    description:
      "AI-crafted listings, storefronts, and A+ content for ecommerce brands.",
    type: "website",
    locale: "en_US",
    siteName: "Lumagen A.I",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lumagen A.I — Zero to Hero Studio",
    description:
      "AI-crafted listings, storefronts, and A+ content for ecommerce brands.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "Design",
};

export const viewport = {
  themeColor: "#080808",
  colorScheme: "dark" as const,
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-US"
      className={`${bricolage.variable} ${instrument.variable} antialiased`}
    >
      <body>
        <JsonLd id="ld-organization" data={organizationSchema()} />
        <JsonLd id="ld-website" data={websiteSchema()} />
        <WebVitals />
        <a href="#main" className="skip-to-content">Skip to content</a>
        <SiteHeader />
        <div id="main">
          {children}
        </div>
        <SiteFooter />
        <StickyCTA hideOn={["/contact"]} />
        <CursorGlow />
      </body>
    </html>
  );
}
