# NAMI College — Design System

The house contract for `src/app/globals.css`, `src/components/ui/`, `src/components/motion/` and `src/lib/`.

This file is the **reasoning**. The source carries almost no comments by deliberate policy, so the "why" for every token, primitive and motion rule lives here. A section built without reading it will compile, pass lint, pass `tsc`, and still be wrong.

Written for the engineer joining at Phase 3 who has to build a section without re-deriving Phase 0 from source.

Anything not listed here is not a decision — it is drift.

---

## 0. The rules that break a build

Eight things. Each one is cheap to follow and expensive to discover later.

| # | Rule | What goes wrong if you don't |
|:--|:--|:--|
| 1 | **`<main>` is full-bleed. Every SECTION owns `gutter-x` + an inner `mx-auto max-w-page`.** | Section widths drift page to page, and the full-bleed colour fields stop reaching the viewport edge. |
| 2 | **Use semantic tokens (`bg-surface`, `text-ink`), never raw ramp steps (`bg-neutral-50`).** | Your component stops inverting inside a dark colour field. It will look correct in isolation and broken in place. |
| 3 | **Nothing at the fold may end up parked invisible.** Use `atFold` on the reveal primitives. | LCP / CLS defect. A hero waiting on a scroll trigger that already fired never appears. |
| 4 | **Every motion has a reduced-motion path** — and "no animation" only counts if the element ends up **visible and correctly positioned**. | Reduced-motion users get a blank or displaced section. |
| 5 | **`position: fixed` and `position: sticky` do not work inside the smooth-scrolled content.** Fixed chrome goes in `SmoothScrollProvider`'s **`chrome` slot** (§9.6), never in `children`. | Your sticky header scrolls away, or jitters, and nothing in the console explains it — and only on desktop. |
| 6 | **No dark mode.** Light-only. No `dark:` variants, no `prefers-color-scheme`. "Dark" is a design device — the colour fields — not a user theme. | A `dark:` class is dead code that no gate catches. |
| 7 | **Near-zero comments in code.** Reasoning goes here, not in the source. | The QA gate rejects the file. |
| 8 | **Never pair a NAME with a YEAR across two entities.** `institution.entities.college` is 2013; `institution.entities.institute` is 2012. Read `name` and `establishedYear` from **one** `NamedEntity`. | A false founding claim about a real institution. This is a HIGH invariant, not a copy nit — and it already reached the tree once. |

---

## 1. The five standing design constraints

Source: `PLAN.md`, the design brief. Every section is judged against these **before** it is judged against anything technical below. A build can satisfy every rule in §0–§10 and still fail here.

1. **Editorial grid, not a card grid.** Units span unequal columns and start on unequal rows. Images bleed past the viewport edge; text overlaps imagery. Sections separate by whitespace, a hairline, or a colour-field change — **never by giving each item a border and a radius**.
2. **Type is the layout.** Oversized display type IS the structural element. Mixed size and weight inside a single heading. `clamp()`-fluid, `rem`-based, never per-breakpoint jumps.
3. **Asymmetry is deliberate, not random.** One dominant axis per section, broken once. If a section reads as balanced left/right halves, it is wrong.
4. **Depth without containers.** Parallax layers, scroll-scrubbed transforms, CSS 3D perspective on hover. Depth comes from motion and overlap, not from shadows on boxes.
5. **Motion carries the youth.** GSAP only. Every motion has a `prefers-reduced-motion` path, and **no at-fold content hides behind a scroll reveal**.

Constraint 1 is why there is no `Card` primitive (§9). Constraint 2 is why the type scale runs to `text-11xl` and only nine of its fifteen steps are claimed by a typography role. Constraint 4 is why there is no shadow token.

---

## 2. Colour

All colour lives in `src/app/globals.css`. Three ramps → nine semantic tokens → three colour fields.

### 2.1 The ramps — you almost never write these

| Ramp | Steps | Anchor |
|:--|:--|:--|
| `primary-*` | 100 → 900 | **`primary-700 = #BC2125`** — the brand red, sampled from the official logo |
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

`--color-muted` is `color-mix(in srgb, var(--color-border) 35%, var(--color-surface))` — a 35% wash of the field's **own border colour** over its surface. It washes toward the border, not toward the ink, because ink-toward is only the right direction in a light field: on `field-brand` an ink wash lightened the mid-tone red *toward* `--color-muted-foreground`, putting `text-muted-foreground` on `bg-muted` at **4.29:1**, under AA. The mix weight cannot rescue that in either direction — even 0% caps the pairing at 4.66 and pure white reaches only 5.71. Washing toward the border makes the muted block recede in every field (brand `#ac171d`, 5.45:1) and leaves the light theme unchanged to the eye (`#ecefee` → `#ebf0ee`).

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

The font block uses `@theme inline` for the opposite reason: `--font-body` points at `--font-inter-tight`, which `next/font` defines on `<html>`. Inlining makes `font-sans` emit the `var()` chain directly so it resolves against the element's own scope.

---

## 3. Type

### 3.1 The scale

Fifteen steps, `text-xs` → `text-11xl`. **Every step is a `clamp()` and carries its own `line-height` and `letter-spacing`** — line-height tightens and tracking goes negative as size grows, which is what keeps a 120px display line from reading as loose.

Every `clamp()` in this system — type, `gutter-x`, `section-y` — interpolates over the **same 320px → 1440px viewport range**. Below 320 and above 1440 the value is flat. This is why there are no per-breakpoint type jumps anywhere and why there should not be any: `md:text-4xl` fights the scale rather than extending it.

| Step | 320px | 1440px | line-height | tracking |
|:--|--:|--:|--:|--:|
| `text-xs` | 12px | 13px | 1.6 | `0.02em` |
| `text-sm` | 14px | 15px | 1.6 | `0.01em` |
| `text-base` | 16px | 17px | 1.65 | `0` |
| `text-lg` | 17px | 19px | 1.6 | `-0.005em` |
| `text-xl` | 18px | 22px | 1.5 | `-0.01em` |
| `text-2xl` | 22px | 28px | 1.35 | `-0.015em` |
| `text-3xl` | 26px | 36px | 1.25 | `-0.02em` |
| `text-4xl` | 30px | 46px | 1.15 | `-0.025em` |
| `text-5xl` | 36px | 60px | 1.08 | `-0.03em` |
| `text-6xl` | 42px | 76px | 1.05 | `-0.032em` |
| `text-7xl` | 48px | 96px | 1 | `-0.035em` |
| `text-8xl` | 56px | 120px | 0.95 | `-0.038em` |
| `text-9xl` | 64px | 152px | 0.92 | `-0.04em` |
| `text-10xl` | 72px | 192px | 0.88 | `-0.042em` |
| `text-11xl` | 80px | 240px | 0.85 | `-0.045em` |

`text-base` bottoms out at 16px — the iOS input-zoom floor and the WCAG text-resize floor, both satisfied by construction.

Never a fixed-px font size. Never `text-[13px]`. If a step is missing, the scale is wrong — fix the scale, not the call site.

### 3.2 The ten roles — `src/components/ui/typography.tsx`

| Role | Default tag | Scale | Face / weight | Extras |
|:--|:--|:--|:--|:--|
| `Display` | `h1` | `text-8xl` | display / semibold | `text-balance` |
| `H1` | `h1` | `text-6xl` | display / semibold | `text-balance` |
| `H2` | `h2` | `text-5xl` | display / semibold | `text-balance` |
| `H3` | `h3` | `text-4xl` | display / semibold | `text-balance` |
| `H4` | `h4` | `text-3xl` | display / semibold | `text-balance` |
| `H5` | `h5` | `text-2xl` | display / semibold | `text-balance` |
| `H6` | `h6` | `text-xl` | display / semibold | `text-balance` |
| `Eyebrow` | `p` | `text-xs` | body / medium | `uppercase tracking-widest text-accent` |
| `Standfirst` | `p` | `text-xl` | body / normal | `text-pretty text-ink-muted` |
| `P` | `p` | `text-base` | body / normal | `text-pretty text-ink-muted` |

`text-7xl`, `text-9xl`, `text-10xl` and `text-11xl` are **deliberately unclaimed**. They are the editorial register — constraint 2's "type is the layout" — applied to a specific element in a specific section, not routed through a role. Use them consciously; do not invent a `Display2`.

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

### 4.1 Three utilities

| Utility | Value | Means |
|:--|:--|:--|
| `gutter-x` | `padding-inline: clamp(1.25rem, 0.4643rem + 3.9286vw, 4rem)` | 20px → 64px, the horizontal page gutter |
| `section-y` | `padding-block: clamp(4rem, 2.5714rem + 7.1429vw, 9rem)` | 64px → 144px, the vertical section rhythm |
| `max-w-page` | `--container-page: 90rem` | 1440px, the content column |

`gutter-x` and `section-y` are operator-tuned. Do not restate them as `px-*` / `py-*`, and do not "correct" them toward a measurement from a reference site. `cn()` knows they conflict with `p-*`/`px-*`/`py-*` (§8), so a later `px-8` genuinely replaces the gutter rather than fighting it — which is also why writing both is always a mistake.

### 4.2 The section contract — the inverted shell

`src/app/layout.tsx` renders `<main id="main" className="flex-1">` with **no width constraint and no padding**. That is deliberate and it inverts the usual "shell owns the width" convention.

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

An element that must bleed past the content column (constraint 1 — "images bleed past the viewport edge") escapes the inner `div`, it does not remove it.

### 4.3 Responsive

Mobile-first. Base classes are the small screen; step up with `sm:` / `md:` / `lg:` / `xl:`.

Type and section rhythm **do not need breakpoints** — the `clamp()`s already cover 320 → 1440 (§3.1). Breakpoints are for **layout**: grid template changes, column reordering, what collapses into a drawer. If you find yourself writing `md:text-3xl`, the scale step is wrong, not the breakpoint.

---

## 5. Radius — capped at 8px

| Class | Value |
|:--|--:|
| `rounded-xs` | 1px |
| `rounded-sm` | 2px |
| `rounded-md` | 3px |
| `rounded-lg` | 4px |
| `rounded-xl` | 6px |
| `rounded-2xl` | **8px — the cap** |
| `rounded-3xl` | **unset** |
| `rounded-4xl` | **unset** |

The whole stock Tailwind ramp is shifted down. `rounded-lg` is 4px here, not 8px. Nothing in this system is softer than 8px, because a soft radius is the visual signature of the card grid constraint 1 rejects.

`--radius-3xl` and `--radius-4xl` are set to `initial`, which **removes the keys from the theme** — so `rounded-3xl` and `rounded-4xl` compile to nothing at all. They are not "large radii", they are dead classes. This has a consequence in `cn()`; see §8.

`rounded-full` remains legitimate for a shape that is a circle or a capsule by nature (an avatar, a pill), because no radius token can express "half my own height".

---

## 6. Primitives — `src/components/ui/`

Four primitives ship in Phase 0: `Button`, `Icon`, `Accordion`, `Tabs`. All are built on **Base UI** (`@base-ui/react`), not Radix, and every element carries a `data-slot`.

Base UI note: `data-*` state attributes are **presence-only** (`data-disabled=""`). A `[data-disabled="true"]` selector matches nothing — use the `data-disabled:` / `data-active:` / `data-panel-open:` variants as the existing components do.

### 6.1 `Button`

**Variants**

| `variant` | Look |
|:--|:--|
| `solid` *(default)* | `bg-accent text-accent-ink`, opacity shift on hover/active |
| `quiet` | `border-border-strong` outline, transparent; inverts to `bg-ink text-surface` on hover |
| `link` | `text-accent` underline, `decoration-1` → `decoration-2` on hover |

**Sizes**

| `size` | Height | Padding | Label | Glyph |
|:--|--:|:--|:--|:--|
| `sm` | `h-9` (36px) | `px-4` | `text-xs` | `size-4` (16px) |
| `md` *(default)* | `h-11` (44px) | `px-6` | `text-sm` | `size-5` (20px) |
| `lg` | `h-13` (52px) | `px-8` | `text-base` | `size-6` (24px) |
| `icon` | `size-11` (44px) | — | — | `size-5` (20px) |

`md` at 44px is the default because it is the comfortable touch target and this is a marketing site whose conversions are phone taps. A compound variant strips height and horizontal padding from `link` (`h-auto px-0`) so an inline link sits on the text baseline rather than in a 44px box.

**Every rung declares its own glyph size via `[&_svg]:size-*`, and that is not redundancy.** The selector is `[&_svg]`, not `[&_[data-slot=icon]]` — it matches *any* descendant `svg`, so a rung that declares nothing sizes a bare inline `<svg>` at whatever that SVG's intrinsic size is. Relying on `Icon`'s own `size-5` default (§6.2) only works for glyphs that happen to come through `Icon`, and silently couples every button's glyph to an unrelated file. Declaring on all four rungs makes the button own its glyph regardless of what is inside it. The progression holds the glyph at a constant ~0.45 of the button height (16/36, 20/44, 24/52), so the glyph scales with the label rather than the 52px `lg` and the 36px `sm` carrying the same mark.

Radius is `rounded-sm` (2px) on every button — nearly square, per §5.

**Rendering a link with button styling — use `buttonVariants`, never a nested `<Button asChild>` or a `<Link>` inside a `<Button>`:**

```tsx
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

<Link
  href="/admissions"
  className={cn(buttonVariants({ variant: "quiet", size: "lg" }))}
>
  Apply now
</Link>
```

`buttonVariants` is exported for exactly this. It gives an anchor the full variant/size matrix while keeping the element an `<a>` — correct semantics, correct keyboard behaviour, correct Next.js prefetching. **Every link is `next/link`**, including external, `mailto:` and `tel:` — `Link` forwards `target`, `rel`, `download` and `aria-*` straight to the underlying anchor, so there is no capability reason to drop to a raw `<a>`.

### 6.2 `Icon`

Wraps `HugeiconsIcon`. Defaults: `size-5`, `strokeWidth={1.5}`, `aria-hidden`, `focusable="false"`.

Icons are decorative by default — the wrapper hides them from the accessibility tree. **An icon carrying meaning on its own needs a visible or `sr-only` text label next to it**, not an `aria-label` on the icon.

Every glyph comes through **the one barrel, `@/lib/icons`**, which re-exports Hugeicons under house names (`ChevronDownIcon`, `ArrowRightIcon`, `ArrowUpRightIcon`, `CalendarIcon`, `PhoneIcon`, `CloseIcon`, `GlobeIcon`, `LocationIcon`, `MailIcon`, `MenuIcon`, `QuoteIcon`, `CheckIcon`). Need a new glyph → add it to the barrel with a house name; do not import from `@hugeicons/core-free-icons` in a component.

### 6.3 `Accordion`

`Accordion` / `AccordionItem` / `AccordionTrigger` / `AccordionPanel`. Hairline separation only — a top border on the root and a bottom border per item, no card, no radius (constraint 1).

The trigger is `text-xl`, hovers to `text-accent`, and rotates its chevron via `group-data-panel-open:rotate-180`. The panel animates `height` off Base UI's `--accordion-panel-height` with `data-starting-style` / `data-ending-style`, and carries `motion-reduce:transition-none`.

`AccordionPanel`'s `className` lands on the **inner content div**, not the animating panel. That is intentional — the panel's `overflow-hidden` and height transition must not be overridable from a call site.

### 6.4 `Tabs`

`Tabs` / `TabsList` / `TabsTab` / `TabsPanel`. A bottom hairline with a 2px accent indicator that slides via Base UI's `--active-tab-width` / `--active-tab-left`, with `motion-reduce:transition-none`. The list scrolls horizontally on narrow viewports (`overflow-x-auto`, `gap-6 sm:gap-10`) rather than wrapping.

---

## 7. Fonts

Two faces, both `next/font/google`, both wired as CSS variables on `<html>`:

| Token | Face | Used by |
|:--|:--|:--|
| `--font-display` | **Bricolage Grotesque** | `h1`–`h6` (base rule) and every `font-display` role |
| `--font-body` | **Inter Tight** | everything else; `--font-sans` aliases to it |

Swapping either face is a one-line change in `layout.tsx` plus the `@theme inline` mapping. Nothing else references a font name.

---

## 8. `cn()` is configured, not stock — `src/lib/utils.ts`

`cn()` is `clsx` + an **`extendTailwindMerge`** instance. Three things stock `tailwind-merge` gets wrong in this project:

1. **`max-w-page`** — `container: ["page"]` registers our custom container key, so `max-w-page` participates in the `max-w-*` merge group instead of surviving alongside a conflicting width.
2. **The dead radii** — `theme.radius` is overridden to `["xs","sm","md","lg","xl","2xl"]`, dropping `3xl`/`4xl`. Because those keys are `initial` (§5), stock merge would let a `rounded-3xl` — which emits **nothing** — silently cancel a working `rounded-sm`, leaving a square corner and no error anywhere.
3. **The custom utilities** — `gutter-x`, `section-y` and the `field-*` group are registered, and `gutter-x` is declared to conflict with `p`/`px` (both directions), `section-y` with `p`/`py`. So `cn("gutter-x", "px-8")` resolves to `px-8` and `cn("px-8", "gutter-x")` resolves to `gutter-x`, instead of both surviving and the winner being decided by Tailwind's emission order.

The `field-*` classes form their own merge group, so passing `field-teal` over a `field-ink` base replaces it rather than stacking two colour fields on one element.

**Consequence: add a custom `@utility` to `globals.css` → register it in `cn()` too.** An unregistered utility is invisible to the merger, and conflicts against it are resolved by stylesheet order, which is not something you control from a call site.

Two more merge facts that bite and are invisible to `tsc` and lint:

- **A modifier makes its own group.** `text-sm` does not suppress `lg:text-base`; both survive.
- **Two arbitrary-variant classes merge only if the variant string matches character for character.** To override a class from a composed component, copy its selector exactly.

---

## 9. Motion — `src/components/motion/` + `src/lib/gsap.ts`

**GSAP is the only animation library.** No `motion`, no `lenis`, no CSS keyframe libraries. Since GSAP 3.13 the former Club plugins ship free, so ScrollTrigger, SplitText, ScrollSmoother and Observer cover everything in one dependency.

### 9.1 The single registration site

`src/lib/gsap.ts` is the **only** module that may import a GSAP plugin. It registers `useGSAP`, `ScrollTrigger`, `SplitText`, `ScrollSmoother` and `Observer`, then re-exports them.

This is enforced by a `biome` `noRestrictedImports` rule banning `gsap/*` and `gsap/**` everywhere else — including `gsap/all` and `gsap/dist/*`, so the one site cannot be reached around. A bare `import { gsap } from "gsap"` is still allowed. A plugin registered from two sites is a plugin **unregistered on some route**, and that failure is silent.

Import everything from `@/lib/gsap`.

### 9.2 The reduced-motion contract

`lib/gsap.ts` exports `matchMotion(branches, scope)`, a thin wrapper over `gsap.matchMedia()`:

```ts
matchMotion({ motion: () => { … }, reduced: () => { … } }, root)
```

`motion` registers under `(prefers-reduced-motion: no-preference)`. `reduced` is **optional** — and knowing when it is optional is the whole rule:

> **`reduced` may be omitted only when the animation is a `gsap.from()`.**
> A `from()` tween's *natural* DOM state is already the final state, so registering nothing under reduced motion leaves the element visible and correctly positioned — which is what rule §0.4 actually requires.
> **The moment an animation is a `gsap.to()`, a `set()`, a loop, or duplicates DOM, a `reduced` branch is mandatory** — otherwise the reduced-motion user gets the *initial* state permanently.

`Marquee` is the worked example: it is a `gsap.to()` loop over duplicated copies, so it ships a `reduced` branch that switches the track to native horizontal scroll and hides the duplicate copies. `Reveal`, `SplitText`, `Parallax` and `Tilt` are all `from()`-shaped or pointer-driven, so they correctly register nothing.

Components that use CSS transitions instead (`Accordion`, `Tabs`) carry `motion-reduce:transition-none`.

### 9.3 The vocabulary

| Primitive | Shape | Notes |
|:--|:--|:--|
| `Reveal` / `RevealItem` | enter on scroll: `y` (40) / `x` offset + optional fade | `stagger > 0` animates `[data-reveal-item]` children, falling back to direct children |
| `SplitText` | masked line / word / char entrance on a single string | accessible name is GSAP's (`aria: "auto"`); the a11y attributes exist only while the split does — §9.7 |
| `Marquee` | infinite horizontal loop, scroll-velocity linked via `Observer` | `copies` (2), `speed` (80), `reverse`, `velocity`, `maxBoost` |
| `Parallax` | depth layer | **markup only** — see below |
| `Tilt` | 3D pointer tilt, `max` 8° | `(pointer: fine)` + full-motion only; no-ops on touch |
| `SmoothScrollProvider` | wraps the app in ScrollSmoother | `(pointer: fine)` + full-motion only; required `chrome` slot renders outside the smoothed content (§9.6); re-scans parallax effects on route change (§9.5) |

### 9.4 The at-fold rule

`Reveal` and `SplitText` both take **`atFold`**. It drops the ScrollTrigger so the animation plays immediately on mount, and on `Reveal` it also flips `fade` off by default (`fade = !atFold`).

**Anything in the first viewport uses `atFold`.** A scroll-triggered reveal on at-fold content is a reveal whose trigger point is already behind the scroll position — it can leave the hero parked at its from-state, and it is a Core Web Vitals defect regardless.

Note that `fade` is a *default*, not a lock: `<Reveal atFold fade>` is expressible and re-introduces an opacity ramp at the fold. Don't.

### 9.5 `Parallax` is markup, not motion

`Parallax` renders a plain `div` with `data-speed` and `data-lag`. It contains no GSAP at all. Those attributes are read by **ScrollSmoother's `effects: true`**, which only runs when `SmoothScrollProvider` is active.

**So parallax silently does nothing on touch devices, on coarse pointers, and under reduced motion.** That is the correct behaviour — but it means a section whose *meaning* depends on parallax (overlapping layers that only separate when they move) is broken for a large share of visitors. Design the static composition first; parallax is the enhancement.

**The effect list is built by DOM query, not by React.** `ScrollSmoother.create({ effects: true })` resolves `[data-speed], [data-lag]` **once, at create time**. The smoother is created on mount and outlives every client-side navigation — so a `<Parallax>` on a soft-navigated route would get no effect at all, silently, on desktop only.

The provider closes this by re-scanning `#smooth-content` on every `usePathname()` change: it kills the effects registered for the previous route and re-registers what is now in the DOM. It does **not** re-create the smoother — that would discard scroll state and force a full ScrollTrigger rebuild for no gain.

The scan runs once per route commit. **A `[data-speed]` element that appears after that commit is not covered** — imperative DOM insertion, or a Suspense boundary that resolves later. Render parallax layers in the route's own tree.

### 9.6 Fixed and sticky do not work inside the smooth content — the `chrome` slot

`SmoothScrollProvider` wraps everything in `#smooth-wrapper` > `#smooth-content`. ScrollSmoother sets the wrapper to `position: fixed; overflow: hidden; height: 100%` and **transforms** the content element. **A `fixed` or `sticky` descendant is positioned against a transformed ancestor, so it scrolls with the content.** Nothing warns you; it simply behaves as `absolute`. The failure is **desktop-only** — the smoother is gated on `(pointer: fine)` + full motion — so it does not reproduce on the phone you test on.

The provider therefore has two slots, and `chrome` is a **required** prop:

```tsx
<SmoothScrollProvider chrome={<SiteHeader />}>
  <div className="flex min-h-svh flex-col">
    <main id="main" className="flex-1">{children}</main>
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

- `content` is a `ContentProvider` — eleven async getters (`getInstitution`, `getStats`, `getAcademicLevels`, `getProgrammes`, `getAffiliations`, `getPartners`, `getCampusLife`, `getAdmissionCalls`, `getUpdates`, `getTestimonials`, `getHomeCopy`). Every one returns a Promise, so the WP swap changes no call site.
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
| **`Card` primitive** | Constraint 1. A `Card` component is how the rounded-card grid gets back in. Separate with whitespace, a hairline, or a colour-field change. |
| **Shadow tokens** | Constraint 4 — depth comes from motion and overlap, not shadows on boxes. |
| **`--destructive` / `--warning` / `--success` aliases** | No prop without a consumer. This is a marketing site with no destructive actions and no form validation yet. Add them **with** the feature that needs them. |
| **`--color-secondary` / `--color-secondary-foreground` aliases** | Same reasoning as `--destructive`, one step further: where shadcn's meaning **collides** with our brand meaning, our brand meaning wins and the alias goes. The alias bought one thing — a pasted shadcn component compiling unmodified — and the CLI is banned here, so components are hand-adapted anyway. It cost a permanent trap (`bg-secondary` white vs `bg-secondary-700` teal) in the namespace a section builder reaches for most. Port to `bg-surface-raised` / `text-ink` (§2.3). |
| **`rounded-3xl` / `rounded-4xl`** | Unset on purpose (§5). They are dead classes, not large radii. |
| **A default OG image** | `createMetadata` accepts an `image` and falls back to `twitter: { card: "summary" }` without one. The brand asset (and the vector logo) have not been supplied. |
| **`components/layout/`** | Header and footer are blocked on the vector logo. |
| **`components/shared/`** | Extraction happens **last**, on the merged tree, once a second route actually needs a section. Extracting before a real second consumer exists is the over-abstraction smell. |
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

Tailwind v4's automatic source detection scans every non-ignored file in the project for class names, **including markdown**. Without that exclusion, every class name mentioned in this document — `bg-neutral-50`, `dark:*`, `rounded-3xl`, every "never write this" example — would be detected as used and **compiled into the production stylesheet**.

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

- **A dead Tailwind class.** `rounded-3xl` compiles to nothing here and no tool says so. When using a non-obvious variant or a custom utility, verify it actually emits.
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
