import React from "react";
import { Box, Typography } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  mainBoxStyles: {
    display: "flex",
    "& > *": {
      padding: ".5rem 1rem",
    },
  },
  rateBoxStyles: {
    backgroundColor: "#eee",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    borderRadius: "4px 0 0 4px",
  },
  infoBoxStyles: {
    backgroundColor: "#fff",
    borderRadius: "0 4px 4px 0",
  },
  rateStyles: {
    fontWeight: "bold",
  },
  starsStyles: {
      color: "var(--color-stars)"
  }
});

const StarRate = (props) => {
  const classes = useStyles();
  return (
    <Box className={classes.mainBoxStyles}>
      <Box className={classes.rateBoxStyles}>
        <Typography
          component="p"
          variant="h5"
          color="secondary"
          className={classes.rateStyles}
        >
          {props.rate.toFixed(1)}
        </Typography>
        <Rating
          name="movie-rate"
          value={props.rate}
          precision={0.1}
          size="small"
          classes={{ root: classes.starsStyles }}
          readOnly
        />
      </Box>
      <Box className={classes.infoBoxStyles}>
        <Typography component="p" variant="h6">
          Puntuación Media
        </Typography>
        <Typography component="p" variant="subtitle1">
          {props.amount > 1 ? `${props.amount} reviews` : `${props.amount} review`}
        </Typography>
      </Box>
    </Box>
  );
};

export default StarRate;
