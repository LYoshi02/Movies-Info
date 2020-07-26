import React from 'react'
import { Box, Card, CardHeader, Avatar, CardContent, Typography, CardActions, IconButton } from '@material-ui/core';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import ThumbUpRoundedIcon from '@material-ui/icons/ThumbUpRounded';
import ThumbDownRoundedIcon from '@material-ui/icons/ThumbDownRounded';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    cardStyles: {
        color: "#000",
    },
    cardContentStyles: {
        padding: "5px 16px"
    },
    cardHeaderTitleStyles: {
        fontWeight: "bold"
    }
})

const Review = () => {
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
                subheader="26 de Julio 2020"
                classes={{title: classes.cardHeaderTitleStyles}}
            />
            <CardContent className={classes.cardContentStyles}>
                <Typography component="p">
                    This is going to be one of those posts where I go against the mainstream but my reaction when I watched this movie was: You got to be f… kidding me?
                    The only resemblance to the REAL joker in this movie is the name. As far as I am concerned this movie is an insult to the fans of Batman and the REAL Joker.
                </Typography>
            </CardContent>
            <CardActions>
                <Box display="flex" alignItems="center" marginRight="1rem">
                    <IconButton color="secondary">
                        <ThumbUpRoundedIcon />
                    </IconButton>
                    <Typography component="span">10</Typography>
                </Box>

                <Box display="flex" alignItems="center">
                    <IconButton color="primary">
                        <ThumbDownRoundedIcon />
                    </IconButton>
                    <Typography component="span">3</Typography>
                </Box>
            </CardActions>
        </Card>
    );
}
 
export default Review;