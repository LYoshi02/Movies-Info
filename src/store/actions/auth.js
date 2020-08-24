import axios from "axios";
import * as actionTypes from "./actionTypes";
import { storage } from "../../firebase";

import { FIREBASE_KEY } from "../../environment-variables";

export const auth = (formData, isSignIn) => {
  return (dispatch) => {
    const authData = {
      email: formData.email,
      password: formData.password,
      returnSecureToken: true,
    };

    let url =
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_KEY}`;
    if (isSignIn) {
      url =
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_KEY}`;
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

        if (isSignIn) {
          dispatch(fetchUserInfo(res.data.idToken, res.data.localId));
        } else {
          dispatch(
            createNewUsername(
              res.data.idToken,
              res.data.localId,
              formData.username
            )
          );
        }

        dispatch(checkAuthTimeout(res.data.expiresIn));
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
      if (new Date() > expirationDate) {
        dispatch(authLogout());
      } else {
        const userId = localStorage.getItem("userId");
        dispatch(fetchUserInfo(token, userId));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};

export const authSuccess = (token, userId, userData) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token,
    userId,
    userData,
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

export const fetchUserInfo = (token, userId) => {
  return (dispatch) => {
    axios
      .get(`https://movies-info-f83aa.firebaseio.com/users/${userId}.json`)
      .then((res) => {
        console.log(res);
        dispatch(authSuccess(token, userId, res.data));
      })
      .catch(error => {
        console.log(error);
      })
  };
};

export const createNewUsername = (token, userId, username) => {
  return (dispatch) => {
    const userData = {
      username,
      signupDate: new Date()
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
          // console.log(usersRes, usernamesRes);
          dispatch(authSuccess(token, userId, usersRes.data));
        })
      )
      .catch((error) => {
        console.log(error);
      });
  };
};

export const setAuthRedirectPath = (redirectPath) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: redirectPath
  }
}

export const uploadImage = (userData, userImage, userId) => {
  return (dispatch) => {
    const uploadTask = storage
      .ref(`users/${userData.username}/${userImage.name}`)
      .put(userImage);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref(`users/${userData.username}`)
          .child(userImage.name)
          .getDownloadURL()
          .then((url) => {
            console.log(url);
            dispatch(updateUserData(url, userData, userId));
          });
      }
    );
  };
};

export const updateUserData = (imgUrl, userData, userId) => {
  return (dispatch) => {
    const updatedUserData = {
      ...userData,
      imgUrl
    };

    axios
      .put(
        `https://movies-info-f83aa.firebaseio.com/users/${userId}.json`,
        updatedUserData
      )
      .then((res) => {
        dispatch(updateUserImage(imgUrl));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const updateUserImage = (imgUrl) => {
  return {
    type: actionTypes.UPDATE_USER_IMAGE,
    url: imgUrl
  }
}