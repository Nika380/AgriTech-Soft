"use client";
import { Form, Input, Select, Button } from "antd";
import React, { useEffect, useState } from "react";
import { API } from "../utils/API";
import { useGlobalContext } from "@/context/global/GlobalContextProvider";
import { apiCallRefresh } from "@/context/actions/actionCreators";

const AntdAddCultureForm = () => {
  const [form] = Form.useForm();
  const { state, dispatch } = useGlobalContext();
  const [loading, setLoading] = useState(false);
  const [optionList, setOptionList] = useState([
    { value: 1, label: "საგაზაფხულო ხორბალი და ქერი" },
    { value: 2, label: "სიმინდი სამარცვლოდ" },
    { value: 3, label: "კარტოფილი" },
    { value: 4, label: "მზესუმზირა" },
    { value: 5, label: "ბოსტნეული" },
    { value: 6, label: "ვაზი" },
    { value: 7, label: "სხვა" },
  ]);
  const onFinish = async (values) => {
    setLoading(true);
    console.log(values);
    await API.post("/cultures/add-culture", { values }).then((res) => {
      form.resetFields();
      dispatch(apiCallRefresh(!state.apiCallRefresh));
    });
    setLoading(false);
  };

  //   const getOptionsList = async () => {
  //     await API.get("/agrocalendar").then((res) => {
  //       setOptionList(res.data.content);
  //       console.log(res.data.content);
  //     });
  //   };
  //   useEffect(() => {
  //     getOptionsList();
  //   }, []);
  return (
    <div style={{ height: "45vh" }} className="p-12">
      <Form form={form} onFinish={onFinish}>
        <Form.Item name={"cultureName"} initialValue={""}>
          <Input type="text" placeholder="კულტურის დასახელება" />
        </Form.Item>
        <Form.Item name={"location"} initialValue={""}>
          <Input type="text" placeholder="ლოკაცია" />
        </Form.Item>
        <Form.Item name={"squareMeter"} initialValue={""}>
          <Input type="number" step={"0.1"} placeholder="კვ. მ" />
        </Form.Item>
        <Form.Item name={"agrocalendar"} initialValue={""}>
          <Select
            options={optionList}
            placeholder="კულუტის ზოგადი დასახელება"
          />
        </Form.Item>
        <Button htmlType="submit" loading={loading}>
          დამატება
        </Button>
      </Form>
    </div>
  );
};

export default AntdAddCultureForm;
