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

const ActivityModeSettings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 2.5,
  slidesToScroll: 1,
  autoplay: false,
  autoplaySpeed: 3000,
  arrows: true,
};

export default function CulturalandHistoricalSlider({
  destination,
  isDestinationLoading = false,
}) {
  // console.log(
  //   "CulturalandHistoricalSlider++++++++++++",
  //   destination
  // );
  return (
    <Slider
      {...ActivityModeSettings}
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
            const filtereddestination = destination?.filter((destination) =>
              destination?.tagInfo.some(
                (tag) => tag.tag === "Cultural and Historical Wonders"
              )
            );

            return filtereddestination?.map((destination, index) => (
              <div className="item" key={index}>
                <Link
                  href={`/holidays/${
                    destination?.region?.toLowerCase().replace(/\s+/g, "-") +
                    BASE_SLUG
                  }`}
                >
                  <div className="activityCard">
                    <img
                      src={`${BASE_IMAGE_SRC + destination?.imageUrl}`}
                      alt=""
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
