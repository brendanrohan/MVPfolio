# Handoff: Brendan Rohan — Portfolio Site

## Overview
A concise, minimal portfolio site for **Brendan Rohan**, a UX / Product Designer. It comprises a **Work** (home) page, an **About** page (bio + work-history timeline), and **four case-study pages** (one fully written — Verizon "Number Transfer Redesign" — and three structured placeholders). The aesthetic is an "editorial blend": calm two-tone paper background, a serif-free grotesk for display/body, and a monospace for labels/metadata, with a single warm-orange accent.

## About the Design Files
The files in this bundle are **design references created in plain HTML + CSS** — working prototypes showing the intended look, structure, and behavior. They are **not** tied to any framework and have **no build step**. They can be used two ways:

1. **Continue as-is** — they are canonical, hand-editable static HTML/CSS and can ship or evolve directly.
2. **Recreate in a target codebase** — if this is being folded into an existing app (React, Vue, Astro, SvelteKit, etc.), recreate these pages using that codebase's established components and patterns. If no environment exists yet, a static-site setup (Astro, Eleventy, or plain HTML) is the most natural fit given the content-first, low-interactivity nature of the site.

## Fidelity
**High-fidelity.** Final colors, typography, spacing, and interactions are all specified here and in `site.css`. Recreate the UI to match. All design values are real (see Design Tokens).

## Tech notes
- **No framework, no build.** Each page is a standalone `.html` linking one shared stylesheet, `site.css`.
- **Fonts** load from Google Fonts: *Hanken Grotesk* (display/body) and *JetBrains Mono* (labels/meta). Swap for self-hosted or codebase-standard equivalents if preferred.
- **Image placeholders** use a custom web component, `<image-slot>` (`image-slot.js`), a drag-and-drop fillable image target that persists dropped images via a sidecar JSON file when run inside the original authoring runtime. **In a normal codebase this component is read-only** — replace each `<image-slot>` with a standard `<img>` (or the codebase's image component) pointing at the real exported asset. The slot's `id`, size class, and `<figcaption>` tell you what image belongs in each spot.
- Page filenames contain spaces (e.g. `Number Transfer Redesign.html`) and are linked with those exact names. If the target router dislikes spaces, rename to slugs (`number-transfer-redesign`) and update the `href`s together.

## Site Map & Navigation
```
Brendan Rohan.html ........ Work / home (intro + selected-work list)
About.html ................ Bio (3 paragraphs) + work-history timeline
Number Transfer Redesign.html  Verizon case study (FULL content)
Quiet Signals.html ........ Personal case study (PLACEHOLDER)
Personalized Shopping.html  AT&T case study (PLACEHOLDER)
xFi Reimagined.html ....... Comcast case study (PLACEHOLDER)
```
- **Top nav** (every page): wordmark "Brendan Rohan" (links home) on the left; "Work" / "About" links on the right. The current page's link gets `.active` (orange + 1px underline).
- **Selected-work grid** (home): a 2×2 grid of cards; each card links to its case study.
- **Case-study pager** (bottom of every case study): Previous / Next cycle through the four studies in order `Quiet Signals → Personalized Shopping → Number Transfer → xFi → (wrap)`, plus a "Back to all work" link.

## Screens / Views

### 1. Work (home) — `Brendan Rohan.html`
- **Purpose:** First impression + entry to case studies.
- **Layout:** Single centered column, `max-width: 1080px`, horizontal padding `64px` (28px under 720px). Vertical flow: nav → hero → selected-work section → contact footer.
- **Components:**
  - **Nav** — three-part flex row, `align-items: baseline`, `position: relative`. **Left:** wordmark "Brendan Rohan" (JetBrains Mono 14px, links home). **Center:** a location + live-clock label, absolutely centered (`left:50%; translateX(-50%)`) — reads `NEW YORK, NY · <time>`; mono 12.5px uppercase 0.1em `--ink-faint`, with a `·` separator in `--line` and the time in `--accent`, non-uppercased, `tabular-nums`. **Right:** "Work" / "About" links (mono 12.5px, uppercase, 0.08em, `--ink-faint`, hover `--ink`; `.active` = orange + 1px underline). The center label is `display:none` under 720px.
    - **Live clock behavior:** a small inline `<script>` at the bottom of the page writes the current **America/New_York** time into `#local-time` via `Intl.DateTimeFormat` (`hour:'numeric', minute:'2-digit'`, lowercased → e.g. `2:48 pm`) on load and every 15s. Reimplement as a tiny client component/hook; it is display-only, no state persistence.
  - **Hero** — mono orange kicker `(Introduction)` (12px, uppercase, 0.16em); headline `.intro` Hanken Grotesk `clamp(30px,4.2vw,50px)`, weight 500, line-height 1.15, letter-spacing −0.025em, max-width 880px, with an italic span (`emerging technology`) and an orange span (`actually use`); sub-paragraph `.sub` 17px, `--ink-soft`, max-width 560px. Below the sub: **`.hero-links`** — a flex row (gap 28px) of two mono 13px links, `Contact` (`mailto:brendanrohan@gmail.com`) and `Resume` (Google Drive URL, opens in new tab), each with a 1px `--line` bottom border that turns `--accent` on hover.
  - **Selected Work** — kicker `(Selected Work)`; a **2×2 card grid** (`.worklist`, `grid-template-columns: 1fr 1fr`, gap 28px; collapses to 1 column under 720px). Each `.work-card` is an `<a>` (flex column, background `oklch(0.965 0.006 80)`, 1px `--line` border, `border-radius:18px`, `overflow:hidden`) containing: a **`.wc-visual`** image area (`aspect-ratio: 16/11`, holds an `<image-slot>` — replace with a real `<img>`), then a **`.wc-body`** (padding 22/24/26px) with a `.wc-meta` row (index mono 12px faint · right-aligned year/company mono 11px uppercase), a `.nm2` title (23px, weight 500), and a `.ds` description (14.5px `--ink-soft`). **Card hover:** border darkens to `oklch(0.82 0.02 70)`, `translateY(-3px)`, soft shadow `0 14px 34px -18px oklch(0.4 0.03 60 / 0.4)`, title → orange. The four cards link to Quiet Signals, Personalized Shopping, Number Transfer Redesign, xFi Reimagined.
  - **Contact footer** — **no top divider** (the shared `.foot` border-top was removed site-wide). Two-column flex, `align-items:flex-start`. **Left** (`.foot-lead`): an orange `(Contact)` kicker over a 25px statement "Working on something complex? Let's think it through together." **Right** (`.contact`): mono 13px block — email + phone + LinkedIn (email & LinkedIn are orange links). Stacks under 720px.

### 2. About — `About.html`
- **Purpose:** Bio and career history.
- **Layout:** Same centered column. Flow: nav → about-body → work-history → footer.
- **Components:**
  - **About body** — kicker `(About)`; three `<p>` at 21px, line-height 1.6, letter-spacing −0.01em, `--ink`, max-width 720px. Contains one italic emphasis and one orange span ("AI-first design").
  - **Work-history timeline** — kicker `(Work History)`; six rows. Each `.hist-row` is a 3-column grid `150px 1fr 1.25fr`, gap 40px, with a top border and `44px` vertical padding. Columns: **year pill** (mono 12.5px on `--pill` background, `8px 16px`, `border-radius:100px`), **org + role** (org 24px weight 600; role 16px italic `--ink-soft`), **description + notable** (desc 15.5px `--ink-soft`; "notable" block has a mono orange uppercase label `--accent` over a 14px `--ink-faint` line). Collapses to a single column under 720px.
  - Content for all six rows (Career Break 2026 → Publicis/Rosetta 2011–2014) is in the HTML verbatim.

### 3. Case study (full) — `Number Transfer Redesign.html`
- **Purpose:** Deep-dive on the Verizon number-transfer redesign.
- **Layout:** Same centered column. Flow: nav → header (kicker, title, lead, meta strip) → content sections → results → lessons → pager → back link → footer.
- **Components:**
  - **Header** — kicker `(Verizon)`; title `.cs-title` `clamp(30px,4vw,48px)` weight 500; lead `.cs-lead` 19px `--ink-soft` with an orange span. **Meta strip** `.cs-meta`: top+bottom border, 4-column grid `1.1fr 0.8fr 0.6fr 1.5fr`; each cell a mono uppercase label (`--ink-faint` 11px) over a 15px value; the Tags cell holds mono pills on `--pill` (`border-radius:100px`, `white-space:nowrap`).
  - **Section** `.cs-sec` — mono orange kicker `(Overview)`, `(Challenge)`, `(Research)`, `(Approach)`, `(Results)`, `(Lessons Learned)`; body `<p>` 17px line-height 1.62 `--ink-soft` max-width 680px. Sub-headers `.cs-subh` 19px weight 600.
  - **Key Metrics table** `.cs-metrics` — top border + per-row bottom border; each row a `1fr auto` grid; metric label 15.5px `--ink-soft`, value mono 15px `--ink` right-aligned; a `.head` row uses mono uppercase faint labels.
  - **Learnings list** `.cs-learn` — custom bullets: a 6px orange dot (`::before`), bold lead-in + `--ink-soft` body.
  - **Plain bullets** `.cs-bullets` — em-dash markers.
  - **Figures** `.cs-fig` — an `<image-slot>` (see Tech notes) at full column width with a 1px border and light fill, plus a mono `--ink-faint` `<figcaption>`. Height variants: `.tall` 540px, `.wide` 420px, `.screens` 460px. Seven figures total; captions describe the intended image.
  - **Results** — `.cs-result .big` 22px, with an orange bold span on the headline metric.
  - **Lessons** `.cs-lessons` — three blocks, 16.5px `--ink-soft`, bold lead-ins.
  - **Pager** `.cs-pager` + **back link** + **footer** (see Navigation / shared).

### 4. Case studies (placeholders) — `Quiet Signals.html`, `Personalized Shopping.html`, `xFi Reimagined.html`
- **Purpose:** Reserve and frame the three remaining studies; ready to be filled in.
- **Layout/Components:** Same header/meta/section structure as the full study, but with: a **WIP notice** `.cs-wip` (mono pill, 1px border, a pulsing orange dot via `@keyframes pulse`, text "Case study in progress — full write-up coming soon"); an `(Overview)` with real framing; a `(Selected Visuals)` section with two `<image-slot>` placeholders; then pager + back + footer. Each page's real lead, meta (role/duration/year/tags), and overview copy are in the HTML.

## Interactions & Behavior
- **Nav active state** — current page link is orange with a 1px underline (`.active`).
- **Live clock (home nav)** — `#local-time` updated on load + every 15s to America/New_York time (see Work page). Display-only.
- **Work-card hover (home)** — `translateY(-3px)` + darker border + soft shadow + title→orange, transition `border-color .2s, transform .2s, box-shadow .2s`.
- **Pager hover** — card lifts `translateY(-1px)`, name→orange.
- **WIP dot** — `pulse` keyframe, 2.4s ease-out infinite expanding ring; disabled under `prefers-reduced-motion: reduce`.
- **Links** — email is `mailto:`, phone is plain text, LinkedIn is `https://www.linkedin.com/in/brendanrohan` (`target="_blank" rel="noopener"`).
- **`<image-slot>`** — drag/drop fill in the authoring runtime only; treat as a static image target elsewhere.
- **Responsive** — single breakpoint at `max-width: 720px`: padding shrinks to 28px; work rows drop description/year; history rows and meta collapse to fewer columns; footer stacks. No other JS-driven responsiveness.

## State Management
None. The site is fully static — no client state, data fetching, or forms. The only stateful behavior is the `<image-slot>` persistence, which is out of scope for a production rebuild (replace with real `<img>`s).

## Design Tokens
Defined as CSS custom properties at the top of `site.css` (colors in **oklch**; hex equivalents are approximate sRGB for convenience):

| Token | Value (oklch) | ≈ Hex | Use |
|---|---|---|---|
| `--accent` | `oklch(0.64 0.193 41)` | ≈ `#d2622f` | Warm orange — kickers, links, hovers, emphasis |
| `--ink` | `oklch(0.22 0.012 60)` | ≈ `#262320` | Primary text |
| `--ink-soft` | `oklch(0.45 0.012 60)` | ≈ `#5f5a54` | Secondary text |
| `--ink-faint` | `oklch(0.62 0.01 60)` | ≈ `#8d877f` | Labels, meta, captions |
| `--paper` | `oklch(0.975 0.006 80)` | ≈ `#f8f5ef` | Page background |
| `--line` | `oklch(0.86 0.008 70)` | ≈ `#dcd7cf` | Hairline borders |
| `--pill` | `oklch(0.91 0.006 75)` | ≈ `#e8e3db` | Year/tag pill backgrounds |
| Row hover bg | `oklch(0.955 0.012 70)` | ≈ `#f0ebe2` | Work-row & list hover tint |

**Typography**
- `--sans: "Hanken Grotesk", system-ui, sans-serif` — display + body.
- `--mono: "JetBrains Mono", ui-monospace, monospace` — kickers, labels, meta, nav, captions, pagers.
- Display scale: hero `clamp(30px,4.2vw,50px)`/500; cs-title `clamp(30px,4vw,48px)`/500; history org 24px/600; section sub-head 19px/600; work-item name 23px/500.
- Body: 21px (about), 17px (cs body), 15.5px (metrics/desc), 14.5px (work desc).
- Labels (mono): 11–12.5px, uppercase, letter-spacing 0.08–0.16em.
- Tight display tracking: −0.015em to −0.025em.

**Spacing & layout**
- Container `max-width: 1080px`; padding `0 64px` (desktop) / `0 28px` (≤720px).
- Section rhythm: hero pad-top 90px; `.section` margin-top 92px; `.cs-sec` margin-top 72px; footer margin-top 96px.
- Grids: work-card grid `1fr 1fr` (gap 28px, card visual `aspect-ratio:16/11`); history `150px 1fr 1.25fr` (gap 40px); cs-meta `1.1fr 0.8fr 0.6fr 1.5fr` (gap 32px).

- **Radius / borders / shadows**
- Pills & work cards: `border-radius: 100px` (pills) / `18px` (cards). Figure/image borders: `1px solid --line`. Hairlines between rows/sections: `1px solid --line`. The contact footer has **no** top divider. One soft shadow exists: work-card hover `0 14px 34px -18px oklch(0.4 0.03 60 / 0.4)`; otherwise flat.

**Motion**
- Transitions 0.2–0.25s; pager lift `translateY(-1px)`; work-row `padding-left` 8→18px; `pulse` ring 2.4s infinite (reduced-motion aware).

## Assets
- **Fonts:** Google Fonts — Hanken Grotesk, JetBrains Mono. No icon library; the only glyphs are typographic arrows (`←`, `→`) in nav/pager.
- **Images:** None bundled. Every image is a placeholder `<image-slot>`. The Verizon study expects 7 figures (research synthesis, service blueprint, port-status messaging matrix, retail→digital handoff flow, SMS-to-web screens, transfer-status screens, recovery screens); each placeholder has a `<figcaption>` naming the intended image. The three placeholder studies each expect 2 (hero + product screens). Real exports to be supplied by Brendan.
- **Logos/brand:** No third-party brand assets are used or required; company names (Verizon, AT&T, Comcast) appear as plain text only.

## Files
| File | Role |
|---|---|
| `Brendan Rohan.html` | Work / home page (nav live clock + 2×2 work-card grid + Contact/Resume links) |
| `About.html` | About + work-history timeline |
| `Number Transfer Redesign.html` | Full Verizon case study |
| `Quiet Signals.html` | Placeholder case study (Personal) |
| `Personalized Shopping.html` | Placeholder case study (AT&T) |
| `xFi Reimagined.html` | Placeholder case study (Comcast) |
| `site.css` | All shared styles + tokens (single source of truth) |
| `image-slot.js` | Fillable image-placeholder web component (replace with real `<img>` in production) |

## Suggested next steps for the developer
1. Decide: keep static HTML, or port into the target codebase's component model.
2. Replace every `<image-slot>` with a real image element + the supplied export; keep the `<figcaption>`.
3. If renaming files to slugs, update all cross-links (nav, work list, pagers) together.
4. Fill the three placeholder studies using `Number Transfer Redesign.html` as the content template (remove the `.cs-wip` notice when a study is complete).
5. Optionally self-host the two fonts to drop the Google Fonts dependency.
