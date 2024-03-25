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

const Option_laptop = ({
  hang_laptop,
  ram_laptop,
  ocung_laptop,
  manhinh_laptop,
  sethang_laptop,
  setram_laptop,
  setocung_laptop,
  setmanhinh_laptop,
}: any) => {
  const filter_maytinh: any =
    DANHMUC &&
    DANHMUC[3] &&
    DANHMUC[3].danhmuc_chitiet &&
    DANHMUC[3].danhmuc_chitiet[1]?.filter_option;
  return (
    <div className="h-auto w-full grid grid-cols-4 gap-2">
      <div className="space-y-1">
        <span className="h-auto w-full flex items-center">Hãng</span>
        <Select
          value={hang_laptop}
          onValueChange={(value) => sethang_laptop(value)}
        >
          <SelectTrigger className="w-full outline-none">
            <SelectValue placeholder="Hãng" />
          </SelectTrigger>
          <SelectContent>
            {filter_maytinh &&
              filter_maytinh.hang.map((item: string, index: number) => {
                return (
                  <SelectItem key={index} value={item}>
                    {item}
                  </SelectItem>
                );
              })}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-1">
        <span className="h-auto w-full flex items-center">Ram</span>
        <Select
          value={ram_laptop}
          onValueChange={(value) => setram_laptop(value)}
        >
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
      </div>
      <div className="space-y-1">
        <span className="h-auto w-full flex items-center">Ổ cứng</span>
        <Select
          value={ocung_laptop}
          onValueChange={(value) => setocung_laptop(value)}
        >
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
      </div>
      <div className="space-y-1">
        <span className="h-auto w-full flex items-center">Màn hình</span>
        <Select
          value={manhinh_laptop}
          onValueChange={(value) => setmanhinh_laptop(value)}
        >
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
    </div>
  );
};

export default Option_laptop;
