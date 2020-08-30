import React from "react";
import { makeStyles } from "@material-ui/styles";

import imgNotFound from "../../../../assets/image_not_found.png";

const useStyles = makeStyles({
  posterStyles: {
    height: "35rem",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    width: "25rem",
    color: "#fff !important",
    backgroundImage: props => props.posterUrl
      ? `url(https://image.tmdb.org/t/p/w300_and_h450_bestv2/${props.posterUrl})`
      : `url(${imgNotFound})`,
    backgroundPosition: "center",
  },
});

const Poster = (props) => {
  const classes = useStyles(props);

  return <div className={classes.posterStyles}></div>;
};

export default Poster;
