"use client";
import React, { use, useEffect, useState } from "react";
import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";

import { columns_table_statistics } from "./columns-table-statistics";
import { DataTable_statistics } from "./data-table-statistics";

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
  Query,
  QuerySnapshot,
} from "firebase/firestore";
import { db } from "../../firebase.config";

const Thong_ke_doanh_thu = () => {
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
  }, [setuser]);

  const [list_order, setlist_order] = useState<any[]>([]);
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: addDays(new Date(), -30),
    to: new Date(),
  });
  let startDate: number | null = date?.from
    ? Number(new Date(date.from))
    : null;
  let endDate: number | null = date?.to ? Number(new Date(date.to)) : null;

  useEffect(() => {
    console.log("check string_timestamp_start: ", date?.from?.getTime());
    console.log("check string_timestamp_end: ", date?.to?.getTime());
  }, [date]);

  // get data table order
  useEffect(() => {
    const fetch_data_order = async () => {
      try {
        const orderRef = collection(db, "order");

        // get data đơn hàng thỏa mãn điều kiện truy vấn
        let querySnapshot = await getDocs(
          query(
            orderRef,
            where("status", "==", "delivered"),
            where("timestamp", ">=", startDate),
            where("timestamp", "<=", endDate)
          )
        );

        // Duyệt qua các documents và lấy dữ liệu từ trường "list_order"
        const orders: any[] = [];
        querySnapshot.forEach((doc) => {
          const orderData = doc.data();
          const orderWithId: any = { id: doc.id, ...orderData };
          orders.push(orderWithId);
          //   stemp_tinh_tong = stemp_tinh_tong + Number(orderWithId.total_price);
          console.log("check order: ", orderWithId);
        });
        setlist_order(orders);
        // settong_cong(stemp_tinh_tong);
      } catch (error) {
        console.log("Error fetching order data:", error);
      }
    };

    fetch_data_order();
  }, [date]);

  return (
    <div className="h-full w-full pt-3">
      <div className="h-auto w-full pt-2">
        <DataTable_statistics
          columns={columns_table_statistics}
          data={list_order}
          date={date}
          setDate={setDate}
        />
      </div>
      {/* <div className="h-12 w-full flex items-center justify-end gap-2">
        <span>Tổng tiền:</span>
        <span>{tong_cong.toLocaleString("vi-VI")}đ</span>
      </div> */}
    </div>
  );
};

export default Thong_ke_doanh_thu;
