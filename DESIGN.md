# Design System: Lumagen A.I — Zero to Hero Studio

## 1. Visual Theme & Atmosphere

A restrained, gallery-airy interface built for ecommerce brand trust. The atmosphere is editorial and warm, like a dimly lit atelier — deep charcoal-brown backgrounds (never pure black) with a single antique-gold accent that glows without shouting. Broad vignette washes and a micro-fractal noise grain add physical depth without decorative clutter. Asymmetric bento-grid layouts with generous section gaps (py-28 to py-40 on desktop) create breathing room. Everything feels expensive, intentional, and conversion-focused — the visual equivalent of a premium packaging unboxing.

- **Density:** 4 (Art Gallery Airy)
- **Variance:** 8 (Offset Asymmetric)
- **Motion:** 6 (Fluid CSS + Spring Physics)

## 2. Color Palette & Roles

### Neutrals — Warm near-blacks, stepped for hierarchy
- **Deep Canvas** (#060604) — Primary page background (`--color-bg-0`)
- **Shadow Surface** (#0d0c0a) — Card and container fill (`--color-bg-1`)
- **Warm Ash** (#14120f) — Elevated surface, skeleton shimmer base (`--color-bg-2`)
- **Ember Grey** (#1c1a16) — Hover state surface, subtle container (`--color-bg-3`)
- **Taupe Shadow** (#2a2620) — Deepest surface step (`--color-bg-4`)

### Text — Warm off-whites, no pure white
- **Parchment White** (#f0ead8) — Primary body and heading text (`--color-text-hi`, 19.4:1 contrast)
- **Warm Stone** (#c4bcae) — Secondary text, descriptions, metadata (`--color-text-mid`, 10.6:1)
- **Faded Brass** (#8a8276) — Caption, muted labels, placeholder (`--color-text-lo`, 5.4:1)
- **Tarnished Silver** (#4d463c) — Dividers, decorative copy (`--color-text-faint`)

### Single Accent — Antique Gold (saturation ~50%)
- **Gold Gleam** (#e8c878) — Highlight hover state (`--color-gold-300`)
- **Warm Gold** (#d4a853) — Button hover, interactive glow (`--color-gold-400`)
- **Antique Gold** (#c9a84c) — PRIMARY ACCENT: CTAs, active states, focus rings, status dots, eyebrow text, decorative dividers (`--color-gold-500`)
- **Deep Gold** (#a8884a) — Muted accent, box 3D shadow (`--color-gold-600`)
- **Shadow Gold** (#7e6633) — Darkest accent, gradient endpoints (`--color-gold-700`)

### Semantic
- **Mint** (#5ddc9b) — Success states
- **Honey** (#f5b945) — Warning states
- **Red Alert** (#ef4444) — Error states

### Borders — Gold-tinted, very low opacity
- **Whisper Border** (rgba(240,234,216,0.06)) — Default card divider (`--color-border`)
- **Soft Border** (rgba(240,234,216,0.04)) — Subtle separation (`--color-border-soft`)
- **Gold Hint** (rgba(201,168,76,0.2)) — Hover border accent (`--color-border-strong`)
- **Gold Bright** (rgba(201,168,76,0.38)) — Active/hover card border (`--color-border-bright`)
- **Gold Proof** (rgba(201,168,76,0.15)) — Proof-panel, status-pill border (`--color-border-proof`)

### Shadows — All tinted warm (rgb(10,8,6)) to match background, never pure black
- **Shadow XS** (0 1px 2px rgba(10,8,6,0.55))
- **Shadow SM** (0 2px 8px rgba(10,8,6,0.62))
- **Shadow MD** (0 8px 28px rgba(10,8,6,0.70))
- **Shadow LG** (0 24px 80px rgba(10,8,6,0.78))
- **Shadow XL** (0 36px 120px rgba(10,8,6,0.84))
- **Gold Glow SM** (0 0 24px rgba(201,168,76,0.12))
- **Gold Glow MD** (0 0 48px rgba(201,168,76,0.16))
- **Gold Glow LG** (0 0 90px rgba(201,168,76,0.22))
- **Proof Glow** (0 0 24px rgba(201,168,76,0.10))

## 3. Typography Rules

### Font Stack
- **Display / Headlines:** `Bricolage Grotesque` (variable 400–800) — Characterful geometric sans with slight organic curves. Track-tight, weight-driven hierarchy. Never screaming.
- **Body:** `Instrument Sans` (variable 400–700) — Clean, readable neutral sans. Relaxed leading (1.6), max 65ch width.
- **Banned:** Inter, system-ui stacks for premium contexts. No serif fonts anywhere (this is a marketplace SaaS/studio, not editorial).

### Type Ramp
- **Hero Display (2XL):** `clamp(4rem, 10vw, 8rem)` — Line height 0.92, letter-spacing -0.028em, weight 700
- **Section Headline (XL):** `clamp(3.25rem, 7.5vw, 5.75rem)` — Line height 0.96, letter-spacing -0.026em, weight 700
- **Sub-Headline (LG):** `clamp(2.25rem, 4.8vw, 3.75rem)` — Line height 1.02, letter-spacing -0.02em, weight 700
- **Card Heading (MD):** `clamp(1.625rem, 3vw, 2.25rem)` — Line height 1.12, letter-spacing -0.022em, weight 600
- **Body Large (LG):** 1.0625rem — Line height 1.6
- **Caption:** 0.875rem — Line height 1.4, weight 500
- **Eyebrow:** 0.6875rem — Letter-spacing 0.22em, weight 600, uppercase, Antique Gold

## 4. Component Stylings

### Buttons
- **Primary (.btn-primary):** Pill shape (border-radius 9999px), solid Antique Gold fill. Height 3rem, padding 1.625rem. Warm shadow + inset white highlight. Hover: lifts 1px, brightens to Warm Gold, glossy sweep via `::after` gradient translate. Active: scale(0.97) tactile push. Click ripple: CSS-only radial flash via `::before` radial-gradient, 350ms ease-out.
- **Secondary (.btn-secondary):** Transparent fill, 1px Gold Hint border. Pill shape. Hover: gold-tinted background (6% opacity), border brightens to Gold Bright, lifts 1px. Active: scale(0.97).
- **Constraints:** No neon outer glows. No custom cursors on buttons. Text never pure white — uses `--color-bg-0` (Deep Canvas) for contrast.

### Cards (.surface-card)
- Background: Shadow Surface (`--color-bg-1`), 1px Whisper Border, rounded corners 1rem.
- Used only when elevation communicates hierarchy. Hover: background deepens to Warm Ash, border brightens to Gold Bright, lifts 4px (`translateY(-4px)`), gains Gold Glow SM shadow + LG shadow. Edge-gradient sweep effect via `::before` with a gold gradient mask on border (fades in on hover).
- Internal padding: 2rem (p-8). Children are position: relative z-index 1.

### Status Pill (.status-pill)
- Inline-flex badge. Antique Gold pulse dot (`.status-dot` with 2.4s pulsing animation) + text. Background 8% gold, border Gold Proof, pill shape. Subtle box-shadow glow on dot.

### Inputs & Forms (.form-input)
- Label above input (no floating labels). Background Warm Ash (`--color-bg-2`), 1px Whisper Border, 0.75rem padding. Placeholder in Faded Brass. Focus: border transitions to Antique Gold, background lightens to Shadow Surface. Focus-visible outline in gold, offset 3px. Select inputs use inline SVG chevron, no native appearance.

### Navigation (.nav-link)
- Text in Warm Stone, hover to Parchment White. Gold underline on hover/active: 1.5px gradient line that grows from center to 70% width, 300ms ease-out.

### Skeleton Loader (.skeleton)
- Matches exact layout dimensions. Linear gradient shimmer (Warm Ash → Ember Grey → Warm Ash) at 200% width, 1.6s infinite sweep. No circular spinners anywhere.

### Empty States
- Composed compositions indicating how to populate data. Example: Testimonials component shows "Testimonials coming soon." centered text in Faded Brass when array is empty.

### Accordion / FAQ
- Side-by-side layout (LG: grid 1fr 1.6fr). Left column: stacked buttons with border-left indicator (2px gold when active). Right column: card panel displaying selected answer. Active item gets Warm Ash background + left gold border.

### Testimonial Carousel
- Single quote card, not a 3-column grid. Rotating via pill navigation dots (gold pill expands width on active, 300ms transition). Quote card is surface-card with inline SVG quote mark in gold.

### Divider (.divider)
- Centered gold dot bracketed by gradient horizontal lines (transparent → gold hint → transparent). Used between major sections.

### Typography: `.accent-gold`
- Solid Antique Gold text color. No gradient-text anywhere — explicitly banned.

## 5. Layout Principles

### Grid Architecture
- **CSS Grid first:** Never flexbox percentage math or calc() hacks.
- **Max-width:** 1280px (max-w-7xl) centered, horizontal margin auto.
- **Hero:** Left-aligned text column (1.3fr) + right 3D tile grid (0.7fr). Asymmetric split, never centered. Variance 8 forbids centered layout.
- **Services:** 2-column grid (md:grid-cols-2) with first card spanning full width (md:col-span-2). No 3-column equal card layout.
- **How It Works:** 3-column grid (md:grid-cols-3) with staggered reveal per card.
- **Before/After:** 2-column grid for header + full-width slider.
- **Footer:** 3-column grid (md:grid-cols-2, lg: 1.5fr 1fr 1fr).
- **FAQ:** Side-by-side LG grid (1fr 1.6fr).

### Spacing
- **Section padding:** Mixed rhythm for visual interest — `py-28 lg:py-36` (standard), `py-28 lg:py-40` (emphasized). Uniform spacing is banned.
- **Section divider:** Gold dot with gradient hairline.
- **Container gutter:** px-6 on all viewports.

### Responsive Rules
- **Mobile collapse (< 768px):** All multi-column layouts collapse to single column. No exceptions.
- **No horizontal overflow:** overflow-x: clip on html/body.
- **Typography scaling:** Headlines use clamp(). Body text minimum 1rem.
- **Touch targets:** All interactive elements minimum 44px tap height. Buttons are 3rem (48px).
- **Navigation:** Desktop horizontal nav collapses to toggle drawer on mobile. Drawer uses max-h-[100dvh-4rem], overscroll-contain.
- **Marquee:** Horizontal scroll with mask-image edge fades, pauses on hover.
- **StickyCTA:** Appears after scroll passes 85vh. Spring entrance. Hidden on /contact.

### Full-height sections
- Must use `min-height: 100dvh` / `min-h-[100dvh]` — never `h-screen` (avoids iOS Safari catastrophic address-bar jump).

### No overlapping elements
- Every element occupies its own clear spatial zone. No absolute-positioned content stacking. The hero-mesh gradient blobs are background-only (pointer-events: none, z-index: 0). Section ambient overlays are always `::before` with pointer-events: none.

## 6. Motion & Interaction

### Spring Physics (default)
- **Stiffness 100, Damping 20** — Scroll reveals (Reveal component), StickyCTA entrance/exit, menu transitions.
- **Stiffness 180, Damping 18, mass 0.6** — MagneticButton cursor-follow spring.
- **Stiffness 220, Damping 20, mass 0.4** — MagneticLink nav cursor-follow (lighter, smaller pull radius).
- **Stiffness 160, Damping 22, mass 0.5** — TiltCard 3D mouse-tilt rotation spring.
- **Stagger children 0.07s** — Reveal component cascades its motion.div children in waterfall.
- No linear easing on any interactive motion. Premium apps use springs exclusively.

### Scroll-listening
- All scroll detection uses `useScroll()` from motion/react. No raw `window.addEventListener('scroll')`. Scroll-derived state uses `scrollY.on("change")` subscriptions.

### Perpetual Micro-Interactions
- **Body Shimmer:** 28s ease-in-out gold gradient sweep across the entire page background (body::before).
- **Ambient Breath:** 12–18s opacity pulse on section ambient overlays (three variants: light 12s, warm 15s, cool 18s).
- **Gold Pulse:** 3s box-shadow oscillation on status dots and proof panels.
- **Mesh Blobs (Hero):** Three organic gold blobs orbiting at staggered speeds (22s/28s/32s) with scale variance. CSS-only, no JS animation.
- **Float:** 3.5s gentle Y-axis levitation on CTA/badge elements.
- **Marquee:** 38s linear horizontal scroll, pauses on hover.
- **Amazon Box:** 24s linear Y-axis rotation (360° in Z).
- **TikTok Sign:** 7s ease-in-out alternating Y tilt + Y-axis rotation.

### Staggered Reveal
- Page-load hero uses CSS keyframe animation (`.hero-enter`) with 5 staggered delay classes (0.05s, 0.14s, 0.23s, 0.34s, 0.46s). Filter blur + translateY entrance.
- Scroll reveal uses motion's `useInView` via `whileInView` with container variants (staggerChildren 0.07s). Each item fades from opacity 0 y:24 blur(6px) to full.
- Cards in services grid stagger by index `i * 0.04s`.

### Performance
- Animate exclusively via `transform` and `opacity`. Never animate `top`, `left`, `width`, `height`.
- All perpetual animations on `pointer-events: none` pseudo-elements or fixed-position layers to never block interaction.
- `will-change: transform` only on animated 3D elements and mesh blobs.
- Fractal-noise grain filter uses inline SVG data-URI (no external image request).
- CSS-only button ripple avoids JS re-renders per click.

### Reduced Motion
- Global `@media (prefers-reduced-motion: reduce)` collapses all animation/transition durations to 0.01ms. Individual components (`useReducedMotion()`) provide instant-state fallbacks for Reveal, MagneticButton, MagneticLink, TiltCard, Counter, and CursorGlow.

### 3D Tilt & Mouse Interaction
- **TiltCard:** Max 6° rotation per axis on mouse position. Gold radial spotlight follows cursor (220px circle, 12% opacity). Springs for rotation smoothing.
- **Hero3D tiles:** Max 7°/9° rotation per axis via direct CSS custom property manipulation (--rx, --ry). requestAnimationFrame-throttled.
- **MagneticButton:** Translates toward cursor with 0.35 strength × half-box offset. Springs for release return.
- **MagneticLink:** Same principle at 0.18 strength (gentler, appropriate for nav).

### Counter (Animated Numbers)
- Animate from 0 to target value via motion's `animate()` with ease-out-expo, triggered by `useInView` (once, 40% threshold). Honors reduced motion by displaying final value immediately.

## 7. Anti-Patterns (AI Tells — Banned)

### NEVER DO:
1. **No emojis anywhere** — No decorative emoji in headings, cards, or CTAs.
2. **No Inter font** — Banned for all premium/creative contexts. We use Bricolage Grotesque + Instrument Sans.
3. **No pure black (#000000)** — Deepest surface is #060604 (Deep Canvas). All shadows tinted warm.
4. **No neon / outer glow shadows** — Subtle gold glow only (max 90px blur, 22% opacity). No cyan, magenta, or purple glows.
5. **No oversaturated accents** — Single Antique Gold (#c9a84c, ~50% saturation). No purple, no blue, no neon.
6. **No gradient text** — Solid accent-gold class only. No background-clip text-fill gradients on large headers.
7. **No custom mouse cursors** — CursorGlow component exists but sets `cursor: none !important` which is a known anti-pattern. Prefer disabling this component or removing cursor override.
8. **No overlapping content elements** — Clean spatial separation always. Background mesh blobs and ambient overlays are pointer-events: none. Never stack text on text.
9. **No 3-column equal card layouts** — Services uses md:grid-cols-2 with first card full-width. Testimonials is single rotating card.
10. **No centered Hero sections** — Variance 8 requires left-aligned asymmetric hero split (1.3fr / 0.7fr).
11. **No generic placeholder names** — Testimonial names are Diana Fray, Orin Voss, Romy Beltran (not "Sarah P." or "John D.").
12. **No fake round numbers** — Metrics are 48h, 5–9d, 2x (credible ranges, not "99.99%").
13. **No AI copywriting clichés** — "Elevate", "Seamless", "Unleash", "Next-Gen", "Game-changing" are banned. Copy is direct and concrete.
14. **No filler UI text** — "Scroll to explore", "Swipe down", scroll arrows, bouncing chevrons are banned. Content pulls users in naturally.
15. **No broken Unsplash links** — All gallery images use next/image with local or CDN-hosted manifest entries, not generic stock URLs.
16. **No uniform section padding** — Section py values vary between 28 and 40 (LG) to prevent monotonous rhythm.
17. **No Inter, system-ui, or generic sans-serif fonts** — Bricolage Grotesque for display, Instrument Sans for body.
18. **No serif fonts anywhere** — This is a SaaS/studio marketing site, not an editorial publication. Serif is banned.
19. **No decorative SVG orbs / floating shapes** — Previous FloatingOrbs component deleted. Hero atmosphere uses gold mesh blobs (organic, background-only).
20. **No secondary CTAs labeled "Learn More"** — Secondary labels are always specific: "See the Work", "Browse the Gallery", "Read the Case Study".
