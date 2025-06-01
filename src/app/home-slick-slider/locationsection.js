"use client";

import { React, useEffect, useState } from "react";

import Slider from "react-slick";
import { Swiper, SwiperSlide } from "swiper/react";
import SkeletonWrapper from "../../components/SkeletonWrapper";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "swiper/swiper-bundle.css";
import { FreeMode, Navigation } from "swiper/modules";
const BASE_IMAGE_SRC = "https://cdn.fullontravel.com/";
const BASE_SLUG = "-tour-packages";

import "../../assets/Style/index.css";
import Link from "next/link";
import Image from 'next/image'

const swiperSettings = {
  slidesPerView: 11,
  spaceBetween: 5,
  navigation: true,
  freeMode: true,
  speed: 500,
  loop: true,
  breakpoints: {
    1200: {
      slidesPerView: 11,
    },
    1024: {
      slidesPerView: 9,
      navigation: true,
    },
    768: {
      slidesPerView: 7,
      navigation: false,
    },
    425: {
      slidesPerView: 5.5,
      navigation: false,
    },
    360: {
      slidesPerView: 4.5,
      navigation: false,
    },
  },
  modules: [FreeMode, Navigation],
};

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= breakpoint);

    const debounce = (func, wait) => {
      let timeout;
      return () => {
        clearTimeout(timeout);
        timeout = setTimeout(func, wait);
      };
    };

    const debouncedCheck = debounce(checkMobile, 100);

    checkMobile();
    window.addEventListener("resize", debouncedCheck);
    return () => window.removeEventListener("resize", debouncedCheck);
  }, [breakpoint]);

  return isMobile;
}

export default function LocationSlider({
  destination,
  isDestinationLoading = false,
}) {
  // console.log(
  //   "LocationSlider++++++++++++",
  //   destination
  // );
  const isMobile = useIsMobile();
  return (
    <div className="top-sticky">
      <div className="customContainer">
        <div className="row">
          <div className="col-12">
            <div className="activityTop">
              <Swiper {...swiperSettings}>
                {destination.length > 0
                  ? destination.map((destination, index) => (
                      <SwiperSlide key={index}>
                        <Link
                          href={`holidays/${
                            destination?.region
                              ?.toLowerCase()
                              .replace(/\s+/g, "-") + BASE_SLUG
                          }`}
                          state={{
                            destinationId: destination?.id,
                            description: destination?.description,
                          }}
                        >
                          <div className="item">
                            <div className="locationCard">
                              {destination?.trending && (
                                <div className="trendTag">Trending</div>
                              )}
                              <div className="imgWrapper">
                                <Image
                                  src={`${
                                    BASE_IMAGE_SRC + destination?.iconImageUrl
                                  }`}
                                  alt={destination?.region}
                                  loading={
                                    index >= (isMobile ? 5 : 11)
                                      ? "lazy"
                                      : "eager"
                                  }
                                  width={800} 
                                height={600}
                                />
                              </div>
                              <div className="locationnDetails">
                                <div className="title">
                                  <span>{destination?.region}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </SwiperSlide>
                    ))
                  : Array.from({ length: isMobile ? 5 : 11 }).map(
                      (_, index) => (
                        <SwiperSlide key={index}>
                          <div className="item">
                            <div className="locationCard">
                              <div className="imgWrapper">
                                <SkeletonWrapper />
                              </div>
                              <div className="locationnDetails">
                                <SkeletonWrapper />
                              </div>
                            </div>
                          </div>
                        </SwiperSlide>
                      )
                    )}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
