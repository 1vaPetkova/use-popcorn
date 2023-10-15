import { MovieStats } from "./MovieStats";
import { MovieYear } from "./MovieYear";

export function MovieItem({ movie, showStats, onSelectMovie }) {
  return (
    <li onClick={() => onSelectMovie(movie.imdbID)} key={movie.imdbID}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        {showStats ? (
          <MovieStats
            imdbRating={movie.imdbRating}
            userRating={movie.userRating}
            runtime={movie.runtime}
          />
        ) : (
          <MovieYear year={movie.Year} />
        )}
      </div>
    </li>
  );
}
