import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
    info: null,
    cast: null,
    videos: null,
    recommendedMovies: null
}

const fecthInfoInit = (state, action) => {
    return updateObject(state, {
        info: null,
        cast: null,
        videos: null,
        recommendedMovies: null
    })
}

const fetchInfoSuccess = (state, action) => {
    return updateObject(state, {
        info: action.info,
        cast: action.cast,
        videos: action.videos,
        recommendedMovies: action.recommendedMovies
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