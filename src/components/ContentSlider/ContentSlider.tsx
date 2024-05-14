import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide, useSwiper, useSwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Pagination, Thumbs } from "swiper/modules";
import "./styles.scss";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import apiConfig from "../../api/apiConfig";

type ContentSliderType = {
  text: string;
  image: {
    title: string;
    url: string;
    height: number;
    width: number;
  };
};

const ContentSlider = ({ value }: { value: ContentSliderType[] }) => {
  let params = {
    modules: [Navigation, Pagination],
    navigation: {
      nextEl: ".GallerySlider__next",
      prevEl: ".GallerySlider__prev",
    },
  };

  return (
    <Swiper
      {...params}
      className="content-slider"
      pagination={{ type: "fraction", el: ".container-pagination" }}
    >
      {value.map((image, idx) => {
        return (
          <SwiperSlide className="slider-img" key={idx}>
            <img
              className="slider-img_img"
              src={apiConfig.baseUrlMedia + image.image.url}
              alt={image.image.title}
            />
            <p className="slider-img_text">{image.text}</p>
          </SwiperSlide>
        );
      })}
      <div className="slider-tools">
        <span className="GallerySlider__prev mr-8"></span>
        <span className="GallerySlider__next"></span>
        <div className="container-pagination"></div>
      </div>
    </Swiper>
  );
};

export default ContentSlider;
