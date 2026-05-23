/**
 * FloatingOrbs — revived from the earlier site direction, but softened into
 * Lumagine's current editorial system. It gives the page visible background
 * movement without affecting layout, pointer events, or reduced-motion users.
 */
export function FloatingOrbs() {
  return (
    <div className="floating-orbs" aria-hidden="true">
      <span className="orb orb-a" />
      <span className="orb orb-b" />
      <span className="orb orb-c" />
    </div>
  );
}
