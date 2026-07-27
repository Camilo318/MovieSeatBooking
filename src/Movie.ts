import type { AspectRatioId, ExhibitionFormat } from './types/formats'

export class Movie {
  /** Name of the movie */
  name: string
  /** Supported exhibition formats for this title */
  formats: readonly ExhibitionFormat[]
  /** Stills shown on the auditorium screen */
  media: readonly string[]
  /** Index of the still currently on screen */
  mediaIndex: number
  /** Id of the format the guest is currently booking */
  activeFormatId?: string
  /** Which of the active format's aspect ratios is on screen */
  activeRatioIndex: number
  /** Indexes of selected seats within the global (auditorium seats) array */
  seats: number[]
  /** Indexes of occupied seats within the global (auditorium seats) array */
  occupiedSeats: number[]

  constructor(
    name: string,
    formats: readonly ExhibitionFormat[] = [],
    media: readonly string[] = []
  ) {
    this.name = name
    this.formats = formats
    this.media = media
    this.mediaIndex = 0
    this.activeFormatId = formats[0]?.id
    this.activeRatioIndex = 0
    this.seats = []
    this.occupiedSeats = []
  }

  get aspectRatios(): AspectRatioId[] {
    return [
      ...new Set(this.formats.flatMap(format => format.aspectRatios))
    ]
  }

  get activeFormat(): ExhibitionFormat | undefined {
    return (
      this.getFormat(this.activeFormatId ?? '') ?? this.formats[0]
    )
  }

  /** Aspect ratio currently framed on the auditorium screen */
  get activeAspectRatio(): AspectRatioId | undefined {
    return this.activeFormat?.aspectRatios[this.activeRatioIndex]
  }

  /** Ticket price comes from the chosen exhibition format, not from the title */
  get price(): number {
    return this.activeFormat?.price ?? 0
  }

  /** Cheapest way to watch this title, used for the "from $X" hint */
  get lowestPrice(): number {
    return this.formats.reduce(
      (cheapest, format) => Math.min(cheapest, format.price),
      Infinity
    )
  }

  get currentMedia(): string | undefined {
    return this.media[this.mediaIndex]
  }

  get hasMediaGallery(): boolean {
    return this.media.length > 1
  }

  /** Steps through the gallery, wrapping around at either end */
  stepMedia(offset: number): void {
    const total = this.media.length

    if (!total) {
      return
    }

    this.mediaIndex = (this.mediaIndex + offset + total) % total
  }

  getFormat(id: string): ExhibitionFormat | undefined {
    return this.formats.find(format => format.id === id)
  }

  /**
   * Picks a format, or cycles through its aspect ratios when it is already the
   * active one: formats like Dolby Cinema play either 1.85:1 or 2.39:1.
   */
  selectFormat(id: string): void {
    if (!this.getFormat(id)) {
      return
    }

    if (this.activeFormatId === id) {
      this.cycleAspectRatio()
      return
    }

    this.activeFormatId = id
    this.activeRatioIndex = 0
  }

  cycleAspectRatio(): void {
    const total = this.activeFormat?.aspectRatios.length ?? 0

    if (!total) {
      return
    }

    this.activeRatioIndex = (this.activeRatioIndex + 1) % total
  }
}
