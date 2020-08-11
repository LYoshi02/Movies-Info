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

    axios
      .post(url, authData)
      .then((res) => {
        localStorage.setItem("token", res.data.idToken);
        localStorage.setItem("userId", res.data.localId);
        localStorage.setItem(
          "expirationDate",
          new Date(new Date().getTime() + res.data.expiresIn * 1000)
        );
        dispatch(authSuccess(res.data.idToken, res.data.localId));
        dispatch(checkAuthTimeout(res.data.expiresIn));

        if (isSignIn) {
          dispatch(getExtraUserData(res.data.localId));
        } else {
          dispatch(createNewUsername(res.data.localId, formData.username));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const checkAuthState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(authLogout());
    } else {
        const expirationDate = new Date(localStorage.getItem("expirationDate"));
        if(new Date() > expirationDate) {
            dispatch(authLogout());
        } else {
            const userId = localStorage.getItem("userId");
            dispatch(authSuccess(token, userId));
            dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
            console.log("hello");
        }
    }
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token,
    userId,
  };
};

export const authLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("expirationDate");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expirationDate) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(authLogout);
    }, expirationDate * 1000);
  };
};

export const getExtraUserData = (userId) => {
  return (dispatch) => {
    axios
      .get(`https://movies-info-f83aa.firebaseio.com/users/${userId}.json`)
      .then((res) => {
        console.log(res.data);
        dispatch(setExtraUserData(res.data));
      });
  };
};

export const setExtraUserData = (userData) => {
  return {
    type: actionTypes.SET_EXTRA_USER_DATA,
    userData,
  };
};

export const createNewUsername = (userId, username) => {
  const userData = {
    username,
    // userImg: imgUrl (In the future maybe)
  };
  const usernamesData = {
    userId,
  };
  axios
    .all([
      axios.put(
        `https://movies-info-f83aa.firebaseio.com/users/${userId}.json`,
        userData
      ),
      axios.put(
        `https://movies-info-f83aa.firebaseio.com/usernames/${username}.json`,
        usernamesData
      ),
    ])
    .then(
      axios.spread((usersRes, usernamesRes) => {
        console.log(usersRes, usernamesRes);
      })
    )
    .catch((error) => {
      console.log(error);
    });
};
