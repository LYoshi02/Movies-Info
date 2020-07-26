import React from 'react';
import { Box, makeStyles, Button } from '@material-ui/core';

import Review from "./Review/Review";

const useStyles = makeStyles({
    boxStyles: {
        "& > *:not(:last-child)": {
            marginBottom: "2rem"
        }
    }
});

const Reviews = props => {
    const classes = useStyles();

    return(
        <Box className={classes.boxStyles}>
            <Review />
            <Review />
            <Button color="secondary">Ver todas las Reseñas &rarr;</Button>
        </Box>
    );
}

export default Reviews;