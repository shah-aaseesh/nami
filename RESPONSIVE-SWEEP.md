# 📱 NAMI College — Full Codebase Responsive Sweep Audit

> **Date:** August 26, 2026  
> **Audited Routes:** 18 public routes + all 102 shared & UI components  
> **Tested Viewports:**
> - Mobile Small (`360px × 740px` / `375px × 667px` — Galaxy S8, iPhone SE)
> - Mobile Standard (`390px × 844px` / `412px × 915px` — iPhone 13/14/15, Pixel 7)
> - Tablet Portrait (`768px × 1024px` / `820px × 1180px` — iPad Mini, iPad Air)
> - Tablet Landscape & Small Laptop (`1024px × 768px` / `1280px × 800px` — iPad Pro, 13" MacBook)
> - Desktop & Ultra-wide (`1440px × 900px` / `1920px × 1080px`)

---

## 📊 Summary of Findings

| Severity | Count | Primary Areas Affected |
|:---|:---:|:---|
| 🚨 **CRITICAL** | **2** | Footer SVG intrinsic width blowout, Floating Actions rail tablet overlay collision |
| 🔶 **HIGH** | **3** | Desktop nav + Mobile menu double render (1024px–1279px), School Day 2-col text crushing on small mobile, Sub-40px touch targets |
| 🔷 **MEDIUM** | **5** | Career partner marquee mobile sizing, Admissions form tablet grid crowding, Awarding cards tablet stretching, Notices filter vertical stack on tablet, Small faculty group horizontal swipe on tablet |
| ⚪ **LOW** | **4** | Ultra-wide hero badge scaling, Ultra-narrow gutter clamp floor, Accordion focus ring clipping, Landscape short-screen masthead padding |

---

## 🚨 1. CRITICAL SEVERITY

### Issue C-01: `SiteFooterWordmark` Intrinsic SVG Dimension Causes Mobile Viewport Blowout (All 18 Routes)
- **Files:**
  - [`src/components/layout/site-footer-wordmark.tsx`](file:///C:/Users/Asmit%20Kumar%20Sah/Desktop/files/code/nami-college/src/components/layout/site-footer-wordmark.tsx#L19-L27)
  - [`src/components/layout/site-footer.tsx`](file:///C:/Users/Asmit%20Kumar%20Sah/Desktop/files/code/nami-college/src/components/layout/site-footer.tsx#L50)
- **Viewport:** Mobile (`< 800px`, specifically `360px` – `768px`)
- **Root Cause:**
  `SiteFooterWordmark` renders:
  ```tsx
  <div className={cn("inline-block", className)} data-slot="wordmark">
    <Image
      alt={name}
      className="h-20 w-auto md:h-24 lg:h-28 -mt-6"
      height={465}
      sizes="(min-width: 1024px) 112px, 80px"
      src="/logo/nami-white.svg"
      width={800}
    />
  </div>
  ```
  The raw HTML `width="800"` and `height="465"` attributes on an `inline-block` container without an explicit `max-w-full` constraint force the rendered element to take up to 800px width before full CSS hydration or in unconstrained flex parents, generating an uncontained horizontal scrollbar (`scrollWidth: 808px > clientWidth: 360px`).
- **Impact:** Horizontal scrollbar appears across all 18 routes on mobile devices if layout styles are delayed or parsed.
- **Recommended Fix:**
  Add `max-w-full w-auto` and `w-fit` on the wrapper and image:
  ```tsx
  export function SiteFooterWordmark({ className, name }: SiteFooterWordmarkProps) {
    return (
      <div className={cn("inline-block max-w-full", className)} data-slot="wordmark">
        <Image
          alt={name}
          className="h-20 w-auto max-w-full md:h-24 lg:h-28 -mt-6"
          height={MARK_HEIGHT}
          sizes="(min-width: 1024px) 112px, 80px"
          src={MARK_SRC}
          width={MARK_WIDTH}
        />
      </div>
    );
  }
  ```

---

### Issue C-02: Floating Actions Rail Overlaps Interactive Form Elements & Buttons on Tablet (`768px` – `1023px`)
- **File:** [`src/components/layout/floating-socials.tsx`](file:///C:/Users/Asmit%20Kumar%20Sah/Desktop/files/code/nami-college/src/components/layout/floating-socials.tsx#L47-L53)
- **Viewport:** Tablet (`768px` to `1023px`, e.g. iPad Portrait)
- **Root Cause:**
  The floating rail is styled with:
  ```tsx
  className={cn(
    "fixed right-0 top-1/2 z-50 hidden -translate-y-1/2 flex-col items-center gap-1.5 rounded-l-2xl border-y border-l border-primary-600/30 bg-primary-700 p-1.5 shadow-2xl md:flex",
    className,
  )}
  ```
  On screens between 768px and 1023px (`md:` to `< lg:`), the viewport width is narrow and page contents extend close to the right edge.
  1. The rail consumes 53px of the right margin, directly overlapping buttons and input elements (e.g. the Contact Form submit button and inputs at `right: 747px`, `floatRect.left: 700px`).
  2. When the user hovers over or focuses the Prospectus Download button, the flyout popover expands **192px (`w-48`) to the left**, covering ~245px (~32%) of the 768px viewport width and blocking interactions with underlying page content.
- **Impact:** Users on iPads and Android tablets experience accidental taps, blocked inputs, and obscured text.
- **Recommended Fix:**
  Change `hidden md:flex` to `hidden xl:flex` (so it only displays on large desktop screens with wide page gutters), or convert to a floating bottom-right action trigger on mobile and tablet.

---

## 🔶 2. HIGH SEVERITY

### Issue H-01: Header Displays Both Full Desktop Navigation Links AND Hamburger Menu Button on `lg` (`1024px` – `1279px`)
- **File:** [`src/components/layout/site-header-shell.tsx`](file:///C:/Users/Asmit%20Kumar%20Sah/Desktop/files/code/nami-college/src/components/layout/site-header-shell.tsx#L227-L281)
- **Viewport:** Small Desktop / Laptop (`1024px` – `1279px`)
- **Root Cause:**
  1. Horizontal navigation is enabled with `className="hidden flex-1 justify-end lg:flex"` (lines 227-230).
  2. The hamburger Sheet trigger (`<SheetTrigger render={<Button size="icon" variant="default" aria-label="Menu">...>`) in lines 250-257 has **no `lg:hidden`** class.
  3. Consequently, on laptops and 1024px screens, users see all 7 navigation items (`Home`, `About Us [v]`, `Institutions [v]`, `Admissions`, `Gallery`, `Alumni`, `Careers`) alongside the red hamburger menu icon.
- **Impact:** Header is congested on 1024px–1200px viewports with redundant navigation mechanisms.
- **Recommended Fix:**
  Add `lg:hidden` to the SheetTrigger container or wrap:
  ```tsx
  <div className="flex items-center gap-x-3 xl:gap-x-5 shrink-0 lg:hidden">
    <Sheet open={open} onOpenChange={setOpen}>
  ```

---

### Issue H-02: School Day 2-Column Row Layout Crushes Heading Text on Small Mobile (`360px` – `390px`)
- **File:** [`src/app/institutions/school/_components/school-day.tsx`](file:///C:/Users/Asmit%20Kumar%20Sah/Desktop/files/code/nami-college/src/app/institutions/school/_components/school-day.tsx#L49-L74)
- **Viewport:** Mobile Small / Standard (`360px` – `390px`)
- **Root Cause:**
  Each moment card uses:
  ```tsx
  <li className="flex items-start gap-5 sm:gap-6 border-b border-primary-800/80 py-6" key={entry.title}>
    {entry.photo && (
      <div className="relative aspect-[4/3] w-32 sm:w-40 lg:w-44 shrink-0 overflow-hidden rounded-2xl shadow-md bg-primary-800/30">
        <Image ... />
      </div>
    )}
    <div className="min-w-0 flex-1">
      <Accordion className="border-none w-full">
        <h3 className="font-display text-2xl sm:text-3xl font-normal text-white leading-snug">
          {entry.title}
        </h3>
  ```
  On a 360px phone:
  - 360px - 40px (gutters) = 320px content width.
  - 320px - 128px (`w-32`) - 20px (`gap-5`) = **only 172px remaining width**.
  - A `text-2xl` heading (24px) in a 172px container forces 1–2 words per line (e.g. "Experiential\nLearning &\nActivities"), making the text column disproportionately tall next to a 96px thumbnail image.
- **Impact:** Heavy word breaks and awkward vertical aspect ratio disparity.
- **Recommended Fix:**
  Change `flex items-start gap-5` to `flex flex-col sm:flex-row items-start gap-4 sm:gap-6`, with `w-full sm:w-40 lg:w-44` on the image wrapper so images sit cleanly on top on mobile and side-by-side on `sm:` (640px+).

---

### Issue H-03: Sub-40px Interactive Touch Targets Violate Mobile Accessibility Guidelines (WCAG 2.5.5 / 2.5.8)
- **Files:**
  - [`src/components/ui/carousel.tsx`](file:///C:/Users/Asmit%20Kumar%20Sah/Desktop/files/code/nami-college/src/components/ui/carousel.tsx#L319) (`CarouselDots`)
  - [`src/components/ui/button.tsx`](file:///C:/Users/Asmit%20Kumar%20Sah/Desktop/files/code/nami-college/src/components/ui/button.tsx#L24) (`size="icon"`)
  - [`src/components/shared/admissions-form.tsx`](file:///C:/Users/Asmit%20Kumar%20Sah/Desktop/files/code/nami-college/src/components/shared/admissions-form.tsx#L794) (Step number circles)
  - [`src/components/layout/site-footer.tsx`](file:///C:/Users/Asmit%20Kumar%20Sah/Desktop/files/code/nami-college/src/components/layout/site-footer.tsx#L69-L76) (Footer nav links)
- **Viewport:** Mobile (`< 768px`)
- **Findings:**
  1. `CarouselDots` buttons render at **`20px × 20px`** (`p-1.5` padding + `size-2` dot). Tapping specific slides on mobile is unreliable.
  2. Mobile menu trigger button uses `size="icon"`, which defaults to **`36px × 36px`** (`size-9`), failing the 44px touch target minimum.
  3. Admissions Form step indicator circles are **`28px × 28px`** (`size-7`).
  4. Footer quick links are **`19px` high** with no vertical padding on mobile tap targets.
- **Impact:** Mis-clicks and frustration on touchscreen devices.
- **Recommended Fix:**
  - In `CarouselDots`: Increase button hit-area to `p-2.5 sm:p-2` or add `min-h-11 min-w-11` transparent touch area.
  - In `Button`: Provide a mobile-friendly icon button size `size="icon"` with `min-h-11 min-w-11` (`size-11` or `h-11 w-11`).
  - In `admissions-form.tsx`: Increase step item hit area to `min-h-11`.
  - In `site-footer.tsx`: Add `py-1.5` to footer links.

---

## 🔷 3. MEDIUM SEVERITY

### Issue M-01: Career Placement Partner Marquee Logo Sizing on Small Mobile
- **File:** [`src/components/shared/partner-carousel.tsx`](file:///C:/Users/Asmit%20Kumar%20Sah/Desktop/files/code/nami-college/src/components/shared/partner-carousel.tsx#L56-L63)
- **Viewport:** Mobile (`360px` – `390px`)
- **Root Cause:**
  `<Image className="h-auto max-h-16 sm:max-h-18 lg:max-h-20 w-32 sm:w-36 lg:w-40 xl:w-44 object-contain ...">`
  On a 360px mobile screen, 128px (`w-32`) logos scroll rapidly, occupying over 35% of the screen width per logo.
- **Recommended Fix:**
  Adjust mobile size to `max-h-12 w-24 sm:max-h-16 sm:w-32 lg:max-h-20 lg:w-40`.

---

### Issue M-02: Admissions Multi-Step Form Sidebar Crowds Form Fields on Tablet (`768px` – `1023px`)
- **File:** [`src/components/shared/admissions-form.tsx`](file:///C:/Users/Asmit%20Kumar%20Sah/Desktop/files/code/nami-college/src/components/shared/admissions-form.tsx#L763-L765)
- **Viewport:** Tablet Portrait (`768px` – `1023px`)
- **Root Cause:**
  The card layout switches to `md:flex-row` at 768px with the sidebar taking `md:w-64` (256px).
  Inside 768px total width: 768px - 40px (gutters) - 256px (sidebar) - 48px (padding) = **~424px remaining for form fields**.
  Several internal fields (e.g. `grid grid-cols-1 md:grid-cols-2 gap-4` in Qualifications, Employment, and Parent Contact) split that 424px into two ~200px columns, causing input labels and date placeholders to wrap tightly.
- **Recommended Fix:**
  Change sub-field grids from `md:grid-cols-2` to `lg:grid-cols-2` so they remain single-column on 768px tablet portrait and dual-column on 1024px+ desktop.

---

### Issue M-03: Institution Awarding Bodies Card Stretching on Tablet
- **File:** [`src/components/shared/institution-awarding.tsx`](file:///C:/Users/Asmit%20Kumar%20Sah/Desktop/files/code/nami-college/src/components/shared/institution-awarding.tsx#L37-L83)
- **Viewport:** Tablet (`768px` – `1023px`)
- **Root Cause:**
  `SinglePartnerCard` sets `max-w-md mx-auto` (448px), while `MultiPartnerCard` renders `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`. On a 2-partner institution (e.g. Cambridge A-Levels), two cards stretch to ~340px each on tablet, whereas a 1-partner institution has a fixed 448px card.
- **Recommended Fix:**
  Apply uniform `max-w-md` and `justify-center` on both single and multi-partner wrappers.

---

### Issue M-04: Notices Archive Filter Sidebar Stacks Vertically Before Cards on Tablet
- **File:** [`src/app/notices/_components/updates-archive.tsx`](file:///C:/Users/Asmit%20Kumar%20Sah/Desktop/files/code/nami-college/src/app/notices/_components/updates-archive.tsx#L187-L203)
- **Viewport:** Tablet (`768px` – `1023px`)
- **Root Cause:**
  The sidebar filter is pinned on `lg:col-span-3`, but on tablet (`< 1024px`) it stacks above the content grid. Because the sidebar contains category filters, kind pills, and year selectors, tablet users must scroll past 350px of filter UI before viewing the first notice card.
- **Recommended Fix:**
  On `< lg`, place categories and years in horizontal scrollable pills / select dropdowns or an expandable filter drawer.

---

### Issue M-05: Faculty Group Horizontal Snap Rail for Small Groups (< 5 Members) on Tablet
- **File:** [`src/app/faculty/_components/faculty-group.tsx`](file:///C:/Users/Asmit%20Kumar%20Sah/Desktop/files/code/nami-college/src/app/faculty/_components/faculty-group.tsx#L76-L86)
- **Viewport:** Tablet (`768px` – `1023px`)
- **Root Cause:**
  When a faculty group has 3 members, `isScrollable` is false. The desktop wrapping (`lg:flex-wrap lg:justify-center`) only activates at 1024px. On 768px tablet, cards remain inside an `overflow-x-auto` horizontal swipe track where the 3rd card is cut in half at the screen edge.
- **Recommended Fix:**
  Change `lg:flex-wrap lg:justify-center lg:overflow-visible` to `md:flex-wrap md:justify-center md:overflow-visible` when `!isScrollable`.

---

## ⚪ 4. LOW SEVERITY

### Issue L-01: Hero Badge Center Logo & Rotation Ring on Ultra-Wide (`1920px`+)
- **File:** [`src/components/shared/hero-badge.tsx`](file:///C:/Users/Asmit%20Kumar%20Sah/Desktop/files/code/nami-college/src/components/shared/hero-badge.tsx#L54)
- **Viewport:** Ultra-wide (`1920px`+)
- **Finding:** Badge dimensions cap at `lg:size-36` (144px). On 1920px displays where hero headings scale to `text-8xl` (120px font size), the badge appears slightly diminutive relative to the hero headline.
- **Recommended Fix:** Add `2xl:size-40` and `2xl:size-28` for center logo container.

---

### Issue L-02: Container Gutter Floor on Ultra-Narrow Viewports (`< 360px`)
- **File:** [`src/app/globals.css`](file:///C:/Users/Asmit%20Kumar%20Sah/Desktop/files/code/nami-college/src/app/globals.css#L147)
- **Viewport:** Ultra-narrow mobile (`280px` – `320px`, e.g. Samsung Galaxy Z Fold cover screen)
- **Finding:** `--gutter-x: clamp(1.25rem, 0.4643rem + 3.9286vw, 4rem)` sets a 20px (`1.25rem`) floor. On a 280px screen, 40px of horizontal padding leaves only 240px for content.
- **Recommended Fix:** Set clamp floor to `1rem` (16px): `clamp(1rem, 0.4643rem + 3.9286vw, 4rem)`.

---

### Issue L-03: Accordion Trigger Focus Ring Outline Offset Clipping
- **File:** [`src/components/ui/accordion.tsx`](file:///C:/Users/Asmit%20Kumar%20Sah/Desktop/files/code/nami-college/src/components/ui/accordion.tsx#L27)
- **Viewport:** All viewports with keyboard navigation
- **Finding:** `:focus-visible` with `outline-offset: 2px` can be partially clipped on the right boundary when the parent card uses `overflow-hidden rounded-2xl`.
- **Recommended Fix:** Add `focus-visible:ring-2 focus-visible:ring-inset` or `focus-visible:outline-offset-0`.

---

### Issue L-04: Short Height Viewport Masthead Padding
- **File:** [`src/app/globals.css`](file:///C:/Users/Asmit%20Kumar%20Sah/Desktop/files/code/nami-college/src/app/globals.css#L166-L170)
- **Viewport:** Mobile Landscape / Short Desktop (`height <= 600px`)
- **Finding:** `--spacing-section-pt-masthead` calculates top padding based on width clamp without accounting for short viewport heights (`<= 600px`), pushing the primary H1 heading partially below the initial fold.
- **Recommended Fix:** Add a `@media (max-height: 600px)` override with reduced padding: `padding-top: calc(var(--spacing-section-py-hero) + 1.5rem)`.

---

## 🎯 Quick Reference: Priority Fix Checklist

- [ ] **[CRITICAL]** Add `max-w-full` constraint to [`site-footer-wordmark.tsx`](file:///C:/Users/Asmit%20Kumar%20Sah/Desktop/files/code/nami-college/src/components/layout/site-footer-wordmark.tsx).
- [ ] **[CRITICAL]** Restrict [`floating-socials.tsx`](file:///C:/Users/Asmit%20Kumar%20Sah/Desktop/files/code/nami-college/src/components/layout/floating-socials.tsx) to `hidden xl:flex` to eliminate tablet overlay collision.
- [ ] **[HIGH]** Add `lg:hidden` to hamburger menu `<SheetTrigger>` in [`site-header-shell.tsx`](file:///C:/Users/Asmit%20Kumar%20Sah/Desktop/files/code/nami-college/src/components/layout/site-header-shell.tsx).
- [ ] **[HIGH]** Switch [`school-day.tsx`](file:///C:/Users/Asmit%20Kumar%20Sah/Desktop/files/code/nami-college/src/app/institutions/school/_components/school-day.tsx) to `flex flex-col sm:flex-row`.
- [ ] **[HIGH]** Expand mobile touch targets in [`carousel.tsx`](file:///C:/Users/Asmit%20Kumar%20Sah/Desktop/files/code/nami-college/src/components/ui/carousel.tsx) (`CarouselDots`) and [`button.tsx`](file:///C:/Users/Asmit%20Kumar%20Sah/Desktop/files/code/nami-college/src/components/ui/button.tsx).
- [ ] **[MEDIUM]** Adjust partner logo max-heights in [`partner-carousel.tsx`](file:///C:/Users/Asmit%20Kumar%20Sah/Desktop/files/code/nami-college/src/components/shared/partner-carousel.tsx).
- [ ] **[MEDIUM]** Defer sub-field two-column grid in [`admissions-form.tsx`](file:///C:/Users/Asmit%20Kumar%20Sah/Desktop/files/code/nami-college/src/components/shared/admissions-form.tsx) from `md:` to `lg:`.
- [ ] **[MEDIUM]** Enable `md:flex-wrap` for non-scrollable groups in [`faculty-group.tsx`](file:///C:/Users/Asmit%20Kumar%20Sah/Desktop/files/code/nami-college/src/app/faculty/_components/faculty-group.tsx).
