"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Filter_combobox from "../filter_component/filter-combobox";
import { DataTablePagination } from "../ui/DataTablePagination";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable_manager_order_admin<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  // const status: any[] = [
  //   { value: "placed", label: "Đặt hàng" },
  //   { value: "confirmed", label: "Đã xác nhận" },
  //   { value: "processing", label: "Đang xử lý" },
  //   { value: "outfordelivery", label: "Đã giao hàng cho Vận chuyển" },
  //   { value: "delivered", label: "Đã giao" },
  //   { value: "cancelled", label: "Đã hủy" },
  // ];
  const status: any[] = [
    { value: "placed", label: "Đặt hàng" },
    { value: "confirmed", label: "Đã xác nhận" },
    { value: "processing", label: "Đang xử lý" },
    { value: "outfordelivery", label: "Đã giao cho Vận chuyển" },
    { value: "delivered", label: "Đã giao" },
    { value: "cancelled", label: "Đã hủy" },
  ];
  const [open_cbb_status, setOpen_cbb_status] = useState<boolean>(false);
  const [selected_cbb_status, setSelected_cbb_status] = useState<any>(null);

  return (
    <div>
      <div className="flex items-center py-4">
        <Input
          placeholder="Nhập mã đơn hàng..."
          value={(table.getColumn("id")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("id")?.setFilterValue(event.target.value)
          }
          className="w-[180px]"
        />
        <Input
          placeholder="Nhập số điện thoại..."
          value={
            (table.getColumn("phonenumber")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("phonenumber")?.setFilterValue(event.target.value)
          }
          className="ml-4 w-[180px]"
        />
        {/* // filter trạng thái đơn hàng (status) */}
        <div className="max-w-[280px] flex items-center ml-4 space-x-2">
          {/* <p className="max-w-[85px] text-sm text-center text-muted-foreground">
            Trạng thái
          </p> */}
          <Filter_combobox
            open={open_cbb_status}
            setOpen={setOpen_cbb_status}
            selected={selected_cbb_status}
            setSelected={setSelected_cbb_status}
            typeCombobox="status"
            optionCombobox={status}
            table={table}
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value: any) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-xl font-semibold"
                >
                  Hiện tại không có sản phẩm nào trong giỏ hàng !
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="py-5">
        <DataTablePagination table={table} />
      </div>
    </div>
  );
}
