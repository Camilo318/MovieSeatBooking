import swal from 'sweetalert'
import type { Movie } from './Movie'

export class Cinema {
  movies: Movie[]
  seats: HTMLElement[]
  count: HTMLElement
  total: HTMLElement
  selectedSeats: NodeListOf<Element> | null

  constructor(movies: Movie[], seats: NodeListOf<Element>) {
    this.movies = movies
    this.seats = [...seats] as HTMLElement[]

    const count = document.querySelector('#count')
    const total = document.querySelector('#price')

    if (!count || !total) {
      throw new Error('Missing #count or #price elements in the DOM')
    }

    this.count = count as HTMLElement
    this.total = total as HTMLElement
    this.selectedSeats = null
  }

  selectSeat(seat: HTMLElement, movieIndex: number): void {
    const seatIndex = this.seats.indexOf(seat)
    const movie = this.movies[movieIndex]

    if (movie.seats.includes(seatIndex)) {
      const indexPos = movie.seats.indexOf(seatIndex)
      movie.seats.splice(indexPos, 1)
    } else {
      movie.seats.push(seatIndex)
    }

    this.showSeats(movieIndex)
  }

  showSeats(movieIndex: number): void {
    this.seats.forEach(seat => {
      seat.classList.remove('selected')
      seat.classList.remove('occupied')
    })

    this.movies[movieIndex].seats.forEach(spot => {
      this.seats[spot].classList.add('selected')
    })

    this.movies[movieIndex].occupiedSeats.forEach(spot => {
      this.seats[spot].className = 'seat occupied'
    })

    this.updateSelection(this.movies[movieIndex].price)
  }

  updateSelection(price: number): void {
    this.selectedSeats = document.querySelectorAll(
      '.row .seat.selected'
    )
    this.count.innerText = String(this.selectedSeats.length)
    this.total.innerText = `$${this.selectedSeats.length * price}`
  }

  buyTickets(movieIndex: number): void {
    const { name, price, seats } = this.movies[movieIndex]
    const spots = seats.length

    if (spots > 0) {
      void swal({
        title: 'Confirm Movie And Payment',
        text: `${name}
Spots: ${spots}
Total Payment: ${spots * price}`,
        icon: 'warning',
        buttons: ['Cancel', 'Confirm']
      }).then(value => {
        if (value) {
          void swal(
            'Tickets Purchased!',
            'Enjoy the movie 😃🍿',
            'success'
          )
          this.movies[movieIndex].occupiedSeats.push(...seats)
          this.movies[movieIndex].seats = []
          this.showSeats(movieIndex)
        }
      })
    } else {
      void swal(
        'No seats selected',
        'Please select some seats',
        'error'
      )
    }
  }

  deleteSeats(movieIndex: number): void {
    this.movies[movieIndex].occupiedSeats = []
    this.movies[movieIndex].seats = []
    this.showSeats(movieIndex)
  }
}
