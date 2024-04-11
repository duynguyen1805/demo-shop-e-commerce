"use client";
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
import { db } from "../../../firebase.config";

import { DataTable_manager_order } from "@/components/user/data-table-manager-order";
import { columns_table_manager_order } from "@/components/user/columns-table-manager-order";
import { DataTable_checkout } from "@/components/user/data-table-checkout";
import { columns_table_checkout } from "@/components/user/columns-table-checkout";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";

import icon_momo from "../../../public/assets/icon-momo.png";
import { useToast } from "@/components/ui/use-toast";

type infor_user = {
  id_user: string;
  username: string;
  phonenumber: string;
  avatar: string;
  address: string;
  date_birthday: string;
  gender: string;
};

const Manager_Page = ({ params }: { params: { typequanly: string } }) => {
  const { toast } = useToast();

  // --------quan-ly-don-hang--------
  const [user, setuser] = useState<infor_user | null>(null);

  const [list_order, setlist_order] = useState<any[]>();

  useEffect(() => {
    let user: any = localStorage.getItem("user_shopee");
    const parse_user = JSON.parse(user);
    setuser(parse_user);
    // lay gio hang
    get_order_from_localstorage();
  }, []);
  // getdata order
  useEffect(() => {
    const fetching_data_order = async (userId: any) => {
      try {
        const orderRef = collection(db, "order");
        const q = query(orderRef, where("user.id_user", "==", userId));

        // get data
        const querySnapshot = await getDocs(q);

        // duyet cac document & getdata tu field "list_order"
        const orders: any[] = [];
        querySnapshot.forEach((doc) => {
          const orderData = doc.data();
          const listOrder = orderData.list_order;
          // get obj trong moi list order
          listOrder.forEach((orderItem: any) => {
            orders.push(orderItem);
          });
        });
        setlist_order(orders);
      } catch (error) {
        console.log("Error fetching order data: " + error);
      }
    };

    fetching_data_order(user?.id_user);
  }, [user]);

  // --------checkout--------
  const [cart_order, setcart_order] = useState<any[]>([]);
  const [total_price, setTotal_price_order] = useState<number>(0);
  const [payments, setpayments] = useState<string>("COD");

  const get_order_from_localstorage = () => {
    let cart: any = localStorage.getItem("order");
    const parse_cart = JSON.parse(cart);
    setcart_order(parse_cart);
  };

  useEffect(() => {
    // calc total price of order
    if (cart_order && cart_order.length > 0) {
      let total_price = 0;
      cart_order.map((item: any, index: number) => {
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
        status: "placed",
        payment: payments,
        time: timestampToDateTimeString(timestamp),
        timestamp: timestamp,
      };
      build_data_for_order_detail.push(stemp);
    });

    let build_data_order = {
      user: user,
      list_order: build_data_for_order_detail,
      status: "placed",
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
    <div className="h-auto w-full">
      {/* QUAN LY DON HANG */}
      {params.typequanly == "quan-ly-don-hang" && (
        <>
          <div className="h-auto min-h-[120px] w-full">
            {list_order && list_order.length > 0 ? (
              <DataTable_manager_order
                columns={columns_table_manager_order}
                data={list_order}
              />
            ) : (
              <div className="w-full text-xl font-semibold flex items-center justify-center mt-14">
                Hiện tại bạn chưa có đơn hàng nào. Hãy mua sắm ngay...
              </div>
            )}
          </div>
        </>
      )}

      {/* QUAN LY GIO HANG (CHECKOUT) */}
      {params.typequanly == "checkout" && (
        <>
          <div className="h-auto min-h-[120px] w-full">
            {cart_order && cart_order.length > 0 ? (
              <DataTable_checkout
                columns={columns_table_checkout}
                data={cart_order}
              />
            ) : (
              <div className="w-full text-xl font-semibold flex items-center justify-center mt-14">
                Chưa có sản phẩm nào trong giỏ hàng. Hãy mua sắm ngay...
              </div>
            )}
          </div>
          <div className="h-[1px] w-full bg-gray-500"></div>
          <div className="h-auto w-full flex items-start place-content-between font-bold">
            <div className="h-full w-auto text-base font-normal">
              {/* //hinh thuc thanh toan */}
              <div className="font-semibold text-lg mb-1 mt-3">
                Hình thức thanh toán
              </div>
              <RadioGroup
                onValueChange={(value) => setpayments(value)}
                defaultValue={payments}
                className="space-y-2"
              >
                <div className="flex items-center space-x-2 text-sm">
                  <RadioGroupItem value="COD" id="COD" />
                  <label htmlFor="COD">COD</label>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <RadioGroupItem
                    value="chuyenphatnhanh"
                    id="chuyenphatnhanh"
                  />
                  <label htmlFor="chuyenphatnhanh">Chuyển phát nhanh</label>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <RadioGroupItem value="thanhtoanmomo" id="thanhtoanmomo" />
                  <label htmlFor="thanhtoanmomo" className="flex items-center">
                    Thanh toán MoMo{" "}
                    <Image
                      src={icon_momo}
                      alt="thanhtoanmomo"
                      height={35}
                      width={35}
                    />
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
                  disabled={cart_order?.length == 0}
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
        </>
      )}
    </div>
  );
};

export default Manager_Page;
