import React from "react";
import { HashLink as Link } from "react-router-hash-link";
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
    <Link to={`/page/${props.num}#movie-start`} smooth>
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
