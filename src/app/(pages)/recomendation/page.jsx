"use client";
import { API } from "@/utils/API";
import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Space,
  Typography,
  notification,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useState } from "react";

const Recomendation = () => {
  const [form] = Form.useForm();
  const [selection, setSelection] = useState(null);
  const [open, setOpen] = useState(false);
  const endpoints = ["fertilization", "crop-selection"];
  const [loading, setLoading] = useState(false);
  const [recomendationText, setRecomendationText] = useState("");

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await API.post(`/recomendation/${endpoints[selection - 1]}`, { values }).then(
        (res) => setRecomendationText(res.data)
      );
      setOpen(true);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      notification["success"]({
        message: "რეკომენდაციის მიღება",
        description: "დაფიქსირდა შეცდომა, გთხოვთ სცადოთ თავიდან",
      });
    }
  };
  return (
    <>
      <div className="pt-20 pl-52 pr-20 flex gap-6 flex-col">
        <Select
          placeholder="აირჩიე რეკომენდაციის ტიპი"
          options={[
            { value: 1, label: "ნიადაგის განოყიერების რეკომენდაცია" },
            { value: 2, label: "კულტურის მოყვანის რეკომენდაცია" },
          ]}
          onChange={(value) => setSelection(value)}
        />

        <Form form={form} onFinish={onFinish}>
          {selection !== null ? (
            <>
              {" "}
              <Row gutter={[16, 16]}>
                {selection === 1 && (
                  <Col span={12}>
                    <Form.Item name="crop" initialValue="">
                      <Input type="text" placeholder="მცენარის სახელი" />
                    </Form.Item>
                  </Col>
                )}
                <Col span={12}>
                  <Form.Item name="soilType" initialValue={""}>
                    <Input type="text" placeholder="მიწის ტიპი" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Form.Item name="pHLevel" initialValue={""}>
                    <Input
                      type="number"
                      step={"0.1"}
                      placeholder="მჟავიანობა PH"
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="nitrogenLevel" initialValue={""}>
                    <Input
                      type="number"
                      step={"0.1"}
                      placeholder="აზოტის დონე"
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Form.Item name="phosphorusLevel" initialValue={""}>
                    <Input
                      type="number"
                      step={"0.1"}
                      placeholder="ფოსფორის დონე"
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="potassiumLevel" initialValue={""}>
                    <Input
                      type="number"
                      step={"0.1"}
                      placeholder="კალიუმის დონე"
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Form.Item name="organicMatter" initialValue={""}>
                    <Input
                      type="number"
                      step={"0.1"}
                      placeholder="ორგანული ნივთიერებების დონე"
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="humidity" initialValue={""}>
                    <Input type="text" placeholder="ტენიანობა" />
                  </Form.Item>
                </Col>
              </Row>
              {selection === 2 && (
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <Form.Item name="climate" initialValue={""}>
                      <Input type="text" placeholder="კლიმატი" />
                    </Form.Item>
                  </Col>
                </Row>
              )}
            </>
          ) : null}

          {selection !== null && (
            <Space
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "end",
                paddingTop: "50px",
                alignItems: "end",
              }}
            >
              <Button type="default" htmlType="submit" loading={loading}>
                გაგზავნა
              </Button>
            </Space>
          )}
        </Form>
      </div>
      <Modal open={open} footer={false} onCancel={() => setOpen(false)}>
        <Space
          style={{
            minHeight: "50vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
          }}
        >
          <Typography>{recomendationText}</Typography>
        </Space>
      </Modal>
    </>
  );
};

export default Recomendation;
