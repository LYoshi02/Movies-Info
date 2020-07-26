import React from "react";
import Flickity from "react-flickity-component";

import "./Carousel.css";

const flickityOptions = {
  groupCells: "80%",
  freeScroll: true,
  contain: true,
  pageDots: false,
  autoPlay: true
};

const Carousel = (props) => (
  <Flickity options={flickityOptions} static>{props.children}</Flickity>
);

export default Carousel;
