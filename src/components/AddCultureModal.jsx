"use client";
import React from "react";
import { Button, Modal } from "antd";
import AddCultureForm from "./AddCultureForm";
import { useGlobalContext } from "../context/global/GlobalContextProvider";
import { openModal } from "../context/actions/actionCreators";

const AddCultureModal = () => {
  const { state, dispatch } = useGlobalContext();
  return (
    <>
      <div className="flex justify-end sm:justify-end items-center sm:flex-row flex-col mt-auto py-10">
        <Button
          onClick={() => dispatch(openModal(!state.openModal))}
          className="text-white bg-[#2d3d51] sm:mt-0 mt-5 sm:mr-10"
        >
          კულტურის დამატება
        </Button>
      </div>

      <Modal
        title="ახალი კულტურა"
        open={state.openModal}
        onOk={() => dispatch(openModal(!state.openModal))}
        onCancel={() => dispatch(openModal(!state.openModal))}
        className="text-black bg-blur"
        footer={false}
      >
        <AddCultureForm />
      </Modal>
    </>
  );
};
export default AddCultureModal;
