/* eslint-disable react/prop-types */
"use client";
import React from "react";
import useFetchCulturesAPI from "../hooks/useFetchCulturesAPI";
import CultureCardItem from "./CultureCardItem";
import CardLoader from "./CardLoader";
import { Button } from "antd";

const CardWrapper = () => {
  const [data, error, isLoading] = useFetchCulturesAPI();
  if (error) {
    return (
      <div className="flex flex-col justify-center items-center w-full h-[80%]">
        <h1 className="text-white text-2xl mb-[100px]">კავშირის შეფერხება</h1>
        <Button type="primary" ghost onClick={() => window.location.reload()}>
          ხელმეორედ ცდა
        </Button>
      </div>
    );
  }
  return (
    <div className="flex flex-row justify-around items-center flex-wrap p-6 pr-20 pb-36 pl-28">
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
