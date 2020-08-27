import React from "react";
import { Grid, Box } from "@material-ui/core";

import Heading from "../UI/Heading/Heading";
import Pelicula from "./Pelicula/Pelicula";

const Peliculas = (props) => {
  let lista_peliculas = <p>Cargando</p>;
  if (props.peliculas) {
    lista_peliculas = props.peliculas.map(pelicula => (
      <Grid item xs={12} sm={6} md={4} lg={3} key={pelicula.id}>
          <Pelicula 
            titulo={pelicula.title}
            posterUrl={pelicula.poster_path}
            peliculaId={pelicula.id}
          />
      </Grid>
    ));
  }

  return (
    <Box mt="5rem" id="movie-start">
      <Heading type="secondary" color="textPrimary">Todas las Películas</Heading>
      <Grid container item spacing={3}>
        {lista_peliculas}
      </Grid>
    </Box>
  );
};

export default Peliculas;
