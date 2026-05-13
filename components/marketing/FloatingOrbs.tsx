/**
 * FloatingOrbs — pure-CSS background depth element. Three small soft
 * orbs (warm gold) drift slowly in the background. Pinned absolute
 * inside its container; safe to drop in any section that has
 * relative positioning + overflow-hidden.
 *
 * All three orbs use independent keyframe loops so the motion never
 * synchronizes — feels organic. Hardware-accelerated transforms only.
 */
export function FloatingOrbs() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      <span className="orb orb-a" />
      <span className="orb orb-b" />
      <span className="orb orb-c" />
      <style>
        {`
          .orb {
            position: absolute;
            border-radius: 9999px;
            filter: blur(60px);
            opacity: 0.5;
            will-change: transform;
          }
          .orb-a {
            top: -10%;
            left: 10%;
            width: 28rem;
            height: 28rem;
            background: radial-gradient(circle, rgba(201, 168, 76, 0.30), transparent 70%);
            animation: orbDriftA 28s ease-in-out infinite alternate;
          }
          .orb-b {
            top: 30%;
            right: -8%;
            width: 22rem;
            height: 22rem;
            background: radial-gradient(circle, rgba(216, 178, 100, 0.22), transparent 70%);
            animation: orbDriftB 36s ease-in-out infinite alternate;
          }
          .orb-c {
            bottom: -12%;
            left: 30%;
            width: 26rem;
            height: 26rem;
            background: radial-gradient(circle, rgba(168, 136, 74, 0.20), transparent 70%);
            animation: orbDriftC 44s ease-in-out infinite alternate;
          }
          @keyframes orbDriftA {
            0%   { transform: translate3d(0, 0, 0) scale(1); }
            100% { transform: translate3d(8%, 12%, 0) scale(1.15); }
          }
          @keyframes orbDriftB {
            0%   { transform: translate3d(0, 0, 0) scale(1); }
            100% { transform: translate3d(-10%, -8%, 0) scale(1.1); }
          }
          @keyframes orbDriftC {
            0%   { transform: translate3d(0, 0, 0) scale(1); }
            100% { transform: translate3d(6%, -10%, 0) scale(1.18); }
          }
          @media (prefers-reduced-motion: reduce) {
            .orb { animation: none !important; }
          }
        `}
      </style>
    </div>
  );
}
