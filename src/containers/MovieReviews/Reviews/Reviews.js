import React, { useEffect } from "react";
import * as actions from "../../../store/actions/index";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import {
  Box,
  makeStyles,
  CircularProgress,
  Paper,
  Typography,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

import Review from "../../../components/Reviews/Review/Review";

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
      marginBottom: "2rem",
    },
  },
});

const Reviews = (props) => {
  const classes = useStyles();

  const { onFetchReviews } = props;
  useEffect(() => {
    onFetchReviews(props.match.params.id);
  }, [onFetchReviews]);

  const reviewLikedHandler = (likesArray, reviewId, isLiked) => {
    if (props.isAuth) {
      let updatedLikesArray = [];
      if (isLiked) {
        updatedLikesArray = likesArray.filter(
          (element) => element !== props.userId
        );
      } else {
        updatedLikesArray = [props.userId];
        if (likesArray) {
          updatedLikesArray = [...likesArray, props.userId];
        }
      }

      props.onLikeReview(
        props.match.params.id,
        reviewId,
        updatedLikesArray,
        props.token
      );
    } else {
      props.history.push(`/signin?movieId=${props.match.params.id}`);
    }
  };

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
    reviewsArray.sort((a, b) => b.likes - a.likes);

    reviews = reviewsArray.map((rev) => (
      <Review
        key={rev.id}
        postDate={rev.postDate}
        likes={rev.likes}
        content={rev.review}
        stars={rev.stars}
        username={rev.username}
        reviewLiked={(isLiked) =>
          reviewLikedHandler(rev.likes, rev.id, isLiked)
        }
        userId={props.userId}
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

const mapStateToProps = (state) => {
  return {
    userId: state.auth.userId,
    token: state.auth.token,
    isAuth: state.auth.token !== null,
    reviews: state.reviews.reviews,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchReviews: (movieId) => dispatch(actions.fetchMovieReviews(movieId)),
    onLikeReview: (movieId, reviewId, likesArray, token) =>
      dispatch(actions.likeReview(movieId, reviewId, likesArray, token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Reviews));
