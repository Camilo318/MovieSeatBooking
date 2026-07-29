# 003 — Stop the screen's aspect-ratio morph from reflowing the whole page

- **Commit:** 8bb5696
- **Severity:** HIGH
- **Category:** Performance (animating a layout property) + Easing & duration (weak built-in curve)
- **Estimated scope:** 2 files, ~25 lines

## Problem

When the user switches format (e.g. IMAX 1.43:1 → Scope 2.39:1), the screen animates its `aspect-ratio` for 350ms. `aspect-ratio` is a layout property: every frame of the animation changes the screen's height, which reflows the "Screen" label, the entire seat map below it, and (in the mobile single-column layout) everything else on the page — Layout, Paint, and Composite on every frame for a third of a second. On top of that, the curve is the built-in `ease-in-out`, which is too weak for a deliberate on-screen morph, and `width` is in the transition list but never changes.

The fix mirrors a real cinema: the room doesn't move when the screen masking changes. Give the screen a fixed-height stage sized to the tallest ratio the current movie offers, center the screen inside it, and let only the screen morph. The document below never reflows again.

## Where

| File | Lines | What's there |
| --- | --- | --- |
| `src/components/auditorium/AuditoriumScreen.tsx` | 27 | The transition on the screen div |
| `src/components/auditorium/ScreenGallery.tsx` | 10–31 | The `screen-frame` wrapper that becomes the fixed stage |
| `src/styles/global.css` | 3–77 | The `@theme` block where the easing token goes |

### Current code

```tsx
// src/components/auditorium/AuditoriumScreen.tsx:27
<div
  className='screen w-full overflow-hidden rounded-sm transition-[aspect-ratio,width] duration-350 ease-in-out'
  style={{ aspectRatio: ratioValue }}>
```

```tsx
// src/components/auditorium/ScreenGallery.tsx:11-24
const {
  currentMovie,
  currentStill,
  activeAspectRatio,
  hasGallery
} = useBookingDerived()
...
<div className='screen-frame relative mx-auto w-full max-w-170 lg:max-w-190'>
```

## Target

1. In `src/styles/global.css`, add to the existing `@theme` block (skip if already present):

```css
--ease-in-out-cubic: cubic-bezier(0.645, 0.045, 0.355, 1);
```

2. In `ScreenGallery.tsx`, also destructure `showings` from `useBookingDerived()` (it's already exposed — `FormatStrip.tsx` uses it). Compute the tallest ratio the current movie can show:

```tsx
const ratios = showings.flatMap(s => s.aspectRatios)
const frameRatio = ratios.length
  ? Math.min(...ratios.map(r => parseFloat(r)))
  : 1.85
```

`parseFloat('1.43:1')` yields `1.43`; the smallest number is the tallest screen. The `1.85` fallback matches the default in `AuditoriumScreen.tsx`.

3. Turn the frame into a fixed stage that vertically centers the screen:

```tsx
<div
  className='screen-frame relative mx-auto flex w-full max-w-170 items-center justify-center lg:max-w-190'
  style={{ aspectRatio: `${frameRatio} / 1` }}>
```

The nav arrow buttons keep working unchanged: they're positioned at `top-1/2` of the frame, and the screen is centered in the frame, so their vertical center coincides.

4. In `AuditoriumScreen.tsx`, drop `width` from the transition (it never changes), swap the curve, and gate for reduced motion:

```tsx
<div
  className='screen w-full overflow-hidden rounded-sm transition-[aspect-ratio] duration-350 ease-in-out-cubic motion-reduce:transition-none'
  style={{ aspectRatio: ratioValue }}>
```

**Why these values:**

- Fixed stage: the morph now only relayouts the screen's own subtree (a single `<img>`), which falls under the "very few children" exception; the seat map and label never move.
- Stage ratio derived from *the current movie's* showings: single-ratio movies get zero visual change; masking space appears only where a morph can actually happen. Switching movies resizes the stage instantly (no transition on the frame) — a full context switch should snap, not tween.
- `cubic-bezier(0.645, 0.045, 0.355, 1)` (ease-in-out-cubic) — the catalog's curve for moving/morphing while already on screen; built-in `ease-in-out` is too weak and reads flat.
- `duration-350` stays: it exceeds the 300ms UI guideline but is justified — this is the largest element on the page, and duration scales with size.
- `motion-reduce:transition-none` — the ratio jumps instantly under `prefers-reduced-motion: reduce`. There is no gentler variant of a size morph that doesn't move.

## Conventions to follow

- Theme tokens live in the `@theme` block of `src/styles/global.css`; Tailwind v4 maps `--ease-in-out-cubic` to the `ease-in-out-cubic` utility.
- Derived state comes from `useBookingDerived()` — see `FormatStrip.tsx` for how `showings` is consumed.

## Steps

1. Add `--ease-in-out-cubic` to `@theme` in `src/styles/global.css`.
2. In `ScreenGallery.tsx`: destructure `showings`, compute `frameRatio`, and update the frame div as specified.
3. In `AuditoriumScreen.tsx`: update the transition classes as specified.
4. Run `bun run typecheck`.

## Out of scope

- Do not change the still image markup, `stepStill`, or the gallery arrow buttons.
- Do not animate the frame itself — it must resize instantly on movie change.
- Do not touch `SeatMap.tsx` or any seat component.

## Verification

**Build**

- [ ] `typecheck` passes.

**Behavior**

- [ ] Pick a movie with multiple ratios; switch formats: the screen morphs, and the seat map and "Screen" label do not move at all.
- [ ] Switch formats rapidly mid-morph: the ratio retargets from its current value (CSS transitions retarget) instead of jumping.
- [ ] Switch movies: the stage resizes instantly, no tween.
- [ ] With `prefers-reduced-motion: reduce` emulated, the ratio changes instantly.
- [ ] In DevTools Performance panel, record a format switch: no full-document Layout entries during the animation frames.

**Feel**

- [ ] Record the morph and scrub frame by frame: it should start decisively and settle gently, like theater masking motors. If it reads flat, the curve is too weak — not the duration.
- [ ] Check the widest movie at 2.39:1 inside its stage: the dark space above/below the screen should read as theater wall, not as a layout bug.

## Notes

The fixed stage is a deliberate design trade-off a human should sign off on: for a movie offering both 1.43:1 and 2.39:1, the stage reserves the 1.43:1 height, leaving up to ~95px of dark masking above and below the screen at full width when showing 2.39:1. This is physically true to a real cinema (masking moves, the room doesn't), and the auditorium's dark atmosphere gradient should absorb it — but I can't judge from code whether it reads as intentional. If it's rejected, the fallback is: keep the layout animation, but still apply steps 1 and 4 (stronger curve, drop `width`, add `motion-reduce:transition-none`) and accept the reflow cost — this page is small enough that modern hardware may hold 60fps anyway. Verify with the DevTools recording either way.
