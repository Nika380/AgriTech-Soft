/* eslint-disable import/namespace */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import {
  EditOutlined,
  DeleteOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import {
  activeButton,
  apiCallRefresh,
  currentCultureValue,
  handleEdit,
  openModal,
} from "../context/actions/actionCreators";
import { Card, Modal } from "antd";
import { API } from "../utils/API";
import { useGlobalContext } from "../context/global/GlobalContextProvider";
import { useRouter } from "next/navigation";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);
const { Meta } = Card;
import AntdEditCultureModal from "./AntdEditCultureModal";

const CultureCardItem = ({ props }) => {
  const { state, dispatch } = useGlobalContext();
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const router = useRouter();
  const editCultureCard = async (values) => {
    // dispatch(openModal(!state.openModal));
    // dispatch(activeButton(false));
    // dispatch(handleEdit(true));
    // dispatch(currentCultureValue(values));
    setOpenModal(true)
  };
  const delateCultureCard = async (id) => {
    setisLoading(true);
    await API.delete(`/cultures/delete-culture/${id}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
      .finally(() => setisLoading(false));
    dispatch(apiCallRefresh(!state.apiCallRefresh));
  };
  const data = {
    labels: ["შემოსავალი", "ხარჯი"],
    datasets: [
      {
        data: [
          props.income ? props.income : "1",
          props.expense ? props.expense : "1",
        ],
        backgroundColor: ["#2ECC71", "#E74C3C"],
      },
    ],
  };
  const options = {};

  return (
    <>
      <Card
        cover={
          <>
            <Pie
              data={data}
              options={options}
              // style={{ width: "250px", height: "250px" }}
              className="w-[200px] h-[200px]"
            ></Pie>
          </>
        }
        style={{
          width: 250,
          maxHeight: 450,
          marginBottom: "70px",
        }}
        actions={[
          <SettingOutlined
            key="setting"
            onClick={() => router.push(`/culture/${props.id}`)}
            className="hover:bg-green-400"
          />,
          <EditOutlined
            key="edit"
            onClick={() => editCultureCard(props)}
            className="hover:bg-yellow-400"
          />,
          isLoading ? (
            <div className="delete-loader"></div>
          ) : (
            <DeleteOutlined
              key="delete"
              onClick={() => delateCultureCard(props.id)}
              className="hover:bg-red-400"
            />
          ),
        ]}
      >
        <Meta title={props?.cultureName} description={props?.location} />
        <Meta description={`${props.squareMeter} კვ/მ.`} />
      </Card>
      <Modal
      open={openModal}
      onCancel={() => setOpenModal(false)}
      footer={false}
      >
        <AntdEditCultureModal data={props} setOpenModal={setOpenModal}/>
      </Modal>
    </>
  );
};

export default CultureCardItem;
