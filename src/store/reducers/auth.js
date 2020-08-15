import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
    userId: null,
    token: null,
    username: null,
    redirectPath: "/"
    // error: null,
    // loading: null
}

const authSuccess = (state, action) => {
    return updateObject(state, {
        userId: action.userId,
        token: action.token,
        username: action.userData.username
    })
}

const authLogout = (state, action) => {
    return updateObject(state, {
        userId: null,
        token: null
    })
}

const setAuthRedirectPath = (state, action) => {
    return updateObject(state, {
        redirectPath: action.path
    })
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state, action);
        default: return state;
    }
}

export default reducer;