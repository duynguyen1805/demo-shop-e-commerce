import React from "react";
import { Inter } from "next/font/google";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Quản trị Website ABC E-commerce",
  description: "Trang Quản trị Website ABC E-commerce",
};

const Landing_Layout = (props: { children: React.ReactNode }) => {
  return <div className={inter.className}>{props.children}</div>;
};

export default Landing_Layout;
