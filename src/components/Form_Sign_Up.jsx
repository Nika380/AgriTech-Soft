/* eslint-disable react/prop-types */
import React, { useState } from "react";

const Form_Sign_Up = ({ label, onChange, errorMessage, ...inputProps }) => {
  const [focused, setfocused] = useState(false);
  const handleFocuse = () => {
    if (inputProps.value.match(inputProps.pattern)) {
      setfocused(false);
    } else {
      setfocused(true);
    }
  };
  return (
    <div className="mb-4">
      <label className="block font-medium mb-1 text-white">{label}</label>
      <input
        {...inputProps}
        onChange={onChange}
        onBlur={handleFocuse}
        className={`w-full ransition-all duration-200 hover:bg-gray-300 cursor-pointer text-black outline-none font-bold rounded-0.2vw px-8 py-2.5 bg-opacity-50 hover:bg-opacity-100 focus:ring-2 focus:ring-opacity-50 focus:ring-gray-300 border-2 border-white rounded-lg ${
          focused && "border-red-500"
        }`}
        onFocus={() =>
          inputProps.name === "confirmPassword" && setfocused(true)
        }
      />
      <span
        className={`text-center p-1 text-red-500 text-xs ${
          focused ? "block" : "hidden"
        }`}
      >
        {errorMessage}
      </span>
    </div>
  );
};

export default Form_Sign_Up;
