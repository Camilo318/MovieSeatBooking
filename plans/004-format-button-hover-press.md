# 004 — Fix the format button's hover physics and add press feedback

- **Commit:** 8bb5696
- **Severity:** MEDIUM
- **Category:** Physicality & origin (self-lifting hover target, no `:active`) + Easing & duration (`transition: all`)
- **Estimated scope:** 2 files, ~5 lines

## Problem

The format tiles use `transition-all duration-200` and lift *themselves* on hover with `hover:-translate-y-0.5`. Translating the hover target itself is the flicker pattern: the element lifts out from under the cursor at the hover boundary, the hover ends, it drops back under the cursor, and the cycle repeats. There is also no `:active` press response — hover with no press feedback feels dead — and 200ms is above the 100–150ms hover budget for a strip the user taps several times per session. The ratio badges inside the tile transition at 200ms too, so the sub-animations should be unified when the tile changes to 150ms.

## Where

| File | Lines | What's there |
| --- | --- | --- |
| `src/components/format-strip/FormatButton.tsx` | 35–42 | The tile's className with `transition-all` and the hover lift |
| `src/components/format-strip/RatioBadges.tsx` | 34 | `transition-colors duration-200` on the badges |

### Current code

```tsx
// src/components/format-strip/FormatButton.tsx:35-42
className={cn(
  'flex shrink-0 snap-start cursor-pointer flex-col items-center justify-start rounded-lg border border-border bg-white/3 p-2 text-white/78 transition-all duration-200',
  'hover:-translate-y-0.5 hover:border-white/26 hover:text-white/92',
  'h-13 w-17 opacity-80',
  ...
```

```tsx
// src/components/format-strip/RatioBadges.tsx:34
'text-xs font-normal leading-none transition-colors duration-200',
```

## Target

In `FormatButton.tsx`, replace the first two strings of the `cn()` call with:

```tsx
'flex shrink-0 snap-start cursor-pointer flex-col items-center justify-start rounded-lg border border-border bg-white/3 p-2 text-white/78 transition-[background-color,border-color,color,opacity,scale] duration-150',
'hover:border-white/26 hover:text-white/92 motion-safe:active:scale-[0.97]',
```

(Leave the remaining strings — `'h-13 w-17 opacity-80'`, the `hasMultiple`, `isActive`, and `md:` strings — untouched.)

In `RatioBadges.tsx`, change `duration-200` to `duration-150` on line 34.

**Why these values:**

- The hover lift is removed rather than moved to a child: the existing border-brighten and text-brighten already carry the hover state, the tiles sit in a horizontally scrolled strip where vertical movement adds nothing spatial, and this strip is used several times per session — less motion is better here.
- The transition list names exactly what changes: hover border/text colors, the `bg-format-active` and `opacity-100` active-state swap, and the new press scale. `scale` (not `transform`) because Tailwind v4 scale utilities use the native `scale` property.
- `duration-150` — top of the hover budget; also matches the Button primitive after plan 001, so the whole strip feels like one system.
- `scale-[0.97]` on `:active` — press feedback felt, not seen; gated `motion-safe:` so nothing moves under `prefers-reduced-motion: reduce`.
- Badge duration matched to the tile so the tile reads as a single entity when selection changes (cohesion rule: sub-animations of one component share timing).
- No easing class: color-only transitions at 150ms are fine on Tailwind v4's default curve.

## Conventions to follow

- Inline Tailwind v4 utilities only; `src/components/booking/MoviePicker.tsx` is the exemplar for scoped transitions.
- After plan 001 lands, `src/components/ui/button.tsx` is the exemplar for the `motion-safe:active:scale-[0.97]` press pattern.

## Steps

1. Edit the two className strings in `src/components/format-strip/FormatButton.tsx`.
2. Change `duration-200` to `duration-150` in `src/components/format-strip/RatioBadges.tsx`.
3. Run `bun run typecheck`.

## Out of scope

- Do not change the active/selected visual design (`bg-format-active`, opacity values).
- Do not touch `FormatStrip.tsx`, `ScrollArea`, or the SVG artwork components.
- Do not add entrance/stagger animation to the strip — it's a persistent navigation surface.

## Verification

**Build**

- [ ] `typecheck` passes.

**Behavior**

- [ ] Hover a tile and park the cursor exactly on its bottom edge: no flicker, because the tile no longer moves.
- [ ] Press and hold a tile: subtle shrink; release: springs back and the selection applies.
- [ ] Select a different format: tile background, opacity, and ratio-badge colors all change over the same 150ms.
- [ ] With `prefers-reduced-motion: reduce`, nothing moves; colors still transition.

**Feel**

- [ ] Sweep across all tiles quickly: hover states should track the cursor without trailing.
- [ ] The press should be felt, not seen — if the shrink is obvious, soften toward `scale-[0.98]`.

## Notes

If a human decides the strip *should* keep a lift for personality, the correct implementation is translating an inner wrapper (a new div around the tile's children), never the button itself — that keeps the hover zone stationary. Default is no lift.
