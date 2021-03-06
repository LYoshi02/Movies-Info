import React from 'react'
import { Box, Card, CardHeader, Avatar, CardContent, Typography, CardActions, IconButton } from '@material-ui/core';
import ThumbUpRoundedIcon from '@material-ui/icons/ThumbUpRounded';
import { makeStyles } from '@material-ui/styles';

import defaultImg from "../../../assets/default-user-image.png";
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

    let isLiked = false;
    if(props.likes && props.likes.length > 0) {
        isLiked = props.likes.includes(props.userId);
    }

    return (  
        <Card className={classes.cardStyles}>
            <CardHeader 
                avatar={
                    <Avatar alt={props.username} src={props.imgUrl ? props.imgUrl : defaultImg} />
                }
                title={props.username}
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
                    <IconButton onClick={() => props.reviewLiked(isLiked)} color={isLiked ? "secondary" : "default"}>
                        <ThumbUpRoundedIcon />
                    </IconButton>
                    <Typography component="span">{props.likes ? props.likes.length : "0"}</Typography>
                </Box>
            </CardActions>
        </Card>
    );
}
 
export default Review;