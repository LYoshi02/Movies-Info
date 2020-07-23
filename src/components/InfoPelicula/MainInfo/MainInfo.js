import React from "react";
import { Typography } from "@material-ui/core";

import BackgroundImg from "../../UI/BackgroundImg/BackgroundImg";
import Detail from "./Detail/Detail";
import Heading from "../../UI/Heading/Heading";
import Poster from "./Poster/Poster";

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
    genres
  } = props.info;

  const generos = genres.map(gen => gen.name).join(" - ");
  const releaseYear = new Date(release_date).getFullYear();

  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const longReleaseDate = new Date(release_date).toLocaleDateString("es-ES", options);

  return (
    <div className={classes.InfoContainer}>
      <BackgroundImg
        imgUrl={`https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${backdrop_path}`}
      />

      <Poster posterUrl={poster_path} />

      <div className={classes.Info}>
        <Heading type="movie-title" releaseYear={releaseYear}>{title}</Heading>
        
        <div className={classes.Score}>
          <img src={imdbLogo} alt="IMDB Logo" />
          <span>{`${vote_average}/10`}</span>
        </div>

        <Typography component="p" style={{ fontSize: "1.6rem", color: "#fff" }}>
          {overview}
        </Typography>

        <div className={classes.Details}>
          <Detail name="fecha de lanzamiento">{longReleaseDate}</Detail>
          <Detail name="duración">{runtime} min</Detail>
          <Detail name="género(s)">{generos}</Detail>
        </div>
      </div>
    </div>
  );
};

export default MainInfo;
