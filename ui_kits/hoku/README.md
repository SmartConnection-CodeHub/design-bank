# Hoku — Chat streaming kit

10 streaming-text variants for the internal **Hoku** chat surface (the user-facing front of Cerebro). Each pane is a self-contained streaming pattern you can drop into a chat message component:

1. **Token reveal** — `span.tok` fade-in @ 12 ms cadence + block caret.
2. **Word slide-up** — `translateY(4 → 0)` per word, 80 ms stagger.
3. **Highlight stream** — accent-100 wash on each new token; decays out at 220 ms.
4. **Thinking block** — italic, sunk background, pulsing accent dot.
5. **Code stream** — JetBrains Mono syntax block with green bar caret.
6. **Tool call card** — `bsale.list_products(…)` style inline pill + result count.
7. **Skeleton** — shimmer placeholder before first token.
8. **Progress** — indeterminate accent-green bar for long ops (embeddings).
9. **Ghost preview** — faded "next tokens" for autocomplete-style affordances.
10. **Underscore caret** — gold retro variant for the "Cerebro is thinking…" splash.

Anti-tropes: no green-cursor-with-trailing-line, no rainbow gradient typing, no 3-dot loaders (we use a single pulsing accent dot in `04 Thinking`).

**Real production TODO** — wire to OpenAI / Anthropic SSE stream; persist conversations in Supabase with RLS per `user_id`.
