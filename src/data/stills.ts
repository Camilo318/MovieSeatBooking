/**
 * Auditorium screen stills — paste Cloudinary delivery URLs here.
 *
 * - One exported array per title that has a gallery.
 * - Order in the array is the gallery sequence (first URL = slide 1).
 * - Use the full HTTPS URL Cloudinary gives you (Copy URL / secure_url).
 * - Prefer tall master images; the screen crops with object-cover per aspect ratio.
 * - Wire each array into `MOVIE_CATALOG` in `movies.ts` via the `stills` field.
 */

/** The Odyssey — paste URLs below */
export const THE_ODYSSEY_STILLS = [
  'https://res.cloudinary.com/zyf9iafq/image/upload/v1785269873/IMG_2984_egqoza.png',
  'https://res.cloudinary.com/zyf9iafq/image/upload/v1785269874/IMG_2985_j5v1b2.png'
] as const

/** Interstellar — paste URLs below */
export const INTERSTELLAR_STILLS = [
  'https://res.cloudinary.com/zyf9iafq/image/upload/v1785269873/IMG_2990_naljfm.png',
  'https://res.cloudinary.com/zyf9iafq/image/upload/v1785269873/IMG_2989_s7vliy.jpg'
] as const

/** Spider-Man: Brand New Day — paste URLs below */
export const SPIDER_MAN_BRAND_NEW_DAY_STILLS = [
  'https://res.cloudinary.com/zyf9iafq/image/upload/v1785269579/IMG_2965_inxnyp.jpg',
  'https://res.cloudinary.com/zyf9iafq/image/upload/v1785269873/IMG_2991_zenamb.jpg',
  'https://res.cloudinary.com/zyf9iafq/image/upload/v1785269873/IMG_2992_bijjsc.jpg'
] as const

export const OPPENHEIMER_STILLS = [
  'https://res.cloudinary.com/zyf9iafq/image/upload/v1785370812/blog-oppenheimer-70mm-5_rjmava.jpg',
  'https://res.cloudinary.com/zyf9iafq/image/upload/v1785371391/oppenheimer-02_m8pbe7.jpg'
] as const

export const THE_DARK_KNIGHT_STILLS = [
  'https://res.cloudinary.com/zyf9iafq/image/upload/v1785372136/the-dark-knight_vzoehr.webp'
] as const

export const SINNER_STILLS = [
  'https://res.cloudinary.com/zyf9iafq/image/upload/v1785372512/sinners-01_slza8x.webp'
] as const
