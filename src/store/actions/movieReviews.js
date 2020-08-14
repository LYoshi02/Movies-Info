import axios from "axios";
import * as actionTypes from "./actionTypes";

export const fetchMovieReviews = (movieId) => {
    return (dispatch) => {
        dispatch(fetchReviewsInit())
        axios.get(`https://movies-info-f83aa.firebaseio.com/reviews/${movieId}.json`)
        .then(res => {
            dispatch(fetchReviewsSuccess(res.data));
        })
        .catch(error => {
            dispatch(fetchReviewsError(error));
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
        dispatch(requestReviewInit());
        axios.delete(`https://movies-info-f83aa.firebaseio.com/reviews/${movieId}/${reviewId}.json`)
        .then(res => {
            const successMessage = "Tu review se eliminó correctamente";
            dispatch(requestReviewSuccess(successMessage));
            dispatch(changeReviewStatus("create"));
        })
        .catch(error => {
            console.log(error);
            const errorMessage = "Se produjo un error al eliminar tu review";
            dispatch(requestReviewError(error, errorMessage));
        })
    }
}

// TODO: administrar la request de la review posteada (mensaje, errores)
export const postReview = (movieId, userReview) => {
    return dispatch => {
        dispatch(requestReviewInit());
        axios.post(`https://movies-info-f83aa.firebaseio.com/reviews/${movieId}.json`, userReview)
        .then(res => {
            const successMessage = "Tu review se subió correctamente";
            dispatch(requestReviewSuccess(successMessage));
            dispatch(changeReviewStatus("edit"));
        })
        .catch(error => {
            const errorMessage = "Se produjo un error al subir tu review";
            dispatch(requestReviewError(error, errorMessage));
        });
    }
}

export const updateReview = (movieId, reviewId, userReview) => {
    return dispatch => {
        dispatch(requestReviewInit());
        axios.put(`https://movies-info-f83aa.firebaseio.com/reviews/${movieId}/${reviewId}.json`, userReview)
        .then(res => {
            const successMessage = "Tu review se editó correctamente";
            dispatch(requestReviewSuccess(successMessage));
        })
        .catch(error => {
            const errorMessage = "Se produjo un error al editar tu review";
            dispatch(requestReviewError(error, errorMessage));
        })
    }
}

export const requestReviewInit = () => {
    return {
        type: actionTypes.REQUEST_REVIEW_INIT
    }
}

export const requestReviewSuccess = (message) => {
    return {
        type: actionTypes.REQUEST_REVIEW_SUCCESS,
        message
    }
}

export const requestReviewError = (error, message) => {
    return {
        type: actionTypes.REQUEST_REVIEW_ERROR,
        error,
        message
    }
}

export const closeAlert = () => {
    return {
        type: actionTypes.CLOSE_ALERT
    }
}

export const changeReviewStatus = (status) => {
    return {
        type: actionTypes.CHANGE_REVIEW_STATUS,
        newStatus: status
    }
}