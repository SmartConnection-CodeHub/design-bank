# VOY — Cotizador kit

**Pattern.** Calculator-Kit hybrid (Claude Design Gallery style). Central live scene + right-rail 12-dimension tweak panel + horizontal variant pills + "Bloquear cotización" CTA.

**Surface.** Single full-page cotizador. Mobile-first → 375 px shows pills on top, scene next, tweak panel as bottom-sheet drawer (not shown in this static demo).

**Components consumed**

- `@smc/ui/Button` (primary / ghost)
- `@smc/ui/Card` (scene + tweak panel)
- `@smc/ui/Badge` (filter pill row)
- Inline `<input type="range">` styled with `accent-color: var(--smc-navy)` (CVA wrapper TBD)

**Real product TBD**

- Recalc logic (debounce + RHF + Zod schema).
- "Bloquear cotización" → POST to Supabase, returns signed URL, 14-day TTL.
- PDF export through `@react-pdf/renderer`.

**Pending assets**

- Hero illustration / mesh — currently flat cream.
- Real pricing rules — placeholder numbers in the breakdown grid.
