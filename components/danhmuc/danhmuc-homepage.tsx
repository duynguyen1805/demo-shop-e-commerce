"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";

import { DANHMUC } from "@/constant";

//import css file Slider
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const settings_slider = {
  dots: true,
  arrows: true,
  infinite: false,
  speed: 500,
  slidesToShow: 8,
  slidesToScroll: 1,
  autoplay: true,
  delay: 300,
  responsive: [
    {
      breakpoint: 1024, // < 1024
      settings: {
        slidesToShow: 8,
        slidesToScroll: 1,
        infinite: false,
        dots: true,
      },
    },
    {
      breakpoint: 767, // < 767
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 375, // < 375
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
      },
    },
  ],
};

const Danhmuc_homepage = () => {
  return (
    <>
      <div className="h-[240px] w-[1200px] bg-white mt-5">
        <div className="h-[60px] w-full px-4 flex items-center">
          <span className="text-lg text-gray-400">DANH MỤC</span>
        </div>
        <div className="h-[150px] w-auto min-w-[1200px] max-w-[1200px] pb-[10px] px-[1px]">
          <div className="h-full w-full max-w-full min-w-full px-10">
            <Slider {...settings_slider}>
              {DANHMUC &&
                DANHMUC.map((item, index) => {
                  return (
                    <div key={index}>
                      <Link href={item.url}>
                        <div className="h-[145px] w-32 p-1 flex flex-col items-center justify-start border border-gray-100 hover:shadow-xl hover:border-main_color transition duration-300 cursor-pointer">
                          <Image
                            src={item.img_url}
                            alt=""
                            height={90}
                            width={90}
                            className=""
                          />
                          <div className="h-auto max-h-[50px] w-full text-center">
                            {item.title}
                          </div>
                        </div>
                      </Link>
                    </div>
                  );
                })}
            </Slider>
          </div>
        </div>
      </div>
    </>
  );
};

export default Danhmuc_homepage;
