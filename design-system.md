# NAMI College — Design System

The house contract for `src/app/globals.css`, `src/components/ui/`, `src/components/motion/` and `src/lib/`.

This file is the **reasoning**. The source carries almost no comments by deliberate policy, so the "why" for every token, primitive and motion rule lives here. A section built without reading it will compile, pass lint, pass `tsc`, and still be wrong.

Written for the engineer joining at Phase 3 who has to build a section without re-deriving Phase 0 from source.

Anything not listed here is not a decision — it is drift.

---

## 0. The rules that break a build

Seven things. Each one is cheap to follow and expensive to discover later.

| # | Rule | What goes wrong if you don't |
|:--|:--|:--|
| 1 | **`<main>` is full-bleed. Every SECTION owns `gutter-x` + an inner `mx-auto max-w-page`.** | Section widths drift page to page, and the full-bleed colour fields stop reaching the viewport edge. |
| 2 | **Use semantic tokens (`bg-surface`, `text-ink`), never raw ramp steps (`bg-neutral-50`).** | Your component stops inverting inside a dark colour field. It will look correct in isolation and broken in place. |
| 3 | **Every motion has a reduced-motion path** — and "no animation" only counts if the element ends up **visible and correctly positioned**. | Reduced-motion users get a blank or displaced section. |
| 4 | **`position: fixed` and `position: sticky` do not work inside the smooth-scrolled content.** Fixed chrome goes in `SmoothScrollProvider`'s **`chrome` slot** (§9.6), never in `children`. | Your sticky header scrolls away, or jitters, and nothing in the console explains it — and only on desktop. |
| 5 | **No dark mode.** Light-only. No `dark:` variants, no `prefers-color-scheme`. "Dark" is a design device — the colour fields — not a user theme. | A `dark:` class is dead code that no gate catches. |
| 6 | **Near-zero comments in code.** Reasoning goes here, not in the source. | The QA gate rejects the file. |
| 7 | **Never pair a NAME with a YEAR across two entities.** `institution.entities.college` is 2013; `institution.entities.institute` is 2012. Read `name` and `establishedYear` from **one** `NamedEntity`. | A false founding claim about a real institution. This is a HIGH invariant, not a copy nit — and it already reached the tree once. |

---

## 1. The five standing design constraints

Source: `PLAN.md`, the design brief. Every section is judged against these **before** it is judged against anything technical below. A build can satisfy every rule in §0–§10 and still fail here.

1. **Editorial grid, not a card grid.** Units span unequal columns and start on unequal rows. Images bleed past the viewport edge; text overlaps imagery. Sections separate by whitespace, a hairline, or a colour-field change — **never by giving every item the same box treatment**. *The radius half of this constraint is superseded* — it used to end "never by giving each item a border and a radius", enforced by capping the scale at 8px, and the operator has since directed that `rounded-xl` be the site default (§5). What survives is the **layout** claim: unequal spans, bleed, overlap, separation by whitespace and field change. What is gone is the ban on visible corners.
2. **Type is the layout.** Oversized display type IS the structural element. Mixed size and weight inside a single heading. `clamp()`-fluid, `rem`-based, never per-breakpoint jumps.
3. **Asymmetry is deliberate, not random.** One dominant axis per section, broken once. If a section reads as balanced left/right halves, it is wrong.
4. **Depth without containers.** Parallax layers, scroll-scrubbed transforms, CSS 3D perspective on hover. Depth comes from motion and overlap, not from shadows on boxes.
5. **Motion carries the youth.** GSAP only. Every motion has a `prefers-reduced-motion` path, and **no at-fold content hides behind a scroll reveal**.

Constraint 1 is why there is no `Card` primitive (§11). Constraint 2 is why the type scale runs to `text-11xl` and only nine of its fifteen steps are claimed by a typography role. Constraint 4 is why there is no shadow token.

---

## 2. Colour

All colour lives in `src/app/globals.css`. Three ramps → nine semantic tokens → three colour fields.

### 2.1 The ramps — you almost never write these

| Ramp | Steps | Anchor |
|:--|:--|:--|
| `primary-*` | 100 → 900 | **`primary-700 = #BD1B21`** — the brand red, sampled from the official logo |
| `secondary-*` | 100 → 900 | **`secondary-700 = #0E5C54`** — deep teal |
| `neutral-*` | 50 → 950 | teal-tinted greys — **these deliberately override Tailwind's stock `neutral`** |

The neutral override is the point: `#f9fcfb` at step 50 through `#0d1312` at 950 carry a green cast, so a "grey" surface sits in the same family as the teal rather than reading as a separate, colder system.

**Tailwind's other stock palettes are still compiled — `text-gray-500`, `bg-slate-800`, `bg-zinc-*` all work and are all wrong here.** They are outside the system and nothing will flag them. Neither `tsc` nor `biome` knows a colour is off-brand.

The ramps exist to *feed* the tokens below. Reach for a ramp step directly only when composing a new colour field, or for a one-off editorial treatment you can name a reason for.

### 2.2 The nine semantic tokens — this is what you write

| Token | Utility examples | Light-mode value |
|:--|:--|:--|
| `--color-surface` | `bg-surface` | `neutral-50` |
| `--color-surface-raised` | `bg-surface-raised` | `#ffffff` |
| `--color-ink` | `text-ink` | `neutral-900` |
| `--color-ink-muted` | `text-ink-muted` | `neutral-700` |
| `--color-border` | `border-border` | `neutral-300` |
| `--color-border-strong` | `border-border-strong` | `neutral-900` |
| `--color-accent` | `bg-accent`, `text-accent` | `primary-700` |
| `--color-accent-ink` | `text-accent-ink` | `#ffffff` |
| `--color-focus` | (used by the global focus ring) | `primary-700` |

**These nine are the entire vocabulary.** A component written against them drops into any colour field and inverts for free. A component written against `bg-neutral-50` is permanently light and will punch a white hole in a dark section.

The base layer already applies three of them globally, so you inherit them without writing anything:

- `body` gets `background-color: var(--color-surface)` and `color: var(--color-ink)`
- `*, ::before, ::after, ::backdrop` get `border-color: var(--color-border)` — so a bare `border` class is already the right colour, and inverts inside a field
- `:focus-visible` gets `outline: 2px solid var(--color-focus); outline-offset: 2px` — **do not write per-component focus rings**; the global one inverts with the field
- `::selection` gets `accent` on `accent-ink`
- `h1`–`h6` get `font-family: var(--font-display)`

### 2.3 The shadcn alias layer

A second `@theme` block maps the shadcn/Base-UI vocabulary onto the nine tokens: `--color-background`, `--color-foreground`, `--color-card`, `--color-popover`, `--color-primary`, `--color-muted`, `--color-muted-foreground`, `--color-input`, `--color-ring`, and the `-foreground` pairs.

It exists so a primitive pulled in from shadcn compiles against our palette without editing. **Prefer the nine tokens in your own code.** The aliases are a compatibility surface, not the house vocabulary.

**`secondary-*` means the teal ramp, and nothing else.** There is deliberately **no `--color-secondary` / `--color-secondary-foreground` alias** (§11). shadcn's `secondary` means "the muted secondary surface"; ours means "the teal brand ramp"; Tailwind gives them one namespace. With the alias present, `bg-secondary` was **white** and `bg-secondary-700` was **teal** — one character apart, both compiling, nothing to catch a section painted the wrong colour.

**Porting a shadcn component: `bg-secondary` → `bg-surface-raised`, `text-secondary-foreground` → `text-ink`.** Those two classes now compile to *nothing at all*, so the mistake surfaces as an unstyled element rather than a silently wrong colour — but no gate reports it (§13, dead-class failure).

`--color-muted` is `color-mix(in srgb, var(--color-border) 35%, var(--color-surface))` — a 35% wash of the field's **own border colour** over its surface. It washes toward the border, not toward the ink, because ink-toward is only the right direction in a light field: on `field-brand` an ink wash lightens the mid-tone red *toward* `--color-muted-foreground` and puts `text-muted-foreground` on `bg-muted` under AA, and the mix weight cannot rescue that in either direction — even 0%, which is the bare surface, reaches only **4.73:1**. Washing toward the border makes the muted block recede in every field and leaves the light theme unchanged to the eye (`#ecefee` → `#ebf0ee`).

**In `field-brand` that wash resolves to `#ad1219`, and carries `text-muted-foreground` at 5.49:1.** Both figures are derived, not sampled: inside that field `--color-border` is `primary-800` (`#90000b`) and `--color-surface` is `primary-700` (`#bd1b21`), so the 35% mix is `0.35×144 + 0.65×189 = 173`, `0.35×0 + 0.65×27 = 18`, `0.35×11 + 0.65×33 = 25`; `--color-muted-foreground` resolves to `primary-200` (`#fdd7cf`) there. **Both are functions of the brand ramp — re-derive them whenever a step moves.** The pair printed here before it (`#ac171d`, 5.45:1) was computed against the superseded `#BC2125`.

`--color-input` is `var(--color-border-strong)`, **not** `var(--color-border)`. It is the visual boundary of a form control, so WCAG 1.4.11 asks 3:1 against the surface; the decorative hairline gives 1.39:1 in the light theme and **1.00:1** inside `field-brand` on a card — a mathematically invisible border. Consequence: an input border is `neutral-900` in the light theme, the same weight as body text rather than a soft grey. `--color-border` itself is unchanged and stays decorative.

### 2.4 Colour fields — `field-ink`, `field-brand`, `field-teal`

Three utilities. Each one **re-points all nine tokens** and sets its own `background-color` / `color`, so the entire subtree inverts.

| Utility | Surface | Ink | Accent | Use |
|:--|:--|:--|:--|:--|
| `field-ink` | `neutral-950` | `neutral-50` | `primary-400` | near-black editorial break |
| `field-brand` | `primary-700` | `#ffffff` | `primary-100` | the brand red block |
| `field-teal` | `secondary-900` | `#ffffff` | `primary-400` | programme / campus-life / sustainability lane |

Apply to the **section element itself**, which is full-bleed, so the colour paints edge to edge:

```tsx
<section className="field-teal gutter-x section-y">
  <div className="mx-auto max-w-page">…</div>
</section>
```

Note that in a field the accent flips to a **light** value — `primary-400` on ink/teal, `primary-100` on brand. The brand red is not legible on itself or on near-black at text sizes, so `text-accent` means "the accent for this surface", not "red".

#### How the inversion actually works (read this before editing globals.css)

CSS substitutes a `var()` inside a custom property **at the point the property is declared**, not where it is used. So `--color-primary: var(--color-accent)` declared on `:root` is frozen to the *root's* accent — re-pointing `--color-accent` on a descendant would not move it.

That is why `globals.css` contains a `@layer base` block that **re-declares the entire shadcn alias set on `.field-ink, .field-brand, .field-teal`**. It looks like a copy-paste duplicate of the alias block. It is load-bearing: without it, `bg-primary` inside a dark section would still emit the light-mode red.

**Consequence: adding *or removing* an alias means editing BOTH places. `pnpm run aliases` enforces it.** The gate compiles this file with Tailwind's own compiler, derives which `@theme` keys resolve — directly or transitively — against a field-scoped token, and fails if that set does not exactly match the keys re-declared on `.field-ink, .field-brand, .field-teal`. It names the missing keys and which block they belong in, and fails in both directions. It also checks the three `@utility field-*` rules re-point an identical token set. The nine core tokens never had the inversion problem — they are re-declared by the `@utility field-*` rules themselves — but the gate checks those for drift too.

The font block uses `@theme inline` for the opposite reason: `--font-body` points at `--font-inter`, which `next/font` defines on `<html>`. Inlining makes `font-sans` emit the `var()` chain directly so it resolves against the element's own scope.

---

## 3. Type

### 3.1 The scale

Fifteen steps, `text-xs` → `text-11xl`. **Every step carries its own `line-height`, and no step carries a `letter-spacing`** — see §7.1 for why the tracking keys are gone.

Every `clamp()` in this system — type, `gutter-x`, `section-y` — interpolates over the **same 320px → 1440px viewport range**. Below 320 and above 1440 the value is flat. This is why there are no per-breakpoint type jumps anywhere and why there should not be any: `md:text-4xl` fights the scale rather than extending it.

**The 1440px column is measured against the unipix reference (§7.2), not chosen.** `text-base`, `text-xl`, `text-5xl` and `text-6xl` land exactly on the reference's body, lead, `h2` and `h1` — size *and* line-height. The starred rows are those four; the rest are interpolated to keep the ladder monotone.

| Step | 320px | 1440px | line-height | reference |
|:--|--:|--:|--:|:--|
| `text-xs` | 12px | 13px | 1.6 | |
| `text-sm` | 14px | 15px | 1.7 | small text 15px |
| `text-base` | 16px | 16px | 1.625 | ★ body 16 / 26 |
| `text-lg` | 17px | 18px | 1.55 | |
| `text-xl` | 18px | 20px | 1.5 | ★ lead 20 / 30 |
| `text-2xl` | 20px | 24px | 1.24 | `h5` 24 / 29.76 |
| `text-3xl` | 23px | 30px | 1.25 | |
| `text-4xl` | 27px | 40px | 1.25 | `h3` 40 / 50 |
| `text-5xl` | 31px | 48px | 1.23 | ★ `h2` 48 / 59.04 |
| `text-6xl` | 42px | 76px | 1.118 | ★ `h1` 76 / 85 |
| `text-7xl` | 48px | 96px | 1.1 | |
| `text-8xl` | 56px | 120px | 1.05 | |
| `text-9xl` | 64px | 152px | 1 | |
| `text-10xl` | 72px | 192px | 0.95 | |
| `text-11xl` | 80px | 240px | 0.9 | |

**`text-base` is a flat `1rem`, not a clamp, and that is deliberate.** The reference's body copy is 16px at every width, and 16px is simultaneously the iOS input-zoom floor and the WCAG text-resize floor. A fluid body that bottoms out at the floor and rises to 17px bought nothing and made the floor an endpoint rather than a constant. It is the one step with no `clamp()`.

**The `text-5xl` → `text-6xl` jump is 48 → 76 (×1.58), far wider than the ×1.25–1.33 elsewhere.** That gap is the reference's own structure — it has a 76px `h1` and a 48px `h2` and nothing between them. It is not a missing step; do not fill it.

**`text-7xl` and up did not move.** They are the editorial register (§3.2) and the sections composed against them were tuned at those sizes. Only their line-heights loosened, because the sub-1 leadings were set for a grotesque and collide the long descenders of the serif that is now the display face (§7).

Never a fixed-px font size. Never `text-[13px]`. If a step is missing, the scale is wrong — fix the scale, not the call site.

### 3.2 The ten roles — `src/components/ui/typography.tsx`

| Role | Default tag | Scale | 1440px | Face / weight | Extras |
|:--|:--|:--|--:|:--|:--|
| `Display` | `h1` | `text-7xl` | 96px | display / normal | `text-balance` |
| `H1` | `h1` | `text-6xl` | 76px | display / normal | `text-balance` |
| `H2` | `h2` | `text-5xl` | 48px | display / normal | `text-balance` |
| `H3` | `h3` | `text-4xl` | 40px | display / normal | `text-balance` |
| `H4` | `h4` | `text-3xl` | 30px | display / normal | `text-balance` |
| `H5` | `h5` | `text-2xl` | 24px | display / normal | `text-balance` |
| `H6` | `h6` | `text-xl` | 20px | display / normal | `text-balance` |
| `Eyebrow` | `p` | `text-sm` | 15px | body / medium | `uppercase tracking-widest text-accent` |
| `Standfirst` | `p` | `text-lg` → `xl:text-xl` | 18 → 20px | body / normal | `text-pretty text-ink-muted` |
| `P` | `p` | `text-base` | 16px | body / normal | `text-pretty text-ink-muted` |

**Every heading role is weight 400, not semibold.** The display face ships one weight (§7), the reference sets every heading at 400, and a bolder heading is not expressible — `font-semibold` on the display face is a no-op, not a heavier heading (§7.1).

**`H2` does not carry `capitalize`, and the reference's does.** Its `h2`s are two-to-four-word title labels ("Our Programs") where title case reads as styling. Ours are full editorial sentences carrying acronyms and Nepali proper nouns, where `capitalize` produces "British Degrees, Cambridge A-Levels, NEB — Taught Where They Belong." A call site that wants it writes `<H2 className="capitalize">`; the role does not impose it.

`text-8xl`, `text-9xl`, `text-10xl` and `text-11xl` are **deliberately unclaimed**. They are the editorial register — constraint 2's "type is the layout" — applied to a specific element in a specific section, not routed through a role. Use them consciously; do not invent a `Display2`.

**`Display`, `H1` and `H2` are in use, but usually with the step overridden at the call site** — `<Display className="mt-5 text-4xl sm:text-5xl md:text-6xl lg:text-7xl">` on the mastheads, `<H2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl">` in the contact sections. A role whose scale is replaced on every use is a `data-slot` and a face, not a type contract, and a change to the *scale* will not move those sections. Prefer the bare role; a per-breakpoint override on a role is a known divergence — it also fights the clamps of §3.1 — not a licence.

### 3.3 The `as` prop, and why every role restates its face

Every role is built by `createText(defaultTag, slot, styles)` and accepts `as` to change the rendered element while keeping the look:

```tsx
<H2 as="h3">Programmes</H2>   {/* looks like H2, correct in the heading outline */}
<H4 as="span">8,000+</H4>     {/* display treatment, no heading semantics */}
```

Each role therefore **states its own `font-display`/`font-body` and its own weight** rather than leaning on the `h1`–`h6` base rule in `globals.css`. If it did lean on it, `<H2 as="div">` would silently lose the display face and `<P as="h3">` would silently gain it. Pinning the face makes `as` purely a semantics switch with zero visual side effect.

Each role also emits a `data-slot` (`display`, `h1`, … `eyebrow`, `standfirst`, `p`) matching the house convention on the primitives.

**Prefer the role over a raw tag.** `<h2 className="text-5xl font-display font-semibold">` is drift, and it will not track a change to the scale.

---

## 4. Space and layout

### 4.1 The layout utilities

| Utility | Value | Means |
|:--|:--|:--|
| `gutter-x` | `padding-inline: var(--gutter-x)` | 20px → 64px, the horizontal page gutter |
| `bleed-x` | `margin-inline: calc(-1 * var(--gutter-x))` | −20px → −64px, cancels exactly one `gutter-x` |
| `section-y` | `padding-block: var(--spacing-section-py)` | 56px → 96px, the default vertical section rhythm |
| `section-y-compact` | `padding-block: var(--spacing-section-py-compact)` | 24px → 40px, for dense, stacked inner sections |
| `section-y-hero` | `padding-block: var(--spacing-section-py-hero)` | 24px → 44px, strictly for the Home Page hero |
| `section-y-masthead` | `padding-top: var(--spacing-section-pt-masthead); padding-bottom: var(--spacing-section-py-hero)` | 64px → 108px top, 24px → 44px bottom. Asymmetrical padding used on **ALL subpage heroes** to clear the 80px-96px fixed site header! |
| `max-w-page` | `--container-page: 90rem` | 1440px, the content column |

`globals.css` defines two further `@utility` rules that are not layout and have no row here: `scrollbar-hide` and `text-outline`.

`gutter-x` and `section-y` are operator-tuned. Do not restate them as `px-*` / `py-*`, and do not "correct" them toward a measurement from a reference site. `cn()` knows they conflict with `p-*`/`px-*`/`py-*` (§8), so a later `px-8` genuinely replaces the gutter rather than fighting it — which is also why writing both is always a mistake.

### 4.2 The section contract — the inverted shell

`src/app/layout.tsx` renders `<main id="main" className="flex-1 pt-20">` with **no width constraint and no horizontal padding**. That is deliberate and it inverts the usual "shell owns the width" convention. The `pt-20` clears the fixed header, which takes no layout space of its own (§9.6); it is the shell paying that offset once, not width a section may lean on.

**Why:** the colour fields have to paint edge to edge. A `max-w-page` on `<main>` makes a full-bleed `field-brand` section structurally impossible. So the shell stays unconstrained and **every section applies the gutter and the max-width itself**.

**Every section, without exception:**

```tsx
<section className="gutter-x section-y">
  <div className="mx-auto max-w-page">
    …
  </div>
</section>
```

With a colour field, the field goes on the `<section>` so it bleeds, and the inner `div` still holds the content column:

```tsx
<section className="field-brand gutter-x section-y">
  <div className="mx-auto max-w-page">…</div>
</section>
```

**If one section skips the split, its width silently disagrees with every other section on the page.** There is no gate for this. It is the single most likely way Phases 2–4 drift apart, because each phase is built in its own worktree and no per-section reviewer sees the others.

An element that must bleed past the content column (constraint 1 — "images bleed past the viewport edge") escapes the inner `div`, it does not remove it. `bleed-x` is how it escapes — §4.3.

### 4.3 `bleed-x` — the sanctioned way out of the gutter

Constraint 1 requires images that bleed past the viewport edge, and §4.2 requires every section to own `gutter-x`. `bleed-x` is the one sanctioned exit: it cancels **exactly one `gutter-x`**, and it is defined against the **same custom property the gutter itself reads**:

```css
@theme {
  --gutter-x: clamp(1.25rem, 0.4643rem + 3.9286vw, 4rem);
}

@utility gutter-x {
  padding-inline: var(--gutter-x);
}

@utility bleed-x {
  margin-inline: calc(-1 * var(--gutter-x));
}
```

**The clamp is written once.** A hand-copied negative margin is the drift this project has already paid for twice: retune the gutter and the copy silently stops cancelling it, with every gate still green. The three declarations sit adjacent in `globals.css` so the coupling is visible as well as enforced. Do not restate the clamp at a call site, and do not give `bleed-x` a value of its own.

Tailwind prunes an unused `@theme` key, but it keeps any key an emitted rule references — so `--gutter-x` is present exactly when `gutter-x` or `bleed-x` is, and cannot dangle. That is a property of *being referenced*; a theme variable nothing references does get dropped, so do not carry this as a general licence.

#### Where you apply it decides whether it reaches the viewport edge

`bleed-x` cancels the gutter. It knows nothing about the `mx-auto max-w-page` column — and above `max-w-page` the column is no longer the widest thing on the page, so the two placements stop agreeing. Measured on the compiled stylesheet at a 1920px viewport (gutter capped at 64px, column 1440px centred at 240 → 1680):

| `bleed-x` applied to | Spans at 1920px | Reaches the viewport edge? |
|:--|:--|:--|
| a direct child of the `<section>` | 0 → 1920 | **yes — at every width** |
| a child of the inner `mx-auto max-w-page` div | 176 → 1744 (1568 wide) | **no — stops 176px short on each side** |

Below the crossover the two are identical, because the column has not yet hit its 1440px cap: measured at 1568px both span 0 → 1568, and at 1042px both span 0 → 1042. The crossover is `max-w-page + 2 × gutter-x` = 1440 + 128 = **1568px**.

So:

- **To bleed to the viewport edge at any width, the element is a child of the `<section>`, not of the content column.** This is §4.2's escape rule, and `bleed-x` is what makes it land exactly on the edge instead of on a typed-in negative margin.
- **Inside the content column, `bleed-x` means "overhang the column by one gutter"** — which happens to be a full-bleed up to 1568px and is a fixed 64px overhang beyond it. That is a legitimate editorial effect. It is not a viewport bleed on a large desktop, and describing it as one is how a section ships looking correct on the laptop it was built on and wrong on the monitor it is reviewed on.

`bleed-x` is horizontal only. There is no `bleed-y`: `section-y` is rhythm between sections, and cancelling it is a request to change the rhythm, not to bleed.

#### The worked example — the programme marquee bands

`ProgrammeMarquee` is the live consumer of row 1 of that table, and the shape is worth copying verbatim:

```tsx
<section className="gutter-x section-y" id="programmes">
  <Reveal className="bleed-x" stagger={0.12}>   {/* direct child of <section> */}
    <RevealItem className="field-ink py-4">…</RevealItem>
    <RevealItem className="field-brand py-5">…</RevealItem>
  </Reveal>
</section>
```

The bands escape the content column entirely; a section that also carries a heading keeps that heading in its own `mx-auto max-w-page` div beside them. **The `Reveal` is what carries `bleed-x`, because `Reveal` renders a plain `div` and that div is the section's direct child** — wrapping the bands in one more div "for tidiness" would put `bleed-x` a level too deep and silently reintroduce the 176px-short defect above 1568px.

Measured on this build: bands span `0 → 1425` at a 1440 viewport and `0 → 1905` at 1920, in both cases exactly `documentElement.clientWidth`, with `scrollWidth - clientWidth === 0`. The content column in the same section measures `64 → 1361` and `232 → 1672` respectively — so that one measurement distinguishes a real bleed from a column-relative overhang, and is the check to run when a band "looks" full width.

### 4.4 Responsive

Mobile-first. Base classes are the small screen; step up with `sm:` / `md:` / `lg:` / `xl:`.

Type and section rhythm **do not need breakpoints** — the `clamp()`s already cover 320 → 1440 (§3.1). Breakpoints are for **layout**: grid template changes, column reordering, what collapses into a drawer. If you find yourself writing `md:text-3xl`, the scale step is wrong, not the breakpoint.

---

## 5. Radius — `rounded-xl` is the site default

**Rounding is sanctioned here, and `rounded-xl` (12px) is what you reach for by default.** Operator directive: *"make the hero section image rounded, like add rounded-xl as default rounded for this website in design system."* Nothing in this section is capped any more, and the ramp is now **exactly stock Tailwind v4** — no shifted scale to memorise, and a pasted shadcn component lands on the corner its author intended.

| Class | Value | Reach for it when |
|:--|--:|:--|
| `rounded-xs` | 2px | a hairline softening — a tag, a swatch |
| `rounded-sm` | 4px | small chrome: buttons, inputs, badges |
| `rounded-md` | 6px | small chrome that wants a touch more |
| `rounded-lg` | 8px | a compact tile |
| `rounded-xl` | **12px — the default** | **imagery, cards, tiles, anything without a stronger reason** |
| `rounded-2xl` | 16px | a card sitting inside a filled panel |
| `rounded-3xl` | 24px | the filled panel that contains those cards |
| `rounded-4xl` | 32px | a full-bleed band or a hero-scale panel |
| `rounded-media` | **alias of `rounded-xl`** | legacy — write `rounded-xl` in new code (§5.1) |
| `rounded-full` | — | a circle or capsule by nature (avatar, pill) |

**Why 12px and not 6px, 10px or 16px.** 6px was the old `xl` and reads as *almost square* — a large image at 6px looks like a rendering accident, not a decision, which is the opposite of the directive. The reference (`unipix`) uses **10px** as its workhorse — 60 of its 200-odd `border-radius` declarations, every content image among them — with **4px** for small chrome and a **20–30px** band on its large panels. 12px sits one notch above the reference's workhorse: unmistakably rounded at hero scale, still restrained on a 200px tile, and it is the stock Tailwind `xl` so it needs no translation. 16px was rejected as the *default* because it is the card value in the operator's reference image — making it the default would leave nothing for the panel to be rounder *than*, and the reference image's whole structure is a rounder panel containing less-round cards. That structure is now expressible: **cards `rounded-2xl` (16px) inside a panel `rounded-3xl` (24px)**, which is what the reference image shows and what the stats section should use.

**The steps above and below all moved, and the ramp still ramps.** `xs`→`4xl` is monotonic 2·4·6·8·12·16·24·32. `3xl` and `4xl` are **revived**, not merely unblocked — with rounding sanctioned there is a real job for a panel radius and a band radius, and leaving them `initial` would have forced arbitrary `rounded-[24px]` at exactly the moment the design started needing them.

**The old cap is gone, and it should not be reinstated by habit.** Radii used to stop at 8px with `3xl`/`4xl` set to `initial`. That was mechanical enforcement of constraint 1 — "this must not look like a rounded-card site" — and it worked: a cold review found zero `rounded-*` on the entire page. It is **superseded by the operator's own instruction** (see §1, constraint 1). Constraint 1 still governs *layout* — unequal columns, bleeding imagery, separation by whitespace and colour-field change rather than by boxing every item. It no longer governs *corners*. Do not re-cap the scale to "protect" it.

### 5.1 `rounded-media` — now an alias, kept alive on purpose

`rounded-media` was a separate 10px token for imagery only, carved out while the 8px component cap was in force. With `rounded-xl` at 12px that carve-out has no job left: **two tokens 2px apart in one namespace is drift, not nuance** — indistinguishable in place, and a guaranteed source of two subtly different image radii once one engineer reaches for `rounded-media` and another for `rounded-xl` on the same page.

It is now declared in `@theme inline` as `--radius-media: var(--radius-xl)`, so `rounded-media` compiles to `border-radius: var(--radius-xl)` — **the same variable**, not a copy of its value. There is one source of truth and the two can never drift apart.

**It is kept compiling rather than deleted** because call sites already carry it. A deleted key would make `rounded-media` emit *nothing* — a square corner with no error from `tsc`, lint, or the build, which is the exact failure class §13 names. **Write `rounded-xl` in new code**; leave existing `rounded-media` alone until someone is editing that line anyway.

**Either class clips only if something clips.** On a bare `<Image>` the radius applies to the element itself. On a wrapper it needs `overflow-hidden`, and on a wrapper that is also a ScrollSmoother parallax layer, `overflow-hidden` creates a containing block — check the layer still moves.

---

## 6. Primitives — `src/components/ui/`

`src/components/ui/` holds `Button`, `Icon`, `Accordion`, `Tabs`, `Avatar`, `Calendar`, `Carousel`, `Checkbox`, `Input`, `Label`, `Pagination`, `Popover`, `Select`, `Sheet`, `Textarea`, the typography roles (§3.2) and the `form/` field kit. **The four with a contract written below — `Button`, `Icon`, `Accordion`, `Tabs` — are the only ones this document covers; a primitive with no section here is undocumented, not sanctioned**, and landing one means landing its section in the same change (§14). Most are built on **Base UI** (`@base-ui/react`), not Radix — the exceptions are `Carousel` (Embla) and `Calendar` (react-day-picker) — and every element carries a `data-slot`.

Base UI note: `data-*` state attributes are **presence-only** (`data-disabled=""`). A `[data-disabled="true"]` selector matches nothing — use the `data-disabled:` / `data-active:` / `data-panel-open:` variants as the existing components do.

### 6.1 `Button`

**Variants**

| `variant` | Look |
|:--|:--|
| `default` *(default)* | `bg-primary text-primary-foreground`, `hover:bg-primary/80` — the brand red fill, reached through the shadcn alias layer (§2.3) rather than `bg-accent` |
| `outline` | `border-border` hairline on `bg-transparent` with `shadow-xs`; `hover:bg-muted hover:text-foreground`, and the same pair again on `aria-expanded` |
| `ghost` | no border, no fill; `hover:bg-muted hover:text-foreground`, same on `aria-expanded` |

**Sizes**

Ten rungs — five with a label, five icon-only. Anything the rung does not state comes from the `cva` base string, which is where `text-sm`, `rounded-md` and `[&_svg]:size-4` are declared once for all ten.

| `size` | Height | Padding | Label | Glyph |
|:--|--:|:--|:--|:--|
| `default` *(default)* | `h-10` (40px) | `px-3` → `md:px-4` | `text-sm` | `size-4` (16px) |
| `xs` | `h-7` (28px) | `px-2` | `text-xs` | `size-3` (12px) |
| `sm` | `h-9` (36px) | `px-2.5` | `text-sm` | `size-4` (16px) |
| `md` | `h-9` (36px) | `px-4 py-2` | `text-sm` | `size-4` (16px) |
| `lg` | `h-11` (44px) | `px-4` → `md:px-6` | `text-sm` | `size-4` (16px) |
| `icon` | `size-9` (36px) | — | — | `size-4` (16px) |
| `icon-xs` | `size-6` (24px) | — | — | `size-3` (12px) |
| `icon-sm` | `size-8` (32px) | — | — | `size-4` (16px) |
| `icon-lg` | `size-10` (40px) | — | — | `size-4` (16px) |
| `icon-xl` | `size-12` (48px) | — | — | `size-6` (24px) |

**`lg` (44px) is the rung to reach for on anything a phone taps** — it is the only labelled rung at the comfortable touch target, on a marketing site whose conversions are phone taps, and it is what nearly every call site already passes. `default` (40px) is what you get by writing nothing.

**The glyph size lives in the base class, not on the rungs — so it does not scale with the button.** `[&_svg]:size-4` is declared once in the base string and only three rungs move it: `xs` and `icon-xs` down to `size-3`, `icon-xl` up to `size-6`. A 16px glyph therefore sits inside seven of the ten rungs, a 32px `icon-sm` and a 44px `lg` carrying the same mark. The selector is `[&_svg]`, not `[&_[data-slot=icon]]`, so it matches *any* descendant `svg` and the button owns its glyph whether or not it came through `Icon` (§6.2) — which is what stops a bare inline `<svg>` rendering at its intrinsic size.

**Radius is `rounded-md` (6px), also from the base class.** `xs`/`sm` and `icon-xs`/`icon-sm` restate it as `rounded-[min(var(--radius-md),8px)]` and `rounded-[min(var(--radius-md),10px)]`, which resolve to the same 6px against the ramp in §5; the `min()` only starts to bite if `--radius-md` is ever raised past 8px.

**There is no `link` variant and no compound variant.** An inline text link is not a button rung here.

**Rendering a link with button styling — use `buttonVariants`, never a nested `<Button asChild>` or a `<Link>` inside a `<Button>`:**

```tsx
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

<Link
  href="/admissions"
  className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
>
  Apply now
</Link>
```

`buttonVariants` is exported for exactly this. It gives an anchor the full variant/size matrix while keeping the element an `<a>` — correct semantics, correct keyboard behaviour, correct Next.js prefetching. **Every link is `next/link`**, including external, `mailto:` and `tel:` — `Link` forwards `target`, `rel`, `download` and `aria-*` straight to the underlying anchor, so there is no capability reason to drop to a raw `<a>`.

### 6.2 `Icon`

Wraps `HugeiconsIcon`. Defaults: `size-5 shrink-0`, `strokeWidth={1.5}`, `aria-hidden`, `focusable="false"`.

Icons are decorative by default — the wrapper hides them from the accessibility tree. **An icon carrying meaning on its own needs a visible or `sr-only` text label next to it**, not an `aria-label` on the icon.

Every glyph comes through **the one barrel, `@/lib/icons`**, which re-exports Hugeicons under house names (`ArrowLeftIcon`, `ArrowRightIcon`, `ArrowUpRightIcon`, `AsteriskIcon`, `CalendarIcon`, `CheckIcon`, `ChevronDownIcon`, `ChevronLeftIcon`, `ChevronRightIcon`, `ChevronUpIcon`, `CloseIcon`, `DownloadIcon`, `GlobeIcon`, `ImageIcon`, `LocationIcon`, `MailIcon`, `MenuIcon`, `MortarboardIcon`, `PhoneIcon`, `PlusIcon`, `QuoteIcon`, `TrashIcon`, `WhatsAppIcon`, and the five social marks `FacebookIcon`, `InstagramIcon`, `LinkedInIcon`, `TikTokIcon`, `YouTubeIcon`). Need a new glyph → add it to the barrel with a house name; do not import from `@hugeicons/core-free-icons` in a component.

The social marks are keyed to content, not chosen per call site: `SocialPlatform` (`facebook` | `instagram` | `linkedin` | `tiktok` | `youtube`) indexes a `Record<SocialPlatform, IconSvgElement>` map, so adding a platform to the content layer fails `tsc` until its glyph exists. Do not reach for a social glyph with a conditional.

**`Icon` is `aria-hidden` by default, which is what makes it the correct separator in a marquee.** The `*` between marquee items is an `AsteriskIcon`, not a text character — so it is decorative to assistive tech for free, and it cannot be read out as content between every programme name.

### 6.3 `Accordion`

`Accordion` / `AccordionItem` / `AccordionTrigger` / `AccordionPanel`. Hairline separation only — a top border on the root and a bottom border per item, no card, no radius (constraint 1).

The trigger is `text-xl`, hovers to `text-accent`, and rotates its chevron via `group-data-panel-open:rotate-180`. The panel animates `height` off Base UI's `--accordion-panel-height` with `data-starting-style` / `data-ending-style`. **It carries no `motion-reduce:` guard** — §9.2.

`AccordionPanel`'s `className` lands on the **inner content div**, not the animating panel. That is intentional — the panel's `overflow-hidden` and height transition must not be overridable from a call site.

### 6.4 `Tabs`

`Tabs` / `TabsList` / `TabsTab` / `TabsPanel`. A bottom hairline with a 2px accent indicator that slides via Base UI's `--active-tab-width` / `--active-tab-left`. **Like the accordion panel it carries no `motion-reduce:` guard** — §9.2. The list scrolls horizontally on narrow viewports (`overflow-x-auto`, `gap-6 sm:gap-10`) rather than wrapping.

---

## 7. Fonts

**Two faces**, both `next/font/google`, both wired as CSS variables on `<html>` — matching the reference, which also uses exactly two (§7.2).

| Token | Face | Used by |
|:--|:--|:--|
| `--font-display` | **Spectral**, weights 400 / 500 / 600 / 700 | `h1`–`h6` (base rule), every `font-display` role, the hero headline, the marquee bands |
| `--font-body` | **Inter**, weights 400 / 500 / 600 / 700 | everything else; `--font-sans` resolves to the same stack |

**`--font-display` is the single swap point.** The face is named in exactly two places — this token, and the `next/font` call in `layout.tsx` that defines the variable it reads. **No component names a font.** If the Canela licence is ever bought (§7.2), it drops in by changing those two lines and nothing else.

**`--font-editorial` was retired with the swap** (`fa9422e`, 2026-08-06). It had been an alias of `--font-display`, kept alive only while `font-editorial` call sites still existed; there are now zero, so the key went with them. Deleting a theme key makes its class compile to *nothing* — the silent dead-class failure of §13 — so grep for call sites before removing another one. New code writes `font-display`.

**Bricolage Grotesque and Instrument Serif were both retired.** Bricolage was the display face until the reference's own two-face structure was measured. Instrument Serif replaced it and held the role for one week, until `fa9422e` swapped in Spectral; the section below is what changed with it.

### 7.1 The display face is a four-weight text serif — three consequences

Spectral ships a full weight range and the build loads **400 / 500 / 600 / 700** — the same four as Inter. It is a *text* serif (designed by Production Type for reading on screen), not a high-contrast display serif, and that pair of facts drives everything below.

**1 — weight on a heading is real, and it is still not the default.** `font-medium` and `font-semibold` on a `font-display` element reach an actual loaded weight rather than a synthesized smear, so they are usable. But `globals.css` keeps `font-synthesis-weight: none` on `html`, which means anything *outside* 400–700 (a stray `font-black`) snaps to the nearest loaded weight instead of being faked. Every typography role in §3.2 still sets `font-normal`: 400 is the house display weight, and a heavier heading is a deliberate call-site choice, not something to sprinkle.

**2 — the scale carries no `letter-spacing`, and `tracking-normal` is a no-op.** The old scale ran negative tracking down to `-0.045em`, tuned for a wide grotesque. Neither serif that followed it wanted that, so the `--text-*--letter-spacing` keys were removed outright — the fix belongs in the scale, not in a ritual repeated at every call site. The reference sets `letter-spacing: normal` everywhere too. Existing `tracking-normal` classes are harmless; new code omits them.

**3 — the legibility floor is open, and that is the one thing this swap left unresolved.** Under Instrument Serif the rule was "below `text-xl` (20px), use the body face", because that is where a high-contrast serif's thin strokes close up. Spectral is built for small sizes and does not carry that constraint, so the floor no longer follows from the face. The code has already moved: `font-display` appears at `text-lg` and `text-base` at a handful of call sites, while the typography roles below `H6` (`Standfirst`, `P`, `Eyebrow`) all stay `font-body`. **Nobody has ruled on where the line now sits** — treat the roles as the contract and raise a small-size `font-display` as a question rather than copying it.

Line-heights above `text-6xl` were loosened when the grotesque left (§3.1): the old sub-1 leadings assumed its short descenders, and a serif's collide.

### 7.2 The hero and the marquee follow the unipix reference; the rest of the page does not

`DEC-005` holds that the reference supplies the section spine only. **Asmit narrowed it for these two sections only** (2026-08-06) — the hero and the programme marquee follow the reference's *composition*. Everything else on the page keeps the house language.

What that buys, and its boundary: the reference's headline face is **Canela, a commercial trial licence the template is using unlicensed**. It is not shippable and was not copied. Spectral is the free stand-in carrying that role. **Composition came from the reference; the colour tokens, spacing utilities and primitives stayed the house's.**

**The type scale itself is now measured from the reference (§3.1), and so are the faces (§7).** Asmit's directive (2026-08-06) was *"use same font as used in reference website... typography also stays same"*, after *"everything feels too big"*. Every size, line-height and weight that is ours to control was matched at 1440. **One thing was not: Canela.** The template runs it on a **trial** licence — i.e. in violation — and shipping it on a real college's production domain would put an unlicensed commercial face on a client's live site. Spectral carries the substitution, isolated behind `--font-display` so licensing Canela later is a two-line change touching no component (§7). The substitute itself was re-picked once inside that isolation — Instrument Serif first, then Spectral on the same day the type scale was retuned (`fa9422e`) — which is the swap point doing its job: two lines, no component touched.

**`Standfirst` keeps the body face, and the reference is genuinely ambiguous here.** Its two lead paragraphs disagree: `.about p` is Canela 20/30, `.banner p` (the hero) is Inter 16/26 — one role, two treatments. `Standfirst` matches the *size* (20 / 30 / 400) and stays on the body face, because it is the lead-copy role and a serif lead is a display choice a section can opt into with `<Standfirst className="font-display">`. Picking one silently would have made the hero's lead a serif on the strength of a spec that does not say so.

The hero maps every reference element onto real content — there is no invented copy:

| Reference element | NAMI source |
|:--|:--|
| eyebrow (icon + brand-colour line) | `MortarboardIcon` + `homeCopy.hero.eyebrow` |
| serif headline | `homeCopy.hero.headline` (the motto), split at the comma into two lines |
| right column body + CTA | `hero.standfirst`, `hero.primaryCta` (`variant="default"`) + `hero.secondaryCta` (`variant="outline"`, ↗) |
| circular badge text | `institution.entities.institute` — `shortName` **and** `establishedYear` off the **same** entity (§0.7), plus the lead clause of `institution.motto`; the `aria-label` uses the full `name` |
| badge centre | the NAMI mark (`/logo/nami-color.svg`) linking to `contact.socialProfiles` → `platform: "youtube"`, the real channel |
| landscape image | `hero.images` — a `Carousel` of slides, each inside a `Parallax` layer |

The reference's social stack and its far-left vertical rail are **not** built. The rail would have been `institution.campuses`; the reference's opening hours do not exist for NAMI and were never invented.

**The badge ring rotates, on a bare CSS `animate-[spin_20s_linear_infinite]`** — no GSAP, and no reduced-motion path of any kind. It is an at-fold loop in the LCP section that keeps turning for a user who asked for less, which makes it the most visible instance of the gap in §9.2. The ring itself is `role="img"` + `aria-label` carrying the plain string, so the `*` separators are never announced (§9.7's reasoning, applied to `<textPath>`).

**The badge centre is the NAMI mark, and it links to the real YouTube channel.** There is no NAMI video asset and no play glyph in the barrel (§6.2); the image is `alt=""` and an `sr-only` string carries the destination. An affordance that opens the actual channel is honest; a dead player is not.

---

## 8. `cn()` is configured, not stock — `src/lib/utils.ts`

`cn()` is `clsx` + an **`extendTailwindMerge`** instance. Three things stock `tailwind-merge` gets wrong in this project:

1. **`max-w-page`** — `container: ["page"]` registers our custom container key, so `max-w-page` participates in the `max-w-*` merge group instead of surviving alongside a conflicting width.
2. **`rounded-media`** — `theme.radius` is **extended** with `["media"]`. Stock `tailwind-merge` matches the radius group with a t-shirt-size test, so every step in §5 is already handled; `media` is a custom key it has never heard of, and without registering it `cn("rounded-media", "rounded-none")` would leave **both** alive and let stylesheet order decide. This is `extend`, not `override`: the group used to be overridden with an explicit list that *dropped* `3xl`/`4xl` while those were dead classes, and reviving them (§5) made that list wrong — `cn("rounded-xl", "rounded-3xl")` returned **both**. Extending inherits the stock test, so a future step cannot fall out of the group again.
3. **The custom utilities** — `gutter-x`, `bleed-x`, `text-outline` and the `field-*` group each get a class group, and one `section-y` group holds all four rungs (`section-y`, `section-y-hero`, `section-y-masthead`, `section-y-compact`) so they replace one another rather than stacking. `gutter-x` is declared to conflict with `p`/`px` (both directions), `section-y` with `p`/`py`, `bleed-x` with `m`/`mx`. So `cn("gutter-x", "px-8")` resolves to `px-8` and `cn("px-8", "gutter-x")` resolves to `gutter-x`, instead of both surviving and the winner being decided by Tailwind's emission order.

The `field-*` classes form their own merge group, so passing `field-teal` over a `field-ink` base replaces it rather than stacking two colour fields on one element.

**`gutter-x`, `section-y` and `bleed-x` are shorthands, and they are registered the way stock `tailwind-merge` registers `px` and `py` — asymmetrically, on purpose.** A later shorthand replaces the longhands beneath it (`cn("pl-8", "gutter-x")` → `gutter-x`, `cn("ml-8", "bleed-x")` → `bleed-x`), but a later **longhand does not remove the shorthand**, because it only overrides one side (`cn("bleed-x", "ml-8")` → both survive). Registering that second direction as well would silently delete the end-side bleed that a call site writing `ml-8` never asked to lose.

**Consequence: add a custom `@utility` to `globals.css` → register it in `cn()` too.** An unregistered utility is invisible to the merger, and conflicts against it are resolved by stylesheet order, which is not something you control from a call site.

**And declare its group id as a type parameter, not only in the config object.** `extendTailwindMerge<"color-field" | "gutter-x" | "section-y" | "bleed-x" | "text-outline">` is what makes those ids assignable inside `classGroups` / `conflictingClassGroups`. Adding a utility to the config and forgetting the union runs perfectly at runtime and fails `tsc` — this house has shipped that exact runtime-green / `tsc`-red shape before.

Two more merge facts that bite and are invisible to `tsc` and lint:

- **A modifier makes its own group.** `text-sm` does not suppress `lg:text-base`; both survive.
- **Two arbitrary-variant classes merge only if the variant string matches character for character.** To override a class from a composed component, copy its selector exactly.

---

## 9. Motion — `src/components/motion/` + `src/lib/gsap.ts`

**GSAP is the only animation library.** No `motion`, no `lenis`, no CSS keyframe libraries. Since GSAP 3.13 the former Club plugins ship free, so ScrollTrigger, SplitText, ScrollSmoother, Observer and Flip cover everything in one dependency.

### 9.1 The single registration site

`src/lib/gsap.ts` is the **only** module that may import a GSAP plugin. It registers `useGSAP`, `ScrollTrigger`, `SplitText`, `ScrollSmoother`, `Observer` and `Flip`, then re-exports them alongside `gsap` itself and the `FULL_MOTION_QUERY` constant (§9.2). `Flip` has one consumer, the gallery archive's filter transition.

This is enforced by a `biome` `noRestrictedImports` rule banning `gsap/*` and `gsap/**` everywhere else — including `gsap/all` and `gsap/dist/*`, so the one site cannot be reached around. A bare `import { gsap } from "gsap"` is still allowed. A plugin registered from two sites is a plugin **unregistered on some route**, and that failure is silent.

Import everything from `@/lib/gsap`.

### 9.2 The reduced-motion contract — stated, not yet implemented

**Read this section before you trust rule §0.3 to be enforced by anything. It is not.**

`lib/gsap.ts` exports one motion constant, and it is not a media query:

```ts
export const FULL_MOTION_QUERY = "all";
```

Eleven expressions across ten modules compose it into a `gsap.matchMedia()` key — `` `${FULL_MOTION_QUERY} and (pointer: fine)` `` in `Tilt` and `SmoothScrollProvider`, `` `${FULL_MOTION_QUERY} and (min-width: 1024px)` `` in the pin components, bare in the gallery and notices archives. **`all` matches unconditionally**, so every one of those keys reduces to its pointer or width half and nothing more. The name says full-motion; the value gates nothing.

**So there is no reduced-motion gate anywhere in the motion layer.** There is no `matchMotion` helper — the branch-pair wrapper this section used to describe was never built. No component in `src/components/motion/` reads `prefers-reduced-motion`. `Reveal` (a `fromTo`), `SplitText`, `Counter`, `Marquee` and every pinned track run their full animation for a user who has asked for less; `Marquee` is a `gsap.to({ repeat: -1 })` over duplicated copies with no branch at all, and the hero badge spins on a bare CSS `animate-[spin_20s_linear_infinite]` (§7.2). Two motion hooks (`use-admissions-parallax`, `use-pinned-cards`) gate on width alone and do not touch the constant.

Two places genuinely check the query, and both are recent: `updates-carousel.tsx` and `hooks/motion/use-carousel-autoplay.ts`, each declaring its own `REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)"` against `window.matchMedia`. Seven call sites carry `motion-reduce:transition-none` on a CSS transition — none of them a `ui/` primitive; the `Accordion` panel and the `Tabs` indicator both animate unguarded (§6.3, §6.4).

**Rule §0.3 and constraint 5 still stand; the mechanism to satisfy them is missing. Closing that is CARD-402.** Until it lands, an animation you add today has no reduced path unless you write one by hand, and no gate in §13 will tell you it is absent. The shape the rule wants, and what the helper has to make cheap, is unchanged:

> **A `reduced` branch may be omitted only when the animation is a `gsap.from()`/`fromTo()` whose from-state is applied client-side.**
> Its *natural* DOM state is already the final state, so registering nothing under reduced motion leaves the element visible and correctly positioned — which is what rule §0.3 actually requires.
> **The moment an animation is a `gsap.to()`, a `set()`, a loop, or duplicates DOM, a `reduced` branch is mandatory** — otherwise the reduced-motion user gets the *initial* state permanently, or the loop for ever.

### 9.3 The vocabulary

| Primitive | Shape | Notes |
|:--|:--|:--|
| `Reveal` / `RevealItem` | enter on scroll: `gsap.fromTo` on `y` (40) and opacity | props are `y` and `stagger` only — there is no `x` and no fade switch; `stagger > 0` animates `[data-reveal-item]` children, falling back to direct children |
| `SplitText` | masked line / word / char entrance on a single string | accessible name is GSAP's (`aria: "auto"`); the a11y attributes exist only while the split does — §9.7 |
| `Marquee` | infinite horizontal loop, scroll-velocity linked via `Observer` | `label` is **required** (it names the `role="group"` region); `copies` (2), `speed` (80), `reverse`, `velocity` (true), `maxBoost` (3), `trackClassName` |
| `Parallax` | depth layer | **markup only** — see below |
| `Counter` | count-up on scroll: `value` + optional `suffix` | a `gsap.to()` on a plain object writing `textContent`; skips entirely when the element already sits within the first 90% of the viewport at mount, so the server-rendered final number stands |
| `Tilt` | 3D pointer tilt, `max` 8° | `(pointer: fine)` only — `FULL_MOTION_QUERY` is `"all"` (§9.2); no-ops on touch |
| `SmoothScrollProvider` | wraps the app in ScrollSmoother, `smooth: 1.8` | `(pointer: fine)` only (§9.2); required `chrome` slot renders outside the smoothed content (§9.6); re-scans parallax effects on route change (§9.5) |

**`smooth: 1.8` is seconds-to-catch-up, so bigger is slower.** It reads like a speed and is the opposite: it is how long the content takes to settle onto the real scroll position. It was raised from `1.2` on Asmit's *"slow down lenis, it is too fast"* (there is no Lenis — DEC-001 replaced it with ScrollSmoother; he was describing this value). Above roughly `2` the page starts to feel detached from the wheel rather than weighted, which is why this stopped at 1.8.

**It is also the parallax dial.** The `data-speed` layers (§9.5) ride this same smoother, so raising it deepens their separation as a side effect. Retune it and the depth of every parallax layer on the site changes with it — check a parallax section, not just a plain one.

### 9.4 At-fold content needs no special prop — and there is no prop to reach for

`Reveal` and `SplitText` are safe above the fold as they stand. **There is no `atFold` prop, and there should not be one.** This section exists because the shape of the hazard is real in other stacks, and an engineer who has met it there will come looking for the escape hatch.

The hazard: an entrance animation whose start state is hidden, wrapped around content that is already on screen at scroll 0, and whose trigger can therefore never fire. The hero paints from-state and stays there. Nothing catches it — `tsc`, `biome` and `next build` are all green on content that renders and stays invisible.

**It does not happen here, for two independent reasons.**

**1 — a ScrollTrigger start that is already behind the scroll position fires on creation.** It is a scroll *position*, not an IntersectionObserver threshold. Both primitives use `start: "top 85%"`; for anything in the first viewport that resolves to a negative scroll offset, so the trigger is already past its start the moment it is built. `ScrollTrigger.refresh()` calls `self.update()` on its first pass (`ScrollTrigger.js:1606`), progress computes greater than zero, `toggleState` is `0` (enter), and the default `toggleActions: "play"` (`:300`) runs `animation.play()` (`:1690`–`:1760`). **The entrance plays on mount** — exactly the behaviour an `atFold` prop would have had to add by hand.

This is where the instinct comes from and why it does not transfer: Motion's `whileInView` with a numeric `amount` *is* an IntersectionObserver threshold, and an element already fully visible at scroll 0 never crosses it, so it stays hidden until the user scrolls. That library is not in this build (§9), and GSAP does not share the bug.

**2 — the from-state is never in the server HTML.** Both primitives apply it client-side inside `useGSAP`. The server sends live text at full opacity, so the LCP element paints before hydration, the no-JS case reads correctly, and there is no opacity gate on first paint to be a Core Web Vitals defect in the first place. §9.7 relies on the same property for `SplitText`'s accessible name.

**What still applies at the fold** is rule §0.3 and §9.2: an animation whose natural DOM state is *not* the final state — a `to()`, a `set()`, a loop — must ship a `reduced` branch, at the fold or anywhere else. The hero badge is the worked example (§7.2), and right now it is the counter-example: an at-fold CSS spin loop with no reduced path at all.

*(Historical note: this section previously mandated an `atFold` prop on both primitives. The prop was never built. The rule it sat under was removed from §0 with it.)*

### 9.5 `Parallax` is markup, not motion

`Parallax` renders a plain `div` with `data-speed` and `data-lag`. It contains no GSAP at all. Those attributes are read by **ScrollSmoother's `effects: true`**, which only runs when `SmoothScrollProvider` is active.

**So parallax silently does nothing on touch devices or on coarse pointers.** It *does* still run under reduced motion, because the smoother is gated on `(pointer: fine)` alone (§9.2). That is the correct behaviour for the pointer half — but it means a section whose *meaning* depends on parallax (overlapping layers that only separate when they move) is broken for a large share of visitors. Design the static composition first; parallax is the enhancement.

**The effect list is built by DOM query, not by React.** `ScrollSmoother.create({ effects: true })` resolves `[data-speed], [data-lag]` **once, at create time**. The smoother is created on mount and outlives every client-side navigation — so a `<Parallax>` on a soft-navigated route would get no effect at all, silently, on desktop only.

The provider closes this by re-scanning `#smooth-content` on every `usePathname()` change: it kills the effects registered for the previous route and re-registers what is now in the DOM. It does **not** re-create the smoother — that would discard scroll state and force a full ScrollTrigger rebuild for no gain.

The scan runs once per route commit. **A `[data-speed]` element that appears after that commit is not covered** — imperative DOM insertion, or a Suspense boundary that resolves later. Render parallax layers in the route's own tree.

### 9.6 Fixed and sticky do not work inside the smooth content — the `chrome` slot

`SmoothScrollProvider` wraps everything in `#smooth-wrapper` > `#smooth-content`. ScrollSmoother sets the wrapper to `position: fixed; overflow: hidden; height: 100%` and **transforms** the content element. **A `fixed` or `sticky` descendant is positioned against a transformed ancestor, so it scrolls with the content.** Nothing warns you; it simply behaves as `absolute`. The failure is **desktop-only** — the smoother is gated on `(pointer: fine)` (§9.2) — so it does not reproduce on the phone you test on.

The provider therefore has two slots, and `chrome` is a **required** prop:

```tsx
<SmoothScrollProvider chrome={<><SiteHeader /><FloatingSocials /></>}>
  <div className="flex min-h-svh flex-col">
    <main id="main" className="flex-1 pt-20">{children}</main>
    <SiteFooter />
  </div>
</SmoothScrollProvider>
```

- **`chrome`** renders *outside* `#smooth-wrapper`, as a direct child of `<body>`. Everything `fixed` or `sticky` goes here: the sticky header, a scroll-progress bar, a floating CTA, a skip link, a modal/portal root.
- **`children`** is the scrolled document. The flex column and `<main>` stay here — and so does the footer; a footer is not fixed chrome.

The prop is **required, not optional**, and a layout with no chrome yet writes `chrome={null}`. An optional prop would be invisible in `layout.tsx`, and invisible is exactly how a header ends up next to `<main>`.

Three things to know before you fill the slot:

- **Chrome needs its own `z-index`.** `#smooth-wrapper` is a positioned element at `z-index: auto`. Chrome renders *before* it in the DOM — correct for tab order — so it paints underneath unless it carries a positive `z-index` (`z-50`).
- **Chrome takes no layout space.** A `fixed` header does not push `<main>` down. Offset the content yourself; do not reach back into the shell.
- **ScrollSmoother listens for `focusin` on the window** and scrolls any focused element not already in the viewport into view. A chrome element that is off-canvas while still focusable — an open-on-focus skip link, a closed drawer whose links stay tabbable — can trigger a scroll jump. Keep focusable chrome on-screen, or make it non-focusable while hidden.

The provider is a Client Component; `chrome` and `children` are both passed as props from the Server root layout, so pages and sections below stay Server Components. Keep it that way — push `"use client"` to the leaf that needs it.

### 9.7 `SplitText` and the accessibility tree

Splitting a string into per-line/word/char elements destroys it for a screen reader — it becomes a pile of unrelated fragments. The accessible name has to be reconstructed, and **the reconstruction must exist exactly when the split does, not always.**

`SplitText` renders plain markup — `<h2 class="…">the string</h2>`, no ARIA. Server HTML, reduced-motion users and the no-JS case all get live text, which needs nothing. The a11y attributes are then applied **imperatively inside the motion branch**, next to the split that makes them necessary, and removed in the same cleanup that reverts it:

- **`aria: "auto"`** in the split config — GSAP writes `aria-label` from the element's text on split and restores the original on revert, so the label cannot drift from the string.
- **`role="img"` on non-heading tags only**, set by the component. `aria-label` on a bare `<p>` / `<span>` / `<div>` is `aria-prohibited-attr`: those tags carry no implicit role, so assistive tech **drops the label entirely** and axe flags it. `role="img"` gives it somewhere to land. `h1`–`h6` already permit `aria-label`, and wrapping a heading in `role="img"` would destroy the heading semantics — so headings get the label and no role.

**Do not set `aria: "hidden"` here.** It reads like "hide the split fragments", and it does do that — but it *also* puts `aria-hidden="true"` on the **root element** (`SplitText.js`, `split()`: `aria === "hidden" && element.setAttribute("aria-hidden", "true")`). `aria-hidden` on the root removes the whole subtree from the accessibility tree, so the `aria-label` next to it is never announced and a heading disappears from the outline. The split fragments are hidden under `auto` and `hidden` alike — `auto` is the only value that hides the fragments *and* keeps the name.

This is invisible to `tsc`, to lint, and to reading the JSX: the attribute is written by the library at runtime, on an element whose markup says nothing about it.

---

## 10. Content — `src/lib/content/`

**Sections consume the content contract. Sections never hardcode copy.**

The backend will be headless WordPress. `src/lib/content/` is a **source-agnostic typed contract** built now so that WP later becomes an adapter swap rather than a rewrite of every section component.

```ts
import { content } from "@/lib/content";

const [copy, levels] = await Promise.all([
  content.getHomeCopy(),
  content.getAcademicLevels(),
]);
```

- `content` is a `ContentProvider` — fifteen async getters (`getInstitution`, `getStats`, `getAcademicLevels`, `getProgrammes`, `getVocationalApproval`, `getAffiliations`, `getPartners`, `getCampusLife`, `getAdmissionCalls`, `getUpdates`, `getTestimonials`, `getLeadership`, `getGallery`, `getHomeCopy`, `getAboutCopy`) plus a `source` string. Every getter returns a Promise, so the WP swap changes no call site.
- Types live in `content/types.ts`. Ids, slugs and dates are **branded** (`ContentId`, `Slug`, `IsoDate`) and validated at construction — a malformed slug or a 31 February throws at module load, not in production.
- **`InstitutionProfile` carries no bare name and no bare year.** Both live only inside `entities: Record<EntityRole, NamedEntity>` — `institute` (Naaya Aayam Multi-Disciplinary Institute, 2012), `college` (NAMI College, 2013), `school` (NAMI International School, no founding year in the brand book — its 2019 and 2024 dates are *affiliations* and live on `affiliations.sinceYear`). Read `name` and `establishedYear` from the **same** entity object. There is no `displayName`, `legalName`, `shortName` or `establishedYear` on the profile, and that is the point: they existed only so a template literal could pair the College's name with the Institute's year.
- **`ContentLink.destination` is `"internal" | "external" | "legacy"` — there is no `external` boolean.** `internal` renders a plain `<Link href>`; `external` adds `target="_blank" rel="noopener noreferrer"`; **`legacy` points at `college.nami.edu.np`, the site this build replaces — render the surrounding content with the CTA suppressed, never as a link.** On launch that host is us: a new tab to ourselves, at a route that will not exist. The URL is real and sourced, so it is not a registry placeholder — it is a migration TODO the type carries until someone re-points it.
- Body copy is `RichText`, a discriminated union of `{ kind: "blocks", paragraphs }` and `{ kind: "html", html }`. The `html` arm is the WP path and **will need sanitizing when it goes live**; nothing renders it yet.
- Section headings, eyebrows, standfirsts and CTAs live in `HomeCopy.sections[<id>]` as `SectionCopy` — including `emptyState`. Read them; do not type a heading into JSX.
- `ContentSourceUnavailableError` exists for the remote provider. The local provider cannot throw it.

### Placeholder content is registered, not improvised

NAMI has not supplied alumni testimonials, campus photography, or the real contact details. Those values are **registered** through `content/placeholder-registry.ts` (`placeholderText`, `placeholderData`, `placeholderImage`), which:

- rejects a value that does not *read* as a placeholder (must match `/placeholder/i`, `.example`, or `XX`)
- rejects a duplicate registration path
- makes `isPlaceholder(value)` answerable at runtime, so a section can style or suppress fake content

**`pnpm run placeholders`** compiles the content layer and prints every registered placeholder grouped by kind, plus the values that are **real and must be left alone**. It **fails** if a registered value has vanished from the content graph, or if a placeholder-shaped value appears in the content without being registered. Run it before shipping anything that touches content.

The placeholder testimonials are deliberately short / medium / very long, and the updates deliberately mix a dated event, an undated notice and a long news item — so a layout is judged against its worst case before real copy arrives. Do not "tidy" them to equal lengths.

---

## 11. Deliberately absent — do not "fix" these

A reader who does not know something was a decision will assume it was an oversight.

| Absent | Why |
|:--|:--|
| **Dark mode** | Light-only, by decision. `viewport.colorScheme` is `"light"`. "Dark" is a *design device* — the three colour fields — not a user theme. Never write a `dark:` variant. |
| **`Card` primitive** | Constraint 1. A `Card` component is how the rounded-card grid gets back in. Separate with whitespace, a hairline, or a colour-field change. **Sanctioned rounding (§5) does not license this** — the constraint was always about *boxing every item uniformly*, and a `Card` primitive is what makes that the path of least resistance. A rounded panel built for one section is a section, not a primitive. |
| **Shadow tokens** | Constraint 4 — depth comes from motion and overlap, not shadows on boxes. |
| **`--destructive` / `--warning` / `--success` aliases** | No prop without a consumer. This is a marketing site with no destructive actions and no form validation yet. Add them **with** the feature that needs them. |
| **`--color-secondary` / `--color-secondary-foreground` aliases** | Same reasoning as `--destructive`, one step further: where shadcn's meaning **collides** with our brand meaning, our brand meaning wins and the alias goes. The alias bought one thing — a pasted shadcn component compiling unmodified — and the CLI is banned here, so components are hand-adapted anyway. It cost a permanent trap (`bg-secondary` white vs `bg-secondary-700` teal) in the namespace a section builder reaches for most. Port to `bg-surface-raised` / `text-ink` (§2.3). |
| **A radius cap** | **There is no longer one.** `rounded-xl` (12px) is the site default and the ramp runs to 32px, `3xl`/`4xl` included (§5). This row exists so nobody reinstates the old 8px cap from memory: it was retired by operator directive, not by oversight. |
| **`letter-spacing` on any type step** | Removed with the display-face change (§7.1). The negative tracking existed to serve a wide grotesque that is no longer in the build; the reference sets `normal` throughout. Do not reintroduce a `--text-*--letter-spacing` key to "tighten" a heading — if a heading looks loose, the line-height or the step is wrong. `tracking-widest` on `Eyebrow` is a per-role choice for uppercase micro-copy and is not part of the scale. |
| **A `text-*` step between 48px and 76px** | The `text-5xl` → `text-6xl` gap is the reference's own `h2`/`h1` structure (§3.1), not an omission. |
| **A bold display weight** | The display face has one weight (§7.1). `font-semibold` on a heading is a no-op, not a defect to fix by loading a second weight. |
| **A viewport-edge bleed from *inside* the content column** (`margin-inline: calc(50% - 50vw)`) | The one case `bleed-x` does not cover (§4.3): an element that must stay a child of the content column — a grid cell keeping its place in the editorial grid — and still paint to the viewport edge above 1568px. The formula is correct and needs no coupling to `gutter-x` at all, but it costs three things `bleed-x` does not. **`50vw` includes the classic scrollbar**, so it overflows ~7–8px each side and raises a horizontal scrollbar everywhere ScrollSmoother is not already clipping — and the smoother is off on touch and on coarse pointers (§9.5). That makes an `overflow-x: clip` on the shell a *prerequisite*, not a tidy-up, and putting overflow on `html`/`body` is exactly what GSAP's own guidance warns against next to ScrollTrigger. It also silently requires a **horizontally centred** containing block, and the moment it is used in an asymmetric flex or grid cell it fails by *mispositioning* rather than by not working — the failure shape nothing in this stack catches. No section has asked for it; three asked for `bleed-x`. Add it **with** the section that needs it and **with** its clipping ancestor, verified together — not before. |
| **A default OG image** | `createMetadata` accepts an `image` and falls back to `twitter: { card: "summary" }` without one, and no route passes it. The vector logo has since landed (`public/logo/nami-{black,color,white}.svg`); a composed social card has not. |
| **A `Link`-flavoured `Button`** | `buttonVariants` (§6.1) is the bridge. A second component would duplicate the matrix. |
| **`prefers-color-scheme` block** | Removed from the scaffold rather than extended. |
| **Per-component focus rings** | The global `:focus-visible` outline (§2.2) already inverts per colour field. |
| **`primary-50` / `secondary-50`** | The brand ramps start at 100; only the neutrals need a 50 and a 950. |
| **`--color-secondary` / `--color-secondary-foreground`** | Removed. shadcn means "muted surface" by `secondary`; here `secondary-*` is the teal brand ramp, so `bg-secondary` (white) and `bg-secondary-700` (teal) sat one character apart and both compiled. Where shadcn's meaning collides with our brand meaning, brand wins and the alias goes — same call as `--destructive`. A pasted `bg-secondary` maps to `bg-surface-raised`, `text-secondary-foreground` to `text-ink`. Both now compile to nothing, which fails visibly rather than silently. |
| **`lastModified` in `sitemap.ts`** | `new Date()` stamped the build time on every URL, so every rebuild told crawlers the whole site had changed — the signal crawlers learn to discount, on a site whose stated purpose is search visibility. It also made the build non-deterministic. The field is optional in the sitemap protocol and absent is honest. Re-introduce it **per route**, from a real content date, when `src/lib/content/` carries one. |

---

## 12. The markdown-scan exclusion — do not tidy this away

`src/app/globals.css` line 3:

```css
@source not "../../**/*.md";
```

**This line is load-bearing for the file you are reading.**

Tailwind v4's automatic source detection scans every non-ignored file in the project for class names, **including markdown**. Without that exclusion, every class name mentioned in this document — `bg-neutral-50`, `dark:*`, `bg-secondary`, every "never write this" example — would be detected as used and **compiled into the production stylesheet**.

The path is relative to `globals.css`, so `../../**/*.md` is every markdown file from the repo root down. It is not a leftover, it is not scoped too broadly, and removing it makes this document actively harmful to the bundle.

Corollary: **you cannot verify a class compiles by writing it in a `.md` file.** Write it in a `.tsx`.

---

## 13. Gates

| Command | What it is |
|:--|:--|
| `pnpm exec tsc --noEmit` | types |
| `pnpm run lint` | `biome check` — lint + format + import order. Does **not** cover markdown. |
| `pnpm run placeholders` | content/placeholder-registry consistency (§10) |
| `pnpm run aliases` | shadcn alias parity between `:root` and the colour fields, plus field-token drift (§2.4) |
| `pnpm run format` | `biome format --write` |

`LayoutProps<"/">` and the other route types are **generated into `.next/`**, and `tsconfig.json` includes them. Deleting `.next` makes `pnpm exec tsc --noEmit` fail with `Cannot find name 'LayoutProps'` — a stale-artifact failure, not a type error. Mirror case: a dev server running when a route file is deleted leaves `.next/dev/types` pointing at the dead route, and `tsc` fails there too. Both clear with `pnpm run build`. **Build before `tsc` on a clean tree.**

Two failure classes none of these catch, both of which have shipped in this house before:

- **A dead Tailwind class.** A theme key set to `initial`, or a custom utility whose key was renamed, compiles to **nothing** — a square corner, an unpadded section — and `tsc`, lint and the build all stay green. `rounded-3xl` was dead here for exactly this reason until §5 revived it. When you add, rename or retire a theme key, **compile `globals.css` and assert the emitted rule**, with a class you know is undefined in the same run as a negative control, so you have proven the check can go red.
- **An off-system colour.** `text-gray-500` and `bg-slate-900` are valid Tailwind and wrong here. Only review catches them.

Comments in code: **default zero**, config files included. A short `WHY` comment (≤2 lines) is allowed where the code genuinely cannot show its own reason. A handful of sites qualify — the configured `cn()`, the single GSAP registration site, the two deliberately-empty content collections, and the School's null founding year — each guarding against a specific "fix" that would reintroduce a defect. Everything else belongs in this file. (This paragraph deliberately does not count them; an exact tally in prose drifts the moment one is added.)

---

## 14. How this document grows

It is a living document, extended at the end of every phase — not a Phase 0 artifact.

**Add to it when:**

- a new token, utility, primitive, variant or motion primitive lands → its row goes in the matching table **in the same change**
- a decision is made about what *not* to build → §11, with the reason
- a class of mistake happens twice → it becomes a rule in §0 with its consequence spelled out
- a rule turns out to be wrong → **change it here first**, then change the code, so the two never disagree

**Keep the register:** tables for matrices, real class names, real values, short sections, and a stated consequence rather than a bare instruction. A rule nobody can see the cost of is a rule people route around.

**Do not** let it become a changelog. Decisions with their alternatives live in the project's `DECISIONS.md`; this file records the *current* contract only. If a section here starts explaining what things used to be, delete the history.

Expected additions by phase:

| Phase | Likely new material |
|:--|:--|
| 1 — shell + hero | header / footer layout contract, the logo asset rules, the hero's display-type treatment |
| 2 — upper fold | the pinned horizontal-scroll pattern, marquee tuning in practice |
| 3 — mid fold | stat counters, the kinetic-type testimonial treatment, image bleed rules |
| 4 — lower fold | editorial list + hover-reveal imagery, big-type footer |
| 5 — polish | the reduced-motion audit result, LCP budget, the a11y checklist that actually got run |
