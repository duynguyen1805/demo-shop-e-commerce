"use client";
import React, { use, useEffect, useState } from "react";
import Image from "next/image";
import icon_addimg from "../../public/assets/addimg.png";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

// firestore firebase
import {
  collection,
  addDoc,
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  Timestamp,
  serverTimestamp,
  query,
  where,
  orderBy,
  onSnapshot,
  DocumentData,
} from "firebase/firestore";
import { db } from "../../firebase.config";
import { storage } from "../../firebase.config";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import Option_laptop from "../filter_component/option-laptop";

import { DANHMUC } from "@/constant";

const Them_san_pham = () => {
  const { toast } = useToast();

  const [chitietDanhmuc, setChitietDanhmuc] = useState<any[] | undefined>(
    DANHMUC[0]?.danhmuc_chitiet
  );

  const [title, setTitle] = useState<string>("");
  const [type_danhmuc, setTypeDanhmuc] = useState<string>("");
  const [type_product, setTypeProduct] = useState<string>("");
  const [quantity, setquantity] = useState<number>(1);
  const [price, setPrice] = useState<number | undefined>();
  const [persent_discount, setpersent_discount] = useState<
    number | undefined
  >();
  const price_after_discount =
    (price ? price : 0) * (1 - (persent_discount ? persent_discount : 0) / 100);

  const [mota, setmota] = useState<string>("");

  const [hang_laptop, sethang_laptop] = useState<string | null>();
  const [ram_laptop, setram_laptop] = useState<string | null>();
  const [ocung_laptop, setocung_laptop] = useState<string | null>();
  const [manhinh_laptop, setmanhinh_laptop] = useState<string | null>();

  const [img_arr, setImg_arr] = useState<any>([]);
  const [img_review, setReviewImg_arr] = useState<any>([]);

  // xử lý ảnh lưu lên firebase, trả về link url
  const handleFile = async (e: any) => {
    let files = e.target.files;
    let fileArray = Array.from(files);

    let objectURLArray: any = [];
    let downloadURLArray: any = [];

    for (let i = 0; i < fileArray.length; i++) {
      let file: any = fileArray[i];
      if (!file.type.startsWith("image/")) {
        // toast.error(`File ${file.name} không phải là ảnh.`);
        toast({
          variant: "destructive",
          title: `Lỗi. File ${file.name} không phải là ảnh.`,
          description: "Hãy chọn đúng file ảnh.",
          // action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
        continue;
      }
      let objectURL = URL.createObjectURL(file);

      objectURLArray.push(objectURL);

      // upload img lên Firebase Storage
      const filename = Date.now().toString();
      const storageRef = ref(storage, `images_sanpham/${filename}.png`);
      const snapshot = await uploadBytes(storageRef, file);

      // URL từ Firebase Storage
      const imageUrl = await getDownloadURL(snapshot.ref);

      downloadURLArray.push(imageUrl);
    }
    setImg_arr((prevImg_arr: any) => [...prevImg_arr, ...downloadURLArray]);
    setReviewImg_arr((prevReviewImg_arr: any) => [
      ...prevReviewImg_arr,
      ...objectURLArray,
    ]);
  };
  // Xóa ảnh
  const handleCloseButtonClick = async (indexToRemove: number) => {
    const imageUrlToRemove = img_arr[indexToRemove];
    // delete img trên Firebase Storage
    const imageRef = ref(storage, imageUrlToRemove);
    await deleteObject(imageRef);

    setReviewImg_arr((prevReviewImg_arr: any) => {
      const updatedReviewImg_arr = [...prevReviewImg_arr];
      updatedReviewImg_arr.splice(indexToRemove, 1); // Xóa phần tử tại indexToRemove
      return updatedReviewImg_arr;
    });
    setImg_arr((prevImg_arr: any) => {
      const updatedImg_arr = [...prevImg_arr];
      updatedImg_arr.splice(indexToRemove, 1); // Xóa phần tử tại indexToRemove
      return updatedImg_arr;
    });
  };

  const handle_select_danhmuc = (danhmuc: any) => {
    setTypeDanhmuc(danhmuc?.title);
    setChitietDanhmuc(DANHMUC[danhmuc?.id]?.danhmuc_chitiet);
  };

  const handle_add_product = async () => {
    let build_data_product = {
      title: title,
      type_danhmuc: type_danhmuc,
      type_product: type_product,
      quantity: quantity,
      price: price,
      persent_discount: persent_discount,
      price_after_discount: price_after_discount,
      mota: mota,
      img_arr: img_arr,
      hang_laptop: hang_laptop,
      ram_laptop: ram_laptop,
      ocung_laptop: ocung_laptop,
      manhinh_laptop: manhinh_laptop,
    };
    try {
      // tạo tham chiếu tới collection "store"
      const CollectionRef = collection(db, "store");
      // thêm data user vào collection con "information"
      await addDoc(CollectionRef, build_data_product);
      toast({
        title: "Thành công.",
        description: "Sản phẩm đã được thêm vào store.",
        className: "bg-green-500 text-white",
      });
      //   reset_data();
    } catch (error) {
      console.log("error add product to store in firestore", error);
    }

    console.log("check data: ", build_data_product);
  };

  const reset_data = () => {
    setTitle("");
    setTypeDanhmuc("");
    setTypeProduct("");
    setquantity(1);
    setPrice(undefined);
    setpersent_discount(undefined);
    setmota("");
    sethang_laptop(undefined);
    setram_laptop(undefined);
    setocung_laptop(undefined);
    setmanhinh_laptop(undefined);
    setImg_arr([]);
    setReviewImg_arr([]);
  };

  return (
    <div className="h-full w-full flex items-center">
      <div className="h-full w-1/2 pl-1 pr-8 overflow-y-auto overflow-x-hidden">
        <div className="grid grid-cols-1 gap-4">
          <div className="flex flex-col items-start justify-center gap-1">
            <label
              htmlFor="title"
              className="text-right w-auto flex items-start"
            >
              Tiêu đề - tên sản phẩm
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="h-[40px] w-full bg-white border border-gray-200 rounded-md px-2 outline-none"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col items-start justify-center gap-1">
              <label
                htmlFor="type_danhmuc"
                className="text-right w-auto flex items-start"
              >
                Loại Danh mục
              </label>
              <Select
                onValueChange={(value: any) => handle_select_danhmuc(value)}
              >
                <SelectTrigger className="w-full outline-none">
                  <SelectValue placeholder="Loại Danh mục" />
                </SelectTrigger>
                <SelectContent>
                  {DANHMUC &&
                    DANHMUC.map((item: any, index: number) => {
                      return (
                        <SelectItem
                          key={index}
                          value={item}
                          onClick={() => console.log("check")}
                        >
                          {item.title}
                        </SelectItem>
                      );
                    })}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col items-start justify-center gap-1">
              <label
                htmlFor="type_product"
                className="text-right w-auto flex items-start"
              >
                Loại sản phẩm
              </label>
              <Select onValueChange={(value) => setTypeProduct(value)}>
                <SelectTrigger className="w-full outline-none">
                  <SelectValue placeholder="Loại sản phẩm" />
                </SelectTrigger>
                <SelectContent>
                  {chitietDanhmuc &&
                    chitietDanhmuc.map((item: any, index: number) => {
                      return (
                        <SelectItem key={index} value={item.title}>
                          {item.title}
                        </SelectItem>
                      );
                    })}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col items-start justify-center gap-1">
              <label
                htmlFor="quantity"
                className="text-right w-auto flex items-start"
              >
                Số lượng
              </label>
              <input
                type="number"
                id="quantity"
                value={quantity}
                onChange={(e) => setquantity(Number(e.target.value))}
                className="h-[40px] w-full bg-white border border-gray-200 rounded-md px-2 outline-none"
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col items-start justify-center gap-1">
              <label
                htmlFor="giaban"
                className="text-right w-auto flex items-start"
              >
                Giá bán
              </label>
              <input
                type="number"
                id="giaban"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="h-[40px] w-full bg-white border border-gray-200 rounded-md px-2 outline-none"
              />
            </div>
            <div className="flex flex-col items-start justify-center gap-1">
              <label
                htmlFor="discount"
                className="text-right w-auto flex items-start"
              >
                % khuyến mãi
              </label>
              <input
                type="number"
                id="discount"
                value={persent_discount}
                onChange={(e) => setpersent_discount(Number(e.target.value))}
                className="h-[40px] w-full bg-white border border-gray-200 rounded-md px-2 outline-none"
              />
            </div>
            <div className="flex flex-col items-start justify-center gap-1">
              <label className="text-right w-auto flex items-start">
                Giá còn lại
              </label>
              <label className="h-[40px] w-full flex items-center border border-gray-200 rounded-md px-2 outline-none">
                {price_after_discount.toLocaleString("vi-VI")}
              </label>
            </div>
          </div>
          <div className="grid grid-cols-1">
            <Option_laptop
              hang_laptop={hang_laptop}
              ram_laptop={ram_laptop}
              ocung_laptop={ocung_laptop}
              manhinh_laptop={manhinh_laptop}
              sethang_laptop={sethang_laptop}
              setram_laptop={setram_laptop}
              setocung_laptop={setocung_laptop}
              setmanhinh_laptop={setmanhinh_laptop}
            />
          </div>
          {/* // add image sanpham */}
          <div className="grid grid-cols-1">
            <div className="h-full w-full relative overflow-hidden">
              <input
                className="absolute inset-0 w-full h-full bg-white opacity-0 cursor-pointer"
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => {
                  handleFile(e);
                }}
              />
              <button className="h-full w-full bg-gray-100 text-white text-lg cursor-pointer">
                <div className="h-full w-full flex items-center justify-center gap-4 py-3">
                  <Image
                    src={icon_addimg}
                    alt="icon"
                    className="w-[32px] h-[32px] scale-150"
                  />
                  <p className="text-black">
                    Tải ảnh lên từ 1 đến 5 ảnh sản phẩm
                  </p>
                </div>
              </button>
            </div>
            <div className="h-auto w-full flex flex-wrap gap-[5px]">
              {img_review !== null && img_review !== "" ? (
                img_review?.map((item_img: any, index: number) => {
                  return (
                    <div
                      key={index}
                      className="h-[200px] w-[180px] flex items-center justify-center relative"
                    >
                      <div
                        className="h-full w-full bg-center bg-contain bg-no-repeat border border-blue-400"
                        style={{ backgroundImage: `url(${item_img})` }}
                      ></div>
                      <button
                        className="absolute z-10 h-[24px] w-[24px] top-[-7px] right-[-10px] p-1 bg-black text-white rounded-full text-xs"
                        onClick={() => handleCloseButtonClick(index)}
                      >
                        X
                      </button>

                      <div
                        className={
                          index === 0
                            ? `h-[25px] w-full bg-black opacity-80 text-white flex items-center justify-center absolute z-10 bottom-[1px]`
                            : ""
                        }
                      >
                        {index === 0 ? `Ảnh bìa` : ``}
                      </div>
                    </div>
                  );
                })
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="h-full w-1/2 flex flex-col items-end space-y-5 overflow-auto">
        <textarea
          className="h-auto w-full min-h-[500px] px-2 py-2 bg-white border border-gray-300 rounded-md outline-none"
          placeholder="Nhập mô tả, thông tin sản phẩm"
          value={mota}
          onChange={(e) => setmota(e.target.value)}
        ></textarea>
        <button
          className="h-auto w-[180px] px-5 py-2 bg-main_color text-white rounded-md hover:bg-blue-500"
          onClick={() => handle_add_product()}
        >
          Thêm sản phẩm
        </button>
      </div>
    </div>
  );
};

export default Them_san_pham;
