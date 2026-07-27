import swal from 'sweetalert';
import type { Movie } from './Movie';

export class Cinema {
  movies: Movie[];
  seats: HTMLElement[];
  count: HTMLElement;
  total: HTMLElement;
  selectedSeats: NodeListOf<Element> | null;

  constructor(movies: Movie[], seats: NodeListOf<Element>) {
    this.movies = movies;
    this.seats = [...seats] as HTMLElement[];

    const count = document.querySelector('#count');
    const total = document.querySelector('#price');

    if (!count || !total) {
      throw new Error('Missing #count or #price elements in the DOM');
    }

    this.count = count as HTMLElement;
    this.total = total as HTMLElement;
    this.selectedSeats = null;
  }

  selectSeat(seat: HTMLElement, index: number): void {
    const seatIndex = this.seats.indexOf(seat);
    const movie = this.movies[index];

    if (movie.seats.includes(seatIndex)) {
      const indexPos = movie.seats.indexOf(seatIndex);
      movie.seats.splice(indexPos, 1);
    } else {
      movie.seats.push(seatIndex);
    }

    this.showSeats(index);
  }

  showSeats(index: number): void {
    this.seats.forEach((seat) => {
      seat.classList.remove('selected');
      seat.classList.remove('occupied');
    });

    this.movies[index].seats.forEach((spot) => {
      this.seats[spot].classList.add('selected');
    });

    this.movies[index].occupiedSeats.forEach((spot) => {
      this.seats[spot].className = 'seat occupied';
    });

    this.updateSelection(this.movies[index].price);
  }

  updateSelection(price: number): void {
    this.selectedSeats = document.querySelectorAll('.row .seat.selected');
    this.count.innerText = String(this.selectedSeats.length);
    this.total.innerText = `$${this.selectedSeats.length * price}`;
  }

  buyTickets(index: number): void {
    const { name, price, seats } = this.movies[index];
    const spots = seats.length;

    if (spots > 0) {
      void swal({
        title: 'Confirm Movie And Payment',
        text: `${name}
Spots: ${spots}
Total Payment: ${spots * price}`,
        icon: 'warning',
        buttons: ['Cancel', 'Confirm'],
      }).then((value) => {
        if (value) {
          void swal('Tickets Purchased!', 'Enjoy the movie 😃🍿', 'success');
          this.movies[index].occupiedSeats.push(...seats);
          this.movies[index].seats = [];
          this.showSeats(index);
        }
      });
    } else {
      void swal('No seats selected', 'Please select some seats', 'error');
    }
  }

  deleteSeats(index: number): void {
    this.movies[index].occupiedSeats = [];
    this.movies[index].seats = [];
    this.showSeats(index);
  }
}
