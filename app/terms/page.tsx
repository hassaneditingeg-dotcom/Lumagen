import type { Metadata } from "next";
import { Container } from "@/components/marketing/Container";
import { PageHero } from "@/components/marketing/PageHero";
import { Section } from "@/components/marketing/Section";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms that govern projects and use of the Lumagine A.I site.",
  alternates: { canonical: "/terms" },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <main className="relative z-10">
      <PageHero
        eyebrow="Legal"
        title="Terms of service"
        body="Last updated May 13, 2026. Plain-language terms for visiting this site and engaging us on a project."
      />

      <Section spacing="tight">
        <Container className="max-w-3xl">
          <article className="space-y-8 text-[color:var(--color-text-mid)]">
            <Block title="Using the site">
              You may use the site to learn about our services and submit
              project inquiries. Don&rsquo;t scrape it, don&rsquo;t use it to
              train models, and don&rsquo;t attempt to disrupt service.
            </Block>

            <Block title="Inquiries">
              Submitting a brief through the contact form is not a binding
              order — it&rsquo;s a request for a sample mockup. The
              engagement begins when both sides sign a project agreement
              (typically a one-page Statement of Work).
            </Block>

            <Block title="Project agreements">
              Each project has its own SOW covering scope, deliverables,
              timeline, payment terms, and IP transfer. The SOW takes
              precedence over these site terms.
            </Block>

            <Block title="Intellectual property">
              Site content (copy, visual design, code, brand marks) is © 2026
              Lumagine A.I. Project deliverables are transferred to the client
              upon final payment, per each SOW. Reference / source images
              you upload remain yours.
            </Block>

            <Block title="Sample work in our portfolio">
              We may showcase delivered work in our public gallery and case
              studies unless you opt out in writing in the SOW.
            </Block>

            <Block title="Payments">
              50% on SOW signing, 50% on final delivery. Payment is in USD via
              Stripe, bank transfer, or Wise. Late payments after 30 days
              accrue 1.5% per month.
            </Block>

            <Block title="Liability">
              We deliver imagery — not legal review, regulatory copy, or
              trademark clearance. You&rsquo;re responsible for ensuring final
              creatives comply with the platforms you publish on (Amazon TOS,
              FTC disclosure rules, etc.). Our liability is capped at the
              total fees paid on the project in question.
            </Block>

            <Block title="Governing law">
              These terms are governed by the laws of Egypt. Disputes resolve
              through good-faith negotiation first, then arbitration in Cairo.
            </Block>

            <Block title="Contact">
              Questions about these terms go to{" "}
              <a
                href="mailto:hello@lumagine.ai"
                className="underline decoration-[color:var(--color-border-strong)] underline-offset-4 transition-colors hover:text-[color:var(--color-gold-500)]"
              >
                hello@lumagine.ai
              </a>
              .
            </Block>
          </article>
        </Container>
      </Section>
    </main>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-xl font-[600] tracking-[-0.02em] text-[color:var(--color-text-hi)]">
        {title}
      </h2>
      <div className="mt-3 text-[length:var(--text-body-lg)] leading-[var(--text-body-lg--line-height)]">
        {children}
      </div>
    </section>
  );
}
