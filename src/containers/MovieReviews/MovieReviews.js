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
  const [reqReviewFinished, setReqReviewFinished] = useState(false);
  const [reqReviewError, setReqReviewError] = useState(false);
  const [userReviewId, setUserReviewId] = useState(null);
  const [fetchedUserReview, setFetchedUserReview] = useState(null);

  const { onFetchReviews } = props;

  useEffect(() => {
    if(props.isAuth && props.userId) {
      axios.get(`https://movies-info-f83aa.firebaseio.com/reviews/${props.match.params.id}.json?orderBy="userId"&equalTo="${props.userId}"`)
      .then(res => {
        console.log(res);
        for(let key in res.data) {
          setFetchedUserReview(res.data[key]);
          setUserReviewId(key);
          setUserReviewInput(res.data[key].review);
          setUserStars(res.data[key].stars);
        }
      })
      .catch(error => {
        console.log(error);
      })
    }
  }, [props.isAuth, props.userId, props.match.params.id]);

  useEffect(() => {
    onFetchReviews(props.match.params.id);
  }, [onFetchReviews, props.match.params.id]);

  const postReviewHandler = () => {
    // TODO: put this Date functionality and the MainInfo component one in a shared function
    const options = { year: "numeric", month: "long", day: "numeric" };
    let userReview = {
      postDate: new Date().toLocaleDateString("es-ES", options),
      review: userReviewInput.trim(),
      stars: userStars,
      likes: 0,
      username: props.username,
      userId: props.userId
    };
    // let requestConfig = {
    //   method: "post",
    //   url: `https://movies-info-f83aa.firebaseio.com/reviews/${props.match.params.id}.json`,
    //   data: userReview
    // };

    if(fetchedUserReview) {
      userReview = {
        ...userReview,
        postDate: fetchedUserReview.postDate,
        likes: fetchedUserReview.likes,
        username: props.username
      }
      props.onUpdateReview(props.match.params.id, userReviewId, userReview);
      // requestConfig = {
      //   method: "put",
      //   url: `https://movies-info-f83aa.firebaseio.com/reviews/${props.match.params.id}/${userReviewId}.json`,
      //   data: userReview
      // }
    } else {
      props.onPostReview(props.match.params.id, userReview);
    }

    // axios(requestConfig)
    //   .then((res) => {
    //     console.log(res);
    //     setReqReviewFinished(true);
    //     setReqReviewError(false);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     setReqReviewFinished(true);
    //     setReqReviewError(true);
    //   });
  };

  const deleteReviewHandler = () => {
    if(userReviewId && props.match.params.id) {
      console.log("borrado");
      props.onDeleteUserReview(props.match.params.id, userReviewId);
    }
  }

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

  const closeAlertHandler = (event, reason) => {
    setReqReviewFinished(false);
  }

  return (
    <Box p={{ xs: "1.25rem", sm: "2rem" }}>
      <UserReview
        inputValue={userReviewInput}
        inputValueChanged={(event) => setUserReviewInput(event.target.value)}
        stars={userStars}
        starsChanged={(event) => setUserStars(parseInt(event.target.value))}
        postReview={postReviewHandler}
        isEditing={userReviewId !== null}
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
        open={reqReviewFinished}
        close={closeAlertHandler}
        severity={props.deleteError ? "error" : "success"}
        message={props.alertMessage}
      />
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    reviews: state.movieReviews.reviews,
    reqFinished: state.movieReviews.reqFinished,
    error: state.movieReviews.error,
    alertMessage: state.movieReviews.alertMessage,
    deleteError: state.movieReviews.deleteError,
    username: state.auth.username,
    userId: state.auth.userId,
    isAuth: state.auth.token
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchReviews: (movieId) => dispatch(actions.fetchMovieReviews(movieId)),
    onDeleteUserReview: (movieId, reviewId) => dispatch(actions.deleteUserReview(movieId, reviewId)),
    onPostReview: (movieId, userReview) => dispatch(actions.postReview(movieId, userReview)),
    onUpdateReview: (movieId, reviewId, userReview) => dispatch(actions.updateReview(movieId, reviewId, userReview))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieReviews);
