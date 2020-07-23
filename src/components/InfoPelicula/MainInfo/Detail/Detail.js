import React from "react";
import { Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  nameStyles: {
    fontSize: "2rem",
    fontWeight: "bold",
    textTransform: "capitalize",
  },
});

const Detail = (props) => {
  const classes = useStyles();
  
  return (
    <Typography component="p" color={props.color ? props.color : "textPrimary"}>
      <Typography component="span" className={classes.nameStyles}>
        {`${props.name}: `}
      </Typography>
      {props.children}
    </Typography>
  );
};

export default Detail;
