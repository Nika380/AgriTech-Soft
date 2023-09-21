/* eslint-disable import/no-unresolved */
import React, { useState, useEffect } from "react";
import useFetchWeather from "../hooks/useFetchWeather";
import WeatherItem from "./WeatherItem";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import { Navigation, Autoplay } from "swiper/modules";
const Weather = () => {
  const [data, isLoading, error] = useFetchWeather();
  const [SwiperItem, setSwiperItem] = useState(1);
  const swiperParams = {
    slidesPerView: SwiperItem,
    spaceBetween: 30,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    modules: [Navigation, Autoplay],
  };

  useEffect(() => {
    const updateSwiperItem = () => {
      if (window.innerWidth > 1024) {
        setSwiperItem(4);
      } else if (window.innerWidth > 800) {
        setSwiperItem(3);
      } else if (window.innerWidth > 680) {
        setSwiperItem(2);
      } else if (window.innerWidth > 550) {
        setSwiperItem(1);
      }
    };
    updateSwiperItem();
    window.addEventListener("resize", updateSwiperItem);
    return () => {
      window.removeEventListener("resize", updateSwiperItem);
    };
  }, []);
  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Error: {error.message}</h1>;
  }

  return (
    <div className="flex justify-between lg:max-w-[980px] md:max-w-[600px] sm:max-w-[500px] max-w-[250px]  mr-0 w-full text-white">
      <Swiper {...swiperParams}>
        {data.map((info, i) => (
          <SwiperSlide key={i}>
            <WeatherItem props={info} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Weather;
