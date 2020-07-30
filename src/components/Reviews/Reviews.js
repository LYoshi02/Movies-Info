import React from 'react';
import { Box } from '@material-ui/core';

import Review from "./Review/Review";

const Reviews = props => {
    return(
        <Box>
            <Review />
            <Review />
        </Box>
    );
}

export default Reviews;