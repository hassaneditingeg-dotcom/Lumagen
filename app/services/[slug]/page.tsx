import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/marketing/Container";
import { Section } from "@/components/marketing/Section";
import { getAllSlugs, getService, SERVICES } from "@/lib/services";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.oneLiner,
  };
}

export default async function ServiceDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const others = SERVICES.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <main className="relative z-10">
      {/* HERO */}
      <section className="relative px-6 pt-32 pb-20 lg:pt-40 lg:pb-24">
        <Container>
          <Link
            href="/services"
            className="text-sm text-[color:var(--color-text-mid)] transition-colors hover:text-[color:var(--color-text-hi)]"
          >
            &larr; All services
          </Link>
          <div className="mt-8 grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
            <div>
              <span className="eyebrow">{service.tag}</span>
              <h1 className="mt-5 text-[length:var(--text-display-xl)] font-[700] leading-[var(--text-display-xl--line-height)] tracking-[var(--text-display-xl--letter-spacing)]">
                {service.title}
              </h1>
              <p className="mt-7 max-w-xl text-[length:var(--text-body-lg)] leading-[var(--text-body-lg--line-height)] text-[color:var(--color-text-mid)]">
                {service.body}
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <Link href="/contact" className="btn-primary">
                  Start with this
                </Link>
                <Link href="/gallery" className="btn-secondary">
                  See examples
                </Link>
              </div>
            </div>

            {/* Deliverables card */}
            <aside className="surface-card p-8">
              <span className="eyebrow">What you get</span>
              <ul className="mt-5 space-y-3">
                {service.deliverables.map((d) => (
                  <li key={d} className="flex gap-3 text-[color:var(--color-text-mid)]">
                    <CheckIcon />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </Container>
      </section>

      <Container>
        <div className="hairline" />
      </Container>

      {/* PROCESS */}
      <Section>
        <Container>
          <span className="eyebrow">How it works</span>
          <h2 className="mt-4 max-w-2xl text-[length:var(--text-display-lg)] font-[700] leading-[var(--text-display-lg--line-height)] tracking-[var(--text-display-lg--letter-spacing)]">
            From brief to delivery.
          </h2>
          <ol className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {service.process.map((p) => (
              <li key={p.step} className="surface-card p-7">
                <span className="text-xs font-[600] uppercase tracking-[0.22em] text-[color:var(--color-gold-500)]">
                  {p.step}
                </span>
                <h3 className="mt-4 text-xl font-[600] tracking-[-0.02em]">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm text-[color:var(--color-text-mid)]">
                  {p.body}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Container>
        <div className="hairline" />
      </Container>

      {/* PRICING */}
      <Section>
        <Container>
          <span className="eyebrow">Pricing</span>
          <h2 className="mt-4 max-w-2xl text-[length:var(--text-display-lg)] font-[700] leading-[var(--text-display-lg--line-height)] tracking-[var(--text-display-lg--letter-spacing)]">
            Pick your tier. Every package includes 2 revisions.
          </h2>
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {service.pricing.map((tier, i) => {
              const featured = i === 1; // middle tier
              return (
                <article
                  key={tier.tier}
                  className={`surface-card p-7 ${featured ? "ring-1 ring-[color:var(--color-border-strong)]" : ""}`}
                >
                  {featured && (
                    <span
                      className="mb-3 inline-block rounded-full px-3 py-1 text-xs font-[600] uppercase tracking-[0.18em]"
                      style={{
                        background: "rgba(201, 168, 76, 0.10)",
                        color: "var(--color-gold-500)",
                      }}
                    >
                      Most popular
                    </span>
                  )}
                  <h3 className="text-xl font-[600] tracking-[-0.02em]">
                    {tier.tier}
                  </h3>
                  <p className="mt-4 text-[length:var(--text-display-md)] font-[700] tracking-[var(--text-display-md--letter-spacing)]">
                    {tier.price}
                  </p>
                  <p className="mt-3 text-sm text-[color:var(--color-text-mid)]">
                    {tier.description}
                  </p>
                </article>
              );
            })}
          </div>
        </Container>
      </Section>

      <Container>
        <div className="hairline" />
      </Container>

      {/* OTHER SERVICES */}
      <Section>
        <Container>
          <span className="eyebrow">Keep exploring</span>
          <h2 className="mt-4 text-[length:var(--text-display-lg)] font-[700] leading-[var(--text-display-lg--line-height)] tracking-[var(--text-display-lg--letter-spacing)]">
            More from the studio.
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {others.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="surface-card p-6"
              >
                <span className="eyebrow">{s.tag}</span>
                <h3 className="mt-3 text-xl font-[600] tracking-[-0.02em]">
                  {s.title}
                </h3>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
    </main>
  );
}

function CheckIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      className="mt-0.5 shrink-0"
      aria-hidden="true"
    >
      <circle cx="9" cy="9" r="9" fill="rgba(201, 168, 76, 0.12)" />
      <path
        d="M5 9 L8 12 L13 6"
        stroke="var(--color-gold-500)"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
