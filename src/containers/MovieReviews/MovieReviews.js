import React, { useState, useEffect } from "react";
import axios from "axios";
import * as actions from "../../store/actions/index";
import { Box, Typography } from "@material-ui/core";

import Alert from "../../components/UI/Alert/Alert";
import UserReview from "../../components/Reviews/UserReview/UserReview";
import Heading from "../../components/UI/Heading/Heading";
import Reviews from "../../components/Reviews/Reviews";
import { connect } from "react-redux";

const MovieReviews = (props) => {
  const [userReviewInput, setUserReviewInput] = useState("");
  const [userStars, setUserStars] = useState(0);
  const [userReviewId, setUserReviewId] = useState(null);
  const [fetchedUserReview, setFetchedUserReview] = useState(null);

  const { onFetchReviews, onSetAuthRedirectPath } = props;

  useEffect(() => {
    onSetAuthRedirectPath("/");
    if (props.isAuth && props.userId) {
      fetchUserReview();
    }
  }, [props.isAuth, props.userId, onSetAuthRedirectPath]);

  useEffect(() => {
    if (props.reviewStatus === "edit") {
      fetchUserReview();
    }
  }, [props.reviewStatus]);

  useEffect(() => {
    onFetchReviews(props.match.params.id);
  }, [onFetchReviews, props.match.params.id]);

  const fetchUserReview = () => {
    axios
      .get(
        `https://movies-info-f83aa.firebaseio.com/reviews/${props.match.params.id}.json?orderBy="userId"&equalTo="${props.userId}"`
      )
      .then((res) => {
        if (Object.keys(res.data).length > 0) {
          for (let key in res.data) {
            setFetchedUserReview(res.data[key]);
            setUserReviewId(key);
            setUserReviewInput(res.data[key].review);
            setUserStars(res.data[key].stars);
          }
          props.onChangeReviewStatus("edit");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const postReviewHandler = () => {
    // TODO: put this Date functionality and the MainInfo component one in a shared function
    if (props.isAuth) {
      const options = { year: "numeric", month: "long", day: "numeric" };
      let userReview = {
        postDate: new Date().toLocaleDateString("es-ES", options),
        review: userReviewInput.trim(),
        stars: userStars,
        likes: 0,
        username: props.username,
        userId: props.userId,
      };

      if (props.reviewStatus === "edit") {
        userReview = {
          ...userReview,
          postDate: fetchedUserReview.postDate,
          likes: fetchedUserReview.likes,
          username: props.username,
        };
        props.onUpdateReview(props.match.params.id, userReviewId, userReview, props.token);
      } else {
        props.onPostReview(props.match.params.id, userReview, props.token);
      }
    } else {
      props.history.push(`/signin?movieId=${props.match.params.id}`);
    }
  };

  const deleteReviewHandler = () => {
    if (userReviewId && props.match.params.id) {
      props.onDeleteUserReview(props.match.params.id, userReviewId, props.token);
      setUserReviewInput("");
      setUserStars(0);
      setUserReviewId(null);
      setFetchedUserReview(null);
    }
  };

  let reviewsAmount = "";
  if (props.reviews) {
    const amount = Object.keys(props.reviews).length;
    if (amount === 0) {
      reviewsAmount = "0 Reviews";
    } else if (amount === 1) {
      reviewsAmount = "1 Review";
    } else {
      reviewsAmount = `${amount} Reviews`;
    }
  }

  return (
    <Box p={{ xs: "1.25rem", sm: "2rem" }}>
      <UserReview
        inputValue={userReviewInput}
        inputValueChanged={(event) => setUserReviewInput(event.target.value)}
        stars={userStars}
        starsChanged={(event) => setUserStars(parseInt(event.target.value))}
        reviewStatus={props.reviewStatus}
        postReview={postReviewHandler}
        deleteReview={deleteReviewHandler}
      />

      <Heading type="secondary" color="textPrimary">
        Todas las Reviews
        <Typography>{reviewsAmount}</Typography>
      </Heading>

      <Reviews
        reviews={props.reviews}
        reqFinished={props.reqFinished}
        error={props.error}
      />

      <Alert
        open={props.reqReviewsFinished}
        close={props.onCloseAlert}
        severity={props.reqError ? "error" : "success"}
        message={props.alertMessage}
      />
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    reviews: state.movieReviews.reviews,
    reqFinished: state.movieReviews.reqFinished,
    reqReviewsFinished: state.movieReviews.reqReviewsFinished,
    reqError: state.movieReviews.reqError,
    alertMessage: state.movieReviews.alertMessage,
    reviewStatus: state.movieReviews.reviewStatus,
    username: state.auth.username,
    userId: state.auth.userId,
    isAuth: state.auth.token !== null,
    token: state.auth.token
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchReviews: (movieId) => dispatch(actions.fetchMovieReviews(movieId)),
    onDeleteUserReview: (movieId, reviewId, token) =>
      dispatch(actions.deleteUserReview(movieId, reviewId, token)),
    onPostReview: (movieId, userReview, token) =>
      dispatch(actions.postReview(movieId, userReview, token)),
    onUpdateReview: (movieId, reviewId, userReview, token) =>
      dispatch(actions.updateReview(movieId, reviewId, userReview, token)),
    onCloseAlert: () => dispatch(actions.closeAlert()),
    onChangeReviewStatus: (newStatus) =>
      dispatch(actions.changeReviewStatus(newStatus)),
    onSetAuthRedirectPath: (redirectPath) => dispatch(actions.setAuthRedirectPath(redirectPath))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieReviews);