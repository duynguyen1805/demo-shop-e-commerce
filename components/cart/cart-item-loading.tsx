import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const Cart_item_loading = () => {
  return (
    <>
      <div className="relative h-[350px] w-[215px] p-2 bg-white border border-gray-400 rounded-md cursor-pointer hover:shadow-lg hover:border-blue-700 transition-all duration-300">
        <Skeleton className="min-h-[220px] max-h-[220px] w-full mb-3"></Skeleton>
        <div className="h-[115px] w-full py-1">
          <Skeleton className="h-[40px] max-h-[50px] w-full"></Skeleton>
          <div className="h-[55px] max-h-[55px] w-full flex flex-col items-center">
            <div className="h-[50%] w-full text-sm flex items-center space-x-1">
              <Skeleton className="h-4 w-full"></Skeleton>
              <Skeleton className="h-4 w-full"></Skeleton>
            </div>
            <Skeleton className="h-[50%] w-full text-sm text-gray-400 flex items-center place-content-between"></Skeleton>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart_item_loading;
