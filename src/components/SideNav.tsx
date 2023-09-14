"use client";
import {
  DatabaseOutlined,
  LineChartOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { Breadcrumb, ConfigProvider, Layout, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Footer, Header } from "antd/es/layout/layout";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
// import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
// import EqualizerIcon from "@mui/icons-material/Equalizer";
// import HandshakeIcon from "@mui/icons-material/Handshake";
import "../assets/styles/globals.scss";
// import { useSelector } from "react-redux";
// import { RootState } from "@/redux/store";
// import LogoutMenu from "./LogoutMenu";
// import { Button } from "@mui/material";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';

import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Weather from "./Weather";

const SideNav = ({ children }: any) => {
  const pathname = usePathname().split("/")[1];
  const router = useRouter();
  const menuItems = [
    {
      label: "მთავარი",
      key: "home",
      icon: (
        <Link href={"/home"}>
          <MenuOutlined />
        </Link>
      ),
    },
    {
      label: "ბაზები",
      key: "databases",
      icon: (
        <Link href={"/databases"}>
          <DatabaseOutlined />
        </Link>
      ),
    },
  ];

  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout style={{ height: "100vh", position: "fixed", top: "0", left: "0" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        style={{ paddingTop: "80px", minHeight: "100vh" }}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={[""]}
          mode="inline"
          items={menuItems}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            width: "100%",
            position: "fixed",
            top: "0",
            left: "0",
            height: "70px",
          }}
        >
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-white">Logo Name</h1>
            <Weather />
          </div>
        </Header>
        <Content
          style={{
            minHeight: "100vh",
            width: "100vw",
            padding: "10px",
            overflowY: "scroll",
            position: "fixed",
            top: "70px",
            left: collapsed ? "80px" : "200px",
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default SideNav;
