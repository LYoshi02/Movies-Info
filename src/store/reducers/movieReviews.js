import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
    reqReviewsFinished: false,
    reqError: null,
    alertMessage: "",
    reviewStatus: "create",
    userReview: null
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

const changeReviewStatus = (state, action) => {
    return updateObject(state, {
        reviewStatus: action.newStatus
    })
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.REQUEST_REVIEW_INIT: return requestReviewInit(state, action);
        case actionTypes.REQUEST_REVIEW_SUCCESS: return requestReviewSuccess(state, action);
        case actionTypes.REQUEST_REVIEW_ERROR: return requestReviewError(state, action);
        case actionTypes.CLOSE_ALERT: return closeAlert(state, action);
        case actionTypes.CHANGE_REVIEW_STATUS: return changeReviewStatus(state, action);
        default: return state;
    }
}

export default reducer;