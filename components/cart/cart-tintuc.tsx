import React from "react";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
const inter = Inter({ subsets: ["latin"] });

const Cart_tintuc = () => {
  const short_p: string =
    "Phân trùn quế là một loại phân bón hữu cơ được sản xuất từ quá trình tiêu hóa của trùn quế. Trùn quế là một loại";

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
            Thành phần dinh dưỡng trong phân trùn quế và tác dụng của nó. Thành
            phần, công dụng và cách sử dụng
          </div>
          <div className="w-full text-gray-500 mt-1">Thứ 2, 08/04/2024</div>
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
