import type { ComponentType } from 'react'
import {
  DigitalGraphic,
  DigitalLogo,
  DolbyCinemaGraphic,
  DolbyCinemaLogo,
  Imax70Graphic,
  Imax70Logo,
  ImaxGraphic,
  ImaxLogo,
  PlfGraphic,
  PlfLogo,
  SeventyMmGraphic,
  SeventyMmLogo,
  ThirtyFiveMmGraphic,
  ThirtyFiveMmLogo
} from './FormatArtwork'

export type FormatArtworkPair = {
  Graphic: ComponentType
  Logo: ComponentType
}

export const FORMAT_ARTWORK: Record<string, FormatArtworkPair> = {
  digital: { Graphic: DigitalGraphic, Logo: DigitalLogo },
  'imax-70mm': { Graphic: Imax70Graphic, Logo: Imax70Logo },
  imax: { Graphic: ImaxGraphic, Logo: ImaxLogo },
  '70mm': { Graphic: SeventyMmGraphic, Logo: SeventyMmLogo },
  '35mm': { Graphic: ThirtyFiveMmGraphic, Logo: ThirtyFiveMmLogo },
  'dolby-cinema': { Graphic: DolbyCinemaGraphic, Logo: DolbyCinemaLogo },
  'premium-large-format': { Graphic: PlfGraphic, Logo: PlfLogo }
}

export function getFormatArtwork(formatId: string): FormatArtworkPair {
  return FORMAT_ARTWORK[formatId] ?? FORMAT_ARTWORK.digital
}
