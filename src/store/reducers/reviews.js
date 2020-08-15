import { updateObject } from "../../shared/utility";
import * as actionTypes from "../actions/actionTypes";

const initialState = {
    reviews: null,
    reqFinished: false,
    reqError: null
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

const likeReviewSuccess = (state, action) => {
    return updateObject(state, {
        reviews: {
            ...state.reviews,
            [action.reviewId]: {
                ...state.reviews[action.reviewId],
                likes: action.likesArray
            }
        }
    })
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.FETCH_REVIEWS_INIT: return fetchReviewsInit(state, action);
        case actionTypes.FETCH_REVIEWS_SUCCESS: return fetchReviewsSuccess(state, action);
        case actionTypes.FETCH_REVIEWS_ERROR: return fetchReviewsError(state, action);
        case actionTypes.LIKE_REVIEW_SUCCESS: return likeReviewSuccess(state, action);
        default: return state;
    }
}

export default reducer;