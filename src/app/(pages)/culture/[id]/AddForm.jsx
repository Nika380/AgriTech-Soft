/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../../../context/global/GlobalContextProvider";
import { API } from "../../../../utils/API";
import {
  apiCallRefresh,
  handleEdit,
} from "../../../../context/actions/actionCreators";
import { addCultureAction } from "../../../../constants/constants";
import { Button, Space, DatePicker, Select } from "antd";
import {
  cultureAction,
  openModal,
} from "../../../../context/actions/actionCreators";
import dayjs from "dayjs";

const Form = ({
  label,
  onChange,
  errorMessage,
  setOptionValue,
  ...inputProps
}) => {
  const { state } = useGlobalContext();
  const LabeledValue = state.cultureAction.taskType;
  const [focused, setfocused] = useState(false);
  const handleSelectChange = (value) => {
    setOptionValue(value);
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
        <>
          <label className="block font-medium mb-1 text-black">{label}</label>
          <Select
            className={`backdrop-blur-lg w-full p-2 border rounded ${
              focused && "border-red-600"
            }`}
            defaultValue={`${LabeledValue}`}
            onChange={handleSelectChange}
            placeholder="მიუთითეთ შემოსავლის ტიპი"
            options={[
              {
                label: "მიუთითეთ შემოსავლის ტიპი",
                options: [
                  { label: "ხარჯი", value: "2" },
                  { label: "შემოსავალი", value: "1" },
                ],
              },
            ]}
            style={{ height: 50, marginBottom: "16px" }}
          />
          <span
            className={`text-center p-1 text-red-600 text-xs ${
              focused ? "block" : "hidden"
            }`}
          >
            {errorMessage}
          </span>
        </>
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

const AddForm = ({ id }) => {
  const { state, dispatch } = useGlobalContext();
  const values = state.cultureAction;
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
  console.log(values);
  useEffect(() => {
    test?.forEach((item) => {
      if (item?.length > 0) {
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
      await API.put(`/cultures/details/${id}/${values.id}`, { values })
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
        .finally(() => {
          dispatch(handleEdit(false)), setisLoading(false);
        });
      dispatch(
        cultureAction({ taskName: "", taskType: "", price: "", plannedAt: "" })
      );
      dispatch(apiCallRefresh(!state.apiCallRefresh));
      dispatch(openModal(!state.openModal));
    } else {
      await API.post(`/cultures/details/${id}`, { values })
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
        .finally(() => setisLoading(false));
      dispatch(
        cultureAction({ taskName: "", taskType: "", price: "", plannedAt: "" })
      );
      dispatch(apiCallRefresh(!state.apiCallRefresh));
      dispatch(openModal(!state.openModal));
    }
  };

  useEffect(() => {
    dispatch(cultureAction({ ...values, taskType: optionsValue }));
  }, [optionsValue]);
  useEffect(() => {
    dispatch(cultureAction({ ...values, plannedAt: data }));
  }, [data]);

  const handleChange = (e) => {
    dispatch(cultureAction({ ...values, [e.target.name]: e.target.value }));
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
              key={input.id}
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
                defaultValue={
                  state.cultureAction.plannedAt
                    ? dayjs(state.cultureAction.plannedAt, "YYYY-MM")
                    : dayjs()
                }
                onChange={onChange}
                className="backdrop-blur-lg w-full p-2 border rounded"
              />
            </div>
          </Space>
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
