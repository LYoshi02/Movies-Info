import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";
import { indigo } from "@material-ui/core/colors";

const useStyles = makeStyles({
  headingSecondaryStyles: {
    marginBottom: "2rem",
    fontWeight: "bold",
  },
  headingInfoStyles: {
    marginBottom: "2rem",
    borderLeft: "1rem solid #40BAD5",
    paddingLeft: ".5rem",
    textTransform: "uppercase",
    color: "#fff",
  },
  headingTitleStyles: {
    color: "#fff",
    fontWeight: "bold",
  },
  linkStyles: {
    fontWeight: "bold",
    color: indigo[500],
    transition: ".2s all",
    "&:hover": {
      color: indigo[800]
    }
  }
});

const Heading = (props) => {
  const classes = useStyles(props);
  let headingElement;

  switch (props.type) {
    case "secondary":
      headingElement = (
        <Typography
          component="h2"
          variant="h4"
          className={classes.headingSecondaryStyles}
          {...props}
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
          variant="h4"
          className={classes.headingTitleStyles}
        >
          {props.children}
          <Typography component="span" variant="h5">
            {props.releaseYear === "" ? "" : ` (${props.releaseYear})`}
          </Typography>
        </Typography>
      );
      break;
    case "form":
      headingElement = (
        <Typography
          component="h2"
          variant="h4"
          color="textSecondary"
          className={classes.headingSecondaryStyles}
        >
          {props.title}
          <Typography>
            {props.subtitle + " "}
            <Link to={props.path} className={classes.linkStyles}>{props.special}</Link>
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
