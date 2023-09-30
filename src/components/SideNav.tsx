"use client";
import { Breadcrumb, ConfigProvider, Layout, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Footer, Header } from "antd/es/layout/layout";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { RiCloseLine } from "react-icons/ri";
import { HiOutlineMenu, HiHome } from "react-icons/hi";
import { PiPlantBold } from "react-icons/pi";
import { BiSolidAnalyse } from "react-icons/bi";
import { MdOutlineRecommend } from "react-icons/md";
import "../assets/styles/globals.scss";
import Weather from "./Weather";

const SideNav = ({ children }: any) => {
  const [mobileMenuOpen, setmobileMenuOpen] = useState(false);
  const pathname = usePathname().split("/")[1];
  const router = useRouter();
  const menuItems = [
    // {
    //   label: "მთავარი",
    //   key: "home",
    //   icon: (
    //     <Link href={"/home"}>
    //       <HiHome />
    //     </Link>
    //   ),
    // },
    {
      label: "კულტურები",
      key: "culture",
      icon: (
        <Link href={"/culture"}>
          <PiPlantBold />
        </Link>
      ),
    },
    {
      label: "ანალიზი",
      key: "analyse",
      icon: (
        <Link href={"/analyse"}>
          <BiSolidAnalyse />
        </Link>
      ),
    },
    {
      label: "რეკომენდაციები",
      key: "recomendation",
      icon: (
        <Link href={"/recomendation"}>
          <MdOutlineRecommend />
        </Link>
      ),
    },
  ];
  return (
    <Layout
      style={{
        height: "100vh",
        position: "fixed",
        top: "0",
        left: "0",
        background: "white",
      }}
    >
      <Sider
        style={{
          paddingTop: "80px",
          minHeight: "100vh",
        }}
        className={`md:inline-block ${mobileMenuOpen ? "" : "hidden"}`}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={[pathname]}
          selectedKeys={[pathname]}
          mode="inline"
          items={menuItems}
        />
      </Sider>
      <Layout style={{ overflow: "scroll" }}>
        <Header
          style={{
            width: "100%",
            position: "fixed",
            top: "0",
            left: "0",
            height: "70px",
            zIndex: "100",
          }}
        >
          <div className="flex justify-between items-center">
            <div className="top-6">
              <div className="logo"></div>
            </div>
            <Weather />
            <div className="absolute md:hidden block top-6 right-3 ">
              {mobileMenuOpen ? (
                <RiCloseLine
                  className="w-6 h-6 ml-2 text-white cursor-pointer z-90"
                  onClick={() => setmobileMenuOpen(false)}
                />
              ) : (
                <HiOutlineMenu
                  className="w-6 h-6 ml-2 text-white cursor-pointer z-90"
                  onClick={() => setmobileMenuOpen(true)}
                />
              )}
            </div>
          </div>
        </Header>
        <Content
          style={{
            minHeight: "100vh",
            width: "100vw",
            overflowY: "scroll",
            position: "fixed",
            top: "70px",
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default SideNav;
