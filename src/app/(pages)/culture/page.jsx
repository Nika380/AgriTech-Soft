import React from "react";
import AddCultureModal from "../../../components/AddCultureModal";
import CardWrapper from "../../../components/CardWrapper";

const Culture = () => {
  return (
    <div className="relative bg-black overflow-auto scrollbar-none h-screen">
      <AddCultureModal />
      <CardWrapper />
    </div>
  );
};

export default Culture;
