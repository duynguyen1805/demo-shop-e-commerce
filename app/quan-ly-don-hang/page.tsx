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

import { columns_table_manager_order } from "../../components/user/columns-table-manager-order";
import { DataTable_manager_order } from "../../components/user/data-table-manager-order";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

type info_user = {
  id_user: string;
  phonenumber: string;
  avatar: string;
  username: string;
  address: string;
  date_birthday: string;
  gender: string;
};

const Quan_ly_don_hang = () => {
  const { toast } = useToast();

  const [user, setuser] = useState<info_user | null>(null);
  const [total_price, setTotal_price_order] = useState<number>(0);
  const [payments, setpayments] = useState<string>("COD");

  const [list_order, setlist_order] = useState<any[]>();

  useEffect(() => {
    //lấy thông tin người dùng
    let user: any = localStorage.getItem("user_shopee");
    // const token_cookie: any = Cookies.get("jwt_token");
    const parse_user = JSON.parse(user);
    setuser(parse_user);
    console.log("check useEffect");
  }, []);

  useEffect(() => {
    // getdata from firebase
    const fetching_data_order = async (userId: any) => {
      try {
        const orderRef = collection(db, "order");
        const q = query(orderRef, where("user.id_user", "==", userId)); // Lọc theo userId

        // Lấy dữ liệu đơn hàng thỏa mãn điều kiện truy vấn
        const querySnapshot = await getDocs(q);

        // Duyệt qua các documents và lấy dữ liệu từ trường "list_order"
        const orders: any[] = [];
        querySnapshot.forEach((doc) => {
          const orderData = doc.data();
          const listOrder = orderData.list_order;
          //get obj trong mỗi list_order
          listOrder.forEach((orderItem: any) => {
            orders.push(orderItem);
          });
        });
        setlist_order(orders);
        console.log("List of orders for user", userId, ":", orders);
      } catch (error) {
        console.log("Error fetching order data:", error);
      }
    };
    fetching_data_order(user?.id_user);
    console.log("check setlist_order: ", list_order);
  }, [user]);

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

  return (
    <div className="min-h-screen h-auto w-full">
      <Header />
      <div className="h-full min-h-[calc(100vh-84px)] bg-[#f5f5f5] flex flex-col items-center">
        <div className="w-[1280px] flex items-center mt-5">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/" className="text-lg font-normal">
                    Trang chủ
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link
                    href="/quan-ly-don-hang"
                    className="text-lg font-normal"
                  >
                    Quản lý đơn hàng
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="h-auto min-h-[400px] w-[1280px] py-2 px-2 mt-5 rounded-md bg-white">
          <div className="h-[50px] w-full flex items-center justify-center text-2xl font-bold uppercase pt-4">
            Quản lý đơn hàng
          </div>
          <div className="h-auto min-h-[120px] w-full">
            {list_order && list_order.length > 0 ? (
              <DataTable_manager_order
                columns={columns_table_manager_order}
                data={list_order}
              />
            ) : (
              <div className="w-full text-lg font-bold flex items-center justify-center mt-14">
                Hiện tại không có sản phẩm nào trong giỏ hàng !
              </div>
            )}
          </div>
          <div className="h-[1px] w-full border border-gray-500"></div>
          <div className="h-auto w-full flex items-start place-content-between text-xl font-bold">
            {/* <div className="h-full w-auto text-base font-normal">
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
            </div> */}
            {/* <div className="h-auto w-auto">
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
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quan_ly_don_hang;
