import type { Metadata } from "next";
import { Container } from "@/components/marketing/Container";
import { ContactForm } from "@/components/marketing/ContactForm";
import { Section } from "@/components/marketing/Section";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Send us a brief — qualified SKU projects receive a sample direction and scoped recommendation.",
};

export default function ContactPage() {
  return (
    <main className="relative z-10">
      <section className="relative px-6 pt-32 pb-8 lg:pt-40 lg:pb-12">
        <Container className="max-w-4xl">
          <Reveal>
            <span className="eyebrow">Start a project</span>
            <h1 className="mt-6 text-[length:var(--text-display-xl)] font-[700] leading-[var(--text-display-xl--line-height)] tracking-[var(--text-display-xl--letter-spacing)]">
              Send us your product.
            </h1>
            <p className="mt-7 max-w-2xl text-[length:var(--text-body-lg)] leading-[var(--text-body-lg--line-height)] text-[color:var(--color-text-mid)]">
              We&rsquo;ll come back with fit, scope, and a sample direction path
              for your actual SKU before you sign anything. Typical first
              reply: 1 business day.
            </p>
          </Reveal>
        </Container>
      </section>

      <Section spacing="tight" className="section-ambient-light">
        <Container className="max-w-4xl">
          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-12 grid gap-6 sm:grid-cols-3">
              <Detail
                label="Email"
                value="hello@lumagen.ai"
                href="mailto:hello@lumagen.ai"
              />
              <Detail label="Reply time" value="Usually 1 business day" />
              <Detail label="Based in" value="Cairo, Egypt" />
            </div>
          </Reveal>
        </Container>
      </Section>
    </main>
  );
}

function Detail({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <div className="border-l border-[color:var(--color-border-strong)] pl-5">
      <p className="text-xs font-[600] uppercase tracking-[0.22em] text-[color:var(--color-text-lo)]">
        {label}
      </p>
      {href ? (
        <a
          href={href}
          className="mt-2 inline-block font-[500] transition-colors hover:text-[color:var(--color-gold-500)]"
        >
          {value}
        </a>
      ) : (
        <p className="mt-2 font-[500]">{value}</p>
      )}
    </div>
  );
}
