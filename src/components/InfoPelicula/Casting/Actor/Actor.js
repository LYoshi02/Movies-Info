import React from "react";
import { Card, CardMedia, CardContent, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
    nameTypographyStyles: {
      fontWeight: "bold",
    },
    characterTypographyStyles: {
        fontStyle: "italic"
    },
    cardContentStyles: {
        padding: "1rem"
    }
  });

  //TODO: poner una imagen por default en caso de que la del actor sea null
const Actor = (props) => {
    const classes = useStyles(props);

  return (
    <Card component="li">
      <CardMedia
        component="img"
        src={`https://image.tmdb.org/t/p/w185/${props.imgUrl}`}
      />
      <CardContent className={classes.cardContentStyles}>
        <Typography className={classes.nameTypographyStyles} color="textSecondary">{props.name}</Typography>
        <Typography className={classes.characterTypographyStyles} color="textSecondary">{props.character}</Typography>
      </CardContent>
    </Card>
  );
};

export default Actor;
