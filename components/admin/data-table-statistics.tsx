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
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import Filter_combobox from "../filter_component/filter-combobox";
import Filter_date_picker from "../filter_component/filter-date-picker";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  date: any;
  setDate: any;
}

export function DataTable_statistics<TData, TValue>({
  columns,
  data,
  date,
  setDate,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  const [rowSelection, setRowSelection] = React.useState({});

  // tổng tiền các hóa đơn
  const [totalPrice, setTotalPrice] = React.useState<number>(0);
  React.useEffect(() => {
    // tính lại tổng tiền khi danh sách đơn hàng thay đổi
    const totalPriceSum = data.reduce(
      (accumulator: any, currentOrder: any) =>
        accumulator + currentOrder.total_price,
      0
    );
    setTotalPrice(totalPriceSum);
  }, [data]);

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

  const pttt: any[] = [
    { value: "cod", label: "COD" },
    { value: "chuyenphatnhanh", label: "Chuyển phát nhanh" },
    { value: "thanhtoanmomo", label: "Thanh toán MoMo" },
  ];
  const [open_cbb_pttt, setOpen_cbb_pttt] = useState<boolean>(false);
  const [selected_cbb_pttt, setSelected_cbb_pt] = useState<any>(null);

  return (
    <div>
      <div className="flex items-center py-4">
        <Filter_date_picker className="" date={date} setDate={setDate} />
        <Input
          placeholder="Nhập mã đơn hàng..."
          value={(table.getColumn("id")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("id")?.setFilterValue(event.target.value)
          }
          className="ml-4 w-[180px]"
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
        {/* // filter phuongthucthanhtoan (pttt) */}
        <div className="max-w-[280px] flex items-center ml-4">
          <p className="max-w-[85px] text-sm text-center text-muted-foreground">
            Lọc thanh toán
          </p>
          <Filter_combobox
            open={open_cbb_pttt}
            setOpen={setOpen_cbb_pttt}
            selected={selected_cbb_pttt}
            setSelected={setSelected_cbb_pt}
            typeCombobox="payment"
            optionCombobox={pttt}
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
          <TableFooter>
            <TableRow>
              <TableCell colSpan={8} className="">
                TỔNG TIỀN
              </TableCell>
              <TableCell className="text-center">
                {totalPrice.toLocaleString("vi-VI")} đ
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
      <div className="flex flex-row place-content-between">
        <div className="flex-1 text-sm text-muted-foreground mt-5">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>

        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
