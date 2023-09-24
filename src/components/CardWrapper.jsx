/* eslint-disable react/prop-types */
"use client";
import React from "react";
import useFetchCulturesAPI from "../hooks/useFetchCulturesAPI";
import CultureCardItem from "./CultureCardItem";
import CardLoader from "./CardLoader";

const CardWrapper = () => {
  const [data, error, isLoading] = useFetchCulturesAPI();
  return (
    <div className="flex flex-row justify-around items-center flex-wrap p-6 pr-20 pb-36 pl-28">
      {error && <h1>{error}</h1>}
      {data?.map((item) =>
        isLoading ? (
          <CardLoader key={item.id} />
        ) : (
          <CultureCardItem key={item.id} props={item} />
        )
      )}
    </div>
  );
};

export default CardWrapper;
