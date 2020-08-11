import axios from "axios";
import * as actionTypes from "./actionTypes";

export const auth = (formData, isSignIn) => {
  return (dispatch) => {
    const authData = {
      email: formData.email,
      password: formData.password,
      returnSecureToken: true,
    };

    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAxKAMCrPe4V49zFR74oZBQCXQepERUXO8";
    if (isSignIn) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAxKAMCrPe4V49zFR74oZBQCXQepERUXO8";
    }

    axios.post(url, authData)
    .then(res => {
        localStorage.setItem("token", res.data.idToken);
        localStorage.setItem("userId", res.data.localId);
        localStorage.setItem("expirationDate", new Date(new Date().getTime() + res.data.expiresIn * 1000));
        dispatch(authSuccess(res.data.idToken, res.data.localId));
        dispatch(checkAuthTimeout(res.data.expiresIn));

        if(isSignIn) {
            dispatch(getExtraUserData(res.data.localId));
        }
        //  else {
        //     dispatch(createNewUsername(res.data.idToken, formData.username))
        // }
    })
    .catch(error => {

    });
  };
};

const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token,
        userId
    }
}

const authLogout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

const checkAuthTimeout = (expirationDate) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(authLogout);
        }, expirationDate * 1000)
    }
}

const getExtraUserData = (userId) => {
    return dispatch => {
        axios.get(`https://movies-info-f83aa.firebaseio.com/users/${userId}.json`)
        .then(res => {
            console.log(res.data);
            dispatch(setExtraUserData(res.data));
        })
    }
}

const setExtraUserData = (userData) => {
    return {
        type: actionTypes.SET_EXTRA_USER_DATA,
        userData
    }
}
