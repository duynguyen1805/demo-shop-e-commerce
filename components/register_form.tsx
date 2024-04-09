"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

interface ToggleProps {
  handleToggleForm?: any;
}

const Register_form: React.FC<ToggleProps> = ({ handleToggleForm }) => {
  const [status_btn, setstatus_btn] = useState<string>("sendotp");
  const [input_otp, setinput_otp] = useState<any>();
  const ex_otp = "123123";

  const validate_otp = () => {
    // check otp
    if (input_otp == ex_otp) setstatus_btn("dangky");
  };

  return (
    <div className="h-full min-h-[470px] w-[400px] bg-white rounded shadow-md py-[22px] px-[30px]">
      <div className="h-[58px] w-full text-xl text-center">Đăng ký</div>
      <input
        type="text"
        name="account"
        placeholder="Số điện thoại"
        className="h-10 w-full bg-white border px-2 outline-none font-thin mb-3"
      />
      <div className="w-full flex items-center justify-center mb-3">
        <InputOTP
          maxLength={6}
          value={input_otp}
          onChange={(value) => setinput_otp(value)}
          onComplete={validate_otp}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </div>

      {status_btn == "sendotp" && (
        <button
          className="h-10 w-full flex items-center justify-center text-white bg-blue-400 border border-blue-400 cursor-pointer hover:bg-main_color hover:border-main_color"
          onClick={() => setstatus_btn("xacnhanotp")}
        >
          GỬI MÃ OTP
        </button>
      )}
      {status_btn == "xacnhanotp" && (
        <button
          className="h-10 w-full flex items-center justify-center text-white bg-blue-400 border border-blue-400 cursor-pointer hover:bg-main_color hover:border-main_color"
          onClick={() => validate_otp()}
        >
          XÁC NHẬN
        </button>
      )}
      {status_btn == "dangky" && (
        <button className="h-10 w-full flex items-center justify-center text-white bg-blue-400 border border-blue-400 cursor-pointer hover:bg-main_color hover:border-main_color">
          ĐĂNG KÝ
        </button>
      )}

      <div className="h-auto w-full flex items-center my-2">
        <div className="border border-solid border-gray-300 w-full"></div>
        <span className="text-xs text-gray-500 w-auto px-4">HOẶC</span>
        <div className="border border-solid border-gray-300 w-full"></div>
      </div>
      <div className="h-auto w-full flex items-center justify-center mt-6">
        <p className="text-xs text-gray-500">
          Bằng việc đăng ký, bạn đã đồng ý với Shopee về <br></br>
          <span className="text-xs text-red-500 ml-5 mr-1">
            Điều khoản dịch vụ
          </span>
          & <span className="text-xs text-red-500">Chính sách bảo mật</span>
        </p>
      </div>
      <div className="h-auto w-full flex items-center justify-center gap-1 mt-8">
        <span className="text-sm font-thin text-gray-400">
          Bạn đã có tài khoản ?
        </span>
        <span
          className="text-sm text-red-500 cursor-pointer"
          onClick={handleToggleForm}
        >
          Đăng nhập
        </span>
      </div>
    </div>
  );
};

export default Register_form;
