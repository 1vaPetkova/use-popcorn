import { useEffect, useState } from "react";

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
import { useMovies } from "./useMovies.js";
import { useLocalStorageState } from "./useLocalStorageState.js";

export default function App() {
  const [watched, setWatched] = useLocalStorageState([], "watched");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const { movies, isLoading, errorMessage } = useMovies(
    query,
    handleCloseSelection
  );

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
