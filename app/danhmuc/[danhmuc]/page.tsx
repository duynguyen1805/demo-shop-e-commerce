"use client";
import React, { useEffect, useState } from "react";
import Header from "@/components/header";
import { Filter, List, Star } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { DANHMUC } from "@/constant";
import Cart_item_chitiet from "@/components/cart/cart-item-chitiet";
import Filter_maytinh from "@/components/filter_component/filter-maytinh";

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
import { db } from "../../../firebase.config";
import { Input } from "@/components/ui/input";
import Cart_item_loading from "@/components/cart/cart-item-loading";

const Danhmuc_chitiet = () => {
  const [arrProduct, setArr_Product] = useState<any[]>();
  // refesh data san pham
  useEffect(() => {
    const fetching_data_product = async () => {
      try {
        const CollectionRef = collection(db, "store");
        const querySnapshot = await getDocs(CollectionRef);

        const products: DocumentData[] = [];
        querySnapshot.forEach((doc) => {
          products.push({ id: doc.id, ...doc.data() });
        });
        setArr_Product(products);
        // console.log("check arr_user: ", querySnapshot);
        // console.log("arr_product from firebase: ", arrProduct);
      } catch (error) {
        console.error("error fetching infor users from firebase: ", error);
      }
    };

    fetching_data_product();
  }, [arrProduct == undefined]);

  return (
    <div className="min-h-screen h-auto w-full">
      <Header />
      <div className="h-auto min-h-[calc(100vh-84px)] bg-[#f5f5f5] flex justify-center">
        <div className="h-auto min-h-[400px] w-[1480px] px-4 pt-4">
          <div className="h-auto min-h-[400px] w-full flex gap-5">
            {/** ex filter */}
            <div className="h-auto min-h-[400px] w-[295px] py-3">
              <div className="h-auto w-full space-y-3">
                {/* <span className="text-lg text-main_color font-bold flex gap-2">
                  <List />
                  Tất cả danh mục
                </span> */}
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger>
                      <span className="text-lg text-main_color font-bold flex gap-2">
                        <List />
                        TẤT CẢ DANH MỤC
                      </span>
                    </AccordionTrigger>
                    <AccordionContent>
                      {DANHMUC &&
                        DANHMUC.map((item, index) => {
                          return (
                            <div
                              key={index}
                              className="h-[35px] w-full flex items-center px-3"
                            >
                              <span className="uppercase pl-5 font-semibold h-auto w-auto text-base space-x-1 cursor-pointer hover:text-main_color">
                                {item.title}
                              </span>
                            </div>
                          );
                        })}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                {/* <div className="h-[1px] w-full border border-gray-300"></div> */}
                <div className="h-auto min-h-[35px] w-full">
                  {/* <Accordion type="single">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>Máy tính & Laptop</AccordionTrigger>
                      <AccordionContent>
                        {DANHMUC &&
                          DANHMUC[3].danhmuc_chitiet &&
                          DANHMUC[3]?.danhmuc_chitiet.map((item, index) => {
                            return (
                              <div
                                key={index}
                                className="h-[35px] w-full flex items-center px-3"
                              >
                                <span className="h-auto w-auto text-base cursor-pointer">
                                  {item.title}
                                </span>
                              </div>
                            );
                          })}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion> */}

                  {DANHMUC &&
                    DANHMUC[3].danhmuc_chitiet &&
                    DANHMUC[3]?.danhmuc_chitiet.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className="h-[35px] w-full flex items-center px-3"
                        >
                          <span className="h-auto w-auto cursor-pointer hover:text-main_color">
                            {item.title}
                          </span>
                        </div>
                      );
                    })}
                </div>
                <span className="text-lg font-bold flex gap-2 pt-1">
                  <Filter />
                  BỘ LỌC TÌM KIẾM
                </span>
                <div className="h-auto w-full">
                  <Filter_maytinh />
                </div>
                <div className="h-[1px] w-full border border-gray-300"></div>
                <div className="h-auto w-full font-semibold">Khoảng giá</div>
                <div className="h-40px w-full flex items-center place-content-between">
                  <input
                    type="number"
                    name="giabatdau"
                    min={0}
                    pattern="[0-9]*"
                    placeholder="TỪ"
                    className="h-[30px] w-[140px] outline-none pl-2 hiddent_bnt_input_type_text rounded"
                  />
                  <div className="h-full w-auto flex items-center">-</div>
                  <input
                    type="number"
                    name="giaketthuc"
                    min={0}
                    placeholder="ĐẾN"
                    className="h-[30px] w-[140px] outline-none pl-2 rounded"
                  />
                </div>
                <button className="h-[40px] w-full flex items-center justify-center bg-main_color text-white rounded hover:bg-blue-500">
                  ÁP DỤNG
                </button>
                <div className="h-[1px] w-full border border-gray-300"></div>
                <button className="h-[40px] w-full flex items-center justify-center bg-main_color text-white rounded hover:bg-blue-500">
                  XÓA TẤT CẢ
                </button>
              </div>
            </div>
            {/** ex list item */}
            <div className="h-auto min-h-[calc[100vh-84px-20px]] w-[1200px] mt-5 flex flex-col">
              <div className="h-[70px] w-full px-2 gap-2 flex items-center">
                <span className="font-bold">Sắp xếp theo: </span>
                <Button variant={"outline"}>Phổ biến</Button>
                <Button variant={"outline"}>Mới nhất</Button>
                <Button variant={"outline"}>Bán chạy</Button>
                <Select>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Giá" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="thapdencao">
                      Giá: Thấp đến cao
                    </SelectItem>
                    <SelectItem value="caodenthao">
                      Giá: Cao đến thấp
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="min-h-[150px] h-auto w-auto min-w-[1200px] max-w-[1200px] p-1 pb-5 gap-[15px] flex flex-wrap">
                {arrProduct &&
                  arrProduct.map((item, index) => {
                    return (
                      <div key={index} className="">
                        <Cart_item_chitiet item={item} />
                      </div>
                    );
                  })}
                {(!arrProduct || arrProduct.length == 0) && (
                  <>
                    <Cart_item_loading />
                    <Cart_item_loading />
                    <Cart_item_loading />
                    <Cart_item_loading />
                    <Cart_item_loading />
                  </>
                )}
              </div>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Danhmuc_chitiet;
