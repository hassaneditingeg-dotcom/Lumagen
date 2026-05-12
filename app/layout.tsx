import type { Metadata } from "next";
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";
import { SiteHeader } from "@/components/marketing/SiteHeader";
import { SiteFooter } from "@/components/marketing/SiteFooter";
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
    default: "Lumagine A.I — Zero to Hero Studio",
    template: "%s · Lumagine A.I",
  },
  description:
    "AI creative studio for Amazon, TikTok Shop, and Shopify sellers. We design listing images, storefronts, A+ Content, and social creatives engineered to lift conversion.",
  metadataBase: new URL("https://lumagine.ai"),
  openGraph: {
    title: "Lumagine A.I — Zero to Hero Studio",
    description:
      "AI-crafted listings, storefronts, and A+ content for ecommerce brands.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${instrument.variable} antialiased`}
    >
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
