import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
    buttonStyles: {
        padding: "1rem",
        margin: "0 1rem"
    }
});

const Pagina = (props) => {
  const classes = useStyles();
  return (
    <Link to={`/page/${props.num}`}>
      <Button
        className={classes.buttonStyles}
        color="secondary"
        variant={props.variantType}
      >
        {props.num}
      </Button>
    </Link>
  );
};

export default Pagina;
