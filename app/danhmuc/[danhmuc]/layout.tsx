import React from "react";
import { Inter } from "next/font/google";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Danh mục sản phẩm",
  description: "Chưa lấy động từng loại danh mục",
};

const Danhmuc_Layout = (props: { children: React.ReactNode }) => {
  return <div className={inter.className}>{props.children}</div>;
};

export default Danhmuc_Layout;
