/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react/prop-types */
import React from "react";
import {
  EditOutlined,
  DeleteOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Card } from "antd";
const { Meta } = Card;

const CultureCardItem = ({ props }) => {
  console.log(props);
  return (
    <Card
      style={{
        width: 300,
        marginBottom: "70px",
      }}
      actions={[
        <SettingOutlined key="setting" className="hover:text-green-400" />,
        <EditOutlined key="edit" className="hover:text-yellow-400" />,
        <DeleteOutlined key="delete" className="hover:text-red-400" />,
      ]}
    >
      <Meta title={props?.cultureName} description={props?.location} />
      <Meta description={`${props.squareMeter} კვ/მ.`} />
    </Card>
  );
};

export default CultureCardItem;
