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

const ModeSettings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4.5,
  slidesToScroll: 1,
  autoplay: false,
  autoplaySpeed: 3000,
  arrows: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3.5,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2.5,
        arrows: false,
      },
    },
    {
      breakpoint: 425,
      settings: {
        slidesToShow: 1.5,
        arrows: false,
      },
    },
  ],
};

export default function AdventureandOutdoorSlider({
  destination,
  isDestinationLoading = false,
}) {
  // console.log("++++++++++++", destination);
  return (
    <Slider {...ModeSettings} className="destination" key={destination?.length}>
      {isDestinationLoading
        ? // Render skeletons if data is not yet loaded
          Array.from({ length: 7 }).map((_, index) => (
            <div className="item" key={index}>
              <div className="destinationCard">
                <SkeletonWrapper className="destinationImg" />
                <div className="destinationDetails">
                  <SkeletonWrapper className="tagTitle" />
                  <SkeletonWrapper className="title" />
                </div>
              </div>
            </div>
          ))
        : destination
            ?.filter((destination) =>
              destination.tagInfo.some(
                (tag) => tag.tag === "Adventure and Outdoor Enthusiasts"
              )
            )
            .map((destination, quickIndex) => (
              <div className="item" key={quickIndex}>
                <Link
                  href={`/holidays/${
                    destination?.region?.toLowerCase().replace(/\s+/g, "-") +
                    BASE_SLUG
                  }`}
                  state={{ destinationId: destination?.id }}
                >
                  <div className="destinationCard">
                    <img
                      loading="lazy"
                      src={`${BASE_IMAGE_SRC + destination?.imageUrl}`}
                      alt=""
                      className="destinationImg"
                    />
                    <div className="destinationDetails">
                      <div className="tagTitle">{destination?.quote}</div>
                      <div className="title">{destination?.region}</div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
    </Slider>
  );
}
