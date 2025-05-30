"use client";

import React from "react";
import Slider from "react-slick";
import SkeletonWrapper from '../../components/SkeletonWrapper';
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
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
    arrows: true,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3.3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2.3,
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
  const normalizeImageUrl = (url) => {
    if (url) {
      if (url && !url.startsWith("/")) {
        return "https://cdn.fullontravel.com/" + url;
      }

      return "https://cdn.fullontravel.com" + url;
    }

    return "https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2247726673.jpg";
  };
export default function RomanticEscapesSlider({ destination, isDestinationLoading = false }) {
  // console.log("RomanticEscapesSlider++++++++++++", destination);
  return (
     <Slider {...ModeSettings} className="vacationCards"  key={destination?.length}>
                {isDestinationLoading
                  ? Array.from({ length: 7 }).map((_, index) => (
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
                  : destination?.filter((destination) =>
                    destination.tagInfo.some(
                      (tag) => tag.tag === "Romantic Escapes and Honeymoons"
                    )
                  ).length > 0
                    ? destination?.filter((destination) =>
                      destination.tagInfo.some(
                        (tag) => tag.tag === "Romantic Escapes and Honeymoons"
                      )
                    ).map((destination, placeIndex) => {
                      const regionSlug = destination?.region
                        ? destination.region.toLowerCase().replace(/\s+/g, "-")
                        : "unknown";
                      const destinationUrl = `/holidays/${regionSlug}${BASE_SLUG}`;
                      return (
                        <div className="item" key={placeIndex}>
                          <Link href={destinationUrl}>
                            <div className="vacationCard">
                              <img
                                src={normalizeImageUrl(destination?.imageUrl)}
                                alt=""
                                className="cardImg"
                              />
                              <div className="imgOverlay"></div>
                              <div className="cardText">
                                <div className="priceTag">{destination?.quote}</div>
                                <h3>{destination?.region}</h3>
                                {/* <div className="priceTag">Starting Price Rs. <span>1,29,000/-</span></div> */}
                              </div>
                            </div>
                          </Link>
                        </div>
                      );
                    })
                    : ""}
                {/* {
                  VacationTypes?.map((vacation, vacIndex) => {
                    return <div className="vacationCard" key={vacIndex}>
                      <img src={normalizeImageUrl(vacation?.imageUrl)} alt="" className="cardImg" />
                      <div className="imgOverlay"></div>
                      <div className="cardText">
                        <div className="priceTag">{vacation?.description}</div>
                        <h3>{vacation?.type}</h3>
                        <div className="priceTag">Starting Price Rs. <span>1,29,000/-</span></div>
                      </div>
                    </div>
                  })
                } */}
                {/* <div className="vacationCard">
                  <img src="https://images.wanderon.in/new-homepage-data/International/europe" alt="" className="cardImg" />
                  <div className="imgOverlay"></div>
                  <div className="cardText">
                    <h3>Europe</h3>
                    <div className="priceTag">Starting Price Rs. <span>1,29,000/-</span></div>
                  </div>
                </div> */}
                {/* <div className="vacationCard">
                  <img src="https://images.wanderon.in/new-homepage-data/International/vietnam" alt="" className="cardImg" />
                  <div className="imgOverlay"></div>
                  <div className="cardText">
                    <h3>Vietnam</h3>
                    <div className="priceTag">Starting Price Rs. <span>57,999/-</span></div>
                  </div>
                </div>
                <div className="vacationCard">
                  <img src="https://images.wanderon.in/new-homepage-data/International/bali" alt="" className="cardImg" />
                  <div className="imgOverlay"></div>
                  <div className="cardText">
                    <h3>Bali</h3>
                    <div className="priceTag">Starting Price Rs. <span>44,999/-</span></div>
                  </div>
                </div>
                <div className="vacationCard">
                  <img src="https://images.wanderon.in/new-homepage-data/International/dubai" alt="" className="cardImg" />
                  <div className="imgOverlay"></div>
                  <div className="cardText">
                    <h3>Dubai</h3>
                    <div className="priceTag">Starting Price Rs. <span>28,999/-</span></div>
                  </div>
                </div>
                <div className="vacationCard">
                  <img src="https://images.wanderon.in/new-homepage-data/International/maldives" alt="" className="cardImg" />
                  <div className="imgOverlay"></div>
                  <div className="cardText">
                    <h3>Maldives</h3>
                    <div className="priceTag">Starting Price Rs. <span>74,999/-</span></div>
                  </div>
                </div>
                <div className="vacationCard">
                  <img src="https://images.wanderon.in/new-homepage-data/International/baku" alt="" className="cardImg" />
                  <div className="imgOverlay"></div>
                  <div className="cardText">
                    <h3>Baku</h3>
                    <div className="priceTag">Starting Price Rs. <span>44,999/-</span></div>
                  </div>
                </div>
                <div className="vacationCard">
                  <img src="https://images.wanderon.in/new-homepage-data/International/almaty" alt="" className="cardImg" />
                  <div className="imgOverlay"></div>
                  <div className="cardText">
                    <h3>Almaty</h3>
                    <div className="priceTag">Starting Price Rs. <span>48,999/-</span></div>
                  </div>
                </div> */}
              </Slider>
  );
}
