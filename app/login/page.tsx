import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/marketing/Container";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Client dashboard for Lumagine A.I projects.",
};

export default function LoginPage() {
  return (
    <main className="relative z-10 flex min-h-[calc(100dvh-4rem)] items-center px-6 py-32">
      <Container className="max-w-md">
        <div className="surface-card p-10 text-center">
          <span className="eyebrow">Client dashboard</span>
          <h1 className="mt-4 text-[length:var(--text-display-md)] font-[700] tracking-[var(--text-display-md--letter-spacing)]">
            Coming soon.
          </h1>
          <p className="mt-4 text-[color:var(--color-text-mid)]">
            Sign-in lands with our Phase 4 release &mdash; clients will track
            briefs, message the team, and download deliverables here.
          </p>
          <div className="mt-8 flex flex-col gap-3">
            <Link href="/contact" className="btn-primary">
              Reserve Early Access
            </Link>
            <Link
              href="/"
              className="text-sm text-[color:var(--color-text-mid)] transition-colors hover:text-[color:var(--color-text-hi)]"
            >
              &larr; Back Home
            </Link>
          </div>
        </div>
      </Container>
    </main>
  );
}
