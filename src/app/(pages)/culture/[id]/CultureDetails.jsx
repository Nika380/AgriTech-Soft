/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
"use client";
import React, { useContext, useEffect, useRef, useState, usePara } from "react";
import { Button, Form, Input, Popconfirm, Table, Modal } from "antd";
import { useParams } from "next/navigation";
import AddForm from "./AddForm";
import { FALSE } from "sass";
// const EditableContext = React.createContext(null);
// const EditableRow = ({ index, ...props }) => {
//   const [form] = Form.useForm();
//   return (
//     <Form form={form} component={false}>
//       <EditableContext.Provider value={form}>
//         <tr {...props} />
//       </EditableContext.Provider>
//     </Form>
//   );
// };
// const EditableCell = ({
//   title,
//   editable,
//   children,
//   dataIndex,
//   record,
//   handleSave,
//   ...restProps
// }) => {
//   const [editing, setEditing] = useState(false);
//   const inputRef = useRef(null);
//   const form = useContext(EditableContext);
//   useEffect(() => {
//     if (editing) {
//       inputRef.current.focus();
//     }
//   }, [editing]);
//   const toggleEdit = () => {
//     setEditing(!editing);
//     form.setFieldsValue({
//       [dataIndex]: record[dataIndex],
//     });
//   };
//   const save = async () => {
//     try {
//       const values = await form.validateFields();
//       toggleEdit();
//       handleSave({
//         ...record,
//         ...values,
//       });
//     } catch (errInfo) {
//       console.log("Save failed:", errInfo);
//     }
//   };
//   let childNode = children;
//   if (editable) {
//     childNode = editing ? (
//       <Form.Item
//         style={{
//           margin: 0,
//         }}
//         name={dataIndex}
//         rules={[
//           {
//             required: true,
//             message: `გთხოვთ მიუთითოთ ${title}`,
//           },
//         ]}
//       >
//         <Input ref={inputRef} onPressEnter={save} onBlur={save} />
//       </Form.Item>
//     ) : (
//       <div
//         className="editable-cell-value-wrap"
//         style={{
//           paddingRight: 24,
//         }}
//         onClick={save}
//       >
//         {children}
//       </div>
//     );
//   }
//   return <td {...restProps}>{childNode}</td>;
// };
const App = () => {
  const [openModal, setopenModal] = useState(false);
  const { id } = useParams();
  console.log(id);
  const [dataSource, setDataSource] = useState([
    {
      name: "დაგეგმე ახალი საქმე",
      money: "მიუთითე თანხა",
      mainBusiness: "რა არის მთავარი საქმე?",
    },
    {
      name: "დაგეგმე ახალი საქმე",
      money: "მიუთითე თანხა",
      mainBusiness: "რა არის მთავარი საქმე?",
    },
  ]);
  const handleDelete = (name) => {
    const newData = dataSource.filter((item) => item.name !== name);
    setDataSource(newData);
  };
  const defaultColumns = [
    {
      title: "სახელი",
      dataIndex: "name",
      width: "30%",
      editable: true,
    },
    {
      title: "თანხა",
      dataIndex: "money",
      editable: true,
    },
    {
      title: "მოქმედება",
      dataIndex: "mainBusiness",
      editable: true,
    },
    {
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm
            title="ნამდვილად გსურთ წაშლა?"
            onConfirm={() => handleDelete(record.name)}
          >
            <a>წაშლა</a>
          </Popconfirm>
        ) : null,
    },
  ];
  // const handleAdd = () => {
  //   console.log("actoon");
  //   setopenModal(true);
  //   <Modal title="დაამატე რამე" open={openModal} footer={false}>
  //     <AddForm setopenModal={() => setopenModal()} />
  //   </Modal>;

  //   const newData = {
  //   name: "დაგეგმე ახალი საქმე",
  //   money: "მიუთითე თანხა",
  //   mainBusiness: "რა არის მთავარი საქმე?",
  // };
  // setDataSource([...dataSource, newData]);

  // };
  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.name === item.name);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };
  // const components = {
  //   body: {
  //     row: EditableRow,
  //     cell: EditableCell,
  //   },
  // };
  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });
  return (
    <div>
      <Button
        onClick={() => setopenModal(true)}
        type="primary"
        style={{
          marginBottom: 16,
        }}
      >
        დამატება
      </Button>
      <Table
        // components={components}
        rowClassName={() => "editable-row"}
        bordered
        dataSource={dataSource}
        columns={columns}
      />
      {openModal && (
        <Modal
          title="დაამატე რამე"
          onOk={() => setopenModal(false)}
          onCancel={() => setopenModal(false)}
          open={openModal}
          footer={false}
        >
          <AddForm setopenModal={() => setopenModal()} />
        </Modal>
      )}
    </div>
  );
};
export default App;
