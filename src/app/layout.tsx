"use client";
import React from "react";
// import "../assets/styles/global.scss";
import Index from "./page";
// import { Provider } from "react-redux";
// import { store } from "@/redux/store";

const RootLayout = ({ children }: any) => {
  return (
    <html>
      <body>
        {/* <Provider store={store}> */}
          <Index children={children} />
        {/* </Provider> */}
      </body>
    </html>
  );
};

export default RootLayout;
