import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "SignUp or Login - ABC E-Commerce",
  description: "Trang Đăng nhập và Đăng ký Sàn thương mại điện tử",
};

const Signin_Layout = (props: { children: React.ReactNode }) => {
  return <div>{props.children}</div>;
};

export default Signin_Layout;
