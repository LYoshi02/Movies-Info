import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import { Button } from "@material-ui/core";

import Casting from "../../components/InfoPelicula/Casting/Casting";
import Heading from "../../components/UI/Heading/Heading";
import MainInfo from "../../components/InfoPelicula/MainInfo/MainInfo";
import MovieVideos from "../../components/InfoPelicula/MovieVideos/MovieVideos";
import RecommendedMovies from "../../components/InfoPelicula/RecommendedMovies/RecommendedMovies";
import Reviews from "../MovieReviews/Reviews/Reviews";

import classes from "./InfoPelicula.module.css";

const InfoPelicula = (props) => {
  const [videoKey, setVideoKey] = useState("");

  const { id } = props.match.params;
  const { onFetchMovieInfo, info, cast, videos, recommendedMovies } = props;

  useEffect(() => {
    onFetchMovieInfo(id);
  }, [id, onFetchMovieInfo]);

  useEffect(() => {
    if (videos && videos.length > 0) {
      setVideoKey(videos[0].key);
    }
  }, [videos]);

  const changeVideoKey = (key) => {
    setVideoKey(key);
  };

  let component = <p>Cargando</p>;
  if (info && cast && videos && recommendedMovies) {
    component = (
      <div className={classes.InfoPelicula}>
        <MainInfo info={info} />

        <div className={classes.Cast}>
          <Heading type="info-tertiary">Reparto:</Heading>
          <Casting cast={cast} />
        </div>

        <div>
          <Heading type="info-tertiary">Videos:</Heading>
          <MovieVideos
            videos={videos}
            changeKey={changeVideoKey}
            videoKey={videoKey}
          />
        </div>

        <div>
          <Heading type="info-tertiary">Reseñas:</Heading>
          <Reviews lessReviews />
          <Button
            color="secondary"
            onClick={() => props.history.push(`/pelicula/reviews/${id}`)}
          >
            Ver todas las Reseñas &rarr;
          </Button>
        </div>

        <div className={classes.RecommendedMovies}>
          <Heading type="info-tertiary">Películas Recomendadas:</Heading>
          <div className={classes.MoviesWrapper}>
            <RecommendedMovies movies={recommendedMovies} />
          </div>
        </div>
      </div>
    );
  }

  return component;
};

const mapStateToProps = (state) => {
  return {
    info: state.infoPelicula.info,
    cast: state.infoPelicula.cast,
    videos: state.infoPelicula.videos,
    recommendedMovies: state.infoPelicula.recommendedMovies
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchMovieInfo: (movieId) => dispatch(actions.fetchMovieInfo(movieId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InfoPelicula);
