import React from "react";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
const inter = Inter({ subsets: ["latin"] });

const Cart_tintuc = () => {
  const short_p: string =
    "Thông tin rò rỉ cho biết “tất cả các thông số kỹ thuật của máy ảnh, bao gồm camera trước, sau, cảm biến UPC và giá trị khẩu độ, đều giống hệt nhau và không có thay đổi”.";

  return (
    <div className={inter.className}>
      <div
        className={cn(
          "h-96 max-h-96 w-full rounded border border-gray-300 cursor-pointer"
        )}
      >
        <div className="w-full h-1/2 flex items-center justify-center text-xl">
          thumnail
        </div>
        <div className="w-full h-1/2 py-1 px-2">
          <div className="h-auto w-full line-clamp-2 font-semibold hover:text-main_color">
            Đây là thông số chi tiết camera Galaxy Z Fold6 sắp ra mắt
          </div>
          <div className="w-full text-gray-500 mt-1">Chủ nhật, 09/06/2024</div>
          <div className="h-auto w-full line-clamp-3 text-gray-500">
            {short_p}
          </div>
          <div className="w-fit py-1 text-blue-500 cursor-pointer hover:text-blue-300">
            Đọc tiếp
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart_tintuc;
