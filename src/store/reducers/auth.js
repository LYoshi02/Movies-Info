import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  userId: null,
  token: null,
  username: null,
  userImgUrl: null,
  signupDate: null,
  savedMovies: null,
  reqSavedMoviesLoading: false,
  reqSavedMoviesError: null,
  redirectPath: "/",
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    userId: action.userId,
    token: action.token,
    username: action.userData.username,
    userImgUrl: action.userData.imgUrl,
    signupDate: action.userData.signupDate,
    savedMovies: action.userData.savedMovies,
  });
};

const authLogout = (state, action) => {
  return updateObject(state, {
    userId: null,
    token: null,
    username: null,
    userImgUrl: null,
    signupDate: null,
    savedMovies: null,
    reqSavedMoviesLoading: false,
    reqSavedMoviesError: null,
    redirectPath: "/",
  });
};

const setAuthRedirectPath = (state, action) => {
  return updateObject(state, {
    redirectPath: action.path,
  });
};

const updateUserImage = (state, action) => {
  return updateObject(state, {
    userImgUrl: action.url,
  });
};

const saveMovieInit = (state, action) => {
  return updateObject(state, {
    reqSavedMoviesLoading: true,
    reqSavedMoviesError: null,
  });
};

const saveMovieSuccess = (state, action) => {
  return updateObject(state, {
    savedMovies: action.savedMovies,
    reqSavedMoviesLoading: false,
    reqSavedMoviesError: null,
  });
};

const saveMovieError = (state, action) => {
  return updateObject(state, {
    reqSavedMoviesLoading: false,
    reqSavedMoviesError: action.error,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    case actionTypes.SET_AUTH_REDIRECT_PATH:
      return setAuthRedirectPath(state, action);
    case actionTypes.UPDATE_USER_IMAGE:
      return updateUserImage(state, action);
    case actionTypes.SAVE_MOVIE_INIT:
      return saveMovieInit(state, action);
    case actionTypes.SAVE_MOVIE_SUCCESS:
      return saveMovieSuccess(state, action);
    case actionTypes.SAVE_MOVIE_ERROR:
      return saveMovieError(state, action);
    default:
      return state;
  }
};

export default reducer;
