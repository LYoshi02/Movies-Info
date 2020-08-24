import axios from "axios";
import * as actionTypes from "./actionTypes";

import { MOVIE_DATABASE_KEY } from "../../environment-variables";

export const initMovies = (startPage) => {
  return (dispatch) => {
    axios
      .all([
        axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${MOVIE_DATABASE_KEY}&language=es-MX&page=${startPage}&region=US`
        ),
        axios.get(
          `https://api.themoviedb.org/3/movie/upcoming?api_key=${MOVIE_DATABASE_KEY}&language=es-MX&page=1`
        ),
      ])
      .then(
        axios.spread((moviesRes, releasesRes) => {
          const movieData = {
            movies: moviesRes.data.results,
            releases: releasesRes.data.results,
            totalPages: moviesRes.data.total_pages,
          };
          dispatch(setMovieData(movieData, startPage));
        })
      )
      .catch((error) => {
        console.log(error);
      });
  };
};

export const setMovieData = (movieData, startPage) => {
  return {
    type: actionTypes.SET_MOVIE_DATA,
    movieData,
    startPage
  };
};

export const changePage = (newPage) => {
  return dispatch => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${MOVIE_DATABASE_KEY}&language=es-MX&page=${newPage}&region=US`
      )
      .then((res) => {
        dispatch(changePageSuccess(res.data.results, newPage));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const changePageSuccess = (newMovies, newPage) => {
  return {
    type: actionTypes.CHANGE_PAGE_SUCCESS,
    newMovies,
    newPage,
  };
};
