import { useState } from "react";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() {
  const [count, setCount] = useState(tempMovieData.length);

  return (
    <>
      <NavigationBar moviesCount={count} />
      <Main setMoviesCount={(v) => setCount(v)} />
    </>
  );
}

function Main({ setMoviesCount }) {
  return (
    <main className="main">
      <MoviesBox setTotalCount={setMoviesCount} />
      <WatchedBox />
    </main>
  );
}

function WatchedBox() {
  const [watched, setWatched] = useState(tempWatchedData);
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      <WatchedSummary watched={watched} />
      {isOpen && <MoviesList list={watched} showStats={true} />}
    </div>
  );
}

function WatchedSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <MovieStats
          imdbRating={avgImdbRating}
          userRating={avgUserRating}
          runtime={avgRuntime}
        />
      </div>
    </div>
  );
}

function MoviesBox({ setTotalCount }) {
  const [movies, setMovies] = useState(tempMovieData);
  const [isOpen, setIsOpen] = useState(true);

  setTotalCount(movies.length);
  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && <MoviesList list={movies} />}
    </div>
  );
}

function MoviesList({ list, showStats }) {
  return (
    <ul className="list">
      {list.map((movie) => (
        <MovieItem key={list.imdbID} movie={movie} showStats={showStats} />
      ))}
    </ul>
  );
}

function MovieItem({ movie, showStats, key }) {
  return (
    <li key={key}>
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

function MovieStats({ imdbRating, userRating, runtime }) {
  return (
    <>
      <p>
        <span>⭐️</span>
        <span>{imdbRating}</span>
      </p>
      <p>
        <span>🌟</span>
        <span>{userRating}</span>
      </p>
      <p>
        <span>⏳</span>
        <span>{runtime} min</span>
      </p>
    </>
  );
}

function MovieYear({ year }) {
  return (
    <p>
      <span>🗓</span>
      <span>{year}</span>
    </p>
  );
}

function NavigationBar({ moviesCount }) {
  return (
    <nav className="nav-bar">
      <Logo />
      <Search />
      <ResultsCount moviesCount={moviesCount} />
    </nav>
  );
}

function ResultsCount({ moviesCount }) {
  return (
    <p className="num-results">
      Found <strong>{moviesCount}</strong> results
    </p>
  );
}

function Search() {
  const [query, setQuery] = useState("");
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}
