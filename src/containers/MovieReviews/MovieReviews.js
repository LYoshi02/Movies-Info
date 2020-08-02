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

  const { onFetchReviews } = props;

  useEffect(() => {
    onFetchReviews(props.match.params.id);
  }, [onFetchReviews, props.match.params.id]);

  const postReviewHandler = () => {
    // TODO: put this Date functionality and the MainInfo component one in a shared function
    const options = { year: "numeric", month: "long", day: "numeric" };
    const newReview = {
      postDate: new Date().toLocaleDateString("es-ES", options),
      review: userReviewInput.trim(),
      stars: userStars,
      likes: 0,
    };

    axios
      .post(
        `https://movies-info-f83aa.firebaseio.com/reviews/${props.match.params.id}.json`,
        newReview
      )
      .then((res) => {
        console.log(res);
        setReqReviewFinished(true);
        setReqReviewError(false);
      })
      .catch((error) => {
        console.log(error);
        setReqReviewFinished(true);
        setReqReviewError(true);
      });
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
      />

      <Heading type="secondary">
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
        severity={reqReviewError ? "error" : "success"}
        message={reqReviewError ? "Se produjo un error al subir la review" : "Review subida correctamente"}
      />
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    reviews: state.movieReviews.reviews,
    reqFinished: state.movieReviews.reqFinished,
    error: state.movieReviews.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchReviews: (movieId) => dispatch(actions.fetchMovieReviews(movieId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieReviews);
