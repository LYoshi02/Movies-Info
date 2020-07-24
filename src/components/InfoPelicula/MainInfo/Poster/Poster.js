import React from "react";

import imgNotFound from "../../../../assets/image_not_found.png";
import classes from "./Poster.module.css";

const Poster = (props) => (
  <div
    className={classes.Poster}
    style={{
      backgroundImage: (props.posterUrl) ? 
      `url(https://image.tmdb.org/t/p/w300_and_h450_bestv2/${props.posterUrl})` :
      `url(${imgNotFound})`,
      backgroundPosition: "center"
    }}
  ></div>
);

export default Poster;
