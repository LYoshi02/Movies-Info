import React from "react";
import Resultado from "../../Navigation/Resultados/Resultado/Resultado";

const SavedMovies = (props) => {
  let movies = null;
  if (props.movies) {
      console.log(props.movies)
    movies = props.movies.map((movie) => (
      <Resultado
        key={movie.id}
        titulo={movie.title}
        posterUrl={movie.posterUrl}
        peliculaId={movie.id}
        releaseDate={movie.release}
        score={movie.score}
      />
    ));
  }
  return (
    <div>
      <p>Hello</p>
      {movies}
    </div>
  );
};

export default SavedMovies;
