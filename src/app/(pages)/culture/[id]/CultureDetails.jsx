/* eslint-disable react/prop-types */
"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Button, Popconfirm, Table, Modal, Space } from "antd";
import { useParams } from "next/navigation";
import AddForm from "./AddForm";
import useFetchUpdateCulturesDetails from "../../../../hooks/useFetchUpdateCulturesDetails";
import { API } from "../../.../../../../utils/API";
import { useGlobalContext } from "../../../../context/global/GlobalContextProvider";
import {
  apiCallRefresh,
  openModal,
  cultureAction,
} from "../../../../context/actions/actionCreators";
import AntdForm from "./AntdForm";
import { useState } from "react";
import EditForm from "./EditForm";

const App = () => {
  const router = useRouter();
  const { state, dispatch } = useGlobalContext();
  const { id } = useParams();
  const [updateId, setUpdateId] = useState(null);
  const [openAddModal, setopenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [data, setData] = useState(null);
  const [dataSource, Error, isLoading] = useFetchUpdateCulturesDetails(id);
  const handleDelete = async (detailID) => {
    await API.delete(`/cultures/details/${id}/${detailID}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    dispatch(apiCallRefresh(!state.apiCallRefresh));
  };

  const handleEdit = (record) => {
    setOpenEditModal(true)
    setData(record)
    // dispatch(
    //   cultureAction({
    //     taskName: record.taskName,
    //     taskType: record.taskType === "შემოსავალი" ? "1" : "2",
    //     price: record.price,
    //     plannedFrom: record.plannedFrom,
    //     plannedTo: record.plannedTo,
    //     id: record.id,
    //   })
    // );
    // dispatch(openModal(!state.openModal));
  };

  const defaultColumns = [
    {
      id: 1,
      title: "სახელი",
      dataIndex: "taskName",
      width: "30%",
      editable: true,
    },
    {
      id: 2,
      title: "შემოსავალი/ხარჯი",
      dataIndex: "taskType",
      editable: true,
    },
    {
      id: 3,
      title: "თანხა",
      dataIndex: "price",
      editable: true,
    },
    {
      id: 4,
      title: "დაწყების თარიღი",
      dataIndex: "plannedFrom",
      editable: true,
    },
    {
      id: 5,
      title: "დასრულების თარიღი",
      dataIndex: "plannedTo",
      editable: true,
    },
    {
      id: 6,
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm
            title="ნამდვილად გსურთ წაშლა?"
            onConfirm={() => handleDelete(record.id)}
            okType="danger"
            okText="კი"
            cancelText="არა"
          >
            <Button danger size="small">
              წაშლა
            </Button>
          </Popconfirm>
        ) : null,
    },
    {
      id: 7,
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm
            title="ნამდვილად გსურთ ცვლილება?"
            onConfirm={() => handleEdit(record)}
            okType="danger"
            okText="კი"
            cancelText="არა"
          >
            <Button size="small" className="border-blue-600 text-blue-600">
              ცვლილება
            </Button>
          </Popconfirm>
        ) : null,
    },
  ];

  const columns = defaultColumns.map((col) => {
    return {
      key: col.id,
      ...col,
    };
  });

  if (Error) {
    return (
      <div className="flex flex-col justify-center items-center w-full h-[80%]">
        <h1 className="text-white text-2xl mb-[100px]">კავშირის შეფერხება</h1>
        <Button type="primary" ghost onClick={() => window.location.reload()}>
          ხელმეორედ ცდა
        </Button>
      </div>
    );
  }
  return (
    <>
      <Space direction="horizontal">
        <Button
          type="primary"
          ghost
          onClick={() => router.back()}
          style={{
            marginBottom: 16,
          }}
        >
          უკან დაბრუნება
        </Button>
        <Button
          type="primary"
          ghost
          onClick={() => {
            // dispatch(openModal(!state.openModal));
            // dispatch(
            //   cultureAction({
            //     taskName: "",
            //     taskType: "",
            //     price: "",
            //     plannedFrom: "",
            //     plannedTo: "",
            //   })
            // );
            setopenAddModal(true);
          }}
          style={{
            marginBottom: 16,
          }}
        >
          დამატება
        </Button>
      </Space>
      <Table
        rowClassName={() => "editable-row"}
        bordered
        dataSource={dataSource}
        columns={columns}
        loading={isLoading}
      />
      <Modal
        title="დაამატე რამე"
        onOk={() => setopenAddModal(false)}
        onCancel={() => setopenAddModal(false)}
        open={openAddModal}
        footer={false}
        style={{ minHeight: "50vh" }}
      >
        {/* <AddForm id={id} /> */}
        <AntdForm id={id} />
      </Modal>
      <Modal
        title="დაამატე რამე"
        onOk={() => setOpenEditModal(false)}
        onCancel={() => setOpenEditModal(false)}
        open={openEditModal}
        footer={false}
        style={{ minHeight: "50vh" }}
      >
        {/* <AddForm id={id} /> */}
        <EditForm cultureId={id} detailId={updateId} record={data}/>
      </Modal>
    </>
  );
};
export default App;
