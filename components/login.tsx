import React from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

const Login_page = () => {
  //   const { setTheme, theme } = useTheme();

  return (
    <>
      <div
        className={cn(
          "w-full h-[720px] flex justify-center bg-[#f0f2f5] text-black pt-[72px] pb-[112px]"
        )}
      >
        <div className="h-[536px] w-[980px] border border-red-500">
          login form
        </div>
      </div>
      <div className="h-[calc(100vh-720px)] bg-white">footer login page</div>
    </>
  );
};

export default Login_page;
