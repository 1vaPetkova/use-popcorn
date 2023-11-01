import { useState, useEffect } from "react";
import { API_KEY } from "./Constants.js";

export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(
    function () {
      const controller = new AbortController();
      async function fetchMovies() {
        try {
          setIsLoading(true);
          setErrorMessage("");
          const result = await fetch(
            `http://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`,
            { signal: controller.signal }
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
          setErrorMessage("");
        } catch (err) {
          if (err.name !== "AbortError") {
            console.log(err);
            setErrorMessage(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }
      if (query.trim().length < 3) {
        setMovies([]);
        setErrorMessage("");
        return;
      }

      //handleCloseSelection();
      fetchMovies();

      //Cleanup function
      return function () {
        controller.abort();
      };
    },
    [query]
  );
  return { movies, isLoading, errorMessage };
}
