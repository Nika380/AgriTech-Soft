import { apiCallRefresh } from "@/context/actions/actionCreators";
import { useGlobalContext } from "@/context/global/GlobalContextProvider";
import { API } from "@/utils/API";
import { Button, DatePicker, Form, Input, Select } from "antd";
import dayjs from "dayjs";
import React, { useState } from "react";

const AntdForm = ({ id }) => {
  const { state, dispatch } = useGlobalContext();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    setLoading(true);
    values.plannedFrom = dayjs(values.plannedTime[0]).format("YYYY-MM-DD");
    values.plannedTo = dayjs(values.plannedTime[1]).format("YYYY-MM-DD");
    console.log(values);
    await API.post(`/cultures/details/${id}`, { values });

    form.resetFields();
    setLoading(false);
    dispatch(apiCallRefresh(!state.apiCallRefresh));
  };
  return (
    <div className="h-1/2">
      <Form form={form} onFinish={onFinish}>
        <Form.Item
          name={"taskName"}
          initialValue={""}
          rules={[{ required: true, message: "ეს ველი სავალდებულოა" }]}
        >
          <Input type="text" placeholder="საქმის სახელი" />
        </Form.Item>
        <Form.Item
          name={"taskType"}
          initialValue={""}
          rules={[{ required: true, message: "ეს ველი სავალდებულოა" }]}
        >
          <Select
            placeholder="მიუთითე საქმის ტიპი"
            options={[
              { value: 1, label: "შემოსავალი" },
              { value: 2, label: "ხარჯი" },
            ]}
          />
        </Form.Item>
        <Form.Item
          name={"price"}
          initialValue={""}
          rules={[{ required: true, message: "ეს ველი სავალდებულოა" }]}
        >
          <Input type="number" step={"0.1"} placeholder="თანხის ოდენობა" />
        </Form.Item>
        <Form.Item
          name={"plannedTime"}
          initialValue={""}
          rules={[{ required: true, message: "ეს ველი სავალდებულოა" }]}
        >
          <DatePicker.RangePicker />
        </Form.Item>
        <Button htmlType="submit" loading={loading}>
          დამატება
        </Button>
      </Form>
    </div>
  );
};

export default AntdForm;
