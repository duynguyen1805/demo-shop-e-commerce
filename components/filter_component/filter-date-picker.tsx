"use client";
import React, { useEffect } from "react";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type props = {
  className?: string;
  date: any;
  setDate: any;
};

const Filter_date_picker: React.FC<props> = ({ className, date, setDate }) => {
  //   const [date, setDate] = React.useState<DateRange | undefined>({
  //     from: new Date(2024, 2, 15), //tháng 1 là số 0 => lấy tháng -1
  //     to: addDays(new Date(2024, 2, 15), 30),
  //   });

  //   let string_timestamp_start = date?.from?.getTime();
  //   let string_timestamp_end = date?.to?.getTime();

  //   useEffect(() => {
  //     console.log("check string_timestamp_start: ", string_timestamp_start);
  //     console.log("check string_timestamp_end: ", string_timestamp_end);
  //   }, [string_timestamp_start, string_timestamp_end]);

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default Filter_date_picker;
