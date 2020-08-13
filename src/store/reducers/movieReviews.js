import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
    reviews: null,
    reqFinished: false,
    reqReviewsFinished: false,
    reqError: null,
    alertMessage: ""
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

const requestReviewInit = (state, action) => {
    return updateObject(state, {
        reqReviewsFinished: false,
        reqError: null,
        alertMessage: ""
    })
}

const requestReviewSuccess = (state, action) => {
    return updateObject(state, {
        reqReviewsFinished: true,
        reqError: null,
        alertMessage: action.message
    })
}

const requestReviewError = (state, action) => {
    return updateObject(state, {
        reqReviewsFinished: true,
        reqError: action.error,
        alertMessage: action.message
    })
}

const closeAlert = (state, action) => {
    return updateObject(state, {
        reqReviewsFinished: false
    });
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.FETCH_REVIEWS_INIT: return fetchReviewsInit(state, action);
        case actionTypes.FETCH_REVIEWS_SUCCESS: return fetchReviewsSuccess(state, action);
        case actionTypes.FETCH_REVIEWS_ERROR: return fetchReviewsError(state, action);
        case actionTypes.REQUEST_REVIEW_INIT: return requestReviewInit(state, action);
        case actionTypes.REQUEST_REVIEW_SUCCESS: return requestReviewSuccess(state, action);
        case actionTypes.REQUEST_REVIEW_ERROR: return requestReviewError(state, action);
        case actionTypes.CLOSE_ALERT: return closeAlert(state, action);
        default: return state;
    }
}

export default reducer;