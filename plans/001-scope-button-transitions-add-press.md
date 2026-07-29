# 001 — Scope the Button primitive's transition and add press feedback

- **Commit:** 8bb5696
- **Severity:** HIGH
- **Category:** Easing & duration (`transition: all`) + Physicality (hover with nothing on `:active`)
- **Estimated scope:** 3 files, ~10 lines

## Problem

The shared Button primitive uses `transition-all`, so every button in the app (Buy Now, Erase, gallery arrows, dialog Confirm/Cancel) animates every animatable property — including layout properties that run off the GPU — whenever anything changes. `transition: all` animates properties you never intended. Separately, no button in the app has any `:active` press feedback: hover with no press response feels dead, as if the action wasn't received. Finally, the Buy Now button lifts *itself* on hover (`hover:-translate-y-px`), the pattern where the hover target moves out from under the cursor at the hover boundary and can flicker.

## Where

| File | Lines | What's there |
| --- | --- | --- |
| `src/components/ui/button.tsx` | 6 | `transition-all` in the cva base class |
| `src/components/booking/BookingActions.tsx` | 57 | `hover:-translate-y-px` on the Buy Now button |
| `src/styles/global.css` | 3–77 | The `@theme` block where the easing token goes |

### Current code

```tsx
// src/components/ui/button.tsx:6
const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-ring/50 cursor-pointer',
```

```tsx
// src/components/booking/BookingActions.tsx:57
className='flex-2 bg-linear-to-b from-marquee-from to-marquee-to font-[Bebas_Neue,PT_Sans,sans-serif] text-base tracking-[0.14em] text-marquee-foreground uppercase shadow-marquee hover:-translate-y-px hover:from-marquee-from hover:to-marquee-to hover:shadow-marquee-lg'
```

## Target

1. In `src/styles/global.css`, add an easing token inside the existing `@theme` block (skip if a token with this exact name already exists — another plan may have added it):

```css
--ease-out-quad: cubic-bezier(0.25, 0.46, 0.45, 0.94);
```

Tailwind v4 turns `--ease-*` theme keys into `ease-*` utilities, so this enables the `ease-out-quad` class.

2. In `button.tsx`, replace `transition-all` in the base class with a scoped transition plus press feedback. The base class becomes:

```
'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,background-color,border-color,box-shadow,opacity,scale] duration-150 ease-out-quad motion-safe:active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-ring/50 cursor-pointer'
```

3. In `BookingActions.tsx`, remove `hover:-translate-y-px` from the Buy Now button's className. Change nothing else in that string — the shadow growth from `shadow-marquee` to `hover:shadow-marquee-lg` carries the lift perception without moving the hover target.

**Why these values:**

- The transition property list covers exactly what buttons actually change: variant colors, borders, the focus ring (box-shadow in Tailwind v4), disabled opacity, and the new press scale. Note it lists `scale`, not `transform` — Tailwind v4 scale utilities use the native `scale` CSS property.
- `duration-150` — button press budget is ~150ms; hover color budget is 100–150ms.
- `cubic-bezier(0.25, 0.46, 0.45, 0.94)` (ease-out-quad) is the catalog's button-press curve; built-in named curves are too weak for deliberate motion.
- `scale-[0.97]` — press feedback should be felt, not seen. 0.9 or lower reads as the button visibly shrinking.
- `motion-safe:` gates the only *movement* here (the press scale) so nothing moves under `prefers-reduced-motion: reduce`; color and shadow feedback still work there.

## Conventions to follow

- All styling in this repo is inline Tailwind v4 utilities; theme tokens live in the `@theme` block of `src/styles/global.css`. Do not create new CSS files.
- `src/components/booking/MoviePicker.tsx` already scopes its transition correctly (`transition-colors`) — that's the house style this plan extends.

## Steps

1. Add `--ease-out-quad` to the `@theme` block in `src/styles/global.css`.
2. Edit the cva base string in `src/components/ui/button.tsx` as specified above.
3. Remove `hover:-translate-y-px` from the Buy Now button in `src/components/booking/BookingActions.tsx`.
4. Run `bun run typecheck` (or `npm run typecheck`).

## Out of scope

- Do not touch the button *variants* (colors, sizes) — only the base string.
- Do not change `Seat.tsx`, `FormatButton.tsx`, or `alert-dialog.tsx`; other plans cover them.
- Do not introduce a motion library.

## Verification

**Build**

- [ ] `typecheck` passes.
- [ ] App builds and renders (`bun run dev`).

**Behavior**

- [ ] Pressing and holding Buy Now, Erase, or a gallery arrow shows a subtle shrink; releasing springs it back.
- [ ] Hovering Buy Now at its bottom edge no longer risks flicker — the button itself does not move; only its shadow deepens.
- [ ] With `prefers-reduced-motion: reduce` emulated in DevTools, nothing moves on press; hover colors and shadows still transition.

**Feel**

- [ ] The press should be felt, not seen — if you can clearly watch the button shrink, reduce toward `scale-[0.98]`, not the other direction.
- [ ] Hover color changes should feel immediate, not swimmy. If they lag, the fix is a shorter duration, not a different curve.

## Notes

The Erase button and dialog Cancel use the `outline` variant and get press feedback automatically from the base class — no per-usage edits needed beyond BookingActions.
