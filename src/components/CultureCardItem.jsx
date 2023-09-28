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
import { Card } from "antd";
import { API } from "../utils/API";
import { useGlobalContext } from "../context/global/GlobalContextProvider";
import { useRouter } from "next/navigation";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);
const { Meta } = Card;

const CultureCardItem = ({ props }) => {
  const { state, dispatch } = useGlobalContext();
  const [isLoading, setisLoading] = useState(false);
  const router = useRouter();
  const editCultureCard = async (values) => {
    dispatch(openModal(!state.openModal));
    dispatch(activeButton(false));
    dispatch(handleEdit(true));
    dispatch(currentCultureValue(values));
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
          <div className="w-6">
            <Pie
              data={data}
              options={options}
              style={{ width: "225px", height: "225px", marginLeft: "5px" }}
            ></Pie>
          </div>
        }
        style={{
          width: 300,
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
    </>
  );
};

export default CultureCardItem;
