import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type props = {
  data_in_row: any;
};

const View_chi_tiet_don_hang: React.FC<props> = ({ data_in_row }) => {
  const [open_dialog_adduser, setOpen_dialog_adduser] =
    useState<boolean>(false);

  return (
    <Dialog
      open={open_dialog_adduser}
      onOpenChange={() => setOpen_dialog_adduser(!open_dialog_adduser)}
    >
      <DialogTrigger asChild>
        {/* <Button variant="outline">Edit Profile</Button> */}
        <button className="py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-200">
          Chi tiết
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[1220px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Thông tin chi tiết đơn hàng
          </DialogTitle>
          {/* <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription> */}
        </DialogHeader>
        <div className="h-auto max-h-[700px] w-full flex flex-col space-y-2 overflow-auto">
          <span>Mã đơn hàng: {data_in_row?.id}</span>
          <div className="w-full flex gap-20">
            <div className="flex flex-col space-y-2">
              <span>Khách hàng: {data_in_row?.user?.username}</span>
              <span>Số điện thoại: {data_in_row?.user?.phonenumber}</span>
            </div>
            <div className="flex flex-col space-y-2">
              <span>Địa chỉ: {data_in_row?.user?.address}</span>
              <span>Năm sinh: {data_in_row?.user?.date_birthday}</span>
            </div>
            <span>Giới tính: {data_in_row?.user?.gender}</span>
          </div>

          <span className="font-semibold">Thời gian: {data_in_row?.time}</span>
          <Table>
            <TableCaption>Danh sách sản phẩm trong đơn hàng.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID SP</TableHead>
                <TableHead>Tên sản phẩm</TableHead>
                <TableHead>SL</TableHead>
                <TableHead className="text-right">Giá bán</TableHead>
                <TableHead>% giảm giá</TableHead>
                <TableHead className="text-right">Phải trả</TableHead>
                <TableHead>PTTT</TableHead>
                <TableHead>Trạng thái</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data_in_row &&
                data_in_row.list_order &&
                data_in_row.list_order.length > 0 &&
                data_in_row?.list_order.map((item: any, index: number) => {
                  return (
                    <TableRow key={index}>
                      <TableCell className="font-medium max-w-5 overflow-hidden">
                        {item.id_product}
                      </TableCell>
                      <TableCell>{item.title}</TableCell>
                      <TableCell>{item.quantity_order}</TableCell>
                      <TableCell className="text-right">
                        {item.price.toLocaleString("vi-VI")}
                      </TableCell>
                      <TableCell className="text-center">
                        {item.persent_discount}
                      </TableCell>
                      <TableCell className="text-right">
                        {item.price_after_discount.toLocaleString("vi-VI")}
                      </TableCell>
                      <TableCell>{item.payment}</TableCell>
                      <TableCell>{item.status}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </div>
        <div className="w-full flex items-end justify-end gap-1">
          Tổng đơn hàng:{" "}
          <span className="text-xl font-bold">
            {data_in_row?.total_price.toLocaleString("vi-VI")}đ
          </span>
        </div>
        <DialogFooter>
          {/* <Button type="submit">Save changes</Button> */}
          <button
            type="submit"
            className="border border-main_color bg-main_color text-white px-6 py-2 rounded-md hover:bg-blue-500"
            //   onClick={() => handleClick_CreateUser()}
          >
            Xác nhận Giao hàng
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default View_chi_tiet_don_hang;
