import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/marketing/Container";
import { Divider } from "@/components/marketing/Divider";
import { Section } from "@/components/marketing/Section";
import { Counter } from "@/components/motion/Counter";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { Reveal } from "@/components/motion/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, caseStudySchema, SITE } from "@/lib/seo";
import { getAllBrandSlugs, getBrand } from "@/lib/brands";
import { MANIFEST } from "@/lib/gallery/manifest";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return getAllBrandSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const brand = getBrand(slug);
  if (!brand) return {};
  return {
    title: `${brand.name} — Case Study`,
    description: brand.oneLiner,
  };
}

export default async function BrandPage({ params }: { params: Params }) {
  const { slug } = await params;
  const brand = getBrand(slug);
  if (!brand) notFound();

  // Pull a representative selection from the categories this brand covers.
  const hero = MANIFEST["white-bg"][0];
  const lifestyleStrip = MANIFEST.lifestyle.slice(0, 6);
  const listingStrip = MANIFEST.listings.slice(0, 6);
  const whitebgStrip = MANIFEST["white-bg"].slice(0, 6);

  const schemas = [
    caseStudySchema({
      name: brand.name,
      slug: brand.slug,
      description: brand.oneLiner,
      image: hero ? `${SITE}${hero.variants["1600"]}` : undefined,
    }),
    breadcrumbSchema([
      { name: "Home", url: SITE },
      { name: "Gallery", url: `${SITE}/gallery` },
      { name: brand.name, url: `${SITE}/brands/${brand.slug}` },
    ]),
  ];

  return (
    <main className="relative z-10">
      <JsonLd id={`ld-brand-${brand.slug}`} data={schemas} />

      {/* HERO */}
      <section className="relative px-6 pt-32 pb-16 lg:pt-40 lg:pb-20">
        <Container>
          <Link
            href="/gallery"
            className="text-sm text-[color:var(--color-text-mid)] transition-colors hover:text-[color:var(--color-text-hi)]"
          >
            &larr; All work
          </Link>
          <div className="mt-8 grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
            <div>
              <span className="eyebrow">Case study · {brand.category}</span>
              <h1 className="mt-5 text-[length:var(--text-display-xl)] font-[700] leading-[var(--text-display-xl--line-height)] tracking-[var(--text-display-xl--letter-spacing)]">
                {brand.name}
              </h1>
              <p className="mt-4 text-[length:var(--text-body-lg)] text-[color:var(--color-text-mid)]">
                {brand.tagline}
              </p>
              <p className="mt-8 max-w-xl text-[length:var(--text-body-lg)] leading-[var(--text-body-lg--line-height)] text-[color:var(--color-text-mid)]">
                {brand.oneLiner}
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <Link href="/contact" className="btn-primary">
                  Want this for your brand?
                </Link>
                <Link href="/gallery" className="btn-secondary">
                  See more work
                </Link>
              </div>
            </div>

            {hero && (
              <div className="relative aspect-square overflow-hidden rounded-[var(--radius-lg)] border border-[color:var(--color-border)]">
                <Image
                  src={hero.variants["1600"]}
                  width={hero.width}
                  height={hero.height}
                  alt={`${brand.name} hero`}
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  placeholder="blur"
                  blurDataURL={hero.blurDataURL}
                  unoptimized
                  priority
                  className="h-full w-full object-cover"
                />
              </div>
            )}
          </div>
        </Container>
      </section>

      <Container>
        <Divider />
      </Container>

      {/* STATS */}
      <Section spacing="tight">
        <Container>
          <Reveal>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {brand.stats.map((s) => (
                <div
                  key={s.label}
                  className="border-l border-[color:var(--color-border-strong)] pl-5"
                >
                  <p className="text-[length:var(--text-display-md)] font-[700] tracking-[var(--text-display-md--letter-spacing)]">
                    <Counter value={s.value} suffix={s.suffix} />
                  </p>
                  <p className="mt-2 text-sm text-[color:var(--color-text-mid)]">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </Section>

      <Container>
        <Divider />
      </Container>

      {/* STORY + APPROACH */}
      <Section>
        <Container>
          <Reveal className="grid gap-16 lg:grid-cols-[1fr_1.4fr]">
            <div>
              <span className="eyebrow">The brief</span>
              <h2 className="mt-4 text-[length:var(--text-display-lg)] font-[700] leading-[var(--text-display-lg--line-height)] tracking-[var(--text-display-lg--letter-spacing)]">
                Launch-ready, fast.
              </h2>
            </div>
            <div>
              <p className="text-[length:var(--text-body-lg)] leading-[var(--text-body-lg--line-height)] text-[color:var(--color-text-mid)]">
                {brand.story}
              </p>
              <div className="mt-10">
                <span className="eyebrow">How we approached it</span>
                <ul className="mt-4 space-y-3">
                  {brand.approach.map((a, i) => (
                    <li
                      key={i}
                      className="flex gap-3 text-[color:var(--color-text-mid)]"
                    >
                      <span
                        className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{ background: "var(--color-gold-500)" }}
                      />
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Container>
        <Divider />
      </Container>

      {/* WHITE-BG HEROES */}
      <Section spacing="tight">
        <Container>
          <span className="eyebrow">Hero shots</span>
          <h2 className="mt-3 text-[length:var(--text-display-md)] font-[700] tracking-[var(--text-display-md--letter-spacing)]">
            Listing-ready white-background heroes.
          </h2>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
            {whitebgStrip.map((entry) => (
              <div
                key={entry.id}
                className="relative aspect-square overflow-hidden rounded-[var(--radius-md)] border border-[color:var(--color-border)]"
              >
                <Image
                  src={entry.variants["800"]}
                  width={entry.width}
                  height={entry.height}
                  alt={entry.alt || ""}
                  sizes="(min-width: 1024px) 16vw, 50vw"
                  placeholder="blur"
                  blurDataURL={entry.blurDataURL}
                  unoptimized
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* LIFESTYLE */}
      <Section spacing="tight">
        <Container>
          <span className="eyebrow">Lifestyle</span>
          <h2 className="mt-3 text-[length:var(--text-display-md)] font-[700] tracking-[var(--text-display-md--letter-spacing)]">
            In the moments that matter.
          </h2>
          <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
            {lifestyleStrip.map((entry) => (
              <div
                key={entry.id}
                className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-md)] border border-[color:var(--color-border)]"
              >
                <Image
                  src={entry.variants["800"]}
                  width={entry.width}
                  height={entry.height}
                  alt={entry.alt || ""}
                  sizes="(min-width: 1024px) 16vw, 50vw"
                  placeholder="blur"
                  blurDataURL={entry.blurDataURL}
                  unoptimized
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
          <div className="mt-6 text-right">
            <Link
              href="/gallery?tab=lifestyle"
              className="text-sm text-[color:var(--color-text-mid)] transition-colors hover:text-[color:var(--color-gold-500)]"
            >
              See all lifestyle samples &rarr;
            </Link>
          </div>
        </Container>
      </Section>

      {/* LISTINGS */}
      <Section spacing="tight">
        <Container>
          <span className="eyebrow">In-context listings</span>
          <h2 className="mt-3 text-[length:var(--text-display-md)] font-[700] tracking-[var(--text-display-md--letter-spacing)]">
            Built for the carousel.
          </h2>
          <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
            {listingStrip.map((entry) => (
              <div
                key={entry.id}
                className="relative aspect-square overflow-hidden rounded-[var(--radius-md)] border border-[color:var(--color-border)]"
              >
                <Image
                  src={entry.variants["800"]}
                  width={entry.width}
                  height={entry.height}
                  alt={entry.alt || ""}
                  sizes="(min-width: 1024px) 16vw, 50vw"
                  placeholder="blur"
                  blurDataURL={entry.blurDataURL}
                  unoptimized
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* SCOPE */}
      <Section>
        <Container>
          <span className="eyebrow">Scope delivered</span>
          <h2 className="mt-4 text-[length:var(--text-display-lg)] font-[700] leading-[var(--text-display-lg--line-height)] tracking-[var(--text-display-lg--letter-spacing)]">
            What shipped.
          </h2>
          <ul className="mt-10 grid gap-3 md:grid-cols-2">
            {brand.scope.map((s) => (
              <li
                key={s}
                className="surface-card flex items-start gap-3 px-5 py-4 text-[color:var(--color-text-mid)]"
              >
                <span
                  className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ background: "var(--color-gold-500)" }}
                />
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* CTA */}
      <Section>
        <Reveal className="mx-auto max-w-4xl text-center">
          <h2 className="text-[length:var(--text-display-lg)] font-[700] leading-[var(--text-display-lg--line-height)] tracking-[var(--text-display-lg--letter-spacing)]">
            Want a system like this for your brand?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-[length:var(--text-body-lg)] text-[color:var(--color-text-mid)]">
            Tell us what you sell, and we&rsquo;ll come back with a creative
            direction and a sample mockup inside 48 hours.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <MagneticButton href="/contact" className="btn-primary">
              Start a brief
            </MagneticButton>
          </div>
        </Reveal>
      </Section>
    </main>
  );
}
