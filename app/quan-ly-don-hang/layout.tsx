import React from "react";
import { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Quản lý Đơn hàng - Khách hàng",
  description: "Quản lý tất cả đơn hàng của khách hàng",
};

const Landing_Layout = (props: { children: React.ReactNode }) => {
  return <div className={inter.className}>{props.children}</div>;
};

export default Landing_Layout;
