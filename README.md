# Lumagen A.I

> **Zero to Hero Studio** — AI-crafted listing imagery, storefronts, A+ content, and social creatives for Amazon, TikTok Shop, Shopify, eBay, and Etsy sellers. Made in Cairo.

A six-phase rebuild from a vanilla HTML portfolio into a production marketing site plus client dashboard.

---

## Stack

- **Framework**: Next.js 16 (App Router, RSC, Turbopack)
- **Language**: TypeScript
- **Styling**: Tailwind v4 (`@theme` tokens in CSS, no separate config)
- **Fonts**: Bricolage Grotesque (display), Instrument Sans (body)
- **Auth + DB + Storage**: Supabase (Phase 4)
- **Email**: Resend (Phase 5)
- **Analytics**: Vercel Analytics + Posthog (Phase 6)
- **Hosting**: Vercel (Frankfurt edge — best Cairo latency)

---

## Running locally

```bash
cp .env.example .env.local      # fill in values when you have them
npm install
npm run dev                     # http://localhost:3000
```

The site is fully functional **without** Supabase for development. The contact form falls back to logging inquiries to `/tmp/lumagen-inquiries.json` until env vars are set.

### Scripts

| script | purpose |
|---|---|
| `npm run dev` | Local dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Run the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |

---

## Repository layout

```
app/
├── (marketing routes — flat)
│   ├── page.tsx                  # home (Hero3D)
│   ├── about/page.tsx
│   ├── services/page.tsx
│   ├── services/[slug]/page.tsx  # generated for each service
│   ├── gallery/page.tsx          # 3-tab shell (Phase 2 fills it)
│   └── contact/page.tsx
├── login,signup,dashboard/       # stubs until Phase 4
├── opengraph-image.tsx           # dynamic OG (edge runtime)
├── sitemap.ts, robots.ts
├── not-found.tsx, error.tsx
└── globals.css                   # @theme tokens + utility components

components/marketing/             # public-site components
lib/
├── services.ts                   # service data (slug → details)
├── inquiries.ts                  # contact-form Server Action
├── supabase/{server,client}.ts   # SSR + browser clients (no-env safe)
└── utils.ts                      # cn() helper

scripts/migrate-assets.ts         # Phase 2 — uploads 1.8GB to Supabase
_legacy/                          # original static site, gitignored
assets/                           # 1.8GB curated image library, gitignored
```

---

## Roadmap

| Phase | Scope | Status |
|---|---|---|
| 1 | Marketing shell (home, about, services, gallery shell, contact) | **In progress** |
| 2 | Asset migration → Supabase Storage + full gallery with lightbox |  |
| 3 | WebM hero loops + brand showcases + services polish |  |
| 4 | Auth + client dashboard MVP (brief intake + status) |  |
| 5 | Admin queue + deliverable downloads + Resend emails |  |
| 6 | Sentry + Posthog + brand case-study pages |  |

See [/Users/cody/.claude/plans/i-was-working-on-luminous-lamport.md](/Users/cody/.claude/plans/i-was-working-on-luminous-lamport.md) for the detailed plan.

---

## Deploying

### Vercel

1. Push the repo to GitHub (private OK).
2. Sign in to [vercel.com](https://vercel.com) and import the repo.
3. Add the env vars from `.env.example`.
4. Deploy. First build ~2 min.

The `assets/` and `_legacy/` folders are already in `.vercelignore` so the 1.8GB asset library never enters the deployment bundle.

### Supabase

1. Create a Supabase project. **Pro tier ($25/mo) recommended from day 1** — free tier's 1GB storage cap will be exceeded immediately by the asset library.
2. Region: `eu-central-1` (closest to Cairo).
3. Copy URL + anon key + service-role key into `.env.local` and Vercel env vars.
4. When ready for Phase 2: run `pnpm tsx scripts/migrate-assets.ts` locally to populate Storage.

---

## Design tokens

All colors verified WCAG AA on `--color-bg-0`:

| Token | Hex | Contrast | Use |
|---|---|---|---|
| `--color-bg-0` | `#080808` | — | Page surface |
| `--color-bg-1` | `#0e0d0b` | — | Default cards |
| `--color-bg-2` | `#131210` | — | Elevated cards |
| `--color-bg-3` | `#1a1a19` | — | Hover state |
| `--color-text-hi` | `#f0ead8` | 19.4:1 | Primary text |
| `--color-text-mid` | `#c4bcae` | 10.6:1 | Body / secondary |
| `--color-text-lo` | `#7a7060` | 5.0:1 | Captions / muted |
| `--color-gold-500` | `#c9a84c` | 9.4:1 | Primary accent (single accent — no other hues) |

---

## License

Proprietary — Lumagen A.I © 2026
