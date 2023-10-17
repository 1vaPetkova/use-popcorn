import { useEffect, useState } from "react";
import { API_KEY } from "../Constants";
import StarRating from "./StarRating";
import { Loader } from "./Loader";
import { ErrorMessage } from "./ErrorMessage";

export function MovieDetails({ watched, selectedId, onClose, onAdd }) {
  const [details, setDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const existing = watched.find((w) => w.imdbID === selectedId);

  const {
    imdbID,
    Title: title,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = details;

  useEffect(
    function () {
      async function getMovieDetails() {
        try {
          setIsLoading(true);
          setErrorMessage("");
          const result = await fetch(
            `http://www.omdbapi.com/?apikey=${API_KEY}&i=${selectedId}`
          );

          if (!result.ok) {
            throw new Error(
              "Something went wrong while fetching the movie details! :("
            );
          }

          const data = await result.json();
          setDetails(data);
          if (!data) {
            throw new Error("No movie details found! :(");
          }
        } catch (err) {
          setErrorMessage(err.message);
        } finally {
          setIsLoading(false);
        }
      }

      if (!selectedId) {
        setDetails({});
        setErrorMessage("");
        return;
      }

      const movieFromWatched = watched.find((w) => w.imdbID === selectedId);
      if (movieFromWatched) {
        setDetails(movieFromWatched);
        return;
      }

      getMovieDetails();
    },
    [selectedId, watched]
  );

  function handleSetMovieRating(rating) {
    setDetails({ ...details, userRating: rating });
  }

  function handleAddToWatched() {
    onAdd(details);
    onClose();
  }

  return (
    <div className="details">
      {isLoading && <Loader />}
      {!isLoading && !errorMessage && (
        <>
          <header>
            <button className="btn-back" onClick={onClose}>
              &larr;
            </button>
            <img src={poster} alt={title} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDb Rating
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              <StarRating
                maxRating={10}
                size={24}
                onSetRating={(r) => handleSetMovieRating(r)}
                defaultRating={existing?.userRating ?? 0}
              />
              <button className="btn-add" onClick={handleAddToWatched}>
                {existing?.userRating ? "Update rating" : "Add to list"}
              </button>
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring: {actors}</p>
            <p>Directed: {director}</p>
          </section>
        </>
      )}
      {errorMessage && <ErrorMessage message={errorMessage} />}
    </div>
  );
}
