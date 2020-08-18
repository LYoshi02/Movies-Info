import React, { useState } from 'react'

import {storage} from "../../firebase";

const Testing = (props) => {

  const [userImage, setUserImage] = useState(null);
  const changeHanlder = (event) => {
    if(event.target.files[0]) {
      console.log(event.target.files[0]);
      setUserImage(event.target.files[0]);
    }
  }

  const uploadHandler = () => {
    const uploadTask = storage.ref(`images/${userImage.name}`).put(userImage);
    uploadTask.on(
        "state_changed",
        snapshot => {},
        error => {
            console.log(error);
        },
        () => {
            storage
                .ref("images")
                .child(userImage.name)
                .getDownloadURL()
                .then(url => {
                    console.log(url);
                })
        }
    )
  }

    return(
        <div>
            <input type="file" onChange={changeHanlder} />
            <button onClick={uploadHandler}>Upload</button>
        </div>
    )
}

export default Testing;