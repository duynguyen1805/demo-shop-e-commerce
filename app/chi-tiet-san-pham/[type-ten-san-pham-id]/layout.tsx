import React from "react";
import { Inter } from "next/font/google";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chi tiết sản phẩm",
  description: "Chi tiết sản phẩm",
};

const Landing_Layout = (props: { children: React.ReactNode }) => {
  return <div className={inter.className}>{props.children}</div>;
};

export default Landing_Layout;
