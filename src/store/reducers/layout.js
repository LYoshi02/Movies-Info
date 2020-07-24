import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
    reqLoading: false,
    searchResults: null
}

const searchMovieStart = (state, action) => {
    return updateObject(state, {
        searchResults: [],
        reqLoading: true
    });
}

const searchMovieSuccess = (state, action) => {
    return updateObject(state, {
        searchResults: action.searchResults,
        reqLoading: false
    })
}

const restartSearchValues = (state, action) => {
    return updateObject(state, {
        searchResults: null,
        reqLoading: false
    })
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.SEARCH_MOVIE_START: return searchMovieStart(state, action);
        case actionTypes.SEARCH_MOVIE_SUCCESS: return searchMovieSuccess(state, action);
        case actionTypes.RESTART_SEARCH_VALUES: return restartSearchValues(state, action)
        default: return state;
    }
}

export default reducer;