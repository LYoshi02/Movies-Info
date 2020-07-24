import React from "react";
import { Card, CardMedia, CardContent, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

import imgNotFound from "../../../../assets/image_not_found.png";

const useStyles = makeStyles({
    nameTypographyStyles: {
      fontWeight: "bold",
    },
    characterTypographyStyles: {
        fontStyle: "italic"
    },
    cardContentStyles: {
        padding: "1rem"
    },
    cardMediaStyles: {
      maxHeight: "27rem"
    }
  });

  //TODO: poner una imagen por default en caso de que la del actor sea null
const Actor = (props) => {
  const classes = useStyles(props);

  return (
    <Card component="li">
      <CardMedia
        component="img"
        src={(props.imgUrl) ? `https://image.tmdb.org/t/p/w185/${props.imgUrl}` : imgNotFound}
        className={classes.cardMediaStyles}
      />
      <CardContent className={classes.cardContentStyles}>
        <Typography className={classes.nameTypographyStyles} color="textSecondary">{props.name}</Typography>
        <Typography className={classes.characterTypographyStyles} color="textSecondary">{props.character}</Typography>
      </CardContent>
    </Card>
  );
};

export default Actor;
