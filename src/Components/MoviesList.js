import { MovieItem } from "./MovieItem";

export function MoviesList({ movies, showStats, onSelect, onDelete }) {
  return (
    <ul className="list list-movies">
      {movies.map((movie) => (
        <MovieItem
          key={movie.imdbID}
          movie={movie}
          showStats={showStats}
          onSelectMovie={onSelect}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
