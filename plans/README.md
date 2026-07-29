# Animation improvement plans

Audit of commit `8bb5696` (2026-07-29), from the improve-animations survey. Each plan is self-contained and written for an executor with no context from the audit.

## Execution order

| Plan | Title | Severity | Status |
| --- | --- | --- | --- |
| [001](001-scope-button-transitions-add-press.md) | Scope the Button primitive's transition and add press feedback | HIGH | DONE |
| [002](002-seat-transition-scope-and-speed.md) | Scope and speed up the seat transition | HIGH | DONE |
| [003](003-screen-morph-stop-page-reflow.md) | Stop the screen's aspect-ratio morph from reflowing the whole page | HIGH | DONE |
| [004](004-format-button-hover-press.md) | Fix the format button's hover physics and add press feedback | MEDIUM | DONE |
| [005](005-alert-dialog-entrance.md) | Give the confirm dialog an entrance | MEDIUM | DONE |

## Dependencies

- Plans are order-independent: each one that needs an easing token adds it to `@theme` in `src/styles/global.css` itself, with a "skip if already present" guard. Running 001 first is still recommended — it establishes the press-feedback pattern that 004 cites as an exemplar.
- 001, 003, 004, and 005 all touch the `@theme` block of `src/styles/global.css` (additive, non-conflicting lines). If executed in parallel worktrees, expect a trivial merge there.
- 001 and 004 both edit hover/press behavior; review them together for consistency.

## Deferred (no plan written)

- **Gallery still crossfade** (LOW, missed opportunity): the prev/next arrows in `src/components/auditorium/ScreenGallery.tsx` swap the `<img>` src instantly. A ≤200ms crossfade with ~2px of blur during the swap would smooth it. Deferred because it needs a second stacked image element and the instant swap is not a defect.
- **Seat touch targets** (accessibility, not motion): seats are 20×16px, far below the 44×44px guideline, but expanding hitboxes in a dense grid would make them overlap. A design decision for a human, not an animation plan.

## Vetted and passing — do not "fix"

- Sonner's toast motion and timing are the library's deliberate design.
- Tailwind v4 already gates `hover:` variants behind `(hover: hover)`; no touch-hover work needed.
- No `ease-in`, `linear` misuse, `@keyframes` interruptibility bugs, or `scale(0)` entrances exist in the codebase.
