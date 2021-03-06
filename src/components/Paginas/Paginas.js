import React from "react";
import { withRouter } from "react-router-dom";
import { HashLink as Link } from "react-router-hash-link";
import { Box } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import PaginationItem from '@material-ui/lab/PaginationItem';
// import IconButton from "@material-ui/core/IconButton";
// import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded";
// import ArrowForwardIosRoundedIcon from "@material-ui/icons/ArrowForwardIosRounded";

import Pagina from "./Pagina/Pagina";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  ul: {
    justifyContent: "center",
  },
});

const Paginas = (props) => {
  const classes = useStyles();
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
      paginaActual < limiteBotones ? paginaActual + i : limiteBotones + i;
    botones.push(
      <Pagina
        key={num}
        num={num}
        variantType={num === paginaActual ? "contained" : "outlined"}
      />
    );
  }

  return (
    <Box mt="5rem" mb="3rem">
      <Pagination
        page={props.paginaActual}
        count={props.totalPaginas}
        color="secondary"
        shape="rounded"
        classes={{ ul: classes.ul }}
        renderItem={(item) => (
            <PaginationItem 
              component={Link}
              to={`/page/${item.page}#movie-start`}
              {...item}
            />
        )}
      />
    </Box>
  );
};

export default withRouter(Paginas);
