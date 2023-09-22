/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { inputs } from "../constants/constants";
import { Button, Space } from "antd";
import { API } from "../utils/API";
import { useGlobalContext } from "../context/global/GlobalContextProvider";
import {
  openModal,
  apiCallRefresh,
  currentCultureValue,
} from "../context/actions/actionCreators";

const Form = ({
  label,
  onChange,
  errorMessage,
  setactiveButton,
  ...inputProps
}) => {
  const [focused, setfocused] = useState(false);
  const handleFocuse = () => {
    if (
      inputProps?.value?.length > 0 &&
      inputProps?.value.match(inputProps?.pattern)
    ) {
      setfocused(false);
    } else {
      setfocused(true);
      setactiveButton(true);
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

const AddCultureForm = () => {
  const { state, dispatch } = useGlobalContext();
  const [activeButton, setactiveButton] = useState(true);
  const [isLoading, setisLoading] = useState(false);
  const [values, setValues] = useState({
    cultureName: state.currentCultureValue?.cultureName,
    squareMeter: state.currentCultureValue?.squareMeter,
    location: state.currentCultureValue?.squareMeter,
  });
  console.log(values);
  const areValuesNotEmpty = Object.values(values).every(
    (value) => value?.length > 0
  );
  useEffect(() => {
    if (areValuesNotEmpty) {
      setactiveButton(false);
    } else {
      setactiveButton(true);
    }
  }, [areValuesNotEmpty]);

  const addCultureHandler = async (e) => {
    e.preventDefault();
    setisLoading(true);
    setactiveButton(true);
    if (state.currentCultureValue?.cultureName) {
      const values = state.currentCultureValue;
      await API.put(`cultures/update-info/${state.currentCultureValue.id}`, {
        values,
      })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
      dispatch(currentCultureValue(null));
    }
    await API.post("/cultures/add-culture", { values })
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
      .finally(() => setisLoading(false));
    setValues({ cultureName: "", squareMeter: "", location: "" });
    dispatch(apiCallRefresh(!state.apiCallRefresh));
    dispatch(openModal(!state.openModal));
  };
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  return (
    <div className="flex items-center justify-center mt-10">
      <div className="p-8 rounded shadow-md max-w-md w-full">
        <form>
          {inputs.map((input) => (
            <Form
              key={input.id}
              {...input}
              value={values[input.name]}
              onChange={handleChange}
              setactiveButton={setactiveButton}
            />
          ))}
          <Space wrap className="flex flex-row justify-between">
            <Button
              danger
              onClick={() => dispatch(openModal(!state.openModal))}
            >
              გამოსვლა
            </Button>
            <Button
              type="primary"
              ghost
              onClick={addCultureHandler}
              disabled={activeButton}
            >
              {isLoading ? <div className="custom-loader"></div> : "დამატება"}
            </Button>
          </Space>
        </form>
      </div>
    </div>
  );
};
export default AddCultureForm;
