import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Divider,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

import Detail from "../../../UI/Detail/Detail";
import { Link } from "react-router-dom";

import notFound from "../../../../assets/image_not_found.png";

const useStyles = makeStyles({
  cardStyles: (props) => {
    return {
      borderRadius: 0,
      backgroundColor: "#F9F9F9",
      display: "flex",
      padding: "1.5rem",
      transition: ".3s all ease-out",
      "&:hover": {
        backgroundColor: "#ebebeb",
      },
    };
  },
  mediaStyles: (props) => {
    return {
      minWidth: "10rem",
      height: "15rem",
      borderRadius: ".5rem",
    };
  },
  cardContentStyles: (props) => {
    return {
      marginLeft: "2rem",
      padding: 0,
    };
  },
  typographyStyles: (props) => {
    return {
      textTransform: "uppercase",
      fontWeight: "bold"
    };
  },
  dividerStyles: {
    backgroundColor: "#ebebeb",
  },
});

const Resultado = (props) => {
  const classes = useStyles(props);
  const releaseYear = (props.releaseDate) ? new Date(props.releaseDate).getFullYear() : "No disponible";
  const mediaImage = (props.posterUrl) ? `https://image.tmdb.org/t/p/w300_and_h450_bestv2/${props.posterUrl}` : notFound;

  return (
    <Link to={`/pelicula/${props.peliculaId}`} style={{textDecoration: "none"}}>
      <Card className={classes.cardStyles} onClick={props.clicked}>
        <CardMedia
          image={mediaImage}
          title={props.titulo}
          className={classes.mediaStyles}
        />
        <CardContent className={classes.cardContentStyles}>
          <Typography
            component="h3"
            variant="h6"
            className={classes.typographyStyles}
            color="textSecondary"
          >
            {props.titulo}
          </Typography>

          <Box mt="1.5rem">
            <Detail name="Puntuación" color="textSecondary">
              {props.score}/10
            </Detail>
            <Detail name="Año" color="textSecondary">
              {releaseYear}
            </Detail>
          </Box>
        </CardContent>
      </Card>
      <Divider className={classes.dividerStyles} />
    </Link>
  );
};

export default Resultado;
