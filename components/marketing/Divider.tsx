/**
 * Section divider — a gold dot bracketed by gradient lines. Sits
 * inline (use a max-width container around it) and replaces the
 * earlier flat hairline pattern with a more editorial mark.
 */
export function Divider({ className }: { className?: string }) {
  return (
    <div className={`divider ${className ?? ""}`}>
      <span className="divider-dot" />
    </div>
  );
}
