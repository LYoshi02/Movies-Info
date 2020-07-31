import React, { useState, useEffect } from "react";
import axios from "axios";
import * as actions from "../../store/actions/index";

import Casting from "../../components/InfoPelicula/Casting/Casting";
import Heading from "../../components/UI/Heading/Heading";
import MainInfo from "../../components/InfoPelicula/MainInfo/MainInfo";
import Reviews from "../../components/Reviews/Reviews";

import classes from "./InfoPelicula.module.css";
import { Button } from "@material-ui/core";
import { connect } from "react-redux";

const InfoPelicula = (props) => {
  const { id } = props.match.params;
  const { onFetchMovieInfo, info, cast } = props;
  const [peliculaInfo, setPeliculaInfo] = useState(null);
  const [peliculaCast, setPeliculaCast] = useState(null);

  useEffect(() => {
    onFetchMovieInfo(id);
  }, [id, onFetchMovieInfo]);

  let component = <p>Cargando</p>;
  if (info && cast) {
    component = (
      <div className={classes.InfoPelicula}>
          <MainInfo 
            info={info}
          />

          <div className={classes.Cast}>
              <Heading type="info-tertiary">Reparto:</Heading>
              <Casting cast={cast} />
          </div>

          <div>
              <Heading type="info-tertiary">Reseñas:</Heading>
              <Reviews />
              <Button color="secondary" onClick={() => props.history.push(`/pelicula/reviews/${id}`)}>Ver todas las Reseñas &rarr;</Button>
          </div>
      </div>
    );
  }

  return component;
};

const mapStateToProps = (state) => {
  return {
    info: state.infoPelicula.info,
    cast: state.infoPelicula.cast
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchMovieInfo: (movieId) => dispatch(actions.fetchMovieInfo(movieId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InfoPelicula);
