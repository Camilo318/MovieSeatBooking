import type { Auditorium, Seat } from '@/types/domain'

/** Build the full seat grid for an auditorium */
export function buildSeatGrid(auditorium: Auditorium): Seat[] {
  const seats: Seat[] = []

  for (let rowIndex = 0; rowIndex < auditorium.rows; rowIndex++) {
    const row = String.fromCharCode(65 + rowIndex)

    for (let number = 1; number <= auditorium.seatsPerRow; number++) {
      seats.push({ id: `${row}${number}`, row, number })
    }
  }

  return seats
}
