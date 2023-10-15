import { useEffect, useState } from "react";
import { API_KEY } from "../Constants";

export function MovieDetails({ selectedId, onClose }) {
  const [details, setDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    Title: title,
    Year: year,
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
          console.log(data);
          if (!data || !data.Search) {
            throw new Error("No movie details found! :(");
          }
        } catch (err) {
          console.error(err);
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

      getMovieDetails();
    },
    [selectedId]
  );

  return (
    <div className="details">
      <header>
        <button className="btn-back" onClick={onClose}>
          &larr;
        </button>
        <img src={poster} alt={details.title} />
      </header>
      {selectedId}
    </div>
  );
}
