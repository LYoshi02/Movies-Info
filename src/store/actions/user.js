import axios from "axios";
import {storage} from "../../firebase";

export const uploadImage = (userImage, userId, username) => {
    return dispatch => {
        console.log(userImage, userId, username);
        const uploadTask = storage.ref(`users/${username}/${userImage.name}`).put(userImage);
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
                dispatch(updateUserData(url, userId, username));
            });
        }
        );
    }
}

export const updateUserData = (imgUrl, userId, username) => {
    return dispatch => {
        const updatedUserData = {
            username,
            imageUrl: imgUrl
        }

        axios.put(`https://movies-info-f83aa.firebaseio.com/users/${userId}.json`, updatedUserData)
        .then(res => {
            console.log(res);
        })
        .catch(error => {
            console.log(error);
        })
    }
}