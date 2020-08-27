import React from "react";
import { Box, makeStyles } from "@material-ui/core";

import Loading from "./Loading/Loading";
import Resultado from "./Resultado/Resultado";

const useStyles = makeStyles({
  boxStyles: {
    maxHeight: "70vh",
    overflowY: "auto",
    backgroundColor: "#F9F9F9"
  },
});

const Resultados = (props) => {
  const classes = useStyles();

  let results = null;
  if(props.reqLoading) {
    results = <Loading />;
  } else {
    if(props.results) {
      if(props.results.length > 0) {
        const movies = props.results.sort((a,b) => b.popularity - a.popularity );
        results = movies.map((movie) => (
          <Resultado
            key={movie.id}
            titulo={movie.title}
            posterUrl={movie.poster_path}
            peliculaId={movie.id}
            releaseDate={movie.release_date}
            score={movie.vote_average}
          />
        ));
      } else {
        results = (
          <Box p="1rem" textAlign="center">
            <p>No se encontraron resultados para <b>{props.searchValue}</b></p>
          </Box>
        )
      }
    }
  }

  return (
    <Box className={classes.boxStyles}>
      {results}
    </Box>
  );
};

export default Resultados;
