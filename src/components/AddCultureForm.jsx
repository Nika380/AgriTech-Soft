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
  activeButton,
  handleEdit,
} from "../context/actions/actionCreators";

const Form = ({ label, onChange, errorMessage, ...inputProps }) => {
  const { dispatch } = useGlobalContext();

  const [focused, setfocused] = useState(false);
  const handleFocuse = () => {
    if (
      inputProps?.value?.length > 0 &&
      inputProps?.value.match(inputProps?.pattern)
    ) {
      setfocused(false);
    } else {
      setfocused(true);
      dispatch(activeButton(true));
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
  const values = state.values;
  const test = [
    state.values.cultureName,
    state.values.squareMeter,
    state.values.location,
  ];
  const [isLoading, setisLoading] = useState(false);
  const [ValueCheck, setValueCheck] = useState(false);
  useEffect(() => {
    test.forEach((item) => {
      if (item.length > 0) {
        setValueCheck(true);
      } else {
        setValueCheck(false);
      }
    });
    if (ValueCheck) {
      dispatch(activeButton(false));
    } else {
      dispatch(activeButton(true));
    }
  }, [values, ValueCheck]);

  const addCultureHandler = async (e) => {
    e.preventDefault();
    setisLoading(true);
    dispatch(activeButton(true));
    if (state.editCulture) {
      await API.put(`cultures/update-info/${values.id}`, {
        values,
      })
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
        .finally(() => {
          dispatch(handleEdit(false)), setisLoading(false);
        });
      dispatch(
        currentCultureValue({ cultureName: "", squareMeter: "", location: "" })
      );
      dispatch(apiCallRefresh(!state.apiCallRefresh));
      dispatch(openModal(!state.openModal));
    } else {
      await API.post("/cultures/add-culture", { values })
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
        .finally(() => setisLoading(false));
      dispatch(
        currentCultureValue({ cultureName: "", squareMeter: "", location: "" })
      );
      dispatch(apiCallRefresh(!state.apiCallRefresh));
      dispatch(openModal(!state.openModal));
    }
  };
  const handleChange = (e) => {
    dispatch(
      currentCultureValue({ ...values, [e.target.name]: e.target.value })
    );
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
              disabled={state.activeFormButton}
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
