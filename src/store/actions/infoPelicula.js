import axios from "axios";
import * as actionTypes from "./actionTypes";

export const fetchMovieInfo = (movieId) => {
  return (dispatch) => {
    dispatch(fetchInfoInit());
    axios
      .all([
        axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=18499f6e11c3ac0d1100af6fdfcc3ec6&language=es`
        ),
        axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=18499f6e11c3ac0d1100af6fdfcc3ec6&language=es`
        ),
        axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=18499f6e11c3ac0d1100af6fdfcc3ec6&language=es`
        ),
        axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=18499f6e11c3ac0d1100af6fdfcc3ec6&language=es&page=1`
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
