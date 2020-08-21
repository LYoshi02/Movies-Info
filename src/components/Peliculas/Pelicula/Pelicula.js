import React from "react";
import { Link } from "react-router-dom";
import { Card, CardMedia, CardContent, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import clsx from 'clsx';

import imgNotFound from "../../../assets/image_not_found.png";

const useStyles = makeStyles({
  cardStyles: (props) => {
    return {
      backgroundColor: props.type === "estreno" ? "rgba(255,255,255,.85)" : "transparent",
      border: "none",
      boxShadow: "none",
      transition: "all .2s ease-out",
      backfaceVisibility: "visible",
      "&:hover": {
        cursor: "pointer",
        transform: "scale(1.01)"
      },
    };
  },
  cardEstrenoStyles: {
    width: "25rem",
    marginRight: "2rem",
    minHeight: "40rem",
    padding: "1rem",
  },
  cardSimilarMoviesStyles: {
    width: "20rem",
    display: "inline-block",
    marginRight: "2rem",
    whiteSpace: "normal",
    verticalAlign: "top",
  },
  mediaStyles: (props) => {
    return {
      height: props.type === "estreno" || props.type === "similar-movies" ? "30rem" : "45rem",
      borderRadius: "2px",
      backgroundSize: "cover"
    };
  },
  cardContentStyles: (props) => {
      return {
        padding: props.type === "estreno" ? "1rem 0 0 0 !important" : "1rem 0 !important"
      }
  },
  typographyStyles: (props) => {
    return {
      textAlign: "center",
      fontWeight: "bold",
      color: props.type === "estreno" ? "var(--color-gris-oscuro)" : "#fff",
    };
  },
});

const Pelicula = (props) => {
  const classes = useStyles(props);
  const mediaImage = (props.posterUrl) ? `https://image.tmdb.org/t/p/w300_and_h450_bestv2/${props.posterUrl}` : imgNotFound;

  return (
    <Link to={`/pelicula/${props.peliculaId}`} style={{textDecoration: "none"}}>
      <Card className={clsx(
        classes.cardStyles,
        {[classes.cardEstrenoStyles]: props.type === "estreno"},
        {[classes.cardSimilarMoviesStyles]: props.type === "similar-movies"}
      )}>
        <CardMedia
          image={mediaImage}
          title={props.titulo}
          className={classes.mediaStyles}
        />
        <CardContent className={classes.cardContentStyles}>
          <Typography
            component="p"
            variant="subtitle1"
            className={classes.typographyStyles}
          >
            {props.titulo}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export default Pelicula;