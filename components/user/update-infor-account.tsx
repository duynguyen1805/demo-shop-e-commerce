import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import eye from "../../public/assets/eye.png";
import eye_lash from "../../public/assets/eyelash.png";

const Update_infor_account = () => {
  const [phoneNumber, setphoneNumber] = useState<string | null>();
  const [password, setpassword] = useState<string | null>();
  const [new_password, setnewpassword] = useState<string | null>();
  const [confirm_newPassword, setconfirm_newPassword] = useState<
    string | null
  >();

  const [state_btn, setstate_btn] = useState<string | null>();

  const [view_password, setview_password] = useState<boolean>(false);
  const [view_newpassword, setview_newpassword] = useState<boolean>(false);
  const [view_confirm_newpassword, setview_confirm_newpassword] =
    useState<boolean>(false);

  // getdata user from local storage
  useEffect(() => {
    //lấy thông tin người dùng
    let user: any = localStorage.getItem("user_shopee");
    const parse_user = JSON.parse(user);
    setphoneNumber(parse_user?.phonenumber);
  }, []);

  return (
    <div className="min-h-[500px] w-full flex flex-col items-center space-y-5">
      <div className="space-y-1 w-1/3 flex flex-col">
        <label htmlFor="phonenumber" className="">
          Số điện thoại
        </label>
        <input
          disabled={true}
          type="text"
          name="phonenumber"
          id="phonenumber"
          value={phoneNumber ? phoneNumber : ""}
          onChange={(e) => setphoneNumber(e.target.value)}
          className="border rounded-md w-full outline-none px-2 py-2"
        />
      </div>

      {state_btn == "thaydoimatkhau" && (
        <>
          <div className="space-y-1 w-1/3 flex flex-col">
            <label htmlFor="password" className="">
              Mật khẩu
            </label>
            <div className="relative w-full flex flex-row">
              <input
                type={view_password ? "text" : "password"}
                name="password"
                value={password ? password : ""}
                onChange={(e) => setpassword(e.target.value)}
                // onKeyDown={handleKeyDown}
                placeholder="Mật khẩu"
                className="border rounded-md w-full outline-none px-2 py-2 pr-10"
              />
              <div className="absolute right-0 top-0 h-full w-[30px] mr-1 flex items-center justify-center">
                <Image
                  src={view_password ? eye : eye_lash}
                  alt=""
                  className="h-[20px] w-[20px] cursor-pointer"
                  onClick={() => setview_password(!view_password)}
                />
              </div>
            </div>
          </div>
          <div className="space-y-1 w-1/3 flex flex-col">
            <label htmlFor="password" className="">
              Mật khẩu mới
            </label>
            <div className="relative w-full flex flex-row">
              <input
                type={view_newpassword ? "text" : "password"}
                name="password"
                value={new_password ? new_password : ""}
                onChange={(e) => setnewpassword(e.target.value)}
                // onKeyDown={handleKeyDown}
                placeholder="Mật khẩu mới"
                className="border rounded-md w-full outline-none px-2 py-2 pr-10"
              />
              <div className="absolute right-0 top-0 h-full w-[30px] mr-1 flex items-center justify-center">
                <Image
                  src={view_newpassword ? eye : eye_lash}
                  alt=""
                  className="h-[20px] w-[20px] cursor-pointer"
                  onClick={() => setview_newpassword(!view_newpassword)}
                />
              </div>
            </div>
          </div>
          <div className="space-y-1 w-1/3 flex flex-col">
            <label htmlFor="password" className="">
              Nhập lại mật khẩu mới
            </label>
            <div className="relative w-full flex flex-row">
              <input
                type={view_confirm_newpassword ? "text" : "password"}
                name="password"
                value={confirm_newPassword ? confirm_newPassword : ""}
                onChange={(e) => setconfirm_newPassword(e.target.value)}
                // onKeyDown={handleKeyDown}
                placeholder="Nhập lại mật khẩu mới"
                className="border rounded-md w-full outline-none px-2 py-2 pr-10"
              />
              <div className="absolute right-0 top-0 h-full w-[30px] mr-1 flex items-center justify-center">
                <Image
                  src={view_confirm_newpassword ? eye : eye_lash}
                  alt=""
                  className="h-[20px] w-[20px] cursor-pointer"
                  onClick={() =>
                    setview_confirm_newpassword(!view_confirm_newpassword)
                  }
                />
              </div>
            </div>
          </div>
        </>
      )}

      {state_btn == "thaydoimatkhau" ? (
        <Button
          disabled={!password || !new_password || !confirm_newPassword}
          className="bg-main_color border border-main_color text-white hover:bg-blue-500"
        >
          Cập nhật mật khẩu
        </Button>
      ) : (
        <Button
          onClick={() => setstate_btn("thaydoimatkhau")}
          variant={"outline"}
        >
          Thay đổi mật khẩu
        </Button>
      )}
    </div>
  );
};

export default Update_infor_account;
