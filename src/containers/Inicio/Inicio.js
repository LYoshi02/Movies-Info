import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import { Grid } from "@material-ui/core";

import Estrenos from "../../components/Estrenos/Estrenos";
import Peliculas from "../../components/Peliculas/Peliculas";
import Paginas from "../../components/Paginas/Paginas";

const Inicio = (props) => {
  const { onInitMovies, onChangePage } = props;

  useEffect(() => {
    onInitMovies();
  }, [onInitMovies]);

  useEffect(() => {
    if(props.match.params.page) {
      if(props.match.params.page >= 1 && props.match.params.page <= props.totalPages) {
        onChangePage(props.match.params.page);
      } else {
        props.history.replace("/page/1");
      }
    }
  }, [props.match.params, onChangePage]);

  return (
    <React.Fragment>
      <Estrenos estrenos={props.releases} />

      <Grid container item>
        <Grid item xs={1} />
        <Grid item xs={10}>
          <Peliculas peliculas={props.movies} />
          <Paginas 
          paginaActual={props.currentPage} 
          totalPaginas={props.totalPages} />
        </Grid>
        <Grid item xs={1} />
      </Grid>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    movies: state.inicio.movies,
    releases: state.inicio.releases,
    totalPages: state.inicio.totalPages,
    currentPage: state.inicio.currentPage
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onInitMovies: () => dispatch(actions.initMovies()),
    onChangePage: (page) => dispatch(actions.changePage(page))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Inicio);
