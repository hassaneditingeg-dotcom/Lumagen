import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/marketing/Container";

export const metadata: Metadata = {
  title: "Create account",
};

export default function SignupPage() {
  return (
    <main className="relative z-10 flex min-h-[calc(100dvh-4rem)] items-center px-6 py-32">
      <Container className="max-w-md">
        <div className="surface-card p-10 text-center">
          <span className="eyebrow">Early access</span>
          <h1 className="mt-4 text-[length:var(--text-display-md)] font-[700] tracking-[var(--text-display-md--letter-spacing)]">
            Reserve your seat.
          </h1>
          <p className="mt-4 text-[color:var(--color-text-mid)]">
            We&rsquo;re onboarding clients one at a time. Send a brief and
            we&rsquo;ll invite you when your dashboard is ready.
          </p>
          <div className="mt-8">
            <Link href="/contact" className="btn-primary">
              Send a Brief
            </Link>
          </div>
        </div>
      </Container>
    </main>
  );
}
