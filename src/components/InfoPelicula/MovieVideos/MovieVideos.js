import React from "react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

import ReactPlayer from "react-player";

const useStyles = makeStyles(theme => ({
    buttonsContainerStyles: {
      "& > *:not(:last-child)": {
        marginRight: "2rem",
      },
    },
    videoPlayerStyles: {
      position: "absolute",
      top: "0",
      left: "0",
    },
    videoWrapperStyles: {
      position: "relative",
      paddingTop: "56.25%",
      marginTop: "2rem",
      [theme.breakpoints.up("lg")]: {
        paddingTop: "45%",
      }
    },
  }));

const MovieVideos = (props) => {
  const classes = useStyles();

  let buttons = null;
  if (props.videos) {
    buttons = props.videos.map((video) => (
      <Button
        key={video.id}
        variant={props.videoKey === video.key ? "contained" : "outlined"}
        color="secondary"
        onClick={() => props.changeKey(video.key)}
      >
        {video.type}
      </Button>
    ));
  }

  return (
    <div>
      <div className={classes.buttonsContainerStyles}>{buttons}</div>

      <div className={classes.videoWrapperStyles}>
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${props.videoKey}`}
          className={classes.videoPlayerStyles}
          width="100%"
          height="100%"
          controls
        />
      </div>
    </div>
  );
};

export default MovieVideos;
