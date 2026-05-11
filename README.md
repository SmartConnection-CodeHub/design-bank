# SMC Design System

**SMART CONNECTION (SMC)** — Chilean software + IA + automatización studio.

- Web: [smconnection.cl](https://smconnection.cl)
- Owner: Guillermo González León
- Tagline: "Monday + IA real" — SaaS Factory que construye, opera y escala negocios.

This design system is the source-of-truth for branded interfaces across SMC's 13 active projects + the federated `@smc/ui` package. It is consumed by humans (Sebastián / dev, Javier / InfoPet, Martín / Kanki) and internal IA agents alike.

---

## Sources used to build this system

The user provided a **textual specification** describing tokens, projects, and visual direction. No codebase, Figma file, or visual assets were attached at build time. Everything below is derived from that spec; concrete logos and screenshots are placeholders pending real assets.

If you have access to:
- the SMC monorepo / `@smc/ui` package
- a Figma library
- production screenshots of the 13 projects

…please drop them in via the **Import** menu so we can replace placeholders and lock UI fidelity.

---

## Tech stack (target consumers)

- **Next.js 16** + TypeScript strict
- **Tailwind v4** (utility-first, anti-soup → CVA past 8 classes)
- **Radix UI** primitives + **Tailwind Variants (CVA)** + **Lucide icons**
- **Supabase Postgres** (RLS always on)
- **React Hook Form** + **Zod**
- **Framer Motion** for animation
- Federated package `@smc/ui` — `Button`, `Card`, `Input`, `Badge`, `Dialog`, `Toast`, `Sidebar`

---

## The 13 active SMC projects

| # | Project | What it is |
|---|---------|-----------|
| 1 | **Kanki Street** | E-commerce streetwear (Jumpseller storefront) |
| 2 | **VOY** | Cotizador / quote-builder |
| 3 | **InfoPet** | Bsale + Jumpseller + IA pet retail stack |
| 4 | **Intranet** | Internal Next.js + Supabase portal |
| 5 | **Marketing** | Static HTML + S3 landing pages |
| 6 | **Marketplace** | MercadoLibre + B2G integration |
| 7 | **AlPaso** | (logistics / delivery — TBD with user) |
| 8 | **Cencosud CEM** | SF → SAP customer experience pipe |
| 9 | **Valmer** | CPI ETL for financial data |
| 10 | **SAP CPI (Parque Arauco)** | Mall ops integration |
| 11 | **DUOC UC (PI 7.5)** | Education integration |
| 12 | **Discovery Cliente** | Client-discovery internal tool |
| 13 | **Cerebro** | Mentor IA — internal AI agent |

---

## Visual direction (north star)

**Claude Design Gallery × Calculator-Kit pattern.** Every showcase card is a *real working scene* — central app + side tweak controls + horizontal variant pills + "Use this prompt" CTA. No abstract gradient slop. No emoji cards. No lazy left-border-accent boxes.

Mobile-first, **375 px first**. Touch targets ≥ 44 × 44. WCAG AA throughout.

→ See `## Visual Foundations` below for the full rule set.

---

## Content Fundamentals

SMC products are **bilingual (es-CL primary, en secondary)** with a punchy, tech-confident Chilean voice. Copy is conversational, never corporate. The brand sits between *Linear-clean engineering* and *Mercado Libre cercano* — direct, useful, no-bullshit.

**Tone rules**

- **Tú, no usted.** Chilean-Spanish informal everywhere — "tu cuenta", "tus pedidos", "te enviamos". The user is a peer, not a customer-being-served.
- **Verbs over nouns.** "Cotizar", "Conectar", "Lanzar" — *not* "Cotización", "Conexión", "Lanzamiento" — on CTAs and section heads.
- **Numbers up front.** When pitching: "13 proyectos activos. 1 stack federado. 0 deuda técnica." Numerals over words.
- **No emoji in product UI.** Emoji are reserved for *external* surfaces (RADAR briefs, Slack-tone announcements) and even there, sparingly. Never on buttons, never as decorative bullets.
- **No "click here", no "submit".** CTAs name the action: *"Cotizar ahora"*, *"Abrir mi panel"*, *"Conectar Bsale"*.
- **Code voice for code things.** Endpoint names, env keys, project codenames stay in `JetBrains Mono` and are never translated.
- **Status copy is short and present-tense.** "Conectado.", "Sincronizando…", "3 cambios sin guardar."
- **Errors are diagnostic, not apologetic.** "Token expirado — vuelve a iniciar sesión." Never "Lo sentimos, algo salió mal."

**Casing**

- Sentence case everywhere. *Not* Title Case. ("Nueva cotización", not "Nueva Cotización".)
- ALL-CAPS only for the micro-eyebrow label (`.t-micro`, tracked wide), e.g. `PROYECTOS ACTIVOS`.
- Product names keep their canonical case: **Kanki Street**, **VOY**, **InfoPet**, **Cerebro**, **Hoku**.

**Examples — say this, not that**

| ✅ Say | ❌ Don't say |
|--------|--------------|
| "Cotiza tu próximo proyecto en 2 minutos." | "Solicite su cotización personalizada." |
| "Pega tu pedido — lo armo." (Hoku composer placeholder) | "Escriba su consulta a continuación." |
| "Conectar Bsale" | "Integrar con la plataforma Bsale" |
| "13 proyectos, 1 stack." | "Una solución integral para múltiples proyectos." |
| "Sin token. Vuelve a entrar." | "Lo sentimos, su sesión ha expirado." |

---

## Visual Foundations

The brand is **cream + navy + gold + tech-green**. Editorial serif H1s float over a warm cream wash; navy carries weight; gold is the *single* highlight that earns attention; the SMC green (`#00E5B0`) is reserved for **status & confirmation only** (online dot, "Conectado", focus ring) — never as a primary surface.

### Color

- **Background base** is **`#F8F8F6` cream** — never pure white. Pure white (`--bg-elevated`) is reserved for *cards floating above* cream.
- **Navy `#1B2F4E`** is the primary brand color: nav, primary button, body text on cream.
- **Gold `#C49A3A`** is the *editorial accent* — pull quotes, premium badges, the gold-pill filter. Use ≤ 1 instance per screen.
- **Accent green `#00E5B0`** is *state only* (success / live / focus ring). It must never be a hero background.
- **Inverse mode** = navy `#1B2F4E` ground + cream type. Used on Marketing hero blocks and `<deck-stage>` section dividers.

### Typography

- **Display / H1 → Instrument Serif** (substitute for proprietary "Anthropic Sans"; flagged — drop the real font in `fonts/` to override).
- **Body → Inter** 400/500/600. Sentence case.
- **Code → JetBrains Mono** 400/500.
- **Scale clamps fluidly** between mobile (375 px) and desktop (1440 px) — see `--t-*` vars.
- Editorial H1 always sits *one tracking unit tighter* (`-0.02em`) than body — gives it weight without bold.

### Spacing

- **4 px base grid.** All padding, margin, and gaps land on multiples of 4.
- **Card padding default = `--space-6` (24 px).** Compact lists drop to `--space-4`.
- **Section rhythm = `--space-16` (64 px)** between blocks, `--space-8` between sub-blocks.

### Backgrounds

- **No abstract gradients.** No bluish-purple slop, no mesh-blob-decoration, no rainbow washes.
- **SMC Mesh Backgrounds** (5 named: Ocean / Sand / Gold / Navy / Cream) are *named CSS shaders* — soft 2-color radial conics, very low contrast, used full-bleed behind hero blocks. They are explicit assets, not decoration applied at random.
- Otherwise: flat cream, flat navy, or full-bleed photography (warm, slightly desaturated, never cold).

### Borders & shadow

- **Borders** are 1 px solid `--border-subtle` (`#DCDCD2`) by default — never 2 px, never colored except the focus ring.
- **Shadow system is FLAT.** Two levels only:
  - **Rest** → `0 1px 2px rgba(27,47,78,.08)` — cards live here.
  - **Hover** → `0 8px 24px rgba(27,47,78,.12)` — lifts on `:hover` with `transform: translateY(-1px)` and `transition: 200ms var(--ease-out)`.
- **Pressed** = inset `0 1px 1px rgba(27,47,78,.16)` + no transform.
- **Focus ring** = `0 0 0 3px rgba(0,229,176,.30)` (the accent green at 30% alpha). Never a blue browser default.

### Corners

- **Cards & inputs → 10 px** (`--radius-md`). This is *the* SMC radius and is non-negotiable.
- **Pills / filter chips → 100 px** (`--radius-pill`).
- **Buttons** follow the parent: 10 px in cards, pill in filter rows.
- Avatars, status dots → `--radius-full`.

### Hover, press, focus

- **Hover** = +1 elevation level + 1 px lift + 200 ms `ease-out`. Never a color flip.
- **Press** = drop to rest shadow + `translateY(0)` + inset shadow. No scale-down (anti-mobile-trope).
- **Focus** = accent-green ring (`--shadow-focus`). Always visible — we do not strip `:focus-visible`.
- **Disabled** = 40 % opacity + `cursor: not-allowed`. Color never changes.

### Motion (Framer Motion)

- **Ease default** = `cubic-bezier(.22,1,.36,1)` — fast out, settle slow.
- **Spring** = `(.34,1.56,.64,1)` for *delight only* (toast pop, RADAR card flip, "Conectado" tick).
- **Duration** stays under 360 ms; the page is never a slideshow. Most interactions are 120–200 ms.
- **No bounces on layout shifts.** Bounce is reserved for confirmations.
- **Hoku Chat streaming text** uses a token-by-token reveal (12 ms cadence) with a 1.5 ch trailing caret.

### Transparency & blur

- **Backdrop blur** appears only on the mobile sticky-header (8 px blur over cream@70 %) and the cmdK / Sidebar floating variant.
- **Solid surfaces otherwise.** No glass-morphism, no translucent buttons.

### Imagery

- Warm, slightly desaturated photography. Chilean context (Andes light, Santiago streetwear, pet-shop interiors, retail floors) when product permits.
- **No stock illustrations of abstract people.** No emoji-style 3D characters. No isometric hero illustrations.
- When real imagery is missing → use a flat **cream → cream-200** placeholder block with a dotted `--border-default` outline and a centered `t-micro` label `IMG PLACEHOLDER`.

### Layout rules

- **Mobile-first, 375 px design seed.** Desktop is a graceful upscale.
- **Sticky header on mobile** = 56 px, blurred, navy logo + cmdK icon right.
- **Sidebar (desktop)** = 240 px expanded, 64 px compact, 320 px floating cmdK.
- **Max content width** = 1240 px; gutters `--space-6` mobile, `--space-12` desktop.
- **Touch targets ≥ 44 × 44 px** without exception.

### Anti-patterns (banned)

- Bluish-purple gradients.
- Emoji as card decoration or bullets.
- Rounded cards with a colored *left-border only* accent.
- Hand-drawn brand SVGs in place of real iconography.
- Title Case on UI strings.
- "Submit" buttons.
- Scale-down on tap.

---

## Iconography

SMC standardises on **Lucide** (`lucide-react`) as the single icon family across every project. This was specified in the stack (`Lucide icons`) and is the same family `shadcn/ui` ships with — it composes cleanly with Radix + Tailwind Variants.

**Rules**

- **Stroke 1.75, currentColor.** Never recolor stroke per icon — colour comes from the surrounding text.
- **20 × 20 visual size inside a 24 × 24 box.** This gives consistent optical density next to 15 px body text.
- **No fill icons** unless the icon represents an *active* state (e.g. filled bell when notifications are on). Active fill uses the surrounding accent colour, never a hard-coded hex.
- **No emoji as icons.** Status indicators use a small coloured dot, never 🟢.
- **No unicode glyphs** (✓, ×, ⌘) in body content. The only place unicode is OK is inside `kbd` chips in cmd-K menus (`⌘K`, `⌥`, `⇧`) and arrows (`→`) as part of an inline link affordance.
- **No PNG icons.** Everything is SVG-as-component.
- **Custom marks** (brand glyphs, integration logos) are stored as SVG in `assets/icons-custom/` and follow the same 20-in-24 sizing.

**Asset state — *flagged, needs follow-up***

This system was built from a textual spec with no codebase or Figma attached. The icon previews in `preview/brand-iconography.html` are **inline Lucide-shaped SVGs** so the look is correct, but no `lucide-react` package or sprite file has been copied into `assets/` yet. When using the system in production, install `lucide-react`; when prototyping HTML, link `https://unpkg.com/lucide@latest` from CDN.

**Project-specific marks pending real assets**

Each of the 13 SMC projects has a logo / wordmark that needs to land in `assets/projects/<slug>.svg`. Until you drop them in, every project card falls back to a styled **letter mark** (first letter of the project name on a navy `--radius-md` tile).

---

## Index — what's in this repo

```
README.md                       ← you are here
SKILL.md                        ← Agent Skill manifest (Claude Code compatible)
colors_and_type.css             ← canonical CSS vars (tokens + semantic)
preview/                        ← 20 Design System cards (registered as assets)
  colors-canonical.html         ← cream · navy · gold · accent
  colors-navy-scale.html        ← navy 50 → 900
  colors-accent-gold.html       ← tech-green + gold ramps
  colors-semantic.html          ← surfaces, text, status, borders
  type-display.html             ← Instrument Serif specimens
  type-body.html                ← Inter ramp H2 → micro
  type-mono.html                ← JetBrains Mono inline + block
  radius.html                   ← 10 px cards · 100 px pills (canonical)
  shadow.html                   ← rest · hover · pressed · focus
  spacing.html                  ← 4 px grid ladder
  motion.html                   ← easing curves + duration
  component-button.html         ← variant × size × state matrix
  component-input.html          ← field, textarea, switch, checkbox
  component-badges.html         ← status badges + filter pills
  component-card.html           ← 4 card anatomies (incl. inverse)
  component-sidebar.html        ← 4 sidebar variants
  component-toast.html          ← ok · warn · err · info
  brand-logos.html              ← wordmark + mark lockups (placeholder)
  brand-meshes.html             ← Ocean · Sand · Gold · Navy · Cream
  brand-iconography.html        ← Lucide-style 20-in-24 icons
ui_kits/
  ui/        ← @smc/ui component federation (Button … Sidebar)
  voy/       ← VOY Cotizador (Calculator-Kit, 12 dimensions)
  hoku/      ← Hoku chat — 10 streaming-text variants
  intranet/  ← Intranet login — 5 mobile screens
  kanki/     ← Kanki Street storefront — 4 mobile screens w/ curtain hero
  radar/     ← RADAR Brief semanal — 5-section editorial brief
```

Every file in `preview/` and every `ui_kits/*/index.html` is registered in the Design System tab via `register_assets`. The Design System tab on this project is the manifest.

---

## Caveats & open asks (please help me lock these in)

This system was built from a **textual specification only** — no codebase, Figma, brand book, or production screenshots were attached. To take it from "well-grounded scaffold" to "production-true source of truth", the following are **flagged for you**:

1. **Real logo assets.** I rendered an editorial `SMC.` wordmark + matching `S.` glyph mark from Instrument Serif as a *placeholder*. Drop the real SVG + favicon files into `assets/logo/` and I'll re-do the lockups card and re-export.
2. **`Anthropic Sans` font is proprietary.** I substituted **Instrument Serif** (Google Fonts) as the editorial H1. If you actually want a sans editorial face, ping me — I'll switch to a closer match (e.g. `Geist`, `PP Editorial New`, or a license-bought file dropped into `fonts/`).
3. **Project-specific logos** (VOY, Hoku, Kanki Street, InfoPet, Cerebro, …). Currently every project falls back to a styled letter mark. Drop SVGs in `assets/projects/<slug>.svg` and I'll re-thread them through every card.
4. **Photography.** Product cards currently use mesh placeholders or styled drop-tiles. If you can share even one real Kanki product photo / one Cotizador hero image / one Hoku screenshot, fidelity jumps a lot.
5. **Pricing rules in VOY.** The breakdown numbers are illustrative. If you give me the real CVA pricing matrix I can wire it into the live demo.
6. **`@smc/ui` actual source.** The component panel is a *visual recreation* based on your token spec — not lifted from the real federated package. If you import the monorepo I'll cross-check every variant and replace any guesses.
7. **Iconography.** I used inline Lucide-shaped SVGs (correct family, correct stroke). For production, `pnpm add lucide-react`; for prototyping HTML, link `https://unpkg.com/lucide@latest`.

### What I'd love next

> **Bold ask:** drop the real codebase (or Figma library) into this project via the Import menu, plus any 3–5 production screenshots, and I'll do a second pass — replacing every placeholder, locking icon/logo fidelity, and adding the 4 RADAR cards + the remaining 12 Patterns Federados as live demos. We can also expand each of the 13 projects into its own UI kit instead of the current 6.

