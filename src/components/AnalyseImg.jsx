"use client";
import React, { useState, useEffect } from "react";
import { Button, Select, Space } from "antd";
import { API } from "../utils/API";

function FileUploader() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectOption, setSelectOption] = useState(null);
  const plantOptions = [
    { value: 1, label: "ყურძენი" },
    { value: 2, label: "პომიდორი" },
    { value: 3, label: "წიწაკა" },
    { value: 4, label: "კარტოფილი" },
  ];

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
    <div className="flex flex-row justify-center items-center">
      <input
        type="file"
        onChange={handleFileChange}
        className="hidden"
        id="file"
      />
      <label
        htmlFor="file"
        className="h-24 w-36 rounded-md border-2 border-dashed border-blue-600 text-center hover:border-blue-400 text-blue-600 block leading-3 mr-11 text-xs cursor-pointer"
      >
        დაამატე სურათი
      </label>
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
      <Button onClick={() => analysePlant()}>შემოწმება</Button>
    </div>
  );
}

export default FileUploader;
