import React from "react";
import { Grid } from "@material-ui/core";

import BackgroundImg from "../UI/BackgroundImg/BackgroundImg";
import Carousel from "./Carousel/Carousel";
import Heading from "../UI/Heading/Heading";
import Pelicula from "../Peliculas/Pelicula/Pelicula";

import estrenosBg from "../../assets/krists-luhaers-AtPWnYNDJnM-unsplash.jpg";
import classes from "./Estrenos.module.css";

const Estrenos = (props) => {
  let lista_estrenos = <p>Cargando</p>;
  if (props.estrenos) {
    const estrenos = props.estrenos.slice(0,8);
    lista_estrenos = (
      <Carousel>
        {estrenos.map(pelicula => (
        <Pelicula 
          key={pelicula.id}
          titulo={pelicula.title}
          posterUrl={pelicula.poster_path}
          peliculaId={pelicula.id}
          estreno
        />
      ))}
      </Carousel>
    )
  }

  return (
    <div className={classes.Estrenos}>
      <Grid container>
        <Grid item xs={1} />
        <Grid item xs={10}>
          <Heading type="secondary">Películas Estrenos</Heading>
          {lista_estrenos}
        </Grid>
        <Grid item xs={1} />
      </Grid>
      <BackgroundImg imgUrl={estrenosBg} />
    </div>
  );
};

export default Estrenos;
