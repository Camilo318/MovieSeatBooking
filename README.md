# Movie Seat Booking

A simple interface to choose and buy movie tickets.

Each movie has its own seats, so you can switch between movies and the selected and occupied spots will remain for that movie.

## Stack

- [Bun](https://bun.sh/) — runtime & package manager
- [TypeScript](https://www.typescriptlang.org/)
- [Parcel](https://parceljs.org/) — bundler & local dev server

## Setup

```bash
bun install
```

## Local development

```bash
bun run dev
```

Parcel serves the app at [http://localhost:1234](http://localhost:1234) with hot reload.

## Scripts

| Command | Description |
| --- | --- |
| `bun run dev` | Start Parcel dev server |
| `bun run build` | Production build to `dist/` |
| `bun run typecheck` | Type-check with `tsc` |
| `bun run clean` | Remove `dist/` and Parcel cache |
