import type { Metadata } from "next";
import { Container } from "@/components/marketing/Container";
import { PageHero } from "@/components/marketing/PageHero";
import { Section } from "@/components/marketing/Section";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Lumagen A.I collects, uses, and protects your data.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <main className="relative z-10">
      <PageHero
        eyebrow="Legal"
        title="Privacy policy"
        body="Last updated May 13, 2026. We're a small studio. We collect the minimum data needed to deliver your imagery and reply to your inquiries — and we don't sell or share it."
      />

      <Section spacing="tight">
        <Container className="max-w-3xl">
          <article className="prose-content space-y-8 text-[color:var(--color-text-mid)]">
            <Block title="What we collect">
              When you fill the contact form: your name, email, company name,
              platform preference, service interest, budget range, and the
              message you write. When you visit the site: standard server
              logs (IP, user agent, referrer) and Vercel-level traffic metrics.
            </Block>

            <Block title="How we use it">
              To reply to your inquiry, prepare a sample direction for your
              brand, and keep records of the engagement once a project starts.
              For traffic data: to understand which pages help visitors decide
              and which need work.
            </Block>

            <Block title="Who we share with">
              Nobody for marketing. Our infrastructure providers (Vercel for
              hosting, Supabase for database, Resend for transactional email)
              process data on our behalf under their own DPAs. We never sell
              inquiry data.
            </Block>

            <Block title="How long we keep it">
              Inquiries: up to 24 months from the last contact, then deleted.
              Active client project files: for the duration of the engagement
              plus 12 months for revision support. You can request deletion
              at any time.
            </Block>

            <Block title="Your rights">
              Email{" "}
              <a
                href="mailto:privacy@lumagen.ai"
                className="underline decoration-[color:var(--color-border-strong)] underline-offset-4 transition-colors hover:text-[color:var(--color-gold-500)]"
              >
                privacy@lumagen.ai
              </a>{" "}
              to request access, correction, or deletion of your data. We
              respond within 30 days.
            </Block>

            <Block title="Cookies">
              We use essential cookies for session management and a small
              number of first-party analytics cookies (Vercel Analytics) that
              don&rsquo;t identify you personally. No advertising cookies.
            </Block>

            <Block title="Contact">
              Questions about this policy go to{" "}
              <a
                href="mailto:privacy@lumagen.ai"
                className="underline decoration-[color:var(--color-border-strong)] underline-offset-4 transition-colors hover:text-[color:var(--color-gold-500)]"
              >
                privacy@lumagen.ai
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
