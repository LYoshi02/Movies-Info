import React from 'react';
import { Box } from '@material-ui/core';

import Review from "./Review/Review";

const Reviews = props => {
    let reviews = "Cargando...";
    if(props.reviews) {
        const reviewsArray = [];
        for(let key in props.reviews) {
            reviewsArray.push({...props.reviews[key], id: key});
        }
        console.log(reviewsArray)
        reviews = reviewsArray.map(rev => (
            <Review
                key={rev.id}
                postDate={rev.postDate}
                likes={rev.likes}
                content={rev.review}
                stars={rev.stars}
            />
        ));
    }
    return(
        <Box>
            {reviews}
        </Box>
    );
}

export default Reviews;