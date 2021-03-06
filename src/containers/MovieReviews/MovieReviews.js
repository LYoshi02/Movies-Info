import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import * as actions from "../../store/actions/index";
import { Box } from "@material-ui/core";

import Alert from "../../components/UI/Alert/Alert";
import UserReview from "../../components/Reviews/UserReview/UserReview";
import Heading from "../../components/UI/Heading/Heading";
import Reviews from "./Reviews/Reviews";
import { connect } from "react-redux";

const MovieReviews = (props) => {
  const [userReviewInput, setUserReviewInput] = useState("");
  const [userStars, setUserStars] = useState(0);
  const [userReviewId, setUserReviewId] = useState(null);
  const [fetchedUserReview, setFetchedUserReview] = useState(null);

  const { onSetAuthRedirectPath, onChangeReviewStatus, isAuth, userId, reviewStatus, reviews } = props;
  const { id } = props.match.params;

  const fetchUserReview = useCallback(() => {
    axios
      .get(
        `https://movies-info-f83aa.firebaseio.com/reviews/${id}.json?orderBy="userId"&equalTo="${userId}"`
      )
      .then((res) => {
        if (Object.keys(res.data).length > 0) {
          for (let key in res.data) {
            setFetchedUserReview(res.data[key]);
            setUserReviewId(key);
            setUserReviewInput(res.data[key].review);
            setUserStars(res.data[key].stars);
          }
          onChangeReviewStatus("edit");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userId, id, onChangeReviewStatus]);

  useEffect(() => {
    onChangeReviewStatus("create");
  }, [onChangeReviewStatus]);

  useEffect(() => {
    onSetAuthRedirectPath("/");
    if ((isAuth && userId) || reviewStatus === "edit") {
      fetchUserReview();
    }
  }, [isAuth, userId, onSetAuthRedirectPath, reviewStatus, reviews, fetchUserReview]);

  const postReviewHandler = () => {
    if (isAuth) {
      let userReview = {
        postDate: new Date(),
        review: userReviewInput.trim(),
        stars: userStars,
        likes: null,
        username: props.username,
        userId: userId,
        userImg: props.userImgUrl
      };

      if (reviewStatus === "edit") {
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
      props.history.push({
        pathname: "/signin",
        search: "?redirect",
        state: { prevPath: `/pelicula/reviews/${id}`}
      });
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

  return (
    <Box p={{ xs: "1.25rem", sm: "2rem" }}>
      <UserReview
        inputValue={userReviewInput}
        inputValueChanged={(event) => setUserReviewInput(event.target.value)}
        stars={userStars}
        starsChanged={(event) => setUserStars(parseInt(event.target.value))}
        reviewStatus={reviewStatus}
        postReview={postReviewHandler}
        deleteReview={deleteReviewHandler}
      />

      <Heading type="secondary" color="textPrimary">
        Todas las Reviews
      </Heading>

      <Reviews />

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
    reqReviewsFinished: state.movieReviews.reqReviewsFinished,
    reqError: state.movieReviews.reqError,
    alertMessage: state.movieReviews.alertMessage,
    reviewStatus: state.movieReviews.reviewStatus,
    username: state.auth.username,
    userId: state.auth.userId,
    userImgUrl: state.auth.userImgUrl,
    isAuth: state.auth.token !== null,
    token: state.auth.token,
    reviews: state.reviews.reviews
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
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