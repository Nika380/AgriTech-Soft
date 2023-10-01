"use client";
import SideNav from "@/components/SideNav";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import LoginPage from "./(pages)/login/page";
import { API } from "@/utils/API";
import { Space, Spin } from "antd";

const Index = ({ children }: any) => {
  const pathname = usePathname();
  const router = useRouter();
  const auth = typeof window !== 'undefined' && localStorage.getItem("auth") === "1";
  const [loading, setLoading] = useState<boolean>(false);

  const checkTokenValidity = async () => {
    setLoading(true);
    const res = await API.post("/auth/check-token")
      .then((res) => {
        if (typeof window !== 'undefined') {
          localStorage.setItem("auth", "1");
        }
        if (pathname.includes("login")) {
          router.push("/culture");
        }
      })
      .catch((error) => {
        try {
          refreshToken();
        } catch (error) {
          if (typeof window !== 'undefined') {
            localStorage.setItem("auth", "0");
            router.push("/login");
          }
        }
      });

    setLoading(false);
  };

  const refreshToken = async () => {
    const res = await API.post("/auth/refresh-token")
      .then((res) => {
        if (typeof window !== 'undefined') {
          localStorage.setItem("auth", "1");
        }
      })
      .catch((error) => {
        if (typeof window !== 'undefined') {
          localStorage.setItem("auth", "0");
          router.push("/login");
        }
      });
  };

  useEffect(() => {
    if (pathname === "") {
      router.push("/culture");
    }
  }, []);

  useEffect(() => {
    if (
      !(
        pathname === "/login" ||
        pathname.startsWith("/change-password") ||
        pathname === "/"
      )
    ) {
      checkTokenValidity();
    }
  }, [pathname]);

  return loading ? (
    <Space size="large" className="section-spinner">
      <Spin />
    </Space>
  ) : auth ? (
    <SideNav children={children} />
  ) : (
    <LoginPage />
  );
}

export default Index;
