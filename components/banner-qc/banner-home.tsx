"use client";
import React from "react";
import Image from "next/image";
//import css file Slider
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const settings_slider = {
  dots: false,
  arrows: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  delay: 300,
  responsive: [
    {
      breakpoint: 1024, // < 1024
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
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

const Banner_Home = () => {
  return (
    <>
      <div className="w-full min-h-[245px] h-auto bg-white flex items-center justify-center border-b-2 border-gray-200">
        <div className="h-[245px] w-[1200px] flex items-center justify-center space-x-1">
          <div className="min-h-[245px] max-h-[245px] w-auto min-w-[800px] max-w-[800px]">
            <Slider {...settings_slider}>
              <Image
                src={
                  "https://cf.shopee.vn/file/vn-50009109-23b5ccce43306d6c9aef6e56bf5f3bb6_xxhdpi"
                }
                alt=""
                width={800}
                height={235}
                className="h-full w-full"
              />
              <Image
                src={
                  "https://cf.shopee.vn/file/vn-50009109-922d768eceff11390387dd70a9d3d635_xxhdpi"
                }
                alt=""
                width={800}
                height={235}
                className="h-full w-full"
              />
              <Image
                src={
                  "https://cf.shopee.vn/file/vn-50009109-77e126cb6193f5a137c5dede39f53626_xxhdpi"
                }
                alt=""
                width={800}
                height={235}
                className="h-full w-full"
              />
              <Image
                src={
                  "https://cf.shopee.vn/file/vn-50009109-06e0e1a44edd1d87585a0e7bf66b48da_xxhdpi"
                }
                alt=""
                width={800}
                height={235}
                className="h-full w-full"
              />
            </Slider>
          </div>
          <div className="h-auto min-h-[245px] max-h-[245px] w-auto min-w-[400px] max-w-[400px]">
            <div className="h-[50%] w-full max-w-full">
              <Image
                src={
                  "https://cf.shopee.vn/file/vn-50009109-52284f0556657ba55d576994655a3e60_xhdpi"
                }
                alt=""
                width={400}
                height={122}
                className="h-auto w-full"
              />
            </div>
            <div className="h-[50%] w-full max-w-full">
              <Image
                src={
                  "https://cf.shopee.vn/file/vn-50009109-3bcf698bccc97fa5b557479ab01bd298_xhdpi"
                }
                alt=""
                width={400}
                height={122}
                className="h-auto w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner_Home;
