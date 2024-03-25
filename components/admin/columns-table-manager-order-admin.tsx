"use client";
import React, { useState } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import View_chi_tiet_don_hang from "./view-chi-tiet-don-hang";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

type build_data_manager_order_admin = {
  id: string;
  user: {};
  list_order: any[];
  payment: string;
  total_price: number;
  status: string;
  time: string;
  timestamp: number;
};

export const columns_table_manager_order_admin: ColumnDef<build_data_manager_order_admin>[] =
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
      accessorKey: "id",
      header: "Mã đơn hàng",
    },
    {
      accessorKey: "user.username",
      header: "Khách hàng",
    },
    {
      accessorKey: "user.phonenumber",
      header: "SĐT",
    },
    {
      accessorKey: "payment",
      header: "PTTT",
      cell: ({ row }) => {
        return <div className="text-left">{row.getValue("payment")}</div>;
      },
    },
    {
      accessorKey: "total_price",
      header: "Tổng tiền",
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("total_price"));

        // Format the price as a vnd price
        const formatted = new Intl.NumberFormat("vi-VI", {
          style: "currency",
          currency: "VND",
        }).format(amount);

        return <div className="text-left">{formatted}</div>;
      },
    },
    {
      accessorKey: "time",
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
        return <div className="text-left">{row.getValue("time")}</div>;
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
        return <div className="text-left pl-2">{row.getValue("status")}</div>;
      },
    },

    {
      id: "actions",
      cell: ({ row }) => {
        // get data in row
        const data_in_row: any = row.original;
        const infor_user: any = row.original.user;
        const list_item: any = row.original.list_order;

        return (
          <>
            {/* <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() =>
                    navigator.clipboard.writeText(infor_user?.id_user)
                  }
                >
                  Sao chép ID người dùng
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Chi tiết đơn hàng</DropdownMenuItem>
                <DropdownMenuItem>Hủy đơn hàng</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu> */}
            <View_chi_tiet_don_hang data_in_row={data_in_row} />
          </>
        );
      },
    },
  ];
