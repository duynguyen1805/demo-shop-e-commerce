"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { DANHMUC } from "@/constant";

const Filter_maytinh = () => {
  const filter_maytinh: any =
    DANHMUC &&
    DANHMUC[3] &&
    DANHMUC[3].danhmuc_chitiet &&
    DANHMUC[3].danhmuc_chitiet[1]?.filter_option;
  return (
    <div className="h-auto w-full space-y-3">
      <span className="h-auto w-full flex items-center">Hãng</span>
      <div className="h-auto w-full flex flex-col items-center space-y-1 pl-5">
        {filter_maytinh &&
          filter_maytinh.hang.map((item: string, index: number) => {
            return (
              <div
                key={index}
                className="h-auto w-full text-base flex items-center space-x-2"
              >
                <input
                  type="checkbox"
                  value={item}
                  className="bg-white"
                ></input>
                <div className="h-auto w-full">{item}</div>
              </div>
            );
          })}
      </div>
      <div className="h-[1px] w-full border border-gray-300"></div>
      <span className="h-auto w-full flex items-center">Ram</span>
      <Select>
        <SelectTrigger className="w-full outline-none">
          <SelectValue placeholder="Ram" />
        </SelectTrigger>
        <SelectContent>
          {filter_maytinh &&
            filter_maytinh.ram.map((item: string, index: number) => {
              return (
                <SelectItem key={index} value={item}>
                  {item}
                </SelectItem>
              );
            })}
        </SelectContent>
      </Select>
      <div className="h-[1px] w-full border border-gray-300"></div>
      <span className="h-auto w-full flex items-center">Ổ cứng</span>
      <Select>
        <SelectTrigger className="w-full outline-none">
          <SelectValue placeholder="Ổ cứng" />
        </SelectTrigger>
        <SelectContent>
          {filter_maytinh &&
            filter_maytinh.ocung.map((item: string, index: number) => {
              return (
                <SelectItem key={index} value={item}>
                  {item}
                </SelectItem>
              );
            })}
        </SelectContent>
      </Select>
      <div className="h-[1px] w-full border border-gray-300"></div>
      <span className="h-auto w-full flex items-center">Màn hình</span>
      <Select>
        <SelectTrigger className="w-full outline-none">
          <SelectValue placeholder="Màn hình" />
        </SelectTrigger>
        <SelectContent>
          {filter_maytinh &&
            filter_maytinh.manhinh.map((item: string, index: number) => {
              return (
                <SelectItem key={index} value={item}>
                  {item}
                </SelectItem>
              );
            })}
        </SelectContent>
      </Select>
    </div>
  );
};

export default Filter_maytinh;
