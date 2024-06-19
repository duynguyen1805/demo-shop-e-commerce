import React from "react";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
const inter = Inter({ subsets: ["latin"] });

import Image from "next/image";

type Props = {
  item: any;
};

const Cart_tintuc: React.FC<Props> = ({ item }) => {
  return (
    <div className={inter.className}>
      <div
        className={cn(
          "h-96 max-h-96 w-full rounded border border-gray-300 cursor-pointer"
        )}
      >
        <div className="w-full h-1/2 flex items-center justify-center text-xl">
          <Image
            src={item.thumb}
            alt="thumnail"
            width={300}
            height={300}
            className="h-full w-full"
          />
        </div>
        <div className="w-full h-1/2 py-1 px-2">
          <div className="h-auto w-full line-clamp-2 font-semibold hover:text-main_color">
            {item.title}
          </div>
          <div className="w-full text-gray-500 mt-1">{item.time}</div>
          <div className="h-auto w-full line-clamp-3 text-gray-500">
            {item.description}
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
