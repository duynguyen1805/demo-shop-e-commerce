"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

type build_data_manager_order = {
  id_order: string;
  id_product: string;
  id_user: string;
  payment: string;
  persent_discount: number;
  price: number;
  price_after_discount: number;
  quantity_order: number;
  status: string;
  time: string;
  timestamp: number;
  title: string;
};

export const columns_table_manager_order: ColumnDef<build_data_manager_order>[] =
  [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "title",
      header: "Tên sản phẩm",
    },
    {
      accessorKey: "quantity_order",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Số lượng
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const data_quantity: any = row.getValue("quantity_order");
        return <div className="pl-9">{data_quantity}</div>;
      },
    },
    {
      accessorKey: "price",
      header: "Giá bán",
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("price"));

        // Format the price as a vnd price
        const formatted = new Intl.NumberFormat("vi-VI", {
          style: "currency",
          currency: "VND",
        }).format(amount);

        return <div className="text-left">{formatted}</div>;
      },
    },
    {
      accessorKey: "persent_discount",
      header: "% khuyến mãi",
      cell: ({ row }) => {
        const data_persent_discount: any = row.getValue("persent_discount");
        return <div className="pl-9">{data_persent_discount}%</div>;
      },
    },
    {
      accessorKey: "price_after_discount",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Phải trả
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("price_after_discount"));

        // Format the price as a vnd price
        const formatted = new Intl.NumberFormat("vi-VI", {
          style: "currency",
          currency: "VND",
        }).format(amount);

        return <div className="text-left">{formatted}</div>;
      },
    },
    {
      accessorKey: "payment",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            PTTT
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return <div className="text-left ml-5">{row.getValue("payment")}</div>;
      },
    },
    {
      accessorKey: "status",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Trạng thái
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        let status = row.getValue("status");
        return (
          <div className="pl-6">
            {status == "placed" && "Đặt hàng"}
            {status == "confirmed" && "Đã xác nhận"}
            {status == "processing" && "Đang xử lý"}
            {status == "outfordelivery" && "Đã giao cho Vận chuyển"}
            {status == "delivered" && "Đã giao"}
            {status == "cancelled" && "Đã hủy"}
          </div>
        );
      },
    },
    {
      accessorKey: "timestamp",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Ngày đặt
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        let timestampToDateTimeString = (timestamp: any) => {
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
        let date = timestampToDateTimeString(row.getValue("timestamp"));
        return <div className="text-left">{date}</div>;
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        // get data in row
        const data_in_row = row.original;

        return (
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
                onClick={() => navigator.clipboard.writeText(data_in_row.title)}
              >
                Sao chép tên sản phẩm
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Hủy đơn hàng</DropdownMenuItem>
              <DropdownMenuItem>Đặt mới</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
