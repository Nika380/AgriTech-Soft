"use client";
import React, { useState, useEffect } from "react";
import { Select, Space } from "antd";

function FileUploader() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectOption, setSelectOption] = useState(null);
  const plantOptions = [
    { value: 0, label: "აირჩიეთ მცენარე" },
    { value: 1, label: "ყურძენი" },
    { value: 2, label: "პომიდორი" },
    { value: 3, label: "წიწაკა" },
    { value: 4, label: "ლობიო" },
  ];

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleSelectChange = (value) => {
    setSelectOption(value);
  };

  useEffect(() => {
    if (selectedFile && selectOption) {
      var formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("Text", JSON.stringify(selectOption));
    }
    console.log(formData);
  }, [selectedFile, selectOption]);

  console.log(selectedFile);
  console.log(selectOption);

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
          defaultValue={plantOptions[0]}
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
  );
}

export default FileUploader;
