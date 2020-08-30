import React from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  backgroundStyles: {
    position: "absolute",
    top: "0",
    left: "0",
    zIndex: "-1",
    backgroundImage: (props) =>
      `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${props.imgUrl})`,
    backgroundSize: "cover",
    backgroundPosition: "center center",
    height: "100%",
    width: "100%",
    filter: "blur(1px)",
  },
});

const BackgroundImg = (props) => {
  const classes = useStyles(props);
  return <div className={classes.backgroundStyles}></div>;
};

export default BackgroundImg;
