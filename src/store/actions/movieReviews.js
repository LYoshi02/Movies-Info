import axios from "axios";
import * as actionTypes from "./actionTypes";

export const fetchMovieReviews = (movieId) => {

    return (dispatch) => {
        dispatch(fetchReviewsInit())
        axios.get(`https://movies-info-f83aa.firebaseio.com/reviews/${movieId}.json`)
        .then(res => {
            dispatch(fetchReviewsSuccess(res.data));
            console.log(res)
        })
        .catch(error => {
            dispatch(fetchReviewsError(error));
            console.log(error);
        })
    }
}

export const fetchReviewsInit = () => {
    return {
        type: actionTypes.FETCH_REVIEWS_INIT
    }
}

export const fetchReviewsSuccess = (reviews) => {
    return {
        type: actionTypes.FETCH_REVIEWS_SUCCESS,
        reviews
    }
}

export const fetchReviewsError = (error) => {
    return {
        type: actionTypes.FETCH_REVIEWS_ERROR,
        error
    }
}