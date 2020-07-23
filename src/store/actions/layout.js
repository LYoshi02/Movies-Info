import * as actionTypes from "./actionTypes";
import axios from "axios";

export const searchMovie = () => {
  return (dispatch) => {
    // dispatch(searchMovieStart());
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=18499f6e11c3ac0d1100af6fdfcc3ec6&language=es&query=${searchInputValue}&page=1&include_adult=false`
      )
      .then((res) => {
        // dispatch(searchMovieSuccess())
      })
      .catch((err) => {
        console.log(err);
        // dispatch(searchMovieFail())
      });
  };
};

export const searchMovieStart = () => {
    // type: actionTypes.SEARCH_MOVIE_START
}

export const searchMovieSuccess = () => {
    // type: actionTypes.SEARCH_MOVIE_SUCCESS
}