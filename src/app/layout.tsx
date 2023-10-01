"use client";
import React from "react";
import ContextProvider from "../context/global/GlobalContextProvider";
import Index from "./page";

const RootLayout = ({ children }: any) => {
  return (
    <html>
      <body>
        <ContextProvider>
          <Index children={children} />
        </ContextProvider>
      </body>
    </html>
  );
};

export default RootLayout;
