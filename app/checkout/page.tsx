"use client";
import Header from "@/components/header";
import React, { useEffect, useState } from "react";
import Image from "next/image";

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

import icon_momo from "../../public/assets/icon-momo.png";

import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/use-toast";

import { columns_table_checkout } from "../../components/user/columns-table-checkout";
import { DataTable_checkout } from "../../components/user/data-table-checkout";

type info_user = {
  id_user: string;
  phonenumber: string;
  avatar: string;
  username: string;
  address: string;
  date_birthday: string;
  gender: string;
};

const Checkout = () => {
  const { toast } = useToast();

  const [user, setuser] = useState<info_user | null>(null);
  const [cart_order, setcart_order] = useState<any[]>([]);
  const [total_price, setTotal_price_order] = useState<number>(0);
  const [payments, setpayments] = useState<string>("COD");

  useEffect(() => {
    //lấy thông tin người dùng
    let user: any = localStorage.getItem("user_shopee");
    // const token_cookie: any = Cookies.get("jwt_token");
    const parse_user = JSON.parse(user);
    setuser(parse_user);

    //lấy giỏ hàng
    get_order_from_localstorage();
  }, []);

  const get_order_from_localstorage = () => {
    //lấy giỏ hàng
    let cart: any = localStorage.getItem("order");
    // const token_cookie: any = Cookies.get("jwt_token");
    const parse_cart = JSON.parse(cart);
    setcart_order(parse_cart);
  };

  useEffect(() => {
    // calc total price for order
    if (cart_order && cart_order.length > 0) {
      let total_price = 0;
      cart_order.map((item, index) => {
        let price_per_product = item.price_after_discount * item.quantity_order;
        total_price = total_price + price_per_product;
      });
      setTotal_price_order(total_price);
    }
  }, [cart_order]);

  const timestampToDateTimeString = (timestamp: any) => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = "0" + date.getMinutes();
    const formattedTime = hours + ":" + minutes.substr(-2);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const formattedDate = day + "/" + month + "/" + year;
    return formattedTime + ", " + formattedDate;
  };

  const handle_order = async () => {
    let date = new Date();
    let timestamp = date.getTime(); // 1711262094733
    let id_order = date.getTime().toString();
    // console.log("Định dạng ngày giờ: ", timestampToDateTimeString(timestamp));
    // custom data per product => chitiet_order
    let build_data_for_order_detail: any[] = [];
    cart_order.forEach((item) => {
      let stemp = {
        id_order: id_order,
        id_product: item.id,
        id_user: user?.id_user,
        title: item.title,
        price: item.price,
        persent_discount: item.persent_discount,
        price_after_discount: item.price_after_discount,
        quantity_order: item.quantity_order,
        status: "Chờ xác nhận",
        payment: payments,
        time: timestampToDateTimeString(timestamp),
        timestamp: timestamp,
      };
      build_data_for_order_detail.push(stemp);
    });

    let build_data_order = {
      user: user,
      list_order: build_data_for_order_detail,
      status: "Chờ xác nhận",
      payment: payments,
      total_price: total_price,
      time: timestampToDateTimeString(timestamp),
      timestamp: timestamp,
    };

    try {
      // add to table 'order'
      const OrderCollectionRef = collection(db, "order");
      const OrderRef = doc(OrderCollectionRef, id_order);
      await setDoc(OrderRef, build_data_order);
      toast({
        title: "Thành công.",
        description: "Sản phẩm đã được thêm vào store.",
        className: "bg-green-500 text-white",
      });
      // delete order from local storage
      localStorage.setItem("order", JSON.stringify([]));
      setTotal_price_order(0);
      get_order_from_localstorage();
    } catch (error) {
      console.log("error add order to firestore", error);
    }
  };

  return (
    <div className="min-h-screen h-auto w-full">
      <Header />
      <div className="h-full min-h-[calc(100vh-84px)] bg-[#f5f5f5] flex justify-center">
        <div className="h-auto min-h-[400px] w-[1280px] py-2 px-2 mt-5 rounded-md bg-white">
          <div className="h-[50px] w-full flex items-center justify-center text-2xl font-bold uppercase pt-4">
            Giỏ hàng hiện tại
          </div>
          <div className="h-auto min-h-[120px] w-full">
            {cart_order && cart_order.length > 0 ? (
              <DataTable_checkout
                columns={columns_table_checkout}
                data={cart_order}
              />
            ) : (
              <div className="w-full text-lg font-bold flex items-center justify-center mt-14">
                Hiện tại không có sản phẩm nào trong giỏ hàng !
              </div>
            )}
          </div>
          <div className="h-[1px] w-full border border-gray-500"></div>
          <div className="h-auto w-full flex items-start place-content-between text-xl font-bold">
            <div className="h-full w-auto text-base font-normal">
              {/* //hinh thuc thanh toan */}
              <div className="font-bold text-lg mb-1 mt-3">
                Hình thức thanh toán
              </div>
              <RadioGroup
                onValueChange={(value) => setpayments(value)}
                defaultValue={payments}
                className="space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="COD" id="COD" />
                  <label htmlFor="COD">COD</label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="chuyenphatnhanh"
                    id="chuyenphatnhanh"
                  />
                  <label htmlFor="chuyenphatnhanh">Chuyển phát nhanh</label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="thanhtoanmomo" id="thanhtoanmomo" />
                  <label htmlFor="thanhtoanmomo" className="flex items-center">
                    Thanh toán MoMo{" "}
                    <Image src={icon_momo} alt="thanhtoanmomo" />
                  </label>
                </div>
              </RadioGroup>
            </div>
            <div className="h-auto w-auto">
              <div className="h-auto w-full py-4 flex items-center justify-end gap-2 text-xl font-bold">
                <span className="text-lg font-normal">Tổng cộng: </span>
                <span>{total_price.toLocaleString("vi-VI")} đ</span>
              </div>
              <div className="flex items-center justify-end space-x-2">
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg bg-main_color text-white hover:bg-blue-500 hover:text-white"
                  onClick={() => handle_order()}
                >
                  Đặt hàng
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
