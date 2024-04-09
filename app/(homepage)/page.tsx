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

const Homepage = () => {
  const isLoading: boolean = useSelector(
    (state: any) => state.setIsLoading.isLoading
  );
  const dispatch = useDispatch();

  const [arrProduct, setArr_Product] = useState<any[]>([]);
  // refesh data san pham
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
            <Cart_tintuc />
            <Cart_tintuc />
            <Cart_tintuc />
            <Cart_tintuc />
            <Cart_tintuc />
            <Cart_tintuc />
            <Cart_tintuc />
            <Cart_tintuc />
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
