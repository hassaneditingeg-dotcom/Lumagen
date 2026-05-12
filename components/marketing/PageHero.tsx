import { Container } from "./Container";

export function PageHero({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body?: string;
}) {
  return (
    <section className="relative px-6 pt-32 pb-20 lg:pt-40 lg:pb-24">
      <Container className="max-w-4xl">
        <span className="eyebrow">{eyebrow}</span>
        <h1 className="mt-6 text-[length:var(--text-display-xl)] font-[700] leading-[var(--text-display-xl--line-height)] tracking-[var(--text-display-xl--letter-spacing)]">
          {title}
        </h1>
        {body && (
          <p className="mt-7 max-w-2xl text-[length:var(--text-body-lg)] leading-[var(--text-body-lg--line-height)] text-[color:var(--color-text-mid)]">
            {body}
          </p>
        )}
      </Container>
    </section>
  );
}
