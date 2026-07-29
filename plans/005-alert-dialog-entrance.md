# 005 — Give the confirm dialog an entrance

- **Commit:** 8bb5696
- **Severity:** MEDIUM
- **Category:** Missed opportunities (dialog appears instantly, where a sudden appearance feels off)
- **Estimated scope:** 2 files, ~6 lines

## Problem

The confirm-purchase dialog and its overlay pop into existence with zero transition — a full-screen dim plus a centered panel appearing in a single frame is exactly the jarring change animation exists to prevent. It's an occasional surface (once per purchase), which per the frequency table warrants a standard animation. The component conditionally mounts via `createPortal`, so the entrance can be pure CSS with `@starting-style` — no `mounted` state, no `useEffect`.

## Where

| File | Lines | What's there |
| --- | --- | --- |
| `src/components/ui/alert-dialog.tsx` | 50–68 | Overlay div and content div, rendered on mount with no transition |
| `src/styles/global.css` | 3–77 | The `@theme` block where the easing token goes |

### Current code

```tsx
// src/components/ui/alert-dialog.tsx:52-63
<div
  className='fixed inset-0 z-50 bg-overlay'
  onClick={() => ctx.setOpen(false)}
  aria-hidden='true'
/>
<div
  role='alertdialog'
  aria-modal='true'
  className={cn(
    'fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border border-border bg-background p-6 shadow-lg sm:max-w-lg',
    className
  )}>
```

## Target

1. In `src/styles/global.css`, add to the existing `@theme` block (skip if already present):

```css
--ease-out-quint: cubic-bezier(0.23, 1, 0.32, 1);
```

2. Overlay className becomes:

```
'fixed inset-0 z-50 bg-overlay transition-opacity duration-200 starting:opacity-0'
```

3. Content div: add these classes to the existing string (change nothing else in it):

```
scale-100 transition-[opacity,scale] duration-200 ease-out-quint starting:scale-96 starting:opacity-0 motion-reduce:starting:scale-100
```

Tailwind v4's `starting:` variant compiles to `@starting-style`; the browser transitions from those values to the normal ones on first render.

**Why these values:**

- `scale-96` → `scale-100`, never from 0: nothing appears from nothing — a near-full start reads as "it was always almost there". The explicit base `scale-100` is required so the `scale` property has a concrete end value to transition to (transitioning to `scale: none` does not interpolate).
- `scale` utilities are used (not a transform class) so the entrance never touches the `translate-x/y-[-50%]` centering, which lives on the separate `translate` property in Tailwind v4.
- `duration-200` — bottom of the 200–500ms modal budget; this is a small confirm dialog, not a full-screen sheet.
- `cubic-bezier(0.23, 1, 0.32, 1)` (ease-out-quint) — entrances get ease-out, and built-in named curves are too weak; quint front-loads the movement so 200ms feels crisp.
- `transform-origin` stays at the default center — modals are the exemption to the "originate from the trigger" rule; they appear centered.
- `motion-reduce:starting:scale-100` — under `prefers-reduced-motion: reduce` the scale start equals the end, so only opacity animates: gentler, not gone.
- Overlay fades on the default curve: opacity belongs to the `ease` category and needs no token.
- No exit animation: the component unmounts synchronously and the user has already decided to dismiss — an instant exit is acceptable and simpler than retaining mount state. (Browsers without `@starting-style` degrade to the current instant appearance.)

## Conventions to follow

- Inline Tailwind v4 utilities; theme tokens in the `@theme` block of `src/styles/global.css`.
- Keep the hand-rolled dialog as is — do not swap it for Radix or another primitive.

## Steps

1. Add `--ease-out-quint` to `@theme` in `src/styles/global.css`.
2. Add the classes to the overlay div and content div in `alert-dialog.tsx` as specified.
3. Run `bun run typecheck`.

## Out of scope

- No exit animation, no `mounted` state, no `useEffect`, no animation library.
- Do not change dialog structure, focus behavior, or the buttons inside it.
- Do not animate the toast that follows confirmation — Sonner handles its own motion.

## Verification

**Build**

- [ ] `typecheck` passes.

**Behavior**

- [ ] Select seats, click Buy Now: overlay fades in and the panel scales from 96% to 100% while fading, over 200ms, staying perfectly centered throughout.
- [ ] Cancel and immediately reopen: the entrance replays cleanly each time.
- [ ] With `prefers-reduced-motion: reduce` emulated, the panel only fades — no scale movement.

**Feel**

- [ ] Record and scrub: the panel should land decisively with a gentle settle. If the entrance feels flat, the curve is too weak — not the duration.
- [ ] The overlay and panel must read as one event, not two — both run 200ms; if the overlay visibly lags the panel, something regressed.
