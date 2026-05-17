import { Reveal } from "@/components/motion/Reveal";

/**
 * HowItWorks — three-step explainer for skeptical first-time buyers.
 * Sits on the home page just below the trust strip; converts visitors
 * who are sold on the value but need to understand the workflow before
 * filling in a brief.
 */
const STEPS = [
  {
    n: "01",
    title: "Send a brief",
    body: "Share your SKU, references, and target platforms. The first reply confirms fit, scope, and what proof we still need from you.",
  },
  {
    n: "02",
    title: "Approve a sample",
    body: "For qualified briefs, the first sample direction usually arrives within 48 hours so you can judge the visual path before committing.",
  },
  {
    n: "03",
    title: "Ship the full set",
    body: "Approved direction goes into production. Most focused packages land in 5–9 working days with two revision rounds and platform-ready exports.",
  },
];

export function HowItWorks() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {STEPS.map((s, i) => (
        <Reveal key={s.n} delay={i * 0.05}>
          <div className="group surface-card relative h-full p-8">
            <div className="flex items-center gap-4">
              <span
                className="font-[700] tracking-[-0.04em] leading-none"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2rem, 3vw, 2.5rem)",
                  color: "var(--color-gold-500)",
                  opacity: 0.7,
                }}
              >
                {s.n}
              </span>
              {i < STEPS.length - 1 && (
                <span
                  className="hidden h-px flex-1 md:inline-block"
                  style={{
                    background:
                      "linear-gradient(90deg, var(--color-border-strong), transparent)",
                  }}
                />
              )}
            </div>
            <h3 className="mt-6 text-[length:var(--text-display-md)] font-[600] tracking-[var(--text-display-md--letter-spacing)]">
              {s.title}
            </h3>
            <p className="mt-3 text-[color:var(--color-text-mid)]">{s.body}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
