import axios from "axios";
import * as actionTypes from "./actionTypes";
import { storage } from "../../firebase";

export const fetchUserInfo = (userId) => {
  return (dispatch) => {
    dispatch(fetchUserInit());
    axios
      .get(`https://movies-info-f83aa.firebaseio.com/users/${userId}.json`)
      .then((res) => {
        dispatch(fetchUserSuccess(res.data));
      })
      .catch((error) => {
        dispatch(fetchUserError(error));
      });
  };
};

export const fetchUserInit = () => {
  return {
    type: actionTypes.FETCH_USER_INIT,
  };
};

export const fetchUserSuccess = (userData) => {
  return {
    type: actionTypes.FETCH_USER_SUCCESS,
    userData,
  };
};

export const fetchUserError = (error) => {
  return {
    type: actionTypes.FETCH_USER_ERROR,
    error,
  };
};

export const uploadImage = (userImage, userId, username, signupDate) => {
  return (dispatch) => {
    console.log(userImage, userId, username, signupDate);
    const uploadTask = storage
      .ref(`users/${username}/${userImage.name}`)
      .put(userImage);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref(`users/${username}`)
          .child(userImage.name)
          .getDownloadURL()
          .then((url) => {
            console.log(url);
            dispatch(updateUserData(url, userId, username, signupDate));
          });
      }
    );
  };
};

export const updateUserData = (imgUrl, userId, username, signupDate) => {
  return (dispatch) => {
    const updatedUserData = {
      username,
      imageUrl: imgUrl,
      signupDate
    };

    axios
      .put(
        `https://movies-info-f83aa.firebaseio.com/users/${userId}.json`,
        updatedUserData
      )
      .then((res) => {
        dispatch(userDataUpdated(imgUrl));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

const userDataUpdated = (imgUrl) => {
  return {
    type: actionTypes.UPDATE_USER_DATA,
    url: imgUrl
  }
}
