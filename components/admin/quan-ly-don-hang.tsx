"use client";
import React, { useEffect, useState } from "react";

import { columns_table_manager_order_admin } from "./columns-table-manager-order-admin";
import { DataTable_manager_order_admin } from "./data-table-manager-order-admin";

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

const Quan_ly_don_hang = () => {
  const [open_dialog_adduser, setOpen_dialog_adduser] =
    useState<boolean>(false);
  const [phonenumber, setPhonenumber] = useState<string | null>();
  const [password, setPassword] = useState<string | null>();
  const [username, setUsername] = useState<string | null>();
  const [address, setAddress] = useState<string | null>();
  const [date_birthday, setDate_birthday] = useState<Date | null>();
  const [gender, setGender] = useState<string | null>();

  type info_user = {
    id_user: string;
    phonenumber: string;
    password: string;
    username: string;
    address: string;
    date_birthday: string;
    gender: string;
  };
  //   const [arrUser, setArrUser] = useState<DocumentData[] | info_user[]>([]);
  const [arrUser, setArrUser] = useState<any[]>([]);

  const [user, setuser] = useState<info_user | null>(null);
  useEffect(() => {
    //lấy thông tin người dùng
    let user: any = localStorage.getItem("user_shopee");
    // const token_cookie: any = Cookies.get("jwt_token");
    const parse_user = JSON.parse(user);
    setuser(parse_user);
    console.log("check useEffect");
  }, []);

  const [list_order, setlist_order] = useState<any[]>([]);
  // get data table order
  useEffect(() => {
    const fetch_data_order = async () => {
      try {
        const orderRef = collection(db, "order");
        // Lấy dữ liệu đơn hàng thỏa mãn điều kiện truy vấn
        const querySnapshot = await getDocs(
          query(orderRef, where("status", "!=", "delivered"))
        );

        // Duyệt qua các documents và lấy dữ liệu từ trường "list_order"
        const orders: any[] = [];
        querySnapshot.forEach((doc) => {
          const orderData = doc.data();
          const orderWithId = { id: doc.id, ...orderData };
          orders.push(orderWithId);
          console.log("check order: ", orderWithId);
        });
        setlist_order(orders);
      } catch (error) {
        console.log("Error fetching order data:", error);
      }
    };

    fetch_data_order();
  }, [list_order.length]);

  return (
    <div className="h-full w-full pt-3">
      <div className="h-[720px] w-full pt-2">
        <DataTable_manager_order_admin
          columns={columns_table_manager_order_admin}
          data={list_order}
        />
      </div>
    </div>
  );
};

export default Quan_ly_don_hang;
