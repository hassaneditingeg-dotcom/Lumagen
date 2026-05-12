"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Container } from "@/components/marketing/Container";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="relative z-10 flex min-h-[calc(100dvh-4rem)] items-center px-6 py-32">
      <Container className="max-w-2xl text-center">
        <span className="eyebrow">Something broke</span>
        <h1 className="mt-5 text-[length:var(--text-display-lg)] font-[700] leading-[var(--text-display-lg--line-height)] tracking-[var(--text-display-lg--letter-spacing)]">
          We hit an error rendering this page.
        </h1>
        <p className="mx-auto mt-6 max-w-md text-[color:var(--color-text-mid)]">
          The team has been notified. Try reloading, or send us a note so we
          can fix it fast.
        </p>
        {error.digest && (
          <p className="mt-4 font-mono text-xs text-[color:var(--color-text-lo)]">
            ref: {error.digest}
          </p>
        )}
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <button type="button" onClick={reset} className="btn-primary">
            Try again
          </button>
          <Link href="/" className="btn-secondary">
            Back home
          </Link>
        </div>
      </Container>
    </main>
  );
}
