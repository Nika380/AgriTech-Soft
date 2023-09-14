"use client";
import React from "react";
import useFetchWeather from "../hooks/useFetchWeather";
import WeatherItem from "./WeatherItem";

const Weather = () => {
  const [data, isLoading, error] = useFetchWeather();

  if (isLoading) {
    return <h1>isLoading</h1>;
  }

  if (error) {
    return <h1>error</h1>;
  }
  return (
    <div className="flex justify-between  max-w-[980px] mr-0  w-full  text-white">
      {data.slice(0, 5).map((info, i) => (
        <WeatherItem props={info} key={i} />
      ))}
    </div>
  );
};

export default Weather;
