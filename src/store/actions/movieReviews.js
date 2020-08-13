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

export const deleteUserReview = (movieId, reviewId) => {
    return dispatch => {
        dispatch(deleteReviewInit());
        axios.delete(`https://movies-info-f83aa.firebaseio.com/reviews/${movieId}/${reviewId}.json`)
        .then(res => {
            console.log(res);
            dispatch(deleteReviewSuccess());
        })
        .catch(error => {
            console.log(error);
            dispatch(deleteReviewError(error));
        })
    }
}

export const deleteReviewInit = () => {
    return {
        type: actionTypes.DELETE_REVIEW_INIT
    }
}

export const deleteReviewSuccess = () => {
    return {
        type: actionTypes.DELETE_REVIEW_SUCCESS,
        message: "Tu review se eliminó correctamente"
    }
}

export const deleteReviewError = (error) => {
    return {
        type: actionTypes.DELETE_REVIEW_ERROR,
        error,
        message: "Se produjo un error al eliminar tu review"
    }
}

// TODO: administrar la request de la review posteada (mensaje, errores)
export const postReview = (movieId, userReview) => {
    return dispatch => {
        axios.post(`https://movies-info-f83aa.firebaseio.com/reviews/${movieId}.json`, userReview)
        .then(res => {
            console.log(res);
        })
        .catch(error => {
            console.log(error);
        });
    }
}

export const updateReview = (movieId, reviewId, userReview) => {
    return dispatch => {
        axios.put(`https://movies-info-f83aa.firebaseio.com/reviews/${movieId}/${reviewId}.json`, userReview)
        .then(res => {
            console.log(res);
        })
        .catch(error => {
            console.log(error);
        })
    }
}