"use client";
import React from "react";
import { Card } from "antd";
const { Meta } = Card;

const CardLoader = () => {
  return (
    <>
      <Card
        style={{
          width: 300,
          marginBottom: "70px",
        }}
        loading={true}
      >
        <Meta title="Card title" description="This is the description" />
      </Card>
    </>
  );
};

export default CardLoader;
