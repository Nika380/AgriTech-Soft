"use client";
import React, { useEffect, useState } from "react";
import { Button, Select, Space } from "antd";
import { API } from "../utils/API";
import { AiOutlineCloudUpload, AiOutlineClose } from "react-icons/ai";

function FileUploader() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectOption, setSelectOption] = useState(null);
  const [actuveButton, setactuveButton] = useState(true);
  // const responseData = {
  //   class: "ragaca",
  //   confidence: "123%",
  //   medicineList: ["123", "wamali", "wamali2"],
  // };
  const plantOptions = [
    { value: 1, label: "ყურძენი" },
    { value: 2, label: "პომიდორი" },
    { value: 3, label: "წიწაკა" },
    { value: 4, label: "კარტოფილი" },
  ];

  useEffect(() => {
    if (selectedFile && selectOption) {
      setactuveButton(false);
    } else {
      setactuveButton(true);
    }
  }, [selectedFile, selectOption]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleSelectChange = (value) => {
    setSelectOption(value);
  };

  const analysePlant = async () => {
    const data = new FormData();
    data.append("file", selectedFile);
    data.append("option", selectOption);
    const response = await API.post("/analyze", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response.data);
  };

  return (
    <div className="flex flex-col justify-center items-center h-[70vh]">
      <div className="flex items-end justify-end w-full">
        <Space wrap>
          <Select
            placeholder="აირჩიეთ მცენარე"
            style={{
              width: 200,
            }}
            options={plantOptions.map((province) => ({
              label: province.label,
              value: province.value,
            }))}
            onChange={handleSelectChange}
          />
        </Space>
      </div>
      <div className="flex items-center justify-center w-full h-[80%]">
        {selectedFile ? (
          <div className="flex flex-col justify-center items-center w-[60%] h-[90%]">
            <div className="flex w-[60%] justify-end items-end mb-1">
              <AiOutlineClose
                onClick={() => setSelectedFile(null)}
                className="text-lg text-white cursor-pointer"
              />
            </div>
            <img
              alt="img"
              src={URL.createObjectURL(selectedFile)}
              className="w-[60%] max-h-[48vh] rounded-lg"
            />
          </div>
        ) : (
          <>
            <input
              type="file"
              onChange={handleFileChange}
              className="hidden"
              id="file"
            />
            <label
              htmlFor="file"
              className="h-[90%] w-[60%] rounded-md border-2 border-dashed border-blue-600 text-center hover:border-blue-400 text-blue-600 block leading-3 mr-11 text-2xl cursor-pointer"
            >
              <AiOutlineCloudUpload className="text-[150px]" />
              დაამატე სურათი
            </label>
          </>
        )}
      </div>
      <div className={`${selectedFile && "mt-3"}`}>
        <Button
          type="primary"
          ghost
          onClick={() => analysePlant()}
          disabled={actuveButton}
          className="text-white"
        >
          შემოწმება
        </Button>
      </div>
    </div>
  );
}

export default FileUploader;
