import axios from "axios";
import * as actionTypes from "./actionTypes";

export const fetchMovieInfo = (movieId) => {
  return (dispatch) => {
    axios
      .all([
        axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=18499f6e11c3ac0d1100af6fdfcc3ec6&language=es`
        ),
        axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=18499f6e11c3ac0d1100af6fdfcc3ec6&language=es`
        ),
      ])
      .then(
        axios.spread((infoRes, castRes) => {
          const movieInfo = {
            info: infoRes.data,
            cast: castRes.data.cast.splice(0, 8),
          };
          dispatch(setMovieInfo(movieInfo));
        })
      )
      .catch((error) => {
        console.log(error);
      });
  };
};

export const setMovieInfo = (movieInfo) => {
  return {
    type: actionTypes.SET_MOVIE_INFO,
    info: movieInfo.info,
    cast: movieInfo.cast,
  };
};
