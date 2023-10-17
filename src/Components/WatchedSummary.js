import { MovieStats } from "./MovieStats";

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export function WatchedSummary({ movies }) {
  const avgImdbRating = average(
    movies.map((movie) => movie.imdbRating)
  ).toFixed(2);
  const avgUserRating = average(
    movies.map((movie) => movie.userRating)
  ).toFixed(2);
  const avgRuntime = average(
    movies.map((movie) => {
      if (movie.Runtime === "N/A") {
        return 0;
      }
      return Number(movie.Runtime.split(" ").at(0));
    })
  ).toFixed(2);

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{movies.length} movies</span>
        </p>
        <MovieStats
          imdbRating={avgImdbRating}
          userRating={avgUserRating}
          runtime={avgRuntime ?? ""}
        />
      </div>
    </div>
  );
}
