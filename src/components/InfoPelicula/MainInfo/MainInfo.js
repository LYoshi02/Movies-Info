import React from "react";
import {
  Typography,
  Button
} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import { getLongDate } from "../../../shared/utility";
import { RedButtonTheme } from "../../../shared/MuiThemes";

import BackgroundImg from "../../UI/BackgroundImg/BackgroundImg";
import Detail from "../../UI/Detail/Detail";
import Heading from "../../UI/Heading/Heading";
import Poster from "./Poster/Poster";

import BookmarkBorderRoundedIcon from "@material-ui/icons/BookmarkBorderRounded";
import BookmarkRoundedIcon from "@material-ui/icons/BookmarkRounded";
import ErrorOutlineRoundedIcon from "@material-ui/icons/ErrorOutlineRounded";

import imdbLogo from "../../../assets/imdb_logo.png";
import classes from "./MainInfo.module.css";

const MainInfo = (props) => {
  const {
    backdrop_path,
    poster_path,
    title,
    release_date,
    runtime,
    vote_average,
    overview,
    genres,
  } = props.info;

  const generos = genres
    ? genres.map((gen) => gen.name).join(" - ")
    : "No disponible";
  const releaseYear =
    release_date === "" ? "" : new Date(release_date).getFullYear();
  const longReleaseDate =
    release_date === "" ? "No disponible" : getLongDate(release_date);

  let runtimeString = "";
  if (runtime > 0) {
    const runtimeHs = Math.trunc(runtime / 60);
    const runtimeMins = runtime - runtimeHs * 60;

    if (runtimeHs > 0) {
      runtimeString =
        runtimeHs > 1 ? `${runtimeHs} horas ` : `${runtimeHs} hora `;
    }
    if (runtimeMins > 0) {
      runtimeString +=
        runtimeMins > 1 ? `${runtimeMins} minutos` : `${runtimeMins} minuto`;
    }
  } else {
    runtimeString = "No disponible";
  }

  let saveMovieButton = (
    <Button
      color="primary"
      startIcon={<CircularProgress color="inherit" size="2rem" />}
      variant="contained"
    >
      Cargando
    </Button>
  );
  if (!props.reqSavedLoading) {
    saveMovieButton = props.reqSavedError ? (
      <RedButtonTheme>
        <Button
          color={"primary"}
          startIcon={<ErrorOutlineRoundedIcon />}
          variant="contained"
        >
          Error
        </Button>
      </RedButtonTheme>
    ) : (
      <Button
        color={props.isMovieSaved ? "secondary" : "primary"}
        startIcon={
          props.isMovieSaved ? (
            <BookmarkRoundedIcon />
          ) : (
            <BookmarkBorderRoundedIcon />
          )
        }
        variant="contained"
        onClick={props.clicked}
      >
        {props.isMovieSaved ? "Guardado" : "Guardar"}
      </Button>
    );
  }

  return (
    <div className={classes.InfoContainer}>
      <BackgroundImg
        imgUrl={`https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${backdrop_path}`}
      />

      <Poster posterUrl={poster_path} />

      <div className={classes.Info}>
        <Heading type="movie-title" releaseYear={releaseYear}>
          {title}
        </Heading>

        <div className={classes.Score}>
          <img src={imdbLogo} alt="IMDB Logo" />
          <span>{`${vote_average}/10`}</span>
        </div>

        <Typography component="p" color="textPrimary">
          {overview}
        </Typography>

        <div className={classes.Details}>
          <Detail name="fecha de estreno">{longReleaseDate}</Detail>
          <Detail name="duración">{runtimeString}</Detail>
          <Detail name="género(s)">{generos}</Detail>
        </div>

        <div>{saveMovieButton}</div>
      </div>
    </div>
  );
};

export default MainInfo;