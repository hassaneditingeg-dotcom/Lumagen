import Link from "next/link";
import { Container } from "@/components/marketing/Container";

export default function NotFound() {
  return (
    <main className="relative z-10 flex min-h-[calc(100dvh-4rem)] items-center px-6 py-32">
      <Container className="max-w-2xl text-center">
        <span className="eyebrow">404</span>
        <h1 className="mt-5 text-[length:var(--text-display-xl)] font-[700] leading-[var(--text-display-xl--line-height)] tracking-[var(--text-display-xl--letter-spacing)]">
          Page not found.
        </h1>
        <p className="mx-auto mt-6 max-w-md text-[length:var(--text-body-lg)] text-[color:var(--color-text-mid)]">
          That URL doesn&rsquo;t exist here. It might have moved, or the link
          you followed was wrong.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn-primary">
            Back home
          </Link>
          <Link href="/gallery" className="btn-secondary">
            Browse the gallery
          </Link>
        </div>
      </Container>
    </main>
  );
}
