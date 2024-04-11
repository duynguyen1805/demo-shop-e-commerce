"use client";
import React, { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Header from "@/components/header";

const inter = Inter({ subsets: ["latin"] });

const Manager_account_Layout = (props: { children: React.ReactNode }) => {
  // let selected = window.location.pathname; // ex: /quan-ly/tai-khoan
  const [selected, setSelected] = useState<string>("");

  useEffect(() => {
    setSelected(window.location.pathname);
  }, [selected]);

  return (
    <>
      <Header />
      <div
        className={cn(
          inter.className,
          "h-auto w-full bg-white flex flex-col items-center justify-center"
        )}
      >
        <div className="w-[98%] border rounded-md shadow-md flex flex-col items-center justify-center mt-2">
          <div className="w-full h-[120px] px-11 flex flex-col justify-center">
            <span className="uppercase text-2xl font-semibold">
              Quản lý chung
            </span>
            <span className="text-lg">Cập nhật thông tin của bạn.</span>
          </div>
          <div className="h-[1px] w-[96%] bg-gray-300"></div>
          <div className="min-h-[750px] h-auto w-full flex my-5">
            <div className="h-full w-1/6 px-5 py-2">
              <Link
                href={"./tai-khoan"}
                className={cn(
                  "h-[50px] w-full flex items-center justify-start px-3 rounded-lg cursor-pointer hover:underline",
                  selected == "/quan-ly/tai-khoan" && "bg-gray-100"
                )}
              >
                Cập nhật tài khoản
              </Link>
              <Link
                href={"./thong-tin-tai-khoan"}
                className={cn(
                  "h-[50px] w-full flex items-center justify-start px-3 rounded-lg cursor-pointer hover:underline",
                  selected == "/quan-ly/thong-tin-tai-khoan" && "bg-gray-100"
                )}
              >
                Cập nhật thông tin tài khoản
              </Link>
              <Link
                href={"./update-dia-chi-giao-hang"}
                className={cn(
                  "h-[50px] w-full flex items-center justify-start px-3 rounded-lg cursor-pointer hover:underline",
                  selected == "/quan-ly/update-dia-chi-giao-hang" &&
                    "bg-gray-100"
                )}
              >
                Thay đổi địa chỉ giao hàng
              </Link>
              <Link
                href={"./quan-ly-don-hang"}
                className={cn(
                  "h-[50px] w-full flex items-center justify-start px-3 rounded-lg cursor-pointer hover:underline",
                  selected == "/quan-ly/quan-ly-don-hang" && "bg-gray-100"
                )}
              >
                Quản lý đơn hàng
              </Link>
              <Link
                href={"./checkout"}
                className={cn(
                  "h-[50px] w-full flex items-center justify-start px-3 rounded-lg cursor-pointer hover:underline",
                  selected == "/quan-ly/checkout" && "bg-gray-100"
                )}
              >
                Thanh toán giỏ hàng
              </Link>
            </div>
            <div className="h-auto w-5/6 px-2">{props.children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Manager_account_Layout;
