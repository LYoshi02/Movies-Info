import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
    info: null,
    cast: null,
    reviews: null,
    reqFinished: false
}

const fecthInfoInit = (state, action) => {
    return updateObject(state, {
        info: null,
        cast: null,
        reviews: null,
        reqFinished: false
    })
}

const fetchInfoSuccess = (state, action) => {
    return updateObject(state, {
        info: action.info,
        cast: action.cast,
        reviews: action.reviews,
        reqFinished: true
    });
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.FETCH_INFO_INIT: return fecthInfoInit(state, action);
        case actionTypes.FETCH_INFO_SUCCESS: return fetchInfoSuccess(state, action);
        default: return state;
    }
}

export default reducer;