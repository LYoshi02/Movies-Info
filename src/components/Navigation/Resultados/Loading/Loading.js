import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Box, Typography, CircularProgress } from "@material-ui/core";

const useStyles = makeStyles({
  boxStyles: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "1rem 0",
  },
  spinnerStyles: {
    marginRight: "1.5rem",
  },
});

const Loading = () => {
  const classes = useStyles();
  return (
    <Box className={classes.boxStyles}>
      <CircularProgress size={20} className={classes.spinnerStyles} />
      <Typography component="span">Buscando la pelicula...</Typography>
    </Box>
  );
};

export default Loading;
