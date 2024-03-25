"use client";
import React, { use, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { columns_table_user } from "./columns-table-user";
import { DataTable } from "./data-table-user";

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

const Quan_ly_tai_khoan = () => {
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

  // convert date_birthday
  const date_convert = `${date_birthday?.getDate()}/${date_birthday?.getMonth()}/${date_birthday?.getFullYear()}`;

  const [avatar, setAvatar] = useState<any>();
  const [img, setImgAvatar] = useState<any>();
  async function getBase64(file: any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }
  const handleFile = async (e: any) => {
    let file = e.target.files[0];
    if (file) {
      let base64 = await getBase64(file);
      let objectURL = URL.createObjectURL(file);
      setImgAvatar(base64);
      setAvatar(objectURL);
    }
  };

  const build_data_user = {
    phonenumber: phonenumber,
    password: password,
    username: username,
    address: address,
    date_birthday: date_convert,
    gender: gender,
    avatar: img,
    timestamp: serverTimestamp(),
  };

  const handleClick_CreateUser = async () => {
    if (
      phonenumber &&
      password &&
      address &&
      username &&
      date_birthday &&
      gender
    ) {
      try {
        // tạo tham chiếu tới collection "user"
        const CollectionRef = collection(db, "user");
        // thêm data user vào collection con "information"
        await addDoc(CollectionRef, build_data_user);
      } catch (error) {
        console.log("error add infor user to firestore", error);
      }
    }
    setOpen_dialog_adduser(false);
  };

  // refesh thong tin nguoi dung
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const CollectionRef = collection(db, "user");
        const querySnapshot = await getDocs(CollectionRef);

        const users: DocumentData[] = [];
        querySnapshot.forEach((doc) => {
          users.push({ id: doc.id, ...doc.data() });
        });
        setArrUser(users);
        // console.log("check arr_user: ", querySnapshot);
        // console.log("arr_user from firebase: ", arrUser);
      } catch (error) {
        console.error("error fetching infor users from firebase: ", error);
      }
    };

    fetchUsers();
  }, [arrUser.length === 0]);

  // reset data user
  useEffect(() => {
    if (open_dialog_adduser) {
      setPhonenumber(null);
      setPassword(null);
      setUsername(null);
      setAddress(null);
      setDate_birthday(null);
      setGender(null);
    }
  }, [open_dialog_adduser]);

  return (
    <div className="h-full w-full pt-3">
      <Dialog
        open={open_dialog_adduser}
        onOpenChange={() => setOpen_dialog_adduser(!open_dialog_adduser)}
      >
        <DialogTrigger asChild>
          {/* <Button variant="outline">Edit Profile</Button> */}
          <button className="h-10 w-32 border border-gray-300 rounded-md hover:bg-gray-100">
            Thêm tài khoản
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="font-medium">
              Đăng ký tài khoản người dùng
            </DialogTitle>
            {/* <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription> */}
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex items-center justify-start gap-4 ">
              <label
                htmlFor="phonenumber"
                className="text-right w-[125px] flex items-start"
              >
                Số điện thoại
              </label>
              <input
                type="text"
                id="phonenumber"
                onChange={(e) => setPhonenumber(e.target.value)}
                className="h-[40px] w-auto border border-gray-200 rounded-md px-2 outline-none"
              />
            </div>
            <div className="flex items-center justify-start gap-4 ">
              <label
                htmlFor="password"
                className="text-right w-[125px] flex items-start"
              >
                Mật khẩu
              </label>
              <input
                type="text"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                className="h-[40px] w-auto border border-gray-200 rounded-md px-2 outline-none"
              />
            </div>
            <div className="flex items-center justify-start gap-4 ">
              <label
                htmlFor="name"
                className="text-right w-[125px] flex items-start"
              >
                Họ tên
              </label>
              <input
                type="text"
                id="name"
                onChange={(e) => setUsername(e.target.value)}
                className="h-[40px] w-auto border border-gray-200 rounded-md px-2 outline-none"
              />
            </div>
            <div className="flex items-center justify-start gap-4 ">
              <label
                htmlFor="address"
                className="text-right w-[125px] flex items-start"
              >
                Địa chỉ
              </label>
              <input
                type="text"
                id="address"
                onChange={(e) => setAddress(e.target.value)}
                className="h-[40px] w-auto border border-gray-200 rounded-md px-2 outline-none"
              />
            </div>
            <div className="flex items-center justify-start gap-4 ">
              <label
                htmlFor="birthday"
                className="text-right w-[125px] flex items-start"
              >
                Ngày sinh
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[224px] justify-start text-left font-normal",
                      !date_birthday && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date_birthday ? (
                      format(date_birthday, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date_birthday || new Date()}
                    onSelect={setDate_birthday}
                    initialFocus
                    captionLayout="dropdown"
                    fromYear={1970}
                    toYear={2025}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex items-center justify-start gap-4 ">
              <label
                htmlFor="gender"
                className="text-right w-[125px] flex items-start"
              >
                Giới tính
              </label>
              <Select
                value={gender || "gioitinhkhac"}
                onValueChange={setGender}
              >
                <SelectTrigger className="w-[224px]">
                  <SelectValue placeholder="Giới tính" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nam">Nam</SelectItem>
                  <SelectItem value="nu">Nữ</SelectItem>
                  <SelectItem value="gioitinhkhac">Khác</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-start gap-4 ">
              <label
                htmlFor="gender"
                className="text-right max-w-[125px] flex items-start"
              >
                Ảnh đại diện
              </label>
              <input
                type="file"
                id="avatar"
                multiple
                onChange={(e) => {
                  handleFile(e);
                }}
                // className="h-[40px] w-auto border border-gray-200 rounded-md px-2 outline-none"
              />
            </div>
          </div>
          <DialogFooter>
            {/* <Button type="submit">Save changes</Button> */}
            <button
              type="submit"
              className="border border-main_color bg-main_color text-white px-6 py-2 rounded-md hover:bg-blue-500"
              onClick={() => handleClick_CreateUser()}
            >
              Tạo
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <div className="h-[720px] w-full pt-2">
        <DataTable columns={columns_table_user} data={arrUser} />
      </div>
    </div>
  );
};

export default Quan_ly_tai_khoan;
