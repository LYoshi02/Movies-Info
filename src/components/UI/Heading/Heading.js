import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  headingSecondaryStyles: {
    marginBottom: "2rem",
    fontWeight: "bold",
    color: "#fff"
  },
  headingInfoStyles: {
    marginBottom: "2rem",
    borderLeft: "1rem solid #40BAD5",
    paddingLeft: ".5rem",
    textTransform: "uppercase",
    color: "#fff"
  },
  headingTitleStyles: {
    color: "#fff",
    fontWeight: "bold"
  }
});

const Heading = (props) => {
  const classes = useStyles();
  let headingElement;

  switch (props.type) {
    case "secondary":
      headingElement = (
        <Typography
          component="h2"
          variant="h4"
          className={classes.headingSecondaryStyles}
        >
          {props.children}
        </Typography>
      );
      break;
    case "info-tertiary":
      headingElement = (
      <Typography
        component="h3"
        variant="h5"
        className={classes.headingInfoStyles}
      >
        {props.children}
      </Typography>
      );
      break;
    case "movie-title":
      headingElement = (
        <Typography
          component="h2"
          variant="h3"
          className={classes.headingTitleStyles}
        >
          {props.children}
          <Typography component="span" variant="h5">
            {` (${props.releaseYear})`}
          </Typography>
        </Typography>
      );
      break;
    default:
      headingElement = <Typography>{props.children}</Typography>;
      break;
  }

  return headingElement;
};

export default Heading;
