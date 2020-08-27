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

  let isSaved = false;
  if (props.savedMovies && props.savedMovies.length > 0) {
    console.log(props.savedMovies);
    const savedMovieIndex = props.savedMovies.findIndex(
      (movie) => movie.id === +id
    );
    console.log(savedMovieIndex);
    isSaved = savedMovieIndex !== -1;
  }

  const saveMovieHandler = () => {
    // TODO: save and unsave the movies & show them in the user info
    if (props.isAuth) {
      console.log("guardado");
      console.log(info);
      console.log(props.savedMovies);
      console.log(isSaved);
      const movieData = {
        id: info.id,
        title: info.title,
        release: info.release_date,
        posterUrl: info.poster_path,
        score: info.vote_average,
      };
      let savedMoviesArray = [...props.savedMovies];
      if (isSaved) {
        savedMoviesArray = savedMoviesArray.filter((movie) => movie.id !== +id);
      } else {
        savedMoviesArray.push(movieData);
      }
      console.log(savedMoviesArray);
      props.onSaveMovie(props.userId, savedMoviesArray);
    } else {
      props.history.push(`/signin?movieId=${props.match.params.id}`);
    }
  };

  let component = <p>Cargando</p>;
  if (info && cast && videos && recommendedMovies) {
    component = (
      <div className={classes.InfoPelicula}>
        <MainInfo
          info={info}
          clicked={saveMovieHandler}
          isMovieSaved={isSaved}
          reqSavedLoading={props.reqSavedMoviesLoading}
          reqSavedError={props.reqSavedMoviesError}
        />

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
          <Heading type="info-tertiary">Recomendados:</Heading>
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
    isAuth: state.auth.token !== null,
    info: state.infoPelicula.info,
    cast: state.infoPelicula.cast,
    videos: state.infoPelicula.videos,
    recommendedMovies: state.infoPelicula.recommendedMovies,
    userId: state.auth.userId,
    savedMovies: state.auth.savedMovies,
    reqSavedMoviesLoading: state.auth.reqSavedMoviesLoading,
    reqSavedMoviesError: state.auth.reqSavedMoviesError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchMovieInfo: (movieId) => dispatch(actions.fetchMovieInfo(movieId)),
    onSaveMovie: (userId, savedMoviesArray) =>
      dispatch(actions.saveMovie(userId, savedMoviesArray)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InfoPelicula);
