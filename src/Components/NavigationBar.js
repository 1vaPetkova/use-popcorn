import { useEffect, useRef } from "react";

export function NavigationBar({ children }) {
  return <nav className="nav-bar">{children}</nav>;
}

export function ResultsCount({ moviesCount }) {
  return (
    <p className="num-results">
      Found <strong>{moviesCount}</strong> results
    </p>
  );
}

export function Search({ query, setQuery }) {
  const inputElement = useRef(null);

  useEffect(function () {
    inputElement.current.focus();
  }, []);

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputElement}
    />
  );
}

export function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}
