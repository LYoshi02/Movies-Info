import React from "react";

import classes from "./Poster.module.css";

const Poster = (props) => (
  <div
    className={classes.Poster}
    style={{
      backgroundImage: `url(https://image.tmdb.org/t/p/w300_and_h450_bestv2/${props.posterUrl})`,
    }}
  ></div>
);

export default Poster;
