import React from 'react'

import classes from "./BackgroundImg.module.css";

const BackgroundImg = (props) => {
    return (  
        <div className={classes.Background}
        style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${props.imgUrl})`
        }}>
        </div>
    );
}
 
export default BackgroundImg;