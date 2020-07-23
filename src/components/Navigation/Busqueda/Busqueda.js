import React from "react";
import { Box, Paper, IconButton, InputBase } from "@material-ui/core";
import ArrowBackRoundedIcon from "@material-ui/icons/ArrowBackRounded";
import { makeStyles } from "@material-ui/styles";

import Resultados from "../Resultados/Resultados";

const useStyles = makeStyles({
    boxStyles: {
      position: "absolute",
      width: "100%",
      zIndex: "100",
    },
    paperStyles: {
      padding: ".5rem 1rem",
      borderRadius: "0",
      backgroundColor: "#FFF"
    },
    inputStyles: {
      marginLeft: "1rem",
      color: "var(--color-gris-oscuro)",
      width: "80%"
    },
  });

const Busqueda = (props) => {
    const classes = useStyles();

  return (
    <Box className={classes.boxStyles}>
      <Paper className={classes.paperStyles}>
        <IconButton onClick={props.closeSearch}>
          <ArrowBackRoundedIcon color="primary" />
        </IconButton>
        <InputBase
          className={classes.inputStyles}
          placeholder="Buscar una película..."
          value={props.searchValue}
          onChange={props.searchChanged}
          autoFocus
        />
      </Paper>

      <Resultados results={props.searchResults} />
    </Box>
  );
};

export default Busqueda;
