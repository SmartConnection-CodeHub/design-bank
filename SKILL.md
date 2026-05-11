---
name: smc-design
description: Use this skill to generate well-branded interfaces and assets for SMART CONNECTION (SMC) — the Chilean software + IA + automatización studio. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping or production code aligned with the federated `@smc/ui` package.
user-invocable: true
---

Read the `README.md` file in this skill, and explore the other available files:

- `colors_and_type.css` — canonical CSS variables (color tokens, type, radius, shadow, motion).
- `preview/` — 20 design-system cards (colors, type, spacing, components, brand).
- `ui_kits/` — six prototypes that demonstrate the brand in action:
  - `voy/` Calculator-Kit cotizador
  - `hoku/` chat streaming variants
  - `intranet/` 5-screen mobile login flow
  - `kanki/` 4-screen storefront with curtain hero
  - `ui/` `@smc/ui` component federation index
  - `radar/` weekly editorial brief

If creating visual artifacts (slides, mocks, throwaway prototypes), copy `colors_and_type.css` and the relevant UI kit assets into the output and produce static HTML the user can open. If working on production code, copy this skill's rules into your project's CLAUDE.md and reach for Radix UI + Tailwind v4 + Tailwind Variants on top of the canonical tokens.

If the user invokes this skill without other guidance:

1. Ask what they want to build (marketing landing? internal panel? mobile flow? editorial brief?).
2. Ask which of the 13 SMC projects it belongs to (or `@smc/ui` itself).
3. Ask if they want **mobile-first 375 px**, **desktop 1240 px**, or **deck 1920×1080**.
4. Apply the brand: cream `#F8F8F6` ground, navy `#1B2F4E` primary, gold `#C49A3A` editorial accent (≤ 1 per screen), accent green `#00E5B0` for status only, Instrument Serif (editorial), Inter (body), JetBrains Mono (code).
5. Output HTML artifacts OR production-flavoured TSX, whichever the user needs.

**Hard rules** (do not break without explicit user permission):
- No abstract gradients, no emoji on UI, no coloured-left-border accent cards, no "Submit" buttons.
- 10 px card radius / 100 px pill radius — non-negotiable.
- Touch targets ≥ 44 × 44 px.
- Mobile-first. Sentence case. Spanish-Chilean "tú" voice in copy.
- Use the 2-level flat shadow system; never a third elevation.
- Accent green is status-only — never a hero background.
