import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Flickity from "react-flickity-component";
import "./Carousel.css";

function Carousel({initialIndex}) {
    let flkty;
  let [carouselIndex, setCarouselIndex] = useState(null);

  const handleChange = index => {
    setCarouselIndex(index); // Not working
    console.log({ carouselIndex, index });
  };

  useEffect(() => {
    if (flkty) {
      console.log("this ran");
      flkty.on("settle", () => {
        console.log(`current index is ${flkty.selectedIndex}`);
      });

      flkty.on("change", index => {
        handleChange(index);
      });
    }
  }, [carouselIndex]);
  return (
    <Flickity
    flickityRef={c => (flkty = c)}
    options={{ initialIndex: initialIndex }}
  >
    <img src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" />
    <img src="https://wallpaperaccess.com/full/393735.jpg" />
    <img src="https://m.media-amazon.com/images/I/8192Yt4zAfL._SL1500_.jpg" />
  </Flickity>
  )
}

export default Carousel;
