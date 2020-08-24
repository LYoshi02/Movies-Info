import * as actionTypes from "./actionTypes";
import axios from "axios";

import { MOVIE_DATABASE_KEY } from "../../environment-variables";

export const searchMovie = (searchValue) => {
  return (dispatch) => {
    dispatch(searchMovieStart());
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_DATABASE_KEY}&language=es-MX&query=${searchValue}&page=1&include_adult=false`
      )
      .then((res) => {
        dispatch(searchMovieSuccess(res.data.results))
      })
      .catch((err) => {
        console.log(err);
        // dispatch(searchMovieFail()) HACER ESTO
      });
  };
};

export const searchMovieStart = () => {
    return {
      type: actionTypes.SEARCH_MOVIE_START
    }
}

export const searchMovieSuccess = (searchResults) => {
    return {
      type: actionTypes.SEARCH_MOVIE_SUCCESS,
      searchResults
    }
}

export const restartSearchValues = () => {
  return {
    type: actionTypes.RESTART_SEARCH_VALUES
  }
}