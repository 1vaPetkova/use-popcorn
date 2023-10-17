import { MovieStats } from "./MovieStats";
import { MovieYear } from "./MovieYear";

export function MovieItem({ movie, showStats, onSelectMovie, onDelete }) {
  function handleSelect() {
    onSelectMovie(movie.imdbID);
  }
  return (
    <li>
      <img
        onClick={handleSelect}
        src={movie.Poster}
        alt={`${movie.Title} poster`}
      />
      <h3 onClick={handleSelect} key={movie.imdbID}>
        {movie.Title}
      </h3>
      <div>
        {showStats ? (
          <>
            <MovieStats
              imdbRating={movie.imdbRating}
              userRating={movie.userRating}
              runtime={movie.Runtime}
            />
            <button
              className="btn-delete"
              onClick={() => onDelete(movie.imdbID)}
            >
              X
            </button>
          </>
        ) : (
          <MovieYear year={movie.Year} />
        )}
      </div>
    </li>
  );
}
