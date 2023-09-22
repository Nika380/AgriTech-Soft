/* eslint-disable react/prop-types */
import React, { useState } from "react";
import {
  EditOutlined,
  DeleteOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Card } from "antd";
import { API } from "../utils/API";
import { useGlobalContext } from "../context/global/GlobalContextProvider";
import {
  apiCallRefresh,
  currentCultureValue,
  openModal,
} from "../context/actions/actionCreators";
const { Meta } = Card;

const CultureCardItem = ({ props }) => {
  const { state, dispatch } = useGlobalContext();
  const [isLoading, setisLoading] = useState(false);
  const editCultureCard = async (values) => {
    dispatch(openModal(!state.openModal));
    dispatch(currentCultureValue(values));
    // setisLoading(true);
    // await API.put(`cultures/update-info/${id}`, { values })
    //   .then((res) => console.log(res))
    //   .catch((err) => console.log(err))
    //   .finally(() => setisLoading(false));
  };
  console.log(state);
  const delateCultureCard = async (id) => {
    setisLoading(true);
    await API.delete(`/cultures/delete-culture/${id}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
      .finally(() => setisLoading(false));
    dispatch(apiCallRefresh(!state.apiCallRefresh));
  };

  return (
    <Card
      style={{
        width: 300,
        marginBottom: "70px",
      }}
      actions={[
        <SettingOutlined key="setting" className="hover:bg-green-400" />,
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
  );
};

export default CultureCardItem;
