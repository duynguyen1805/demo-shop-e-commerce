"use client";
import React, { useState } from "react";
import Header from "@/components/header";
import Quan_ly_tai_khoan from "@/components/admin/quan-ly-tai-khoan";
import Them_san_pham from "@/components/admin/them-san-pham";
import Quan_ly_san_pham from "@/components/admin/quan-ly-san-pham";
import Quan_ly_don_hang from "@/components/admin/quan-ly-don-hang";

const Admin = () => {
  const [tabSelect, settabSelect] = useState<string>("");

  const handle_selected_tab = (tab: string) => {
    settabSelect(tab);
  };

  return (
    <div className="min-h-screen h-auto w-full">
      <Header />
      <div className="h-auto min-h-[calc(100vh-84px)] bg-[#f5f5f5] flex justify-center">
        <div className="h-auto min-h-[400px] w-full py-4 flex items-center">
          <div className="h-full w-[360px] px-2 space-y-5">
            <div
              className={`h-[60px] w-full rounded-xl border border-gray-200 shadow-sm flex items-center px-3 cursor-pointer hover:bg-main_color hover:text-white ${
                tabSelect == "quanlydonhang"
                  ? "bg-main_color text-white"
                  : "bg-white text-black"
              }`}
              onClick={() => handle_selected_tab("quanlydonhang")}
            >
              Quản lý đơn hàng
            </div>
            {/* <div
              className={`h-[60px] w-full rounded-xl border border-gray-200 shadow-sm flex items-center px-3 cursor-pointer hover:bg-main_color hover:text-white ${
                tabSelect == "lichsumuahang"
                  ? "bg-main_color text-white"
                  : "bg-white text-black"
              }`}
              onClick={() => handle_selected_tab("lichsumuahang")}
            >
              Lịch sử mua hàng
            </div> */}
            <div
              className={`h-[60px] w-full rounded-xl border border-gray-200 shadow-sm flex items-center px-3 cursor-pointer hover:bg-main_color hover:text-white ${
                tabSelect == "thongkedoanhthu"
                  ? "bg-main_color text-white"
                  : "bg-white text-black"
              }`}
              onClick={() => handle_selected_tab("thongkedoanhthu")}
            >
              Thống kê doanh thu
            </div>
            <div
              className={`h-[60px] w-full rounded-xl border border-gray-200 shadow-sm flex items-center px-3 cursor-pointer hover:bg-main_color hover:text-white ${
                tabSelect == "themsanpham"
                  ? "bg-main_color text-white"
                  : "bg-white text-black"
              }`}
              onClick={() => handle_selected_tab("themsanpham")}
            >
              Thêm sản phẩm
            </div>
            <div
              className={`h-[60px] w-full rounded-xl border border-gray-200 shadow-sm flex items-center px-3 cursor-pointer hover:bg-main_color hover:text-white ${
                tabSelect == "quanlysanpham"
                  ? "bg-main_color text-white"
                  : "bg-white text-black"
              }`}
              onClick={() => handle_selected_tab("quanlysanpham")}
            >
              Quản lý sản phẩm
            </div>
            <div
              className={`h-[60px] w-full rounded-xl border border-gray-200 shadow-sm flex items-center px-3 cursor-pointer hover:bg-main_color hover:text-white ${
                tabSelect == "quanlytaikhoan"
                  ? "bg-main_color text-white"
                  : "bg-white text-black"
              }`}
              onClick={() => handle_selected_tab("quanlytaikhoan")}
            >
              Quản lý tài khoản
            </div>
          </div>
          <div className="h-full w-[calc(100vw-360px)] border border-blue-500 bg-white rounded-l-3xl shadow-lg px-4 py-2">
            {tabSelect == "quanlydonhang" && <Quan_ly_don_hang />}
            {tabSelect == "quanlytaikhoan" && <Quan_ly_tai_khoan />}
            {tabSelect == "themsanpham" && <Them_san_pham />}
            {tabSelect == "quanlysanpham" && <Quan_ly_san_pham />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
