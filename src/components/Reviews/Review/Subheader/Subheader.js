import React from 'react';
import { Box, Typography } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    ratingStyles: {
        marginLeft: "-3px",
        marginRight: "1rem"
    }
});


const Subheader = (props) => {
    const classes = useStyles();

    return (  
        <Box display="flex" alignItems="center">
            <Rating readOnly value={props.stars} size="small" className={classes.ratingStyles} />
            <Typography variant="caption">{props.postDate}</Typography>
        </Box>
    );
}
 
export default Subheader;