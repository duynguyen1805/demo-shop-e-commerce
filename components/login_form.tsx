"use client";
import React, { useState } from "react";
import Image from "next/image";
import logo_facebook from "../public/assets/facebook.svg";
import logo_google from "../public/assets/google.svg";
import eye from "../public/assets/eye.png";
import eye_lash from "../public/assets/eyelash.png";
import {
  collection,
  query,
  where,
  getDocs,
  DocumentData,
} from "firebase/firestore";
import { db } from "../firebase.config";
import { useRouter } from "next/navigation";

interface Props {
  handleToggleForm?: any;
}

interface UserInfo {
  id_user: string;
  phonenumber: string;
  username: string;
  address: string;
  date_birthday: string;
  gender: string;
}

const Login_form: React.FC<Props> = ({ handleToggleForm }) => {
  const router = useRouter();

  const [view_password, setview_password] = useState<boolean>(false);
  const [account, setaccount] = useState<string>();
  const [password, setpassword] = useState<string>();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handle_router_push = async () => {
    router.push("/");
  };

  const handleLoginWithAccount = async () => {
    try {
      // Kiểm tra xem có tài khoản và mật khẩu khớp trong Firestore không
      const usersCollectionRef = collection(db, "user");
      const q = query(
        usersCollectionRef,
        where("phonenumber", "==", account),
        where("password", "==", password)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // Nếu có người dùng có tài khoản và mật khẩu khớp
        const user = querySnapshot.docs[0].data();

        // bỏ password
        const { password: userPassword, ...userdata } = user;

        // Lưu thông tin người dùng vào state userInfo (bao gồm cả ID)
        setUserInfo({
          id_user: querySnapshot.docs[0].id,
          ...userdata,
        } as UserInfo);
        setIsLogin(true);
        // save user to local storage
        localStorage.setItem(
          "user_shopee",
          JSON.stringify({
            id_user: querySnapshot.docs[0].id,
            ...userdata,
          })
        );
        localStorage.setItem("isLogin", JSON.stringify(true));
        handle_router_push();
      } else {
        // Nếu không có tài khoản và mật khẩu khớp
        setIsLogin(false);
        setErrorMessage("Tài khoản hoặc mật khẩu không đúng.");
      }
    } catch (error) {
      console.error("Error logging in: ", error);
      setErrorMessage("Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại sau.");
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleLoginWithAccount();
    }
  };
  return (
    <>
      <div className="h-full min-h-[470px] w-[400px] bg-white rounded shadow-md py-[22px] px-[30px]">
        <div className="h-[58px] w-full text-xl text-center">Đăng nhập</div>
        <input
          type="text"
          name="account"
          value={account}
          onChange={(e) => setaccount(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Email/Số điện thoại/Tên đăng nhập"
          className="h-10 w-full bg-white border px-2 outline-none font-thin mb-7"
        />

        <div className="relative h-10 w-full flex flex-row mb-7">
          <input
            type={view_password ? "password" : "text"}
            name="password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Mật khẩu"
            className="h-10 w-full bg-white border px-2 pr-[34px] outline-none font-thin"
          />
          <div className="absolute right-0 top-0 h-full w-[30px] mr-1 flex items-center justify-center">
            <Image
              src={view_password ? eye_lash : eye}
              alt=""
              className="h-[20px] w-[20px] cursor-pointer"
              onClick={() => setview_password(!view_password)}
            />
          </div>
        </div>
        <button
          className="h-10 w-full flex items-center justify-center text-white bg-blue-400 border border-blue-400 cursor-pointer hover:bg-main_color hover:border-main_color"
          onClick={() => handleLoginWithAccount()}
        >
          ĐĂNG NHẬP
        </button>
        <div className="h-auto w-full flex items-center justify-center mt-2">
          <a href="/" className="text-main_color text-sm">
            Quên mật khẩu
          </a>
        </div>
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
        <div className="h-auto w-full flex items-center justify-center gap-1 mt-10">
          <span className="text-sm font-thin text-gray-400">
            Bạn mới biết đến Shopee?
          </span>
          <span
            className="text-sm text-red-500 cursor-pointer"
            onClick={handleToggleForm}
          >
            Đăng ký
          </span>
        </div>
      </div>
    </>
  );
};

export default Login_form;
