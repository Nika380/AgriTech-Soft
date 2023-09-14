/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { inputs } from "../constants/constants";
import { Button, Space } from "antd";

const Form = ({ label, onChange, errorMessage, ...inputProps }) => {
  const [focused, setfocused] = useState(false);
  const handleFocuse = () => {
    if (inputProps.pattern) {
      if (inputProps?.value.match(inputProps?.pattern)) {
        setfocused(false);
      } else {
        setfocused(true);
      }
    }
  };
  return (
    <div className="mb-4">
      <label className="block font-medium mb-1 text-black">{label}</label>
      <input
        {...inputProps}
        onChange={onChange}
        onBlur={handleFocuse}
        className={`backdrop-blur-lg w-full p-2 border rounded ${
          focused && "border-red-600"
        }`}
        onFocus={() =>
          inputProps.name === "confirmPassword" && setfocused(true)
        }
      />
      <span
        className={`text-center p-1 text-red-600 text-xs ${
          focused ? "block" : "hidden"
        }`}
      >
        {errorMessage}
      </span>
    </div>
  );
};

const AddCultureForm = ({ handleCancel, handleOk }) => {
  const [culture, setculture] = useState({
    cultureName: "",
    squareMetre: "",
    location: "",
  });
  console.log(culture);
  const addCultureHandler = (e) => {
    e.preventDefault();
    //some action
  };
  const handleChange = (e) => {
    setculture({ ...culture, [e.target.name]: e.target.value });
  };
  return (
    <div className="flex items-center justify-center mt-10">
      <div className="p-8 rounded shadow-md max-w-md w-full">
        <form onSubmit={addCultureHandler}>
          {inputs.map((input) => (
            <Form
              key={input.id}
              {...input}
              value={culture[input.name]}
              onChange={handleChange}
            />
          ))}
          <Space wrap className="flex flex-row justify-between">
            <Button danger onClick={handleCancel}>
              გამოსვლა
            </Button>
            <Button type="primary" ghost onClick={handleOk}>
              დამატება
            </Button>
          </Space>
        </form>
      </div>
    </div>
  );
};
export default AddCultureForm;
