import axios from "axios";
import * as actionTypes from "./actionTypes";

import { MOVIE_DATABASE_KEY } from "../../environment-variables";

export const fetchMovieInfo = (movieId) => {
  return (dispatch) => {
    dispatch(fetchInfoInit());
    axios
      .all([
        axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=${MOVIE_DATABASE_KEY}&language=es`
        ),
        axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${MOVIE_DATABASE_KEY}&language=es`
        ),
        axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${MOVIE_DATABASE_KEY}&language=es`
        ),
        axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${MOVIE_DATABASE_KEY}&language=es&page=1`
        )
      ])
      .then(
        axios.spread((infoRes, castRes, videosRes, recommendedMoviesRes) => {
          console.log(recommendedMoviesRes);
          const movieInfo = {
            info: infoRes.data,
            cast: castRes.data.cast.splice(0, 8),
            videos: videosRes.data.results,
            recommendedMovies: recommendedMoviesRes.data.results.splice(0, 8)
          };
          dispatch(fetchInfoSuccess(movieInfo));
        })
      )
      .catch((error) => {
        console.log(error);
      });
  };
};

export const fetchInfoInit = () => {
  return {
    type: actionTypes.FETCH_INFO_INIT
  }
}

export const fetchInfoSuccess = (movieInfo) => {
  return {
    type: actionTypes.FETCH_INFO_SUCCESS,
    info: movieInfo.info,
    cast: movieInfo.cast,
    videos: movieInfo.videos,
    recommendedMovies: movieInfo.recommendedMovies
  };
};
