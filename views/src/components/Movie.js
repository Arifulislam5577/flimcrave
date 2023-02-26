import React from "react";
import { Link } from "react-router-dom";

const Movie = ({ movieData }) => {
  return (
    <Link
      to={`/movie/${movieData.id}`}
      className="block rounded overflow-hidden"
    >
      <img
        src={`https://image.tmdb.org/t/p/original${
          movieData ? movieData?.poster_path : ""
        }`}
        alt={movieData ? movieData?.original_title : ""}
      />
    </Link>
  );
};

export default Movie;
