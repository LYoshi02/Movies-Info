import { updateObject } from "../../shared/utility";
import * as actionTypes from "../actions/actionTypes";

const initialState = {
    username: null,
    imgUrl: null,
    signupDate: null,
    error: null
}

const fetchUserInit = (state, action) => {
    return updateObject(state, {
        username: null,
        imgUrl: null,
        signupDate: null
    });
}

const fetchUserSuccess = (state, action) => {
    return updateObject(state, {
        username: action.userData.username,
        imgUrl: action.userData.imageUrl,
        signupDate: action.userData.signupDate
    });
}

const fetchUserError = (state, action) => {
    return updateObject(state, {
        error: action.error
    });
}

const updateUserData = (state, action) => {
    return updateObject(state, {
        imgUrl: action.url
    })
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.FETCH_USER_INIT: return fetchUserInit(state, action);
        case actionTypes.FETCH_USER_SUCCESS: return fetchUserSuccess(state, action);
        case actionTypes.FETCH_USER_ERROR: return fetchUserError(state, action);
        case actionTypes.UPDATE_USER_DATA: return updateUserData(state, action);
        default: return state;
    }
}

export default reducer;