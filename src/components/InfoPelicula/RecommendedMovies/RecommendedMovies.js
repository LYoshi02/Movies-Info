import React from "react";
import Pelicula from "../../Peliculas/Pelicula/Pelicula";
import InfoMessage from "../../UI/InfoMessage/InfoMessage";

const RecommendedMovies = (props) => {
  let movies = null;
  if (props.movies.length > 0) {
    movies = props.movies.map((movie) => (
      <Pelicula
        key={movie.id}
        titulo={movie.title}
        posterUrl={movie.poster_path}
        peliculaId={movie.id}
        type="similar-movies"
      />
    ));
  } else {
    movies = (
      <InfoMessage
        status="not-found"
        message="No se encontraron películas similares"
      />
    );
  }

  return movies;
};

export default RecommendedMovies;
