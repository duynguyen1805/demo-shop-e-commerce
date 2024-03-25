"use client";
import React, { useState } from "react";
import Image from "next/image";

const Cart_Notification = () => {
  const [name_product_order, setName_ProductOrder] = useState<string>(
    "Laptop Asus Gaming ROG Strix"
  );
  const [status_product_order, setStatus_ProductOrder] = useState<string>(
    "Đặt hàng Thành công - đang xử lý"
  );
  const [quality_product, setQuality_ProductOrder] = useState<number>(2);
  const [address_receiver, setAddress_Receiver] = useState<string>(
    "Trường Thành, Thới Lai, Cần Thơ"
  );

  return (
    <>
      <div className="h-28 w-full p-1 flex items-center place-content-between gap-1 border-b hover:bg-gray-100">
        <Image
          src={
            "https://scontent.webpluscnd.net/photos-df/a-0/3764-2194538-1/laptop-asus-gaming-rog-strix-g-g731gth7114t.png?atk=4eb081075dd7d7faad048034c002a610"
          }
          alt=""
          height={100}
          width={100}
          className=" max-h-[100px] max-w-[100px] bg-cover bg-no-repeat overflow-hidden"
        />
        <div className="h-full w-[calc(100%-100px)] flex items-center place-content-between ">
          <div className="h-full min-w-[90%] max-w-[90%] overflow-hidden px-1 ">
            <div className="h-[50%] w-full flex flex-col items-start overflow-hidden px-1 text-lg">
              <span className="h-auto w-full overflow-hidden">
                {name_product_order} - SL: {quality_product}
              </span>
              <span className="h-auto w-full overflow-hidden text-base text-gray-500">
                Trạng thái: {status_product_order}
              </span>
            </div>
            <div className="h-[50%] w-full flex items-center space-x-1 overflow-x-hidden px-1 text-base">
              <span>Địa chỉ: {address_receiver}</span>
            </div>
          </div>
          <div className="h-full min-w-[10%] max-w-[10%]  px-1 text-red-500 flex items-center justify-center cursor-pointer hover:bg-red-500 hover:border-red-500 hover:border hover:text-white">
            <span className="">Xóa</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart_Notification;
