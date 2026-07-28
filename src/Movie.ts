import type {
  AspectRatioId,
  ExhibitionFormat,
  MoviePresentation
} from './types/formats'

export class Movie {
  /** Name of the movie */
  name: string
  /** Formats this title played in, each with the ratios it was framed at */
  presentations: readonly MoviePresentation[]
  /** Stills shown on the auditorium screen */
  media: readonly string[]
  /** Index of the still currently on screen */
  mediaIndex: number
  /** Id of the format the guest is currently booking */
  activeFormatId?: string
  /** Which of the active presentation's aspect ratios is on screen */
  activeRatioIndex: number
  /** Indexes of selected seats within the global (auditorium seats) array */
  seats: number[]
  /** Indexes of occupied seats within the global (auditorium seats) array */
  occupiedSeats: number[]

  constructor(
    name: string,
    presentations: readonly MoviePresentation[] = [],
    media: readonly string[] = []
  ) {
    this.name = name
    this.presentations = presentations
    this.media = media
    this.mediaIndex = 0
    this.activeFormatId = presentations[0]?.format.id
    this.activeRatioIndex = 0
    this.seats = []
    this.occupiedSeats = []
  }

  get aspectRatios(): AspectRatioId[] {
    return [
      ...new Set(
        this.presentations.flatMap(presentation => presentation.aspectRatios)
      )
    ]
  }

  get activePresentation(): MoviePresentation | undefined {
    return (
      this.getPresentation(this.activeFormatId ?? '') ?? this.presentations[0]
    )
  }

  get activeFormat(): ExhibitionFormat | undefined {
    return this.activePresentation?.format
  }

  /** Aspect ratio currently framed on the auditorium screen */
  get activeAspectRatio(): AspectRatioId | undefined {
    return this.activePresentation?.aspectRatios[this.activeRatioIndex]
  }

  /** Ticket price comes from the chosen exhibition format, not from the title */
  get price(): number {
    return this.activeFormat?.price ?? 0
  }

  /** Cheapest way to watch this title, used for the "from $X" hint */
  get lowestPrice(): number {
    return this.presentations.reduce(
      (cheapest, { format }) => Math.min(cheapest, format.price),
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

  getPresentation(formatId: string): MoviePresentation | undefined {
    return this.presentations.find(
      presentation => presentation.format.id === formatId
    )
  }

  /**
   * Picks a format, or cycles through its aspect ratios when it is already the
   * active one: The Odyssey plays Dolby at either 1.85:1 or 2.39:1, while
   * Toy Story 5 only ever runs at 1.85:1.
   */
  selectFormat(id: string): void {
    if (!this.getPresentation(id)) {
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
    const total = this.activePresentation?.aspectRatios.length ?? 0

    if (!total) {
      return
    }

    this.activeRatioIndex = (this.activeRatioIndex + 1) % total
  }
}
