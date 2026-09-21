# brendan-rohan.com

Personal portfolio site for Brendan Rohan (Product & Content Designer). Astro,
no other framework. Migrated from a static six-page HTML/CSS handoff
(`github.com/brendanrohan/MVPfolio`) into tokens + reusable components —
every visual value carried over exactly; nothing was redesigned.

## Rules for this repo

- **Never hardcode a color, and don't add a new `oklch(...)` literal
  anywhere outside `src/styles/tokens.css`.** If a component needs a new
  visual value, add a token first (primitive → semantic, see the comments
  at the top of `tokens.css`), then reference it. This is the whole point
  of the migration — don't reintroduce the magic numbers it removed.
- **`src/styles/components.css`** holds all component visual styling,
  organized by component with a comment header per section. It only
  references tokens, never raw values.
- **`src/components/*.astro`** is the reusable kit (Nav, Footer, WorkCard,
  HistoryRow, CaseHeader, CaseMeta, CaseSection, MetricsTable, LearnList,
  BulletList, Figure, ResultHighlight, CompareTable, LayerDiagram,
  QGrid/QCard, FlowSteps, Pager, WipNotice, Kicker). New case-study content
  should compose from these, not hand-written markup — that's the pattern
  every page in `src/pages/` already follows.
- **`/system`** is the living style guide — every token and component
  variant, rendered from the real project files. Check it after any token
  or component change; if it looks wrong there, it's wrong everywhere.
- Case-study copy follows a specific voice (see "Voice" below) — keep new
  writing consistent with it rather than defaulting to generic case-study
  copy.

## Voice (for any new case-study writing)

From the xFi Reimagined case study, which sets the tone for the rest of the
site:

1. **Plain over precise.** Say what happened and why in one sentence before
   reaching for technical detail. Detail is available on request, not the
   default.
2. **Show the work without performing it.** State the outcome and the
   reasoning; don't narrate every step.
3. **Comfortable with uncertainty.** Naming what you don't know reads better
   than false confidence.

## Current state (as of the Astro migration)

- All 6 pages ported with real content: Work (home), About, and all four
  case studies — Number Transfer (the one full write-up), xFi Reimagined,
  Personalized Shopping, and Quiet Signals (shorter/WIP).
- `npm run build` succeeds cleanly.
- Bugs caught and fixed during migration: xFi's case-study pager had a
  broken `next` link (`href=".html"`) — now points to Quiet Signals; a
  malformed `</spaan>` closing tag is gone since components always emit
  valid markup; a few copy typos fixed ("uncertainy" → "uncertainty",
  "rputer" → "router", "continously" → "continuously").
- `About` doesn't have the nav's live-clock/location label that the home
  page does — carried forward as-is since it reads intentional, but worth
  double-checking.

## Deferred on purpose — not forgotten, just sequenced later

- Tokenizing remaining literal `font-size` / spacing values into a
  type-scale and spacing-scale (higher risk of value drift across ~800
  lines of hand-tuned CSS — do it as its own pass with visual diffing, not
  bundled into unrelated changes).
- Quiet Signals' two figures are still placeholders — no real exports
  exist yet.
- Self-hosting the two Google Fonts (Hanken Grotesk, JetBrains Mono) to
  drop the external request.
- Deploy target not yet chosen — Vercel or Netlify both fit a static Astro
  site with no backend.

## Commands

```
npm install
npm run dev      # http://localhost:4321
npm run build    # writes to dist/
```
