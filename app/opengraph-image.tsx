import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Lumagine A.I — Zero to Hero Studio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          padding: "80px",
          background:
            "radial-gradient(ellipse 60% 50% at 30% 0%, rgba(201, 168, 76, 0.18), transparent 60%), linear-gradient(180deg, #0d0b09, #060504)",
          color: "#f0ead8",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <svg width="40" height="40" viewBox="0 0 28 28" fill="none">
            <path
              d="M14 2 L24 8 L24 20 L14 26 L4 20 L4 8 Z"
              fill="none"
              stroke="#c9a84c"
              strokeWidth={2}
            />
            <circle cx={14} cy={14} r={3.5} fill="#c9a84c" />
          </svg>
          <span style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em" }}>
            Lumagine
            <span style={{ color: "#c9a84c", fontSize: 16, marginLeft: 8, textTransform: "uppercase", letterSpacing: "0.2em" }}>
              A.I
            </span>
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <span
            style={{
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#c9a84c",
            }}
          >
            Zero to Hero Studio
          </span>
          <h1
            style={{
              fontSize: 96,
              fontWeight: 700,
              letterSpacing: "-0.035em",
              lineHeight: 0.98,
              margin: 0,
              maxWidth: 1000,
            }}
          >
            One image.
            <br />
            Infinite possibilities.
          </h1>
          <p
            style={{
              fontSize: 28,
              color: "#c4bcae",
              maxWidth: 880,
              lineHeight: 1.45,
              margin: 0,
            }}
          >
            AI-crafted listings, storefronts, and A+ content for Amazon, TikTok
            Shop, eBay, Etsy, and social.
          </p>
        </div>
      </div>
    ),
    { ...size },
  );
}
