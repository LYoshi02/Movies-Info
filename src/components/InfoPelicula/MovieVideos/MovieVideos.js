import React from "react";
import ReactPlayer from "react-player";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

import InfoMessage from "../../UI/InfoMessage/InfoMessage";

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

  let videos = null;
  if(props.videos.length > 0) {
    const buttons = props.videos.map((video) => (
      <Button
        key={video.id}
        variant={props.videoKey === video.key ? "contained" : "outlined"}
        color="secondary"
        onClick={() => props.changeKey(video.key)}
      >
        {video.type}
      </Button>
    ));

      videos = (
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
      )
  } else {
    videos = (
      <InfoMessage status="not-found" message="No se encontraron videos para esta película" />
    )
  }

  return videos;
};

export default MovieVideos;
