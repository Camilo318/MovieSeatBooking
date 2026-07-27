import { Cinema } from './Cinema';
import { MOVIE_CATALOG } from './data/movies';
import { populateFormatSelector } from './formatSelector';
import { Movie } from './Movie';
import { aspectRatioClassName } from './types/formats';
import type { AspectRatioId } from './types/formats';

const SCREEN_RATIO_CLASSES = [
  'ratio-1-43',
  'ratio-1-85',
  'ratio-1-90',
  'ratio-2-20',
  'ratio-2-39',
] as const;

const AUDITORIUM_ROWS = 9;
const SEATS_PER_ROW = 14;

document.addEventListener('DOMContentLoaded', openCinema);

function openCinema(): void {
  const seatMap = document.getElementById('seat-map');

  if (!(seatMap instanceof HTMLElement)) {
    throw new Error('Missing seat map element');
  }

  buildSeatMap(seatMap, AUDITORIUM_ROWS, SEATS_PER_ROW);

  const seats = document.querySelectorAll('.row .seat');
  const buyBtn = document.querySelector('.confirm-btn');
  const deleteBtn = document.querySelector('.erase-btn');
  const formatSelector = document.getElementById('format-selector');
  const movieSelect = document.getElementById('movie');
  const container = document.querySelector('.container');
  const screen = document.getElementById('auditorium-screen');
  const screenMedia = screen?.querySelector('.screen__media');
  const activeFormatLabel = document.getElementById('active-format');
  const ticketPriceLabel = document.getElementById('ticket-price');
  const prevStillBtn = document.getElementById('screen-prev');
  const nextStillBtn = document.getElementById('screen-next');

  if (
    !(movieSelect instanceof HTMLSelectElement) ||
    !(buyBtn instanceof HTMLButtonElement) ||
    !(deleteBtn instanceof HTMLButtonElement) ||
    !(formatSelector instanceof HTMLElement) ||
    !(container instanceof HTMLElement) ||
    !(screen instanceof HTMLElement) ||
    !(screenMedia instanceof HTMLImageElement) ||
    !(activeFormatLabel instanceof HTMLElement) ||
    !(ticketPriceLabel instanceof HTMLElement) ||
    !(prevStillBtn instanceof HTMLButtonElement) ||
    !(nextStillBtn instanceof HTMLButtonElement)
  ) {
    throw new Error('Missing required DOM elements');
  }

  const gallery = {
    image: screenMedia,
    prevBtn: prevStillBtn,
    nextBtn: nextStillBtn,
  };

  const movies = MOVIE_CATALOG.map(
    ({ name, presentations, media }) =>
      new Movie(name, presentations, media),
  );

  populateMovieSelect(movieSelect, movies);

  const cinema = new Cinema(movies, seats);

  const syncCurrentMovieView = (): void => {
    const movie = movies[movieSelect.selectedIndex];
    cinema.showSeats(movieSelect.selectedIndex);
    renderFormatsForMovie(movie);
  };

  const renderFormatsForMovie = (
    movie: Movie,
    nextActiveFormatId?: string,
  ): void => {
    if (nextActiveFormatId) {
      movie.selectFormat(nextActiveFormatId);
    }

    const activeFormat = movie.activeFormat;
    applyScreenRatio(screen, movie.activeAspectRatio);
    renderScreenMedia(movie);

    activeFormatLabel.textContent = activeFormat?.name ?? 'Digital';
    ticketPriceLabel.textContent = `$${movie.price} / ticket`;

    populateFormatSelector({
      container: formatSelector,
      movie,
      activeFormatId: activeFormat?.id,
      onSelect: (formatId) => {
        renderFormatsForMovie(movie, formatId);
        cinema.updateSelection(movie.price);
      },
    });
  };

  function renderScreenMedia(movie: Movie): void {
    const still = movie.currentMedia;

    if (still) {
      gallery.image.src = still;
      gallery.image.alt = `${movie.name} still ${movie.mediaIndex + 1} of ${movie.media.length}`;
      gallery.image.hidden = false;
    } else {
      gallery.image.removeAttribute('src');
      gallery.image.alt = '';
      gallery.image.hidden = true;
    }

    gallery.prevBtn.hidden = !movie.hasMediaGallery;
    gallery.nextBtn.hidden = !movie.hasMediaGallery;
  }

  const stepStill = (offset: number): void => {
    const movie = movies[movieSelect.selectedIndex];
    movie.stepMedia(offset);
    renderScreenMedia(movie);
  };

  gallery.prevBtn.addEventListener('click', () => stepStill(-1));
  gallery.nextBtn.addEventListener('click', () => stepStill(1));

  syncCurrentMovieView();

  container.addEventListener('click', (e) => {
    const target = e.target;

    if (
      target instanceof HTMLElement &&
      target.classList.contains('seat') &&
      !target.classList.contains('occupied')
    ) {
      cinema.selectSeat(target, movieSelect.selectedIndex);
    }
  });

  movieSelect.addEventListener('change', () => {
    syncCurrentMovieView();
  });

  buyBtn.addEventListener('click', () => {
    cinema.buyTickets(movieSelect.selectedIndex);
  });

  deleteBtn.addEventListener('click', () => {
    cinema.deleteSeats(movieSelect.selectedIndex);
  });
}

function applyScreenRatio(
  screen: HTMLElement,
  aspectRatio?: AspectRatioId,
): void {
  screen.classList.remove(...SCREEN_RATIO_CLASSES);

  if (aspectRatio) {
    screen.classList.add(aspectRatioClassName(aspectRatio));
  }
}

function buildSeatMap(
  seatMap: HTMLElement,
  rows: number,
  seatsPerRow: number,
): void {
  seatMap.innerHTML = '';

  for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
    const row = document.createElement('div');
    const rowLetter = String.fromCharCode(65 + rowIndex);
    row.className = 'row';

    const leadingLabel = document.createElement('span');
    leadingLabel.className = 'row__label';
    leadingLabel.textContent = rowLetter;
    row.append(leadingLabel);

    for (let seatIndex = 0; seatIndex < seatsPerRow; seatIndex++) {
      const seat = document.createElement('div');
      seat.className = 'seat';
      row.append(seat);
    }

    const trailingLabel = document.createElement('span');
    trailingLabel.className = 'row__label';
    trailingLabel.textContent = rowLetter;
    row.append(trailingLabel);

    seatMap.append(row);
  }
}

function populateMovieSelect(
  movieSelect: HTMLSelectElement,
  movies: readonly Movie[],
): void {
  movieSelect.innerHTML = '';

  movies.forEach((movie, index) => {
    const option = document.createElement('option');
    option.value = String(index);
    option.textContent = `${movie.name} (from $${movie.lowestPrice})`;
    movieSelect.append(option);
  });
}
