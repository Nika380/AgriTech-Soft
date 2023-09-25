/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../../../context/global/GlobalContextProvider";
import { API } from "../../../../utils/API";
import {
  apiCallRefresh,
  handleEdit,
  newAction,
} from "../../../../context/actions/actionCreators";
import { addCultureAction } from "../../../../constants/constants";
import { Button, Space } from "antd";

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

const AddForm = ({ setopenModal }) => {
  const { state, dispatch } = useGlobalContext();
  const values = state.action;
  const test = [
    state.action.name,
    state.action.money,
    state.action.mainBusiness,
  ];
  const [isLoading, setisLoading] = useState(false);
  const [ValueCheck, setValueCheck] = useState(false);
  const [activeButton, setactiveButton] = useState(false);
  useEffect(() => {
    test.forEach((item) => {
      if (item.length > 0) {
        setValueCheck(true);
      } else {
        setValueCheck(false);
      }
      if (ValueCheck) {
        setactiveButton(false);
      } else {
        setactiveButton(true);
      }
    });
  }, [values, ValueCheck]);

  const addActionHandler = async (e) => {
    e.preventDefault();
    setisLoading(true);
    setactiveButton(true);
    if (state.editCulture) {
      await API.put(`//${values.id}`, { values })
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
        .finally(() => {
          dispatch(handleEdit(false)), setisLoading(false);
        });
      dispatch(newAction({ name: "", money: "", mainBusiness: "" }));
      dispatch(apiCallRefresh(!state.apiCallRefresh));
      setopenModal(false);
    } else {
      await API.post(`//`, { values })
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
        .finally(() => setisLoading(false));
      dispatch(newAction({ name: "", money: "", mainBusiness: "" }));
      dispatch(apiCallRefresh(!state.apiCallRefresh));
      setopenModal(false);
    }
  };

  const handleChange = (e) => {
    dispatch(newAction({ ...values, [e.target.name]: e.target.value }));
  };
  return (
    <div className="flex items-center justify-center mt-10">
      <div className="p-8 rounded shadow-md max-w-md w-full">
        <form>
          {addCultureAction.map((input) => (
            <Form
              key={input.key}
              {...input}
              value={values[input.name]}
              onChange={handleChange}
              setactiveButton={() => setactiveButton()}
            />
          ))}
          <Space wrap className="flex flex-row justify-between">
            <Button danger onClick={() => setopenModal((prev) => !prev)}>
              გამოსვლა
            </Button>
            <Button
              type="primary"
              ghost
              onClick={addActionHandler}
              disabled={activeButton}
            >
              {isLoading ? <div className="custom-loader" /> : "დამატება"}
            </Button>
          </Space>
        </form>
      </div>
    </div>
  );
};

export default AddForm;
