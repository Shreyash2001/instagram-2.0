import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Flickity from "react-flickity-component";
import "./Carousel.css";

function Carousel({initialIndex, images}) {
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
    {images?.map((image) => (
      <img src={image} alt="" />
    ))}
  </Flickity>
  )
}

export default Carousel;
