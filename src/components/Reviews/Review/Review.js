import React from 'react'
import { Box, Card, CardHeader, Avatar, CardContent, Typography, CardActions, IconButton } from '@material-ui/core';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import ThumbUpRoundedIcon from '@material-ui/icons/ThumbUpRounded';
// import ThumbDownRoundedIcon from '@material-ui/icons/ThumbDownRounded';
import { makeStyles } from '@material-ui/styles';

import Subheader from "./Subheader/Subheader";

const useStyles = makeStyles({
    cardStyles: {
        color: "#000",
        marginBottom: "2rem"
    },
    cardContentStyles: {
        padding: "5px 16px"
    },
    cardHeaderTitleStyles: {
        fontWeight: "bold"
    }
})

const Review = (props) => {
    const classes = useStyles();

    return (  
        <Card className={classes.cardStyles}>
            <CardHeader 
                avatar={
                    <Avatar>
                        <PersonRoundedIcon />
                    </Avatar>
                }
                title="Usuario 1"
                subheader={<Subheader stars={props.stars} postDate={props.postDate} />}
                classes={{title: classes.cardHeaderTitleStyles}}
            />
            <CardContent className={classes.cardContentStyles}>
                <Typography component="p">
                    {props.content}
                </Typography>
            </CardContent>
            <CardActions>
                <Box display="flex" alignItems="center" marginRight="1rem">
                    <IconButton>
                        <ThumbUpRoundedIcon />
                    </IconButton>
                    <Typography component="span">{props.likes}</Typography>
                </Box>

                {/* <Box display="flex" alignItems="center">
                    <IconButton color="primary">
                        <ThumbDownRoundedIcon />
                    </IconButton>
                    <Typography component="span">3</Typography>
                </Box> */}
            </CardActions>
        </Card>
    );
}
 
export default Review;