import React from "react";
import { Box, Input, Button } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import { makeStyles } from "@material-ui/styles";
import { red } from "@material-ui/core/colors";
import Heading from "../../UI/Heading/Heading";

const useStyles = makeStyles((theme) => ({
  mainBoxStyles: {
    padding: "2rem",
    backgroundColor: "rgb(255,255,255)",
    borderRadius: "5px",
    marginBottom: "6rem",
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
    [theme.breakpoints.down("xs")]: {
      display: "flex",
      flexDirection: "column",
    },
  },
  deleteBtnStyles: {
    color: red[500],
    borderColor: red[500],
    marginRight: "1.5rem",
    "&:hover": {
      color: red[700],
      borderColor: red[700],
      backgroundColor: "rgba(211,47,47,.1)",
    },
    [theme.breakpoints.down("xs")]: {
      marginRight: "0",
      marginBottom: "1.5rem",
    },
  },
  starsStyles: {
    color: "var(--color-stars)"
  },
}));

const UserReview = (props) => {
  const classes = useStyles();
  let deleteReviewBtn = null;
  if(props.reviewStatus === "edit") {
    deleteReviewBtn = (
      <Button
        variant="outlined"
        className={classes.deleteBtnStyles}
        onClick={props.deleteReview}
      >
        Eliminar Review
      </Button>
    );
  }
  
  return (
    <React.Fragment>
      <Heading type="secondary" color="textPrimary">
        Escribí tu opinión
      </Heading>
      <Box className={classes.mainBoxStyles}>
      <Rating
        value={props.stars}
        onChange={props.starsChanged}
        name="user-stars"
        classes={{ root: classes.starsStyles }}
      />
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
        {deleteReviewBtn}
        <Button
          variant="contained"
          color="secondary"
          disableElevation
          disabled={props.stars === 0}
          onClick={props.postReview}
        >
          {props.reviewStatus === "edit" ? "Editar Review" : "Subir Review"}
        </Button>
      </Box>
    </Box>
    </React.Fragment>
  );
};

export default UserReview;
