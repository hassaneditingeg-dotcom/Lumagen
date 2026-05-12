import Link from "next/link";

const COLUMNS = [
  {
    label: "Studio",
    links: [
      { href: "/about", label: "About" },
      { href: "/services", label: "Services" },
      { href: "/gallery", label: "Gallery" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    label: "Platforms",
    links: [
      { href: "/services/amazon", label: "Amazon" },
      { href: "/services/tiktok-shop", label: "TikTok Shop" },
      { href: "/services/shopify", label: "Shopify" },
      { href: "/services/a-plus", label: "A+ Content" },
    ],
  },
  {
    label: "Account",
    links: [
      { href: "/login", label: "Sign in" },
      { href: "/signup", label: "Create account" },
      { href: "/dashboard", label: "Dashboard" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer
      className="relative mt-24 border-t border-[color:var(--color-border)]"
      style={{ backgroundColor: "rgba(6, 5, 4, 0.65)" }}
    >
      <div className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <p className="text-2xl font-[700] tracking-[-0.02em] text-[color:var(--color-text-hi)]">
              Lumagine
              <span
                className="ml-2 align-[0.15em] text-[0.55em] font-[500] uppercase tracking-[0.22em]"
                style={{ color: "var(--color-gold-500)" }}
              >
                A.I
              </span>
            </p>
            <p className="mt-4 max-w-sm text-[color:var(--color-text-mid)]">
              Zero to Hero Studio — AI-crafted listings, storefronts, and A+
              content for ecommerce brands. Made in Cairo, shipping worldwide.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.label}>
              <span
                className="eyebrow"
                style={{ color: "var(--color-text-lo)" }}
              >
                {col.label}
              </span>
              <ul className="mt-5 space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[color:var(--color-text-mid)] transition-colors hover:text-[color:var(--color-text-hi)]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-[color:var(--color-border)] pt-8 text-sm text-[color:var(--color-text-lo)] sm:flex-row sm:items-center">
          <span>
            &copy; {new Date().getFullYear()} Lumagine A.I. All rights reserved.
          </span>
          <span>Cairo · Egypt</span>
        </div>
      </div>
    </footer>
  );
}
