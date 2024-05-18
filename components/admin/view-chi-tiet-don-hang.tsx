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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

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
import { cn } from "@/lib/utils";

type props = {
  data_in_row: any;
};

const View_chi_tiet_don_hang: React.FC<props> = ({ data_in_row }) => {
  const [open_dialog_adduser, setOpen_dialog_adduser] =
    useState<boolean>(false);

  const handleUpdate_statusOrder = async (status: string) => {
    // do update status order
    // placed => confirmed => processing => outfordelivery => delivered or cancelled
    let id_order = data_in_row.id;
    // update status order with id order
    update_status_order_firestore(id_order, status);
  };

  const update_status_order_firestore = async (
    id_order: string,
    new_status: string
  ) => {
    try {
      // tham chiếu collection "orders"
      const orderRef = collection(db, "order");
      // Tham chiếu đến tài liệu dựa trên id_order
      const idOrderRef = doc(orderRef, id_order);

      // Kiểm tra xem tài liệu tồn tại hay không
      const docSnapshot = await getDoc(idOrderRef);
      if (!docSnapshot.exists()) {
        console.error(`Không tìm thấy đơn hàng có id ${id_order}`);
        return false;
      }

      // Cập nhật trạng thái đơn hàng
      await updateDoc(idOrderRef, { status: new_status });

      console.log(
        `Đã cập nhật trạng thái đơn hàng ${id_order} thành ${new_status}`
      );

      return true;
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái đơn hàng:", error);
      return false;
    }
  };

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
                <TableHead>Cập nhật</TableHead>
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
                      <TableCell>
                        <p
                          className={cn(
                            "px-2 py-[3px] w-fit  font-medium rounded-sm",
                            `${
                              item.status == "placed" &&
                              "bg-blue-100 text-blue-600"
                            }`,
                            `${
                              item.status == "confirmed" &&
                              "bg-blue-700 text-white"
                            }`,
                            `${
                              item.status == "processing" &&
                              "bg-yellow-300 text-yellow-800"
                            }`,
                            `${
                              item.status == "outfordelivery" &&
                              "bg-orange-300 text-orange-800"
                            }`,
                            `${
                              item.status == "delivered" &&
                              "bg-green-100 text-green-600"
                            }`,
                            `${
                              item.status == "cancelled" &&
                              "bg-red-300 text-red-600"
                            }`
                          )}
                        >
                          {item.status == "placed" && "Đặt hàng"}
                          {item.status == "confirmed" && "Đã xác nhận"}
                          {item.status == "processing" && "Đang xử lý"}
                          {item.status == "outfordelivery" &&
                            "Đã giao cho Vận chuyển"}
                          {item.status == "delivered" && "Đã giao"}
                          {item.status == "cancelled" && "Đã hủy"}
                        </p>
                      </TableCell>
                      <TableCell className="flex items-center ml-4">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                            // onClick={() =>
                            //   navigator.clipboard.writeText(infor_user?.id_user)
                            // }
                            >
                              Xóa sản phẩm
                            </DropdownMenuItem>
                            {/* <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              Chi tiết đơn hàng
                            </DropdownMenuItem>
                            <DropdownMenuItem>Hủy đơn hàng</DropdownMenuItem> */}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
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
          <button
            type="submit"
            className="border border-main_color bg-main_color text-white px-6 py-2 rounded-md hover:bg-blue-500"
            onClick={() =>
              handleUpdate_statusOrder(
                `${data_in_row?.status == "placed" ? "confirmed" : null}${
                  data_in_row?.status == "confirmed" ? "processing" : null
                }${
                  data_in_row?.status == "processing" ? "outfordelivery" : null
                }${
                  data_in_row?.status == "outfordelivery" ? "delivered" : null
                }`
              )
            }
          >
            {data_in_row?.status == "placed" ? "Xác nhận đơn hàng" : null}
            {data_in_row?.status == "confirmed" ? "Đóng gói đơn hàng" : null}
            {data_in_row?.status == "processing" ? "Giao cho Vận chuyển" : null}
            {data_in_row?.status == "outfordelivery" ? "Đã giao hàng" : null}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default View_chi_tiet_don_hang;
