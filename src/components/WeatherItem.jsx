/* eslint-disable react/prop-types */
"use client";
import React from "react";

const WeatherItem = ({ props }) => {
  const info = props;
  return (
    <div className="container flex flex-row items-center justify-between max-w-[170px] ">
      <img
        alt="weather"
        src={`https://cdn.weatherbit.io/static/img/icons/${info?.weather?.icon}.png?fbclid=IwAR281YBkTLi2bfW0VixkCBotCbaPridE--I-K0wE8g6QhYDYlNcCd3TIYyg`}
        className="w-[45px]"
      />
      <div className="flex flex-col">
        <p className="m-0 leading-4 text-xs">{info?.datetime.slice(5, 10)}</p>
        <p className="m-0 leading-4 text-xs">
          მინ. {info?.app_min_temp} / მაქს. {info?.app_max_temp}
        </p>
        <p className="m-0 text-xs">ტენი {info?.rh}%</p>
      </div>
    </div>
  );
};

export default WeatherItem;
