import React, { useEffect } from "react";
import * as actions from "../../../store/actions/index";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import {
  Box,
  makeStyles,
  CircularProgress,
} from "@material-ui/core";

import InfoMessage from "../../../components/UI/InfoMessage/InfoMessage";
import Review from "../../../components/Reviews/Review/Review";
import StarRate from "../../../components/Reviews/StarRate/StarRate";

const useStyles = makeStyles({
  spinnerStyles: {
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

  const { onFetchReviews, reqUserReviewFinished } = props;
  useEffect(() => {
    onFetchReviews(props.match.params.id);
  }, [onFetchReviews, props.match.params.id]);

  useEffect(() => {
    if(reqUserReviewFinished) {
      onFetchReviews(props.match.params.id);
    }
  }, [onFetchReviews, reqUserReviewFinished, props.match.params.id]);

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
  let starRate = null;
  if (props.reviews) {
    let reviewsArray = [];
    for (let key in props.reviews) {
      reviewsArray.push({ ...props.reviews[key], id: key });
    }
    reviewsArray.sort((a, b) => {
      let likesA = 0, likesB = 0;
      if(a.likes) {
        likesA = a.likes.length;
      }
      if(b.likes) {
        likesB = b.likes.length;
      }

      return likesB - likesA
    });

    const starSum = reviewsArray.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.stars;
    }, 0);
    const starAverage = starSum / reviewsArray.length;

    starRate = (
      <StarRate rate={starAverage} amount={reviewsArray.length} />
    );

    if(props.lessReviews) {
      reviewsArray = reviewsArray.slice(0, 2);
    }

    reviews = reviewsArray.map((rev) => (
      <Review
        key={rev.id}
        postDate={rev.postDate}
        likes={rev.likes}
        content={rev.review}
        stars={rev.stars}
        username={rev.username}
        imgUrl={rev.userImg}
        reviewLiked={(isLiked) =>
          reviewLikedHandler(rev.likes, rev.id, isLiked)
        }
        userId={props.userId}
      />
    ));
  } else {
    if (props.reqReviewsFinished) {
      if (props.reqReviewsError) {
        reviews = (
          <InfoMessage 
            status="error"
            message="Se produjo un error al obtener las reviews"
          />
        );
      } else {
        reviews = (
          <InfoMessage 
            status="not-found"
            message="No se encontraron reviews para esta pelicula"
          />
        );
      }
    }
  }

  return(
    <Box className={classes.boxStyles}>
      {starRate}
      {reviews}
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    userId: state.auth.userId,
    token: state.auth.token,
    isAuth: state.auth.token !== null,
    reviews: state.reviews.reviews,
    reqUserReviewFinished: state.movieReviews.reqUserFinished,
    reqReviewsFinished: state.reviews.reqFinished,
    reqReviewsError: state.reviews.error
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