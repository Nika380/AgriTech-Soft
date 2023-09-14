"use client";
import React, { useState } from "react";
import { Button, Modal } from "antd";
import AddCultureForm from "./AddCultureForm";

const AddCultureModal = () => {
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setOpen(false);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <>
      <div className=" flex justify-around items-center sm:flex-row flex-col  mt-auto ml-10">
        <Button
          onClick={showModal}
          className="text-white bg-[#2d3d51] sm:mt-0 mt-5 lg:ml-[700px] sm:mr-20 mr-20"
        >
          კულტურის დამატება
        </Button>
      </div>

      <Modal
        title="ახალი კულტურა"
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        className="text-black bg-blur"
        footer={false}
      >
        <AddCultureForm handleCancel={handleCancel} handleOk={handleOk} />
      </Modal>
    </>
  );
};
export default AddCultureModal;
