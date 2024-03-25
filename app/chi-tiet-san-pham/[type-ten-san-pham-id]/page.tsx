"use client";
import React, { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
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

import Header from "@/components/header";
//import css file Slider
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
// xem img
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import { Minus, Plus, ShoppingBag, Star } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import Cart_item_chitiet from "@/components/cart/cart-item-chitiet";
import Cart_item_loading from "@/components/cart/cart-item-loading";

const settings_slider = {
  dots: true,
  arrows: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  delay: 300,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 700,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 530,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
      },
    },
  ],
};

const Chitiet_sanpham = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams(); // get query parameters
  const [id_product, setid_product] = useState<string | null>();
  const [detail_product, setdetail_product] = useState<any>();
  const [img_arr, setImg_arr] = useState<any>([]);

  const [quantity_order, setquantity_order] = useState<number>(1);

  useEffect(() => {
    let id = searchParams.get("id");
    setid_product(id);
  }, [pathname, searchParams]);

  // getdata san pham
  useEffect(() => {
    const fetching_data_product = async () => {
      try {
        if (id_product) {
          // Kiểm tra xem id_product có tồn tại không
          const docRef = doc(db, "store", id_product);
          const docSnapshot = await getDoc(docRef);

          if (docSnapshot.exists()) {
            const productData: any = {
              id: docSnapshot.id,
              ...docSnapshot.data(),
            };
            setdetail_product(productData);
            setImg_arr(productData.img_arr);
          } else {
            console.log("No such document of product!");
          }
        } else {
          console.log("id_product is null or undefined!");
        }
      } catch (error) {
        console.error(
          "Error fetching product information from Firebase: ",
          error
        );
      }
    };

    fetching_data_product();
  }, [id_product]);

  const [isOpen_img, setIsOpen_img] = useState(false);
  const [index_img_select, setindex_img_select] = useState<number>();
  let img_tindang: any = [];
  const handle_click_img_tindang = (index: number) => {
    setIsOpen_img(true);
    setindex_img_select(index);
  };

  const handle_minus_quantity_order = (index: number) => {
    if (index <= 2) {
      setquantity_order(1);
    } else setquantity_order(index - 1);
  };

  const handle_add_item_to_cart = () => {
    if (detail_product) {
      let order: any = localStorage.getItem("order");
      // order là một mảng rỗng nếu chưa tồn tại
      if (!order) {
        order = [];
      } else {
        // parse danh sách order từ JSON
        order = JSON.parse(order);
      }
      const existingProductIndex = order.findIndex(
        (item: any) => item.id === detail_product.id
      );
      if (existingProductIndex !== -1) {
        // đã tồn tại trong order, cập nhật quantity_order
        order[existingProductIndex].quantity_order += quantity_order;
      } else {
        // chưa tồn tại trong order, thêm sản phẩm mới vào danh sách order
        order.push({
          quantity_order: quantity_order,
          ...detail_product,
        });
      }
      localStorage.setItem("order", JSON.stringify(order));
    } else {
      toast({
        variant: "destructive",
        title: "Lỗi.",
        description: "Không tìm thấy thông tin sản phẩm.",
      });
    }
  };

  const [arrProduct, setArr_Product] = useState<any[]>([]);
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
        console.log("check arr_user: ", querySnapshot);
        console.log("arr_product from firebase: ", arrProduct);
      } catch (error) {
        console.error("error fetching infor users from firebase: ", error);
      }
    };

    fetching_data_product();
  }, [arrProduct.length]);

  return (
    <div className="min-h-screen h-auto w-full">
      <Lightbox
        open={isOpen_img}
        close={() => setIsOpen_img(false)}
        plugins={[Zoom]}
        slides={img_tindang}
        index={index_img_select}
      />
      <Header />
      <div className="h-auto min-h-[calc(100vh-84px)] pb-10 bg-[#f5f5f5] flex flex-col items-center justify-start">
        <div className="h-auto min-h-[400px] w-[1280px] py-2 mt-5 rounded-md bg-white flex">
          {/* bentrai >> img, gia, sl, muahang */}
          <div className="h-full min-h-[200px] w-[45%] min-w-[45%] max-w-[45%] p-2">
            <div className="sticky top-[100px]">
              {img_arr && img_arr.length != 0 ? (
                <div className="sm:h-[440px] md:h-[540px] w-full ">
                  <Slider {...settings_slider}>
                    {img_arr &&
                      img_arr.map((item: any, index: number) => {
                        img_tindang.push({ src: item });
                        return (
                          <div
                            key={index}
                            className="sm:h-[400px] md:h-[500px] w-[500px] flex justify-center outline-none"
                          >
                            <div
                              className="h-full w-full bg-center bg-contain bg-no-repeat outline-none border-y border-gray-400"
                              style={{ backgroundImage: `url(${item})` }}
                              onClick={() => handle_click_img_tindang(index)}
                            ></div>
                          </div>
                        );
                      })}
                  </Slider>
                </div>
              ) : (
                <Skeleton className="h-[500px] w-full mb-3" />
              )}

              {/* title */}
              <div className="h-10 max-h-20 w-full overflow-hidden flex items-center text-lg font-bold">
                {detail_product?.title ? (
                  detail_product.title
                ) : (
                  <Skeleton className="h-full w-full" />
                )}
              </div>
              {/* danhgia-binhluan-daban */}
              <div className="h-10 w-full overflow-hidden grid grid-cols-3 items-center justify-center gap-2">
                {detail_product?.sold ? (
                  <>
                    <div className="flex items-center gap-2 justify-start">
                      <span>Đánh giá:</span>
                      <div className="flex gap-[2px]">
                        <Star size={15} color="#ffa727" fill="#ffa727" />
                        <Star size={15} color="#ffa727" fill="#ffa727" />
                        <Star size={15} color="#ffa727" fill="#ffa727" />
                        <Star size={15} color="#ffa727" fill="#ffa727" />
                        <Star size={15} color="#ffa727" fill="#ffa727" />
                      </div>
                    </div>
                    <div className="flex items-center gap-2 justify-center">
                      <span className="cursor-pointer">3 bình luận</span>
                    </div>
                    <div className="flex items-center gap-2 justify-center">
                      <span>Đã bán: {detail_product?.sold}</span>
                    </div>
                  </>
                ) : (
                  <>
                    <Skeleton className="h-[70%] w-full my-1" />
                    <Skeleton className="h-[70%] w-full my-1" />
                    <Skeleton className="h-[70%] w-full my-1" />
                  </>
                )}
              </div>
              {/* giaban */}
              <div className="h-20 max-h-20 w-full px-5 overflow-hidden bg-[#f5f5f5] flex items-center gap-5 text-2xl font-bold">
                <span className="line-through text-lg font-normal">
                  {detail_product
                    ? `${detail_product?.price_after_discount.toLocaleString(
                        "vi-VI"
                      )}đ`
                    : ""}
                </span>
                <span className="text-main_color  tracking-wider">
                  {detail_product
                    ? `${detail_product?.price.toLocaleString("vi-VI")}đ`
                    : ""}
                </span>
                {detail_product && (
                  <div className="h-[20px] w-auto px-2 py-3 bg-orange-600 rounded-sm text-white flex items-center justify-center text-base font-normal">
                    Giảm: {detail_product?.persent_discount}%
                  </div>
                )}
              </div>
              {/* soluong */}
              {detail_product ? (
                <div className="h-20 max-h-20 w-full overflow-hidden flex items-center">
                  <span className="pr-4">Số lượng:</span>
                  <button
                    className="h-9 w-9 border border-gray-300 bg-white flex items-center justify-center hover:bg-gray-100"
                    onClick={() => handle_minus_quantity_order(quantity_order)}
                  >
                    <Minus />
                  </button>
                  <div className="h-9 w-20 flex items-center relative">
                    <input
                      type="number"
                      min={1}
                      value={quantity_order}
                      onChange={(e) =>
                        setquantity_order(Number(e.target.value))
                      }
                      className="h-full w-full px-1 pl-1 border-y border-gray-300 outline-none text-center"
                    />
                    <button
                      className="absolute right-[-18px] h-9 w-9 border border-gray-300 bg-white flex items-center justify-center hover:bg-gray-100"
                      onClick={() => setquantity_order(quantity_order + 1)}
                    >
                      <Plus />
                    </button>
                  </div>
                  <div className="h-9 w-auto ml-10 flex items-center">
                    {detail_product?.quantity} sản phẩm có sẵn
                  </div>
                </div>
              ) : (
                <Skeleton className="h-18 w-full" />
              )}
              {/* btn them, mua ngay */}
              <div className="h-20 max-h-20 w-full grid grid-cols-2 gap-2 items-center">
                {detail_product ? (
                  <>
                    <div
                      className="h-14 w-auto border border-main_color text-lg flex items-center justify-center gap-1 text-main_color rounded hover:bg-gray-50 cursor-pointer"
                      onClick={() => handle_add_item_to_cart()}
                    >
                      <ShoppingBag />
                      Thêm vào giỏ hàng
                    </div>
                    <div className="h-14 w-auto bg-main_color text-xl flex items-center justify-center text-white rounded hover:bg-blue-500 cursor-pointer">
                      Mua ngay
                    </div>
                  </>
                ) : (
                  <>
                    <Skeleton className="h-14 w-full" />
                    <Skeleton className="h-14 w-full" />
                  </>
                )}
              </div>
            </div>
          </div>
          {/* benphai >> thongtinsanpham (filed mota) */}
          {detail_product ? (
            <div className="h-auto min-h-[400px] w-[55%] min-w-[55%] max-w-[55%] p-4">
              <div className="uppercase h-auto w-full text-xl font-bold mb-5">
                Thông tin sản phẩm
              </div>
              <pre className="h-auto w-full md:text-lg break-words whitespace-pre-wrap font-sans">
                {detail_product?.mota}
              </pre>
            </div>
          ) : (
            <Skeleton className="h-[750px] w-full mr-2" />
          )}
        </div>
        <div className="h-auto min-h-[300px] w-[1280px] py-2 mt-5 rounded-md bg-white">
          <div className="h-[60px] w-full px-4 flex items-center">
            <span className="text-lg text-gray-400">SẢN PHẨM TƯƠNG TỰ</span>
          </div>
          <div className="min-h-[150px] h-auto w-auto min-w-[1280px] max-w-[1280px] py-1 px-8 pb-5 gap-[35px] flex flex-wrap">
            {arrProduct &&
              arrProduct.map((item, index) => {
                return (
                  <div key={index} className="">
                    <Cart_item_chitiet item={item} />
                  </div>
                );
              })}
            {(arrProduct == undefined || arrProduct.length == 0) && (
              <>
                <Cart_item_loading />
                <Cart_item_loading />
                <Cart_item_loading />
                <Cart_item_loading />
                <Cart_item_loading />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chitiet_sanpham;
