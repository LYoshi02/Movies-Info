import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

import BackgroundImg from "../UI/BackgroundImg/BackgroundImg";
import Carousel from "./Carousel/Carousel";
import Heading from "../UI/Heading/Heading";
import Pelicula from "../Peliculas/Pelicula/Pelicula";

import estrenosBg from "../../assets/krists-luhaers-AtPWnYNDJnM-unsplash.jpg";

const useStyles = makeStyles({
  estrenosStyles: {
    position: "relative",
    padding: "4rem 0",
    overflow: "hidden"
  }
});

const Estrenos = (props) => {
  const classes = useStyles();
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
          type="estreno"
        />
      ))}
      </Carousel>
    )
  }

  return (
    <div className={classes.estrenosStyles}>
      <Grid container>
        <Grid item xs={1} />
        <Grid item xs={10}>
          <Heading type="secondary" color="textPrimary">Películas Estrenos</Heading>
          {lista_estrenos}
        </Grid>
        <Grid item xs={1} />
      </Grid>
      <BackgroundImg imgUrl={estrenosBg} />
    </div>
  );
};

export default Estrenos;
