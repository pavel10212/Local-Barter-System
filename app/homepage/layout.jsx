import React from "react";
import Navbar from "@/components/navbar/navbar";
import DynamicHeader from "@/components/DynamicHeader/DynamicHeader";

const Layout = ({ children }) => {
  return (
    <div className="">
      <Navbar />
      <DynamicHeader />
      <main className=" ">{children}</main>
    </div>
  );
};

export default Layout;
