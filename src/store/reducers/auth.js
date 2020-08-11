import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
    userId: null,
    token: null,
    username: null
    // error: null,
    // loading: null
}

const authSuccess = (state, action) => {
    return updateObject(state, {
        userId: action.userId,
        token: action.token
    })
}

const authLogout = (state, action) => {
    return updateObject(state, {
        userId: null,
        token: null
    })
}

const setExtraUserData = (state, action) => {
    return updateObject(state, {
        username: action.userData.username
    });
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        case actionTypes.SET_EXTRA_USER_DATA: return setExtraUserData(state, action);
        default: return state;
    }
}

export default reducer;