import { MagneticButton } from "@/components/motion/MagneticButton";
import { cn } from "@/lib/utils";

export function TrustNote({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <p className={cn("trust-note", className)}>{children}</p>;
}

export function ClaimNote({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <p className={cn("claim-note", className)}>{children}</p>;
}

export function ProofMetric({
  value,
  label,
  note,
}: {
  value: string;
  label: string;
  note?: string;
}) {
  return (
    <div className="proof-panel p-5">
      <p className="metric-value font-[700] tabular-nums tracking-[var(--text-display-md--letter-spacing)] text-[length:var(--text-display-md)] text-[color:var(--color-text-hi)]">
        {value}
      </p>
      <p className="mt-1 text-sm font-[600] text-[color:var(--color-text-mid)]">
        {label}
      </p>
      {note && <p className="mt-3 text-xs leading-relaxed text-[color:var(--color-text-lo)]">{note}</p>}
    </div>
  );
}

export function CTARow({
  primaryHref = "/contact",
  primaryLabel,
  secondaryHref,
  secondaryLabel,
  note,
  centered = false,
}: {
  primaryHref?: string;
  primaryLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  note?: string;
  centered?: boolean;
}) {
  return (
    <div className={cn("flex flex-wrap items-center gap-3", centered && "justify-center")}>
      <MagneticButton href={primaryHref} className="btn-primary">
        {primaryLabel}
      </MagneticButton>
      {secondaryHref && secondaryLabel && (
        <MagneticButton href={secondaryHref} className="btn-secondary">
          {secondaryLabel}
        </MagneticButton>
      )}
      {note && (
        <span className="basis-full text-xs text-[color:var(--color-text-lo)] sm:basis-auto">
          {note}
        </span>
      )}
    </div>
  );
}
