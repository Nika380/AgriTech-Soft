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

const App = () => {
  const router = useRouter();
  const { state, dispatch } = useGlobalContext();
  const { id } = useParams();
  const [dataSource, Error, isLoading] = useFetchUpdateCulturesDetails(id);
  // const [record, setrecord] = useState({});
  const handleDelete = async (detailID) => {
    await API.delete(`/cultures/details/${id}/${detailID}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    dispatch(apiCallRefresh(!state.apiCallRefresh));
  };

  const handleEdit = (record) => {
    dispatch(
      cultureAction({
        taskName: record.taskName,
        taskType: record.taskType === "შემოსავალი" ? "1" : "2",
        price: record.price,
        plannedAt: record.plannedAt,
        id: record.id,
      })
    );
    dispatch(openModal(!state.openModal));
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
      title: "თარიღი",
      dataIndex: "plannedAt",
      editable: true,
    },
    {
      id: 5,
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
      id: 6,
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
    return <h1>{Error}</h1>;
  }
  return (
    <>
      <Space direction="horizontal">
        <Button
          type="primary"
          ghost
          onClick={() => router.push("/culture")}
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
            dispatch(openModal(!state.openModal));
            dispatch(
              cultureAction({
                taskName: "",
                taskType: "",
                price: "",
                plannedAt: "",
              })
            );
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
        onOk={() => dispatch(openModal(!state.openModal))}
        onCancel={() => dispatch(openModal(!state.openModal))}
        open={state.openModal}
        footer={false}
      >
        <AddForm id={id} />
      </Modal>
    </>
  );
};
export default App;
