"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type info_user = {
  id_user: string;
  phonenumber: string;
  avatar: string;
  username: string;
  address: string;
  date_birthday: string;
  gender: string;
};

const Update_infor_user = () => {
  const [user, setuser] = useState<info_user | null>();

  const [date_birthday, setDate_birthday] = useState<Date | null>();
  const [gender, setGender] = useState<string | null>();
  const [userName, setuserName] = useState<string | null>();
  const [addRess, setaddRess] = useState<string | null>();
  const [phoneNumber, setphoneNumber] = useState<string | null>();
  const [avatar, setavatar] = useState<string | null>();

  // getdata user from local storage
  useEffect(() => {
    //lấy thông tin người dùng
    let user: any = localStorage.getItem("user_shopee");
    const parse_user = JSON.parse(user);
    setuser(parse_user);
    setuserName(parse_user?.username);
    setphoneNumber(parse_user?.phonenumber);
    setaddRess(parse_user?.address);
    setGender(parse_user?.gender);
    // setDate_birthday(new Date(parse_user?.date_birthday));
    setavatar(parse_user?.avatar);
  }, []);

  return (
    <div className="min-h-[500px] w-full flex">
      <div className="w-1/4 flex flex-col items-center justify-start space-y-5 pt-10">
        <div className="relative h-[250px] w-[250px] border border-main_color rounded-full flex items-center justify-center overflow-hidden">
          <Image
            src={avatar ? avatar : ""}
            alt="ảnh đại diện"
            height={250}
            width={250}
            className="content-center text-center"
          />
          <div className="absolute bottom-0 h-[50px] w-full bg-gray-100 text-center content-center cursor-pointer hover:bg-gray-200">
            <span>Tải ảnh lên</span>
            <Input
              id="avatar"
              type="file"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
        </div>
      </div>
      <div className="w-3/4 space-y-3 pl-10">
        <div className="space-y-1 flex flex-col">
          <label htmlFor="username" className="">
            Họ tên
          </label>
          <input
            type="text"
            name="username"
            id="username"
            value={userName ? userName : ""}
            onChange={(e) => setuserName(e.target.value)}
            className="border rounded-md w-1/2 outline-none px-2 py-2"
          />
        </div>
        <div className="space-y-1 flex flex-col">
          <label htmlFor="phonenumber" className="">
            Số điện thoại
          </label>
          <input
            disabled={true}
            type="text"
            name="phonenumber"
            id="phonenumber"
            value={phoneNumber ? phoneNumber : ""}
            onChange={(e) => setphoneNumber(e.target.value)}
            className="border rounded-md w-1/2 outline-none px-2 py-2"
          />
        </div>
        <div className="space-y-1 flex flex-col">
          <label htmlFor="address" className="">
            Địa chỉ
          </label>
          <input
            type="text"
            name="address"
            id="address"
            value={addRess ? addRess : ""}
            onChange={(e) => setaddRess(e.target.value)}
            className="border rounded-md w-1/2 outline-none px-2 py-2"
          />
        </div>
        <div className="space-y-1 flex flex-col w-1/2">
          <label htmlFor="username" className="">
            Năm sinh
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
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
                className="bg-white"
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="space-y-1 flex flex-col w-1/2">
          <label
            htmlFor="gender"
            className="text-right w-[125px] flex items-start"
          >
            Giới tính
          </label>
          <Select value={gender || "gioitinhkhac"} onValueChange={setGender}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Giới tính" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="nam">Nam</SelectItem>
              <SelectItem value="nu">Nữ</SelectItem>
              <SelectItem value="gioitinhkhac">Khác</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center justify-center w-1/3 pt-5">
          <div className="h-[45px] w-[120px] flex items-center justify-center rounded-md bg-blue-400 text-white cursor-pointer hover:bg-blue-500">
            Cập nhật
          </div>
        </div>
      </div>
    </div>
  );
};

export default Update_infor_user;
