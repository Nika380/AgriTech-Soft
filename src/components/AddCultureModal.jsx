"use client";
import React from "react";
import { Button, Modal } from "antd";
import AddCultureForm from "./AddCultureForm";
import { useGlobalContext } from "../context/global/GlobalContextProvider";
import { activeButton, openModal } from "../context/actions/actionCreators";
import { currentCultureValue } from "../context/actions/actionCreators";
import AntdAddCultureform from "./AntdAddCultureForm";
import { useState } from "react";

const AddCultureModal = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <div className="flex justify-end sm:justify-end items-center sm:flex-row flex-col mt-auto py-10">
        <Button
          onClick={() => setOpenModal(true)}
          className="text-white bg-[#2d3d51] sm:mt-0 mt-5 sm:mr-10"
        >
          კულტურის დამატება
        </Button>
      </div>

      <Modal
        // title={state?.values?.id ? "კულტურის რედაქტირება" : "ახალი კულტურა"}
        open={openModal}
        onOk={() => setOpenModal(false)}
        onCancel={() => setOpenModal(false)}
        className="text-black bg-blur"
        footer={false}
      >
        <AntdAddCultureform />
      </Modal>
    </>
  );
};
export default AddCultureModal;
