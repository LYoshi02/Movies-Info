import axios from "axios";
import * as actionTypes from "./actionTypes";

export const fetchMovieReviews = (movieId) => {
  return (dispatch) => {
    dispatch(fetchReviewsInit());
    axios
      .get(`https://movies-info-f83aa.firebaseio.com/reviews/${movieId}.json`)
      .then((res) => {
        dispatch(fetchReviewsSuccess(res.data));
      })
      .catch((error) => {
        dispatch(fetchReviewsError(error));
      });
  };
};

export const fetchReviewsInit = () => {
  return {
    type: actionTypes.FETCH_REVIEWS_INIT,
  };
};

export const fetchReviewsSuccess = (reviews) => {
  return {
    type: actionTypes.FETCH_REVIEWS_SUCCESS,
    reviews,
  };
};

export const fetchReviewsError = (error) => {
  return {
    type: actionTypes.FETCH_REVIEWS_ERROR,
    error,
  };
};

export const likeReview = (movieId, reviewId, likesArray, token) => {
  return (dispatch) => {
    console.log(movieId, reviewId, likesArray);
    axios
      .put(
        `https://movies-info-f83aa.firebaseio.com/reviews/${movieId}/${reviewId}/likes.json?auth=${token}`,
        likesArray
      )
      .then((res) => {
        dispatch(likeReviewSuccess(reviewId, likesArray));
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const likeReviewSuccess = (reviewId, likesArray) => {
  return {
    type: actionTypes.LIKE_REVIEW_SUCCESS,
    reviewId,
    likesArray,
  };
};
