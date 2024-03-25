"use client";
import React, { useState } from "react";
import Image from "next/image";

type props = {
  item: any;
  setIsOpen_Cart: any;
};

const Cart_Order: React.FC<props> = ({ item, setIsOpen_Cart }) => {
  const handle_del_item = () => {
    let order: any = localStorage.getItem("order");
    // check danh sách order có tồn tại không
    if (order) {
      // parse danh sách order từ JSON
      order = JSON.parse(order);
      // tìm index của sản phẩm trong danh sách order dựa trên item.id
      const indexToRemove = order.findIndex((it: any) => it.id === item.id);
      if (indexToRemove !== -1) {
        // xóa sản phẩm khỏi danh sách order
        order.splice(indexToRemove, 1);
        // lưu danh sách order mới vào localStorage
        localStorage.setItem("order", JSON.stringify(order));
        setIsOpen_Cart();
      } else {
        console.log("Sản phẩm không tồn tại trong order.");
      }
    } else {
      console.log("Không tìm thấy danh sách order trong localStorage.");
    }
  };
  return (
    <>
      <div className="h-28 w-full p-1 flex items-center place-content-between gap-1 border-b hover:bg-gray-100">
        <Image
          src={item.img_arr[0]}
          alt=""
          height={100}
          width={100}
          className=" max-h-[100px] max-w-[100px] bg-cover bg-no-repeat overflow-hidden"
        />
        <div className="h-full w-[calc(100%-100px)] flex items-center place-content-between ">
          <div className="h-full min-w-[90%] max-w-[90%] overflow-hidden px-1 ">
            <div className="h-[50%] w-full flex flex-col items-start overflow-hidden px-1 text-lg">
              <span>{item.title}</span>
              <span className="text-base text-gray-500">
                Loại: {item.type_product}
              </span>
            </div>
            <div className="h-[50%] w-full flex items-center space-x-1 overflow-hidden px-1 text-lg">
              <span>Giá: </span>
              <span className="text-red-500">
                {item.price_after_discount.toLocaleString("vi-VN")}
              </span>
              <span>x{item.quantity_order}</span>
            </div>
          </div>
          <div className="h-full min-w-[10%] max-w-[10%]  px-1 text-red-500 flex items-center justify-center cursor-pointer hover:bg-red-500 hover:border-red-500 hover:border hover:text-white">
            <span className="" onClick={() => handle_del_item()}>
              Xóa
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart_Order;
