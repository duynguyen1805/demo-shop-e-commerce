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
import { Minus, Plus, ShoppingBag, Star, StarIcon } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import Cart_item_chitiet from "@/components/cart/cart-item-chitiet";
import Cart_item_loading from "@/components/cart/cart-item-loading";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import Image from "next/image";

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
        <div className="w-[1280px] flex items-center mt-3">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/" className="text-lg font-normal">
                    Trang chủ
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="./" className="text-lg font-normal">
                    Máy tính - Laptop
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="./" className="text-lg font-normal">
                    Chi tiết sản phẩm
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="h-auto min-h-[400px] w-[1280px] py-2 mt-3 rounded-md bg-white shadow-lg flex">
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
                  detail_product?.title
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
                      className="h-full w-full px-1 pl-1 bg-white border-y border-gray-300 outline-none text-center"
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
        <div className="h-auto w-[1280px] p-2 px-4 mt-5 rounded-md bg-white shadow-lg space-y-2">
          {/* baiviet ve sanpham */}
          {/* dacdiem noibat */}
          <div className="bg-[#f5f5f5] w-full rounded-md p-2">
            <span className="uppercase text-xl text-red-500 font-semibold w-full flex justify-center mb-2">
              Đặc điểm nổi bật
            </span>
            <p>
              - Chip M1 Pro 10 nhân - Thoả sức sáng tạo với khả năng render
              video, xử lý đồ hoạ 3D cực đỉnh
            </p>
            <p>
              - SSD 512GB - Tăng tốc toàn diện máy tính, khởi động máy và các
              phần mềm nặng chỉ trong vài giây
            </p>
            <p>- Đa dạng kết nối: 3 x Thunderbolt 4 USB-C, HDMI, Jack 3.5 mm</p>
            <p>
              - Màn hình Retina - Thưởng thức từng bộ phim với chất lượng hình
              ảnh chân thật nhất
            </p>
            <p>
              - Webcam độ phân giải 1080 - Thoả sức trò chuyện qua Google meet,
              line
            </p>
          </div>
          {/* gioithieu sanpham */}
          <p>
            Macbook Pro 14 inch 2021 được trang bị cấu hình khủng với chip Apple
            M1 Pro (10CPU/16GPU) kết hợp với bộ nhớ RAM 16GB và SSD 1TB mang lại
            trải nghiệm tuyệt vời với hiệu suất cực đỉnh.
          </p>
          <p>
            Sản phẩm Macbook Pro 14 chính hãng Apple Việt Nam, bảo hành 12
            tháng, đổi mới 30 ngày nếu lỗi, hỗ trợ trả góp 0% và thu cũ đổi mới.
          </p>
          <p>
            MacBook Pro 14 inch 2021 1TB được trang bị chip M1 Pro 10 nhân đi
            kèm RAM 16GB, đảm bảo khả năng render video và xử lý đồ hoạ 3D vô
            cùng xuất sắc. Ổ cứng 1TB cung cấp không gian lưu trữ đủ lớn để chứa
            những video 4K chất lượng cao. Màn hình Liquid Retina XDR 14.2 inch
            (3456 x 2234) của MacBook Pro mang đến chất lượng hình ảnh sắc nét.
            Bên cạnh đó, máy có đa dạng kết nối với webcam Full HD và 6 loa
            Dolby Atmos đỉnh cao.
          </p>
          <p className="text-xl font-semibold">
            Macbook Pro 14 inch 2021 1TB - Nhanh chóng, xử lý tác vụ chuyên
            nghiệp{" "}
          </p>
          <p>
            MacBook Pro 14 inch 2021 với con chip Apple M1 Pro tiên tiến hứa hẹn
            mang đến hiệu năng vô song. Chip này được cải tiến với 10 lõi, trong
            đó có 2 lõi hiệu năng và 8 lõi hiệu suất, đồng thời tích hợp chip đồ
            họa riêng biệt để cung cấp hiệu năng mạnh mẽ cho mọi tác vụ. Sự kết
            hợp này giúp máy vận hành mượt mà và ổn định, đáp ứng mọi yêu cầu
            công việc chuyên nghiệp.
          </p>
          <p className="text-lg font-semibold">
            Chip M1 Pro cải tiến, ổ SSD tốc độ siêu nhanh
          </p>
          <p>
            MacBook Pro 14 inch 2021 với con chip Apple M1 Pro tiên tiến hứa hẹn
            mang đến hiệu năng vô song. Chip này được cải tiến với 10 lõi, trong
            đó có 2 lõi hiệu năng và 8 lõi hiệu suất, đồng thời tích hợp chip đồ
            họa riêng biệt để cung cấp hiệu năng mạnh mẽ cho mọi tác vụ. Sự kết
            hợp này giúp máy vận hành mượt mà và ổn định, đáp ứng mọi yêu cầu
            công việc chuyên nghiệp.
          </p>
          <div className="w-full flex justify-center">
            <Image
              src={
                "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:0/q:90/plain/https://cellphones.com.vn/media/wysiwyg/laptop/macbook/macbook-pro/M1_Pro/macbook-pro-14-inch-2021-1tb-1.jpg"
              }
              alt=""
              width={1220}
              height={560}
              className="py-2"
            />
          </div>
          <p>
            Ổ SSD trên MacBook Pro 2021 còn có tốc độ đọc lên tới 7,4GB/s, gấp
            đôi so với thế hệ trước. Dung lượng này mang lại trải nghiệm nhanh
            chóng khi mở các tệp tin nặng, xem video 8K, hay xử lý hàng nghìn
            ảnh mà không cần chờ đợi.
          </p>
          <p className="text-lg font-semibold">
            Ngôn ngữ thiết kế siêu mỏng, nhiều cổng kết nối
          </p>
          <p>
            MacBook Pro 14 inch 2021 được trang bị màn hình 14.2 inch hoàn toàn
            mới. Màn hình này vừa mang đến trải nghiệm xem nội dung chuyên
            nghiệp, vừa giữ được sự nhỏ gọn với viền siêu mỏng, tạo nên một
            thiết kế thanh lịch và hiện đại.
          </p>
          <div className="w-full flex justify-center">
            <Image
              src={
                "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:0/q:90/plain/https://cellphones.com.vn/media/wysiwyg/laptop/macbook/macbook-pro/M1_Pro/macbook-pro-14-inch-2021-1tb-2.jpg"
              }
              alt=""
              width={1220}
              height={560}
              className="py-2"
            />
          </div>
          <p>
            MacBook Pro 14 inch cũng tích hợp nhiều kết nối hữu ích như cổng
            SDXC, HDMI, tai nghe 3.5mm, cổng sạc nhanh MagSafe và đặc biệt là
            cổng Thunderbolt 4 tiên tiến. Từ đó đáp ứng mọi nhu cầu kết nối
            trong công việc hàng ngày.
          </p>
          <p className="text-xl font-semibold">
            Mua Macbook Pro 14 inch 2021 1TB chính hãng, giá tốt tại CellphoneS
          </p>
          <p>
            Mua ngay MacBook Pro 14 inch 2021 1TB chính hãng, giá tốt tại
            CellphoneS để trải nghiệm công nghệ tiên tiến cùng những ưu đãi đặc
            biệt. Đầu tiên là bảo hành tận trung tâm bảo hành ủy quyền chính
            hãng Apple - Cares.vn. Đây là địa chỉ đáng tin cậy để đảm bảo sự an
            tâm về chất lượng và dịch vụ.
          </p>
          <p>
            Ngoài ra, CellphoneS còn cung cấp dịch vụ mua trả góp, giúp bạn sở
            hữu sản phẩm một cách dễ dàng. Trước khi quyết định mua, đừng quên
            tham gia chương trình demo trải nghiệm sản phẩm để có cái nhìn rõ
            ràng về MacBook Pro 14 inch 2021.
          </p>
        </div>
        <div className="h-auto w-[1280px] p-2 px-4 mt-5 rounded-md bg-white shadow-lg space-y-2">
          <span className=" w-full text-xl font-semibold">
            Đánh giá {detail_product?.title}
          </span>
          <div className="h-[250px] w-full flex">
            <div className="h-full w-1/3 flex flex-col items-center justify-center space-y-2 border-r border-gray-400">
              <span className="text-xl font-bold">5.0/5</span>
              <div className="flex gap-2">
                <StarIcon fill="#ffbf00" className="text-[#ffbf00]" />
                <StarIcon fill="#ffbf00" className="text-[#ffbf00]" />
                <StarIcon fill="#ffbf00" className="text-[#ffbf00]" />
                <StarIcon fill="#ffbf00" className="text-[#ffbf00]" />
                <StarIcon fill="#ffbf00" className="text-[#ffbf00]" />
              </div>
              <span className="text-blue-500 underline">1 Đánh giá</span>
            </div>
            <div className="h-full w-2/3 flex flex-col items-center justify-center space-y-2">
              <div className="h-auto w-full flex items-center justify-center gap-5">
                <div className="flex font-bold text-lg">
                  <span>5</span>
                  <StarIcon
                    fill="#ffbf00"
                    className="text-[#ffbf00] scale-90"
                  />
                </div>
                <div className="h-3 w-4/6 bg-red-600 rounded-lg"></div>
                <div className="">1 đánh giá</div>
              </div>
              <div className="h-auto w-full flex items-center justify-center gap-5">
                <div className="flex font-bold text-lg">
                  <span>4</span>
                  <StarIcon
                    fill="#ffbf00"
                    className="text-[#ffbf00] scale-90"
                  />
                </div>
                <div className="h-3 w-4/6 bg-gray-300 rounded-lg"></div>
                <div className="">0 đánh giá</div>
              </div>
              <div className="h-auto w-full flex items-center justify-center gap-5">
                <div className="flex font-bold text-lg">
                  <span>3</span>
                  <StarIcon
                    fill="#ffbf00"
                    className="text-[#ffbf00] scale-90"
                  />
                </div>
                <div className="h-3 w-4/6 bg-gray-300 rounded-lg"></div>
                <div className="">0 đánh giá</div>
              </div>
              <div className="h-auto w-full flex items-center justify-center gap-5">
                <div className="flex font-bold text-lg">
                  <span>2</span>
                  <StarIcon
                    fill="#ffbf00"
                    className="text-[#ffbf00] scale-90"
                  />
                </div>
                <div className="h-3 w-4/6 bg-gray-300 rounded-lg"></div>
                <div className="">0 đánh giá</div>
              </div>
              <div className="h-auto w-full flex items-center justify-center gap-5">
                <div className="flex font-bold text-lg">
                  <span>1</span>
                  <StarIcon
                    fill="#ffbf00"
                    className="text-[#ffbf00] scale-90"
                  />
                </div>
                <div className="h-3 w-4/6 bg-gray-300 rounded-lg"></div>
                <div className="">0 đánh giá</div>
              </div>
            </div>
          </div>
          <div className="h-auto w-full flex flex-col items-center justify-center space-y-4 pb-4">
            <span>Cảm nhận sử dụng sản phẩm của bạn ?</span>
            <button className="text-lg font-semibold text-white bg-red-500 rounded-lg px-5 py-3 uppercase">
              Đánh giá ngay
            </button>
          </div>
        </div>
        <div className="h-auto min-h-[300px] w-[1280px] py-2 mt-5 rounded-md bg-white shadow-lg">
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
