"use client";

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const BASE_IMAGE_SRC = "https://cdn.fullontravel.com/";
import "../../assets/Style/index.css";


const ModeSettings = {
  dots: false,
  infinite: true,
  centerMode: true,
  speed: 500,
  slidesToShow: 4.3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  arrows: false,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 3,
        arrows: false,
      },
    },
    {
      breakpoint: 425,
      settings: {
        slidesToShow: 3,
        arrows: false,
      },
    },
  ],
};

export default function TestimonialsSlider({ testimonials }) {
  return (
    <Slider {...ModeSettings} className="testimonial">
      {testimonials?.map((item, idx) => (
        <div className="item" key={idx}>
          <div className="testimonialPerson">
            <div className="personImage">
              <img
                src={`${BASE_IMAGE_SRC + item?.profileImage}`}
                alt=""
                loading="lazy"
              />
            </div>
            <div className="personComment">
              <div className="comment">
                <blockquote>“{item?.message}”</blockquote>
              </div>
              <div className="personDetails">
                <cite>— {item?.name}</cite>
              </div>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
}
