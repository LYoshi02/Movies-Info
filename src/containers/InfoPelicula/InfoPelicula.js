import React, { useState, useEffect } from "react";
import axios from "axios";

import Casting from "../../components/InfoPelicula/Casting/Casting";
import Heading from "../../components/UI/Heading/Heading";
import MainInfo from "../../components/InfoPelicula/MainInfo/MainInfo";
import Reviews from "../../components/InfoPelicula/Reviews/Reviews";

import classes from "./InfoPelicula.module.css";

const InfoPelicula = (props) => {
  const { id } = props.match.params;
  const [peliculaInfo, setPeliculaInfo] = useState(null);
  const [peliculaCast, setPeliculaCast] = useState(null);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=18499f6e11c3ac0d1100af6fdfcc3ec6&language=es`
      )
      .then((res) => {
        setPeliculaInfo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

      axios
        .get(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=18499f6e11c3ac0d1100af6fdfcc3ec6&language=es`
        )
        .then((res) => {
          const cast = res.data.cast.splice(0,8);
          setPeliculaCast(cast);
        })
        .catch((err) => {
          console.log(err);
        });
  }, [id]);

  let component = <p>Cargando</p>;
  if (peliculaInfo && peliculaCast) {
    component = (
      <div className={classes.InfoPelicula}>
          <MainInfo 
            info={peliculaInfo}
          />

          <div className={classes.Cast}>
              <Heading type="info-tertiary">Reparto:</Heading>
              <Casting cast={peliculaCast} />
          </div>

          <div>
              <Heading type="info-tertiary">Reseñas:</Heading>
              <Reviews />
          </div>
      </div>
    );
  }

  return component;
};

export default InfoPelicula;
