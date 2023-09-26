/* eslint-disable react/prop-types */
import React, { useEffect, useState, useRef } from "react";
import { useGlobalContext } from "../../../../context/global/GlobalContextProvider";
import { API } from "../../../../utils/API";
import {
  apiCallRefresh,
  handleEdit,
} from "../../../../context/actions/actionCreators";
import { addCultureAction } from "../../../../constants/constants";
import { Button, Space, DatePicker } from "antd";

const Form = ({
  label,
  onChange,
  errorMessage,
  setOptionValue,
  ...inputProps
}) => {
  const [focused, setfocused] = useState(false);
  const ref = useRef(null);
  const handleSelectChange = () => {
    setOptionValue(ref.current.value);
  };

  const handleFocuse = () => {
    if (
      inputProps?.value?.length > 0 &&
      inputProps?.value.match(inputProps?.pattern)
    ) {
      setfocused(false);
    } else {
      setfocused(true);
    }
  };
  return (
    <>
      {inputProps?.select ? (
        <div className="mb-4">
          <label className="block font-medium mb-1 text-black">{label}</label>
          <select
            ref={ref}
            className={`backdrop-blur-lg w-full p-2 border rounded ${
              focused && "border-red-600"
            }`}
            onChange={handleSelectChange}
          >
            <option value={"0"}>მიუთითეთ შემოსავლის ტიპი</option>
            <option value={"1"}>შემოსავალი</option>
            <option value={"2"}>ხარჯი</option>
          </select>
          <span
            className={`text-center p-1 text-red-600 text-xs ${
              focused ? "block" : "hidden"
            }`}
          >
            {errorMessage}
          </span>
        </div>
      ) : (
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
      )}
    </>
  );
};

const AddForm = ({ setopenModal, id }) => {
  const { state, dispatch } = useGlobalContext();
  const [values, setvalues] = useState({
    taskName: "",
    taskType: "",
    price: "",
    plannedAt: "",
  });
  const [isLoading, setisLoading] = useState(false);
  const [ValueCheck, setValueCheck] = useState(false);
  const [activeButton, setactiveButton] = useState(false);
  const [optionsValue, setOptionValue] = useState("");
  const [data, setdata] = useState("");
  const test = [
    values.taskName,
    values.taskType,
    values.price,
    values.plannedAt,
  ];
  useEffect(() => {
    test.forEach((item) => {
      if (item.length > 0) {
        setValueCheck(true);
      } else {
        setValueCheck(false);
      }
      if (ValueCheck && optionsValue !== "0" && data) {
        setactiveButton(true);
      } else {
        setactiveButton(false);
      }
    });
  }, [values, ValueCheck, optionsValue]);

  const addActionHandler = async (e) => {
    e.preventDefault();
    setisLoading(true);
    setactiveButton(true);
    if (values.id) {
      await API.put(`//${values.id}`, { values })
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
        .finally(() => {
          dispatch(handleEdit(false)), setisLoading(false);
        });
      setvalues({ taskName: "", taskType: "", price: "", plannedAt: "" });
      dispatch(apiCallRefresh(!state.apiCallRefresh));
      setopenModal(false);
    } else {
      await API.post(`/cultures/details/${id}`, { values })
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
        .finally(() => setisLoading(false));
      setvalues({ taskName: "", taskType: "", price: "", plannedAt: "" });
      dispatch(apiCallRefresh(!state.apiCallRefresh));
      setopenModal(false);
    }
  };

  useEffect(() => {
    setvalues({ ...values, taskType: optionsValue });
  }, [optionsValue]);
  useEffect(() => {
    setvalues({ ...values, plannedAt: data });
  }, [data]);

  const handleChange = (e) => {
    setvalues({ ...values, [e.target.name]: e.target.value });
  };

  const onChange = (data, dateString) => {
    setdata(dateString);
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
              setOptionValue={setOptionValue}
            />
          ))}
          <Space direction="vertica">
            <div className="mb-4">
              <label
                htmlFor="data"
                className="block font-medium mb-1 text-black"
              >
                თარიღი
              </label>
              <DatePicker
                onChange={onChange}
                className="backdrop-blur-lg w-full p-2 border rounded"
              />
            </div>
          </Space>
          <Space wrap className="flex flex-row justify-between">
            <Button danger onClick={() => setopenModal((prev) => !prev)}>
              გამოსვლა
            </Button>
            <Button
              type="primary"
              ghost
              onClick={addActionHandler}
              disabled={!activeButton}
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
