import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
    info: null,
    cast: null
}

const setMovieInfo = (state, action) => {
    return updateObject(state, {
        info: action.info,
        cast: action.cast
    });
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.SET_MOVIE_INFO: return setMovieInfo(state, action);
        default: return state;
    }
}

export default reducer;