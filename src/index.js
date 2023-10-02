import React, { useState } from "react";
import ReactDOM from "react-dom/client";

import StarRating from "./StarRating";

function Rating() {
  const [movieRating, setMovieRating] = useState(0);
  return (
    <div>
      <StarRating onSetRating={(v) => setMovieRating(v)} />
      <p>The chosen rating is: {movieRating}</p>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <Rating />
  </React.StrictMode>
);
