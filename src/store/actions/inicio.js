import axios from "axios";
import * as actionTypes from "./actionTypes";

export const initMovies = (startPage) => {
  return (dispatch) => {
    axios
      .all([
        axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=18499f6e11c3ac0d1100af6fdfcc3ec6&language=es&page=${startPage}&region=AR`
        ),
        axios.get(
          "https://api.themoviedb.org/3/movie/upcoming?api_key=18499f6e11c3ac0d1100af6fdfcc3ec6&language=es&page=1"
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
        `https://api.themoviedb.org/3/movie/popular?api_key=18499f6e11c3ac0d1100af6fdfcc3ec6&language=es&page=${newPage}`
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
