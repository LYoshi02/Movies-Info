import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
    reviews: null,
    reqFinished: false,
    reqReviewsFinished: false,
    errorReviews: null,
    alertMessage: "",
    deleteError: null
}

const fetchReviewsInit = (state, action) => {
    return updateObject(state, {
        reviews: null,
        reqFinished: false,
        error: null
    });
}

const fetchReviewsSuccess = (state, action) => {
    return updateObject(state, {
        reviews: action.reviews,
        reqFinished: true,
        error: null
    })
}

const fetchReviewsError = (state, action) => {
    return updateObject(state, {
        reviews: null,
        reqFinished: true,
        error: action.error
    })
}

const deleteReviewInit = (state, action) => {
    return updateObject(state, {
        message: "",
        deleteError: null
    })
}

const deleteReviewSuccess = (state, action) => {
    return updateObject(state, {
        message: action.message,
        deleteError: null
    })
}

const deleteReviewError = (state, action) => {
    return updateObject(state, {
        message: action.message,
        deleteError: action.error
    })
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.FETCH_REVIEWS_INIT: return fetchReviewsInit(state, action);
        case actionTypes.FETCH_REVIEWS_SUCCESS: return fetchReviewsSuccess(state, action);
        case actionTypes.FETCH_REVIEWS_ERROR: return fetchReviewsError(state, action);
        case actionTypes.DELETE_REVIEW_INIT: return deleteReviewInit(state, action);
        case actionTypes.DELETE_REVIEW_SUCCESS: return deleteReviewSuccess(state, action);
        case actionTypes.DELETE_REVIEW_ERROR: return deleteReviewError(state.action);
        default: return state;
    }
}

export default reducer;