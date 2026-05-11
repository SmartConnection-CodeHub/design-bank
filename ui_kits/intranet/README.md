# Intranet — Login flow

5-screen passwordless flow for the SMC internal Next.js + Supabase intranet. Mobile-first, 375 px design seed shown in a 240 px phone bezel for the system tab.

| # | Screen | Key components |
|---|--------|----------------|
| 01 | Welcome | mesh hero, primary CTA, ghost SSO, 5-dot progress |
| 02 | Email | back arrow, single field, send-code CTA |
| 03 | Code   | 6-cell code grid, resend timer |
| 04 | Profile | avatar autogen, 3 stacked fields |
| 05 | Plan    | 3 plan cards, "popular" gold pill, create-account CTA |

Pattern notes:
- Sticky bottom CTA, never floating-mid-screen.
- Progress dots are a *navigation receipt*, not a forward affordance.
- Avatar uses the `Instrument Serif` first letter on navy — same lockup as the SMC mark.
