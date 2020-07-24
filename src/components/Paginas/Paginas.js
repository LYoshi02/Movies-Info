import React from "react";
import { withRouter } from "react-router-dom";
import { HashLink as Link } from "react-router-hash-link";
import { Box } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@material-ui/icons/ArrowForwardIosRounded";

import Pagina from "./Pagina/Pagina";

const Paginas = (props) => {
  const paginaActual = parseInt(props.paginaActual);
  const totalPaginas = parseInt(props.totalPaginas);

  let cantBotones = 5;
  if (window.innerWidth <= 450) {
    cantBotones = 2;
  } else if (window.innerWidth <= 650) {
    cantBotones = 3;
  }
  const limiteBotones = totalPaginas - cantBotones + 1;
  let botones = [];
  for (let i = 0; i < cantBotones; i++) {
    const num =
      paginaActual < limiteBotones
        ? paginaActual + i
        : limiteBotones + i;
    botones.push(
      <Pagina
        key={num}
        num={num}
        variantType={num === paginaActual ? "contained" : "outlined"}
      />
    );
  }

  return (
    <Box mt="5rem" mb="3rem" textAlign="center">
      <Link to={(paginaActual === 1) ? "#" : `/page/${paginaActual - 1}#movie-start`} smooth>
        <IconButton
          color="secondary"
          disabled={paginaActual === 1}
        >
          <ArrowBackIosRoundedIcon fontSize="small" />
        </IconButton>
      </Link>
      {botones}

      <Link to={(paginaActual === totalPaginas) ? "#" : `/page/${paginaActual + 1}#movie-start`} smooth>
        <IconButton
          color="secondary"
          disabled={paginaActual === totalPaginas}
        >
          <ArrowForwardIosRoundedIcon fontSize="small" />
        </IconButton>
      </Link>
    </Box>
  );
};

export default withRouter(Paginas);
