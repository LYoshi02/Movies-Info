import React from "react";
import {
  Box,
  makeStyles,
  CircularProgress,
  Paper,
  Typography,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

import Review from "./Review/Review";

const useStyles = makeStyles({
  spinnerStyles: {
    textAlign: "center",
  },
  paperStyles: {
    padding: "2rem",
    textAlign: "center",
  },
  boxStyles: {
    "& > *": {
        marginBottom: "2rem"
    }
  }
});

const Reviews = (props) => {
  const classes = useStyles();

  let reviews = (
    <div className={classes.spinnerStyles}>
      <CircularProgress color="secondary" />
    </div>
  );
  if (props.reviews) {
    const reviewsArray = [];
    for (let key in props.reviews) {
      reviewsArray.push({ ...props.reviews[key], id: key });
    }
    reviewsArray.sort((a,b) => b.likes - a.likes);

    reviews = reviewsArray.map((rev) => (
      <Review
        key={rev.id}
        postDate={rev.postDate}
        likes={rev.likes}
        content={rev.review}
        stars={rev.stars}
        username={rev.username}
      />
    ));
  } else {
    if (props.reqFinished) {
      if (props.error) {
        reviews = (
          <Alert severity="error">
            Se produjo un error al obtener las reviews
          </Alert>
        );
      } else {
        reviews = (
          <Paper className={classes.paperStyles}>
            <Typography color="textSecondary">
              No se encontraron reviews para esta pelicula
            </Typography>
          </Paper>
        );
      }
    }
  }

  return <Box className={classes.boxStyles}>{reviews}</Box>;
};

export default Reviews;
