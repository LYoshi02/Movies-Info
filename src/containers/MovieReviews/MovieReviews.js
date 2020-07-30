import React, { useState, useEffect } from 'react'
import * as actions from "../../store/actions/index";
import { Box, Typography } from '@material-ui/core';
import UserReview from "../../components/Reviews/UserReview/UserReview";
import Heading from '../../components/UI/Heading/Heading';
import Reviews from '../../components/Reviews/Reviews';
import { connect } from 'react-redux';

const MovieReviews = (props) => {
    const [userReviewInput, setUserReviewInput] = useState("");
    const [userStars, setUserStars] = useState(0);

    const postReviewHandler = () => {
        // TODO: put this Date functionality and the MainInfo component one in a shared function
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const newReview = {
            postDate: new Date().toLocaleDateString("es-ES", options),
            review: userReviewInput.trim(),
            stars: userStars,
            movieId: props.match.params.id
        }

        props.onPostReview(newReview);
    }

    return (  
        <Box p="2rem">
            <UserReview 
                inputValue={userReviewInput}
                inputValueChanged={(event) => setUserReviewInput(event.target.value)}
                stars={userStars}
                starsChanged={(event) => setUserStars(parseInt(event.target.value))}
                postReview={postReviewHandler}
            />

            <Heading type="secondary">
                Todas las Reviews
                <Typography>10 reviews</Typography>
            </Heading>

            <Reviews />
        </Box>
    );
}

// const mapStateToProps = (state) => {
//     return {
//       movies: state.inicio.movies,
//       releases: state.inicio.releases,
//       totalPages: state.inicio.totalPages,
//       currentPage: state.inicio.currentPage
//     };
//   };
  
  const mapDispatchToProps = (dispatch) => {
    return {
      onPostReview: (review) => dispatch(actions.postReview(review))
    };
  };
 
export default connect(null, mapDispatchToProps)(MovieReviews);