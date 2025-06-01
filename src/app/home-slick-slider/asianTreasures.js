"use client";

import React from "react";
import Slider from "react-slick";
import SkeletonWrapper from "../../components/SkeletonWrapper";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const BASE_IMAGE_SRC = "https://cdn.fullontravel.com/";
const BASE_SLUG = "-tour-packages";

import "../../assets/Style/index.css";
import Link from "next/link";
import Image from 'next/image'

const ModeSettings = {
  dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2.5,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
    arrows: true,
};

export default function AsianTreasuresSlider({
  destination,
  isDestinationLoading = false,
}) {
  // console.log("AsianTreasuresSlider++++++++++++", destination);
  return (
    <Slider
      {...ModeSettings}
      className="allactivityCards"
      key={destination?.length}
    >
      {isDestinationLoading
        ? Array.from({ length: 7 }).map((_, index) => (
            <div className="item" key={index}>
              <div className="activityCard">
                <SkeletonWrapper className="activityImg" />
                <div className="activityDetails">
                  <SkeletonWrapper className="tagTitle" />
                  <SkeletonWrapper className="title" />
                </div>
              </div>
            </div>
          ))
        : (() => {
            const filteredDestinations = destination?.filter((destination) =>
              destination?.tagInfo.some((tag) => tag.tag === "Asian Treasures")
            );

            return filteredDestinations?.map((destination, index) => (
              <div className="item" key={index}>
                <Link
                  href={`/holidays/${
                    destination?.region?.toLowerCase().replace(/\s+/g, "-") +
                    BASE_SLUG
                  }`}
                >
                  <div className="activityCard">
                    <Image
                      src={`${BASE_IMAGE_SRC + destination?.imageUrl}`}
                      alt=""
                      width={800} 
                      height={600}
                      className="activityImg"
                    />
                    <div className="activityDetails">
                      <div className="tagTitle">{destination?.quote}</div>
                      <div className="title">{destination?.region}</div>
                    </div>
                  </div>
                </Link>
              </div>
            ));
          })()}
    </Slider>
  );
}
