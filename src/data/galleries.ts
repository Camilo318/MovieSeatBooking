/**
 * Stills shown on the auditorium screen, one gallery per title.
 *
 * Folder and file convention:
 *
 *   src/assets/movies/<movie-slug>/<movie-slug>-<NN>.<ext>
 *
 *   - `<movie-slug>` is the movie name in lowercase kebab-case: `The Odyssey` → `the-odyssey`
 *   - `<NN>` is a zero padded sequence starting at 01, in the order the stills should appear
 *   - `<ext>` is whatever the file already is (png, jpg, jpeg, webp)
 *
 * To add a still: drop the file in the movie folder with the next number, then add one
 * `new URL(...)` line to that gallery. To add a movie: create its folder, export a gallery
 * constant here, and reference it from `MOVIE_CATALOG`.
 *
 * Paths stay inline literals on purpose: the bundler resolves them at build time, so a
 * helper that builds the path from a variable would silently ship a broken URL.
 */

export const THE_ODYSSEY_GALLERY: readonly string[] = [
  new URL('../assets/movies/the-odyssey/the-odyssey-01.png', import.meta.url).href,
  new URL('../assets/movies/the-odyssey/the-odyssey-02.png', import.meta.url).href
]

export const SPIDER_MAN_BRAND_NEW_DAY_GALLERY: readonly string[] = [
  new URL(
    '../assets/movies/spider-man-brand-new-day/spider-man-brand-new-day-01.jpeg',
    import.meta.url
  ).href
]
