# 002 — Scope and speed up the seat transition

- **Commit:** 8bb5696
- **Severity:** HIGH
- **Category:** Purpose & frequency + Easing & duration (`transition: all`, hover over budget)
- **Estimated scope:** 1 file, 1 line

## Problem

Seats are the highest-frequency surface in the app — a user hovers and toggles them dozens to hundreds of times per booking. Each seat carries `transition-all duration-200`: `transition: all` animates properties never meant to animate (borders, margins if they ever change), and 200ms is above the 100–150ms hover budget — at seat-grid frequency even 200ms creates friction between click and the selected state appearing.

## Where

| File | Lines | What's there |
| --- | --- | --- |
| `src/components/auditorium/Seat.tsx` | 20 | `transition-all duration-200` in the seat button's base classes |

### Current code

```tsx
// src/components/auditorium/Seat.tsx:20
className={cn(
  'seat m-0.5 h-4 w-5 cursor-pointer rounded-t-[20px] border border-seat-border transition-all duration-200 md:m-1 md:h-5 md:w-6 md:rounded-t-[25px]',
```

## Target

Replace `transition-all duration-200` with `transition-[background-color,box-shadow] duration-150`. The full line becomes:

```tsx
'seat m-0.5 h-4 w-5 cursor-pointer rounded-t-[20px] border border-seat-border transition-[background-color,box-shadow] duration-150 md:m-1 md:h-5 md:w-6 md:rounded-t-[25px]',
```

**Why these values:**

- `background-color` and `box-shadow` are the only properties that change on hover and on select (the cyan fill and the `shadow-seat-selected` glow). Border color differs between statuses but only changes when the whole showing context switches — that should snap, not tween.
- `duration-150` sits at the top of the 100–150ms hover budget; the select feedback still reads as a smooth glow-in but feels immediate.
- No easing class: Tailwind v4's default timing function is fine for color-only transitions — color and background belong to the `ease` category, and at 150ms the difference between curves is imperceptible. Do not add a curve.

## Conventions to follow

- All styling is inline Tailwind v4 utilities; `src/components/booking/MoviePicker.tsx` (`transition-colors`) is the exemplar for scoped transitions.

## Steps

1. Edit the single className line in `src/components/auditorium/Seat.tsx` as specified.
2. Run `bun run typecheck`.

## Out of scope

- Do not touch `.seat--legend` styles in `src/styles/global.css` — legend swatches are non-interactive and have no transition.
- Do not add press/scale feedback to seats: the color change *is* the feedback, and at this frequency extra motion would be noise.
- Do not change `SeatRow.tsx` or `SeatMap.tsx`.

## Verification

**Build**

- [ ] `typecheck` passes.

**Behavior**

- [ ] Clicking a seat: the cyan fill and glow appear within 150ms.
- [ ] Rapidly toggling one seat: the color retargets from wherever it is (CSS transitions retarget mid-flight) — no restart-from-zero jump.
- [ ] Switching movie or format: occupied/available layouts snap instantly with no cross-tween of borders or margins.

**Feel**

- [ ] Sweep the cursor across a row: hover highlights should track the cursor with no perceptible trail. If a trail is visible, drop to `duration-100`.
- [ ] Select ~10 seats quickly in a row; the feedback should never feel like it's lagging behind the clicks.
