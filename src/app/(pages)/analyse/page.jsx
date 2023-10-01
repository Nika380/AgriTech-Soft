import React from "react";
import AnalyseImg from "../../../components/AnalyseImg";

const Analyse = () => {
  return (
    <div className="relative bg-black overflow-auto scrollbar-none h-screen">
      <div className="flex flex-col justify-center items-center pt-10">
        <h1 className="text-white text-3xl">მცენარის ანალიზი</h1>
      </div>
      <div className="xl:pl-28 xl:pr-10 pl-0 pr-0 md:pl-28 md:pr-10 bg-black">
        <AnalyseImg />
      </div>
    </div>
  );
};

export default Analyse;
