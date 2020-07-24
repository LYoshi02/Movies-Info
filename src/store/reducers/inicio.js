import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
    movies: null,
    releases: null,
    totalPages: 500,
    currentPage: 1
}

const setMovieData = (state, action) => {
    return updateObject(state, {
        movies: action.movieData.movies,
        releases: action.movieData.releases,
        totalPages: action.movieData.totalPages,
        currentPage: action.startPage
    });
}

const changePageSuccess = (state, action) => {
    return updateObject(state, {
        currentPage: action.newPage,
        movies: action.newMovies
    });
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.SET_MOVIE_DATA: return setMovieData(state, action);
        case actionTypes.CHANGE_PAGE_SUCCESS: return changePageSuccess(state, action);
        default: return state;
    }
}

export default reducer;