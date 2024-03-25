"use client";
import React from "react";
import Image from "next/image";
import logo_facebook from "../public/assets/facebook.svg";
import logo_google from "../public/assets/google.svg";

interface ToggleProps {
  handleToggleForm?: any;
}

const Register_form: React.FC<ToggleProps> = ({ handleToggleForm }) => {
  return (
    <div className="h-full min-h-[470px] w-[400px] bg-white rounded shadow-md py-[22px] px-[30px]">
      <div className="h-[58px] w-full text-xl text-center">Đăng ký</div>
      <input
        type="text"
        name="account"
        placeholder="Số điện thoại"
        className="h-10 w-full bg-white border px-2 outline-none font-thin mb-7"
      />
      <input
        type="text"
        name="otp"
        placeholder="Mã xác thực OTP"
        className="h-10 w-full bg-white border px-2 outline-none font-thin mb-7"
      />
      <button className="h-10 w-full flex items-center justify-center text-white bg-blue-400 border border-blue-400 cursor-pointer hover:bg-main_color hover:border-main_color">
        ĐĂNG KÝ
      </button>
      <div className="h-auto w-full flex items-center my-2">
        <div className="border border-solid border-gray-300 w-full"></div>
        <span className="text-xs text-gray-500 w-auto px-4">HOẶC</span>
        <div className="border border-solid border-gray-300 w-full"></div>
      </div>
      <div className="h-[50px] w-full flex items-center place-content-between">
        <div className="h-[40px] w-[165px] border flex items-center justify-center gap-2 cursor-pointer hover:bg-gray-100">
          <Image src={logo_facebook} alt="" height="24" width="24" />
          <span className="text-sm">Facebook</span>
        </div>
        <div className="h-[40px] w-[165px] border flex items-center justify-center gap-2 cursor-pointer hover:bg-gray-100">
          <Image src={logo_google} alt="" height="24" width="24" />
          <span className="text-sm">Google</span>
        </div>
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
