import { useEffect } from "react";

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

export function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}
