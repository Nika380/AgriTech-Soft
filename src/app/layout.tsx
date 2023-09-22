"use client";
import React from "react";
import Index from "./page";
import ContextProvider from "../context/global/GlobalContextProvider";

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
