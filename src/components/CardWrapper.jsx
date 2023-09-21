"use client";
import React from "react";
import useFetchCulturesAPI from "../hooks/useFetchCulturesAPI";
import CultureCardItem from "./CultureCardItem";

const CardWrapper = () => {
  const [data, error, isLoading] = useFetchCulturesAPI();
  if (error) {
    return <h1>{error}</h1>;
  }
  return (
    <div className="flex flex-row justify-around items-center flex-wrap p-6 pr-20 pb-36 pl-28">
      {isLoading && "isLoading"}
      {data?.map((item) => (
        <CultureCardItem key={item.id} props={item} />
      ))}
    </div>
  );
};

export default CardWrapper;
