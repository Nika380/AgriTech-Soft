"use client";
import React, { useState } from "react";
import { Button, Modal } from "antd";
import AddCultureForm from "./AddCultureForm";

const AddCultureModal = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="flex justify-end sm:justify-end items-center sm:flex-row flex-col mt-auto py-10">
        <Button
          onClick={() => setOpen(!open)}
          className="text-white bg-[#2d3d51] sm:mt-0 mt-5 sm:mr-10"
        >
          კულტურის დამატება
        </Button>
      </div>

      <Modal
        title="ახალი კულტურა"
        open={open}
        onOk={() => setOpen(!open)}
        onCancel={() => setOpen(!open)}
        className="text-black bg-blur"
        footer={false}
      >
        <AddCultureForm
          handleCancel={() => setOpen(!open)}
          handleOk={() => setOpen(!open)}
        />
      </Modal>
    </>
  );
};
export default AddCultureModal;
