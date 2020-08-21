import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import { Button } from "@material-ui/core";

import Casting from "../../components/InfoPelicula/Casting/Casting";
import Heading from "../../components/UI/Heading/Heading";
import MainInfo from "../../components/InfoPelicula/MainInfo/MainInfo";
import MovieVideos from "../../components/InfoPelicula/MovieVideos/MovieVideos";
import Reviews from "../MovieReviews/Reviews/Reviews";
import SimilarMovies from "../../components/InfoPelicula/SimilarMovies/SimilarMovies";

import classes from "./InfoPelicula.module.css";

const InfoPelicula = (props) => {
  const [videoKey, setVideoKey] = useState("");

  const { id } = props.match.params;
  const { onFetchMovieInfo, info, cast, videos, similarMovies } = props;

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
  if (info && cast && videos && similarMovies) {
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

        <div className={classes.SimilarMovies}>
          <Heading type="info-tertiary">Películas Similares:</Heading>
          <div className={classes.MoviesWrapper}>
            <SimilarMovies movies={similarMovies} />
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
    similarMovies: state.infoPelicula.similarMovies
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchMovieInfo: (movieId) => dispatch(actions.fetchMovieInfo(movieId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InfoPelicula);
