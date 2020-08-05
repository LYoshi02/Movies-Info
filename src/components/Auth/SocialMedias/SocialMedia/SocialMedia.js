import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  imageStyles: {
    width: "2.5rem",
    height: "2.5rem",
    display: "inline-block",
  },
  imageContainerStyles: {
    marginRight: "2rem",
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
    border: "2px solid #bdbdbd",
    width: "6rem",
    height: "6rem",
    transition: ".3s all",
    cursor: "pointer",
    "&:hover": {
      border: "2px solid #616161",
    },
  },
}));

const SocialMedia = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.imageContainerStyles}>
      <img
        src={props.imageUrl}
        className={classes.imageStyles}
        alt={props.alt}
      />
    </div>
  );
};

export default SocialMedia;
