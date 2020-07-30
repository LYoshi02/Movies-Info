import React from "react";
import { Box, Input, Button } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  mainBoxStyles: {
    padding: "2rem",
    backgroundColor: "rgb(255,255,255)",
    borderRadius: "5px",
    marginBottom: "5rem",
  },
  inputStyles: {
    color: "var(--color-gris-oscuro)",
    backgroundColor: "rgba(238,238,238,.95)",
    borderRadius: "5px",
    padding: "1rem",
    margin: "1rem 0 2rem 0",
  },
  btnBoxStyles: {
    textAlign: "right",
  },
});

const UserReview = (props) => {
  const classes = useStyles();

  return (
    <Box className={classes.mainBoxStyles}>
      <Rating value={props.stars} onChange={props.starsChanged} name="user-stars" />
      <Input
        multiline
        fullWidth
        rows={5}
        disableUnderline
        className={classes.inputStyles}
        placeholder="Escribi tu review..."
        value={props.inputValue}
        onChange={props.inputValueChanged}
      />

      <Box className={classes.btnBoxStyles}>
        <Button variant="contained" color="secondary" disableElevation disabled={props.stars === 0} onClick={props.postReview}>
          Subir Review
        </Button>
      </Box>
    </Box>
  );
};

export default UserReview;
