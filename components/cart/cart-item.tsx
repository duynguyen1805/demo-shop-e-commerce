import React from "react";
import Image from "next/image";

const Cart_item = () => {
  const price: number = 29000000;
  // +h
  return (
    <>
      <div className="h-[290px] w-[190px] border border-gray-400 cursor-pointer hover:shadow-lg hover:border-blue-700 transition-all duration-300">
        <div className="h-[190px] w-full flex items-center justify-center">
          <Image
            src={
              "https://scontent.webpluscnd.net/photos-df/a-0/3764-2194538-1/laptop-asus-gaming-rog-strix-g-g731gth7114t.png?atk=4eb081075dd7d7faad048034c002a610"
            }
            alt=""
            width={190}
            height={190}
          />
        </div>
        <div className="h-[100px] w-full py-1 px-[6px]">
          <div className="h-[50px] max-h-[50px] w-full overflow-hidden">
            Laptop Asus Gaming ROG Strix
          </div>
          <div className="h-[15px] max-h-[15px] w-full"></div>
          <div className="h-[25px] max-h-[25px] w-full flex items-center place-content-between">
            <span className="text-sm text-red-500">
              {price.toLocaleString("vi-VN")} đ
            </span>
            <span className="text-sm text-gray-400">Đã bán 15</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart_item;
