"use client";

import React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selected: any;
  setSelected: React.Dispatch<React.SetStateAction<any>>;
  typeCombobox: string;
  optionCombobox: any[];
  table: any;
};

const Filter_combobox: React.FC<props> = ({
  open,
  setOpen,
  selected,
  setSelected,
  typeCombobox,
  optionCombobox,
  table,
}) => {
  return (
    <div className="flex items-center">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="w-auto justify-start">
            {selected ? (
              optionCombobox.find((option_cbb) => option_cbb.value == selected)
                ?.label
            ) : (
              <>
                + {typeCombobox == "payment" && "Thanh toán"}
                {typeCombobox == "status" && "Trạng thái đơn"}
              </>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="p-0 mt-2 border shadow-md rounded"
          align="center"
        >
          <Command>
            <CommandInput
              onValueChange={(value) => {
                table.getColumn(`${typeCombobox}`)?.setFilterValue(value);
              }}
              placeholder={`${typeCombobox == "payment" ? "Thanh toán" : ""} ${
                typeCombobox == "status" ? "Trạng thái đơn" : ""
              }`}
            />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {optionCombobox.map((item) => (
                  <CommandItem
                    key={item.value}
                    value={item.value}
                    onSelect={(currentValue) => {
                      setSelected(
                        currentValue === selected ? "" : currentValue
                      );
                      setOpen(false);
                      // filter data table

                      table
                        .getColumn(`${typeCombobox}`)
                        ?.setFilterValue(
                          currentValue === selected ? "" : item.value
                        );
                    }}
                  >
                    <span>{item.label}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default Filter_combobox;
