# @smc/ui — Federated component package

The shared component federation that all 13 SMC projects consume. Built on:

- **Radix UI** primitives — for accessibility-first base behaviour
- **Tailwind v4** with `@theme inline` reading our CSS vars
- **Tailwind Variants (CVA)** — replaces utility-soup past 8 classes
- **Lucide** for iconography
- **Framer Motion** for animation

## Components shipped (v0.4.2)

| Component | Variants | Notes |
|-----------|----------|-------|
| `<Button>` | primary · secondary · gold · ghost · danger; sm · md · lg; +pill | All states wired (hover, press, focus, disabled) |
| `<Card>` | default · image-led · inverse · pricing | 10 px radius non-negotiable |
| `<Input>` | text · email · password · search · textarea | Wraps React Hook Form + Zod |
| `<Badge>` | soft-status × 4 · solid-navy · outline · mono | 100 px pill |
| `<Dialog>` | confirm · destructive · sheet (mobile) | Radix `<AlertDialog>` underneath |
| `<Toast>` | ok · warn · err · info | Auto-dismiss 4 s; 12-toast stack max |
| `<Sidebar>` | expanded (240) · compact (64) · floating cmdK (320) | Persists in localStorage |

## Anti-patterns the package refuses

- No `<Button onClick={...} className="bg-blue-500 text-white px-4 py-2 rounded-lg ..."`>. If you write 8+ Tailwind classes, the lint rule forces you into a CVA variant.
- No emoji on labels.
- No `Submit` button — name the action.
- No coloured left-border accent cards.
