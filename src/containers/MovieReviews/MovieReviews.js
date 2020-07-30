import React from 'react'
import { Box, Typography } from '@material-ui/core';

import UserReview from "../../components/Reviews/UserReview/UserReview";
import Heading from '../../components/UI/Heading/Heading';
import Reviews from '../../components/Reviews/Reviews';

const MovieReviews = (props) => {
    return (  
        <Box p="2rem">
            <UserReview />

            <Heading type="secondary">
                Todas las Reviews
                <Typography>10 reviews</Typography>
            </Heading>

            <Reviews />
        </Box>
    );
}
 
export default MovieReviews;