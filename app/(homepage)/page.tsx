"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Banner_Home from "@/components/banner-qc/banner-home";
import Danhmuc_homepage from "@/components/danhmuc/danhmuc-homepage";
import Header from "@/components/header";
import Cart_item_chitiet from "@/components/cart/cart-item-chitiet";

// firestore firebase
import {
  collection,
  addDoc,
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  Timestamp,
  serverTimestamp,
  query,
  where,
  orderBy,
  onSnapshot,
  DocumentData,
} from "firebase/firestore";
import { db } from "../../firebase.config";
import Loading from "@/components/loading";
import { setIsLoading } from "@/provider/redux/loading";
import Cart_item_loading from "@/components/cart/cart-item-loading";
import Cart_tintuc from "@/components/cart/cart-tintuc";

// hash img for cart blog
import galaxy_bug_3 from "../../public/assets/img/samsung-galaxy-buds-3-pro-cover.webp";
import vivoY58 from "../../public/assets/img/thong-tin-vivo-y58-5g.jpeg";
import oneui7 from "../../public/assets/img/oneui7.jpeg";
import ryzen from "../../public/assets/img/amd-ryzen-ai-300-3.jpg";

// import Product_card from "@/utils/types";

// SERVICE BACKEND
// import { Get_list_product } from "@/service/product.service";

const Homepage = () => {
  const isLoading: boolean = useSelector(
    (state: any) => state.setIsLoading.isLoading
  );
  const dispatch = useDispatch();

  const [arrProduct, setArr_Product] = useState<any[]>([]);
  // refesh data san pham - FIREBASE
  useEffect(() => {
    const fetching_data_product = async () => {
      try {
        const CollectionRef = collection(db, "store");
        const querySnapshot = await getDocs(CollectionRef);

        const products: DocumentData[] = [];
        querySnapshot.forEach((doc) => {
          products.push({ id: doc.id, ...doc.data() });
        });
        setArr_Product(products);
        console.log("check arr_user: ", querySnapshot);
        console.log("arr_product from firebase: ", arrProduct);
      } catch (error) {
        console.error("error fetching infor users from firebase: ", error);
      }
      dispatch(setIsLoading(false));
    };
    fetching_data_product();
  }, [arrProduct.length]);

  // useEffect(() => {
  //   const fetching_data_product = async () => {
  //     try {
  //       const response: Product_card[] = await Get_list_product();
  //       if (response) setArr_Product(response);
  //     } catch (error) {
  //       console.error(
  //         "Error fetching list product for homepage from BE: ",
  //         error
  //       );
  //     }
  //     dispatch(setIsLoading(false));
  //   };
  //   fetching_data_product();
  // }, [arrProduct.length]);

  const fake_data_tintuc = [
    {
      thumb: galaxy_bug_3,
      title:
        "Đây là thiết kế và cử chỉ mới của tai nghe Galaxy Buds 3 Pro sắp ra mắt",
      time: "Thứ 3, 19/06/2024",
      description:
        "Theo các báo cáo trước đây cho biết, Samsung sẽ ra mắt tai nghe Galaxy Buds 3 Pro trong sự kiện Galaxy Unpacked tiếp theo vào ngày 10 tháng 7 tới.",
    },
    {
      thumb: vivoY58,
      title: "Hé lộ thiết kế và ngày ra mắt vivo Y58 5G",
      time: "Thứ 3, 19/06/2024",
      description:
        "Theo thông tin rò rỉ mới nhất, vivo dường như đang phát triển phiên bản kế nhiệm của điện thoại vivo Y56 5G đã ra mắt vào tháng 2 năm ngoái.",
    },
    {
      thumb: oneui7,
      title: "Khi nào Samsung phát hành OneUI 7.0 dựa trên Android 15?",
      time: "Thứ 3, 19/06/2024",
      description:
        "Với việc Samsung đã tung bản cập nhật OneUI 6.1 cho hầu hết các điện thoại và máy tính bảng Galaxy đủ điều kiện thì hiện sự tập trung của người dùng đang đổ dồn về One UI 6.1.1, sẽ ra mắt trên Galaxy Z Fold6 và Galaxy Z Flip6 vào tháng 7.",
    },
    {
      thumb: ryzen,
      title:
        "Tất tần tật về CPU AMD Ryzen AI 300: Kiến trúc mới, lấy AI làm trọng tâm, hiệu năng đầy hứa hẹn",
      time: "Thứ 3, 19/06/2024",
      description:
        "Tại sự kiện Computex 2024, AMD đã chính thức giới thiệu dòng bộ xử lý Ryzen AI 300 Strix Point với nhiều cải tiến, đặc biệt là năng lực xử lý AI nâng lên một tầm cao mới.",
    },
  ];

  return (
    <div className="min-h-screen h-auto w-full">
      {isLoading == true && <Loading />}
      <Header />
      <div className="h-auto w-auto mt-8">
        <Banner_Home />
      </div>
      {/**Danh muc san pham */}
      <div className="h-auto min-h-[calc(100vh-277px-84px)] bg-[#f5f5f5] flex flex-col items-center justify-center">
        <Danhmuc_homepage />
        <div className="h-auto min-h-[500px] w-[1200px] bg-white mt-5 pb-5">
          <div className="h-[60px] w-full px-4 flex items-center">
            <span className="text-lg text-gray-400">SẢN PHẨM BÁN CHẠY</span>
          </div>
          <div className="min-h-[150px] h-auto w-auto min-w-[1200px] max-w-[1200px] py-1 px-8 gap-[15px] flex flex-wrap">
            {arrProduct &&
              arrProduct.map((item, index) => {
                return (
                  <div key={index} className="">
                    <Cart_item_chitiet item={item} />
                  </div>
                );
              })}
            {(!arrProduct || arrProduct.length == 0) && (
              <>
                <Cart_item_loading />
                <Cart_item_loading />
                <Cart_item_loading />
                <Cart_item_loading />
                <Cart_item_loading />
              </>
            )}
          </div>
        </div>
        <div className="h-auto min-h-[500px] w-[1200px] bg-white mt-5 pb-5">
          <div className="h-[60px] w-full px-4 flex items-center">
            <span className="text-lg text-gray-400">TIN TỨC - BÀI VIẾT</span>
          </div>
          <div className="w-full grid grid-cols-4 gap-5 px-3">
            {fake_data_tintuc &&
              fake_data_tintuc.map((item, index) => {
                return <Cart_tintuc key={index} item={item} />;
              })}
          </div>
          <div className="w-full flex items-center justify-center mt-5">
            <div className="w-fit px-4 py-[6px] border border-main_color bg-main_color text-white rounded hover:bg-white hover:text-main_color cursor-pointer">
              Xem thêm
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
