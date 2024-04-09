"use client";
import React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

const type_pttt = [
  {
    value: "COD",
    label: "COD",
  },
  {
    value: "chuyenphatnhanh",
    label: "Chuyển phát nhanh",
  },
  {
    value: "thanhtoanmomo",
    label: "Thanh toán MoMo",
  },
];

const Filter_combobox = () => {
  const [open_select_pttt, setOpen_select_pttt] =
    React.useState<boolean>(false);
  const [value_pttt, setValue_pttt] = React.useState<string>("");

  return (
    <div className="w-full">
      <Popover open={open_select_pttt} onOpenChange={setOpen_select_pttt}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open_select_pttt}
            className="w-[200px] justify-between"
          >
            {value_pttt
              ? type_pttt.find((type_pttt) => type_pttt.value === value_pttt)
                  ?.label
              : "Lọc PT Thanh toán..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Lọc PT Thanh toán..." />
            <CommandEmpty>Không tồn tại phương thức nào.</CommandEmpty>
            <CommandGroup>
              {type_pttt &&
                type_pttt.map((item, index: number) => (
                  <CommandItem
                    key={index}
                    value={item.value}
                    onSelect={(currentValue) => {
                      setValue_pttt(
                        currentValue === value_pttt ? "" : currentValue
                      );
                      setOpen_select_pttt(false);
                    }}
                  >
                    {/* <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            value_pttt === item.value
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        /> */}
                    {item.label}
                  </CommandItem>
                ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default Filter_combobox;
