import { useEffect, useState } from "react";
import { API_KEY } from "./Constants.js";
import {
  NavigationBar,
  Logo,
  Search,
  ResultsCount,
} from "./Components/NavigationBar.js";
import { WatchedSummary } from "./Components/WatchedSummary.js";
import { MoviesBox } from "./Components/MoviesBox.js";
import { Loader } from "./Components/Loader.js";
import { MoviesList } from "./Components/MoviesList.js";
import { ErrorMessage } from "./Components/ErrorMessage.js";
import { MovieDetails } from "./Components/MovieDetails.js";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  function handleSelect(id) {
    setSelectedId(id === selectedId ? null : id);
  }

  function handleCloseSelection() {
    setSelectedId(null);
  }

  function handleAddToWatched(movie) {
    setWatched(watched.filter((m) => m.imdbID !== movie.imdbID));
    setWatched((w) => [...w, movie]);
  }

  function handleDeleteMovie(movieId) {
    setWatched((w) => w.filter((m) => m.imdbID !== movieId));
  }

  useEffect(
    function () {
      async function fetchMovies() {
        try {
          setIsLoading(true);
          setErrorMessage("");
          const result = await fetch(
            `http://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`
          );

          if (!result.ok) {
            throw new Error(
              "Something went wrong while fetching the movies! :("
            );
          }
          const data = await result.json();
          if (!data || !data.Search) {
            throw new Error("No movies found! :(");
          }
          setMovies(data.Search);
        } catch (err) {
          console.error(err);
          setErrorMessage(err.message);
        } finally {
          setIsLoading(false);
        }
      }
      if (query.trim().length < 3) {
        setMovies([]);
        setErrorMessage("");
        return;
      }
      fetchMovies();
    },
    [query]
  );

  return (
    <>
      <NavigationBar>
        <Logo />
        <Search query={query} setQuery={(q) => setQuery(q)} />
        <ResultsCount moviesCount={movies.length} />
      </NavigationBar>
      <Main>
        <MoviesBox>
          {isLoading && <Loader />}
          {!isLoading && !errorMessage && (
            <MoviesList
              movies={movies}
              setMovies={(m) => setWatched(m)}
              onSelect={handleSelect}
            />
          )}
          {errorMessage && <ErrorMessage message={errorMessage} />}
        </MoviesBox>
        <MoviesBox>
          {selectedId ? (
            <MovieDetails
              watched={watched}
              selectedId={selectedId}
              onClose={handleCloseSelection}
              onAdd={handleAddToWatched}
            />
          ) : (
            <>
              <WatchedSummary movies={watched} />
              <MoviesList
                movies={watched}
                showStats={true}
                onSelect={handleSelect}
                onDelete={handleDeleteMovie}
              />
            </>
          )}
        </MoviesBox>
      </Main>
    </>
  );
}

function Main({ children }) {
  return <main className="main">{children}</main>;
}
