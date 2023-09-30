import React from "react";
import SideNav from "../components/SideNav";

const Index = ({ children }: any) => {
  return <SideNav children={children} />;
};

export default Index;

// "use client";
// import SideNav from "@/components/SideNav";
// import { useRouter, usePathname } from "next/navigation";
// import { useEffect, useState } from "react";
// import LoginPage from "./(auth)/login/page";
// import { useSelector, useDispatch } from "react-redux";
// import { RootState } from "@/redux/store";
// import { login, logout } from "@/redux/features/AuthSlice";
// import { verify } from "jsonwebtoken";
// import { API } from "@/utils/API";
// import { Space } from "antd";
// import { CircularProgress } from "@mui/material";
// import { setRoleId } from "@/redux/features/UserSlice";
// import ResetPassword from "./(auth)/change-password/ResetPassword";
// import VerifyAndUpdatePassword from "./(auth)/change-password/[emailAddress]/[code]/VerifyAndUpdatePassword";

// export default function Index({ children }: any) {
//   const pathname = usePathname();
//   const router = useRouter();
//   const auth = useSelector((state: RootState) => state.auth.value);
//   const dispatch = useDispatch();
//   const [loading, setLoading] = useState<boolean>(false);

//   const checkTokenValidity = async () => {
//     setLoading(true);
//     const res = await API.post("/auth/check-token")
//       .then((res) => {
//         dispatch(login());
//         dispatch(setRoleId(res.data.roleId));
//         if (pathname.includes("login")) {
//           router.push("/home");
//         }
//       })
//       .catch((error) => {
//         try {
//           refreshToken();
//         } catch (error) {
//           dispatch(logout());
//           router.push("/login");
//         }
//       });

//     setLoading(false);
//   };

//   const refreshToken = async () => {
//     const res = await API.post("/auth/refresh-token")
//       .then((res) => {
//         dispatch(setRoleId(res.data.roleId));
//         dispatch(login());
//       })
//       .catch((error) => {
//         dispatch(logout());
//         router.push("/login");
//       });
//   };

//   useEffect(() => {
//     if (pathname === "") {
//       router.push("/home");
//     }
//   }, []);

//   useEffect(() => {
//     if (
//       !(
//         pathname === "/login" ||
//         pathname.startsWith("/change-password") ||
//         pathname === "/"
//       )
//     ) {
//       checkTokenValidity();
//     }
//   }, [pathname]);
