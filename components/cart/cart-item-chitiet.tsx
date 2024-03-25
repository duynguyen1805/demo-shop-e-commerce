"use client";
import React from "react";
import Image from "next/image";
import { Star, StarHalf, StarHalfIcon, StarIcon } from "lucide-react";
import { Route } from "next";
import { useRouter } from "next/navigation";

import bg_discount from "../../public/assets/discount.png";
import { setIsLoading } from "@/provider/redux/loading";
import { useDispatch } from "react-redux";

type props = {
  item: any;
};

const Cart_item_chitiet: React.FC<props> = ({ item }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handle_click_product = async (item: any) => {
    dispatch(setIsLoading(false));
    // Thay dấu / và khoảng trắng bằng dấu gạch ngang
    const title_product = item.title.replace(/[\/\s]+/g, "-");
    router.push(`/chi-tiet-san-pham/${title_product}?id=${item.id}`);
    dispatch(setIsLoading(true));
  };

  return (
    <>
      <div
        className="relative h-[350px] w-[215px] bg-white border border-gray-400 rounded-md cursor-pointer hover:shadow-lg hover:border-blue-700 transition-all duration-300"
        onClick={() => handle_click_product(item)}
      >
        <div className="min-h-[235px] max-h-[235px] w-full flex items-center justify-center">
          <Image
            // src={
            //   "https://scontent.webpluscnd.net/photos-df/a-0/3764-2194538-1/laptop-asus-gaming-rog-strix-g-g731gth7114t.png?atk=4eb081075dd7d7faad048034c002a610"
            // }
            src={item.img_arr[0]}
            alt=""
            width={235}
            height={235}
          />
        </div>
        <div className="h-[115px] w-full py-1 px-[6px]">
          <div className="h-[50px] max-h-[50px] w-full overflow-hidden line-clamp-2">
            {item.title}
          </div>
          <div className="h-[55px] max-h-[55px] w-full flex flex-col items-center">
            <div className="h-[50%] w-full text-sm flex items-center space-x-1">
              <span className="text-red-500">
                {item.price.toLocaleString("vi-VN")}đ
              </span>
              <span className="line-through">
                {item.price_after_discount.toLocaleString("vi-VI")}đ
              </span>
            </div>
            <div className="h-[50%] w-full text-sm text-gray-400 flex items-center place-content-between">
              <span>Đã bán {item.sold}</span>
              <div className="flex gap-[2px]">
                <Star size={12} color="#ffa727" fill="#ffa727" />
                <Star size={12} color="#ffa727" fill="#ffa727" />
                <Star size={12} color="#ffa727" fill="#ffa727" />
                <Star size={12} color="#ffa727" fill="#ffa727" />
                <Star size={12} color="#ffa727" fill="#ffa727" />
              </div>
            </div>
          </div>
        </div>
        {/* ticky discount */}
        <div className="absolute top-[-5px] left-[-5px] h-auto w-auto">
          <div className="relative h-[30px] w-[80px]">
            <div className="absolute top-0 left-0 h-full w-full">
              <Image src={bg_discount} alt="discount" />
            </div>
            <span className="absolute top-0 text-white text-sm h-full w-full flex items-center justify-center">
              Giảm {item.persent_discount}%
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart_item_chitiet;
