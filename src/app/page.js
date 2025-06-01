// "use client";
import book from "../assets/images/easy_booking.png";
import deal from "../assets/images/svg/deal.svg";
import lowest from "../assets/images/svg/lowest.svg";
import support from "../assets/images/svg/support.svg";
import AfterFooter from "../components/footer/AfterFooter";

import ReviewSection from "../Components/Reviews/ReviewSection";
import googleStar from "../assets/images/svg/google-star.svg";
import trustWhite from "../assets/images/svg/trust-white.svg?url";
import mapWhite from "../assets/images/svg/map-white.svg";
import callWhite from "../assets/images/svg/call-white.svg";
import Image from "next/image";
import Head from "next/head";

import Select from "react-select";
import Link from "next/link";
import "../assets/Style/index.css";
const BASE_IMAGE_SRC = "https://cdn.fullontravel.com/";
const BASE_SLUG = "-tour-packages";
import TestimonialsSlider from "./home-slick-slider/testimonials";
import OffbeatAndRemoteSlider from "./home-slick-slider/OffbeatAndRemote";
import { getDestinations, getTestimonials } from "../lib/api";
import SnowEscapesSlider from "./home-slick-slider/SnowEscapes";
import AsianTreasuresSlider from "./home-slick-slider/asianTreasures";
import RomanticEscapesSlider from "./home-slick-slider/RomanticEscapes";
import WildlifeandnatureSlider from "./home-slick-slider/wildlifeandnature";
import LuxuryandhighSlider from "./home-slick-slider/luxuryandhigh";
import CulturalandHistoricalSlider from "./home-slick-slider/CulturalandHistorical";
import HimalayanEscapesSlider from "./home-slick-slider/HimalayanEscapes";
import AdventureandOutdoorSlider from "./home-slick-slider/AdventureandOutdoor";
import BeachandIslandSlider from "./home-slick-slider/BeachandIsland";
import LocationSlider from "./home-slick-slider/locationsection";
import HeroLocationDropdown from "./home-slick-slider/HeroLocationDropdown";

export default async function HomePage() {
  const { data: Testimonials } = await getTestimonials(1, 100);
  console.log("Testimonials",Testimonials)
  // const { data: Destinations } = await getDestination();
  const destinationRes = await getDestinations();

  const Destinations = destinationRes?.data || destinationRes;



  return (
    <>
      <Head>
        <meta
          name="description"
          content="Discover unbeatable travel packages with FullOnTravel. Explore top destinations, customized tours, and exclusive deals for your perfect getaway. Start your journey today!"
        ></meta>
        <meta
          name="keywords"
          content="travel packages, FullOnTravel, vacation deals, customized tours, top destinations, affordable travel, dream getaways, exclusive travel deals"
        ></meta>

        <meta
          property="og:title"
          content="Explore the World with FullOnTravel – Your Gateway to Unforgettable Journeys"
        ></meta>
        <meta
          property="og:description"
          content="Let FullOnTravel take you on extraordinary adventures! Discover handpicked travel packages, hidden gems, and exclusive deals for every wanderlust-filled heart."
        ></meta>
        <meta
          property="og:image"
          content="https://cdn.fullontravel.com/dev/ladakh.png-308887.png"
        ></meta>
        <meta property="og:url" content="https://www.fullontravel.com"></meta>
        <meta property="og:type" content="website"></meta>
        <meta property="og:site_name" content="FullOnTravel"></meta>
        <meta name="twitter:card" content="summary_large_image"></meta>
        <meta
          name="twitter:title"
          content="FullOnTravel – Tailor-Made Travel Packages for Every Explorer"
        ></meta>
        <meta
          name="twitter:description"
          content="Ready for your next adventure? FullOnTravel offers curated travel packages, exclusive deals, and personalized tours to make your journey unforgettable."
        ></meta>
        <meta
          name="twitter:image"
          content="https://cdn.fullontravel.com/dev/ladakh.png-308887.png"
        ></meta>
        <meta name="twitter:site" content="@FullOnTravel"></meta>
        <meta name="twitter:creator" content="@FullOnTravel"></meta>
      </Head>
      <div className="heroSection">
        {/* <img
          src={bannerImg}
          alt="Hero background"
          className="heroImg"
          fetchpriority="high"
          decoding="async"
          loading="eager"
        /> */}
        <div className="customContainer">
          <div className="searchBlock">
            <h2>
              Adventure is <br />
              Just Around the Corner
            </h2>
            <p>Find Your Next Dream Destination</p>
            {/* <button className="searchBox" data-bs-toggle="modal" data-bs-target="#searchModal">
              <div className="fancy-bg">
                <span>
                  Search for{" "}
                  <span className="typed-text" ref={typedTextSpan}></span>
                  <span className="cursor typing" ref={cursorSpan}>
                    &nbsp;
                  </span>
                </span>
              </div> */}
            {/* <input type="text" placeholder="Search any Destination..." disabled /> */}
            {/* <button type="button" className="searchButton">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </button>
            </button> */}

            {/* city dropdown  */}
      <HeroLocationDropdown destination={Destinations}></HeroLocationDropdown>

              {/* <HeroLocationDropdown destination={Destinations}></HeroLocationDropdown> */}
            {/* end city dropdown    */}
          </div>
        </div>

        <div className="bottomStrip">
          <div className="customContainer">
            <div className="row">
              <div className="col-lg-3 col-6 mb-3">
                <div className="banner">
                  <div className="bannerBlock">
                    <span className="count">4.8</span>
                    <div className="bannerText">
                      <div className="powerText">Google Rating</div>
                      <Image src={googleStar} alt="" className="bannerImg2" />

                      {/* <img src={googleStar} alt="" className="bannerImg2" /> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-6 mb-3">
                <div className="banner">
                  <div className="bannerBlock">
                    <Image src={trustWhite} alt="" className="bannerImg1" />

                    {/* <img src={trustWhite} alt="" className="bannerImg1" /> */}
                    <div className="bannerText">
                      <div className="powerText">Trusted By</div>
                      <p>25k+ Travellers</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-6 mb-3">
                <div className="banner">
                  <div className="bannerBlock">
                    <Image src={mapWhite} alt="" className="bannerImg1" />

                    {/* <img src={mapWhite} alt="" className="bannerImg1" /> */}
                    <div className="bannerText">
                      <div className="powerText">Customized Trips</div>
                      <p>300+ Itineraries</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-6 mb-3">
                <div className="banner">
                  <div className="bannerBlock">
                    <Image src={callWhite} alt="" className="bannerImg1" />

                    {/* <img src={callWhite} alt="" className="bannerImg1" /> */}
                    <div className="bannerText">
                      <div className="powerText">24/7 Support</div>
                      {/* <p>Let us help</p> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* text top scollbar */}
      <LocationSlider destination={Destinations}></LocationSlider>
      {/* text top scollbar end */}

      {/* text top scollbar end */}

      <div className="customContainer my-4 my-md-5">
        <div className="row">
          {/* Adventure and Outdoor Enthusiasts */}
          <div className="col-12">
            <div className="destinationCards">
              <h5>
                <span>Adventure</span> and Outdoor Enthusiasts
              </h5>
              <div className="activitySecound">
                <AdventureandOutdoorSlider
                  destination={Destinations}
                ></AdventureandOutdoorSlider>
              </div>
            </div>
          </div>

          {/* Beach and Island Getaways */}
          <div className="col-12">
            <div className="destinationCards">
              <h5>
                <span>Beach</span> and Island Getaways
              </h5>
              <div className="activitySecound">
                <BeachandIslandSlider
                  destination={Destinations}
                ></BeachandIslandSlider>
              </div>
            </div>
          </div>

          {/* <div className="col-12">
            <div className="travelStyle">
              <div className="travelstyleHeader">
                <h5>Choose your</h5>
                <span>Vacation Type</span>
              </div>
              <div className="travelTypes">
                {
                  VacationTypes?.length > 0 ? (
                    VacationTypes?.map((vacation, index) => {
                      return <div className="travelCards" key={index}>
                        <img
                          src={normalizeImageUrl(vacation?.imageUrl)}
                          alt=""
                        />
                        <div className="cardsDetails">
                          <h4>{vacation?.type}</h4>
                          <span>{vacation?.description}</span>
                        </div>
                      </div>
                    })
                  ) : (
                    Array.from({ length: 4 }).map((_, index) => (
                      <div className="travelCards" key={index}>
                        <SkeletonWrapper className="destinationImg" />
                        <div className="cardsDetails">
                          <SkeletonWrapper className="tagTitle" />
                          <SkeletonWrapper className="title" />
                        </div>
                      </div>
                    ))
                  )
                }
              </div>
            </div>
          </div> */}

          <div className="col-12">
            <div className="vacationType">
              <div className="vacationBanner bgImg_1">
                <div className="bannerOverlay"></div>
                {/* <video>
                  <source src="https://d1c8wbldjj3tey.cloudfront.net/category-section/international_(1)+(540p).mp4" type="video/mp4" />
                </video> */}
                <div className="vacationBannercontent">
                  <div className="content">
                    <div className="heading">
                      <span>Himalayan Escapes</span>
                    </div>
                    {/* <p className="para">Discover the world, one destination at a time</p> */}
                  </div>
                  {/* <Link href="">
                    <div className="linkText">Explore</div>
                  </Link> */}
                </div>
              </div>
              <HimalayanEscapesSlider
                destination={Destinations}
              ></HimalayanEscapesSlider>
            </div>
          </div>
        </div>
      </div>

      {/* beach holioday section */}

      <div className="sectionBgcolor">
        <div className="customContainer">
          <div className="row">
            {/* Desktop version */}
            <div className="col-12 d-none d-sm-block">
              {/* <div className="visaCards">
                <h5>
                  Cultural and <span>Historical Wonders</span>
                </h5>
                <div className="activitySecound">
                  <Slider {...ModeGallerySettings} className="visaSlider">
                    {sliderData.map((slide, index) => (
                      <div key={index}>
                        {slide.type === "large" ? (
                          <div className="item">
                            <div className="visaCard largeVisacard">
                              <img
                                src={`${BASE_IMAGE_SRC + slide?.image}`}
                                alt=""
                              />
                              <div className="visaDetails">
                                <div className="title">{slide.title}</div>
                                <div className="prize">From ₹{slide.price}</div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="item">
                            <div className="row mr-4">
                              <div className="col-12 mb-3">
                                <div className="visaCard">
                                  <img
                                    src={`${BASE_IMAGE_SRC + slide?.image}`}
                                    alt=""
                                  />
                                  <div className="visaDetails">
                                    <div className="title">{slide.title}</div>
                                    <div className="prize">
                                      From ₹{slide.price}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {slide.items.map((item, i) => (
                                <div className="col-6" key={i}>
                                  <div className="visaCard smallVisacard">
                                    <img
                                      src={`${BASE_IMAGE_SRC + item?.image}`}
                                      alt=""
                                    />
                                    <div className="visaDetails">
                                      <div className="title">{item.title}</div>
                                      <div className="prize">
                                        From ₹{item.price}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </Slider>
                </div>
              </div> */}
              <div className="row">
                <div className="col-12 col-md-4 visaCards">
                  <div className="headWrapper">
                    <h5>
                      Cultural and <span>Historical Wonders</span>
                    </h5>
                    <span className="subHead">
                      Explore the World&apos;s Rich Heritage
                    </span>
                    <div className="detailText">
                      Uncover the stories, traditions, and landmarks that shaped
                      civilizations.
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-8 activityCards">
                  <CulturalandHistoricalSlider
                    destination={Destinations}
                  ></CulturalandHistoricalSlider>
                </div>
              </div>
            </div>

            {/* Mobile Version */}
            <div className="col-12 d-sm-none d-block">
              <div className="mobileVisacards">
                <h5>Cultural and Historical Wonders</h5>
                <div className="mobileVisaCard">
                  {Destinations?.filter((destination) =>
                    destination?.tagInfo.some(
                      (tag) => tag.tag === "Cultural and Historical Wonders"
                    )
                  ).length > 0
                    ? Destinations?.filter((destination) =>
                        destination?.tagInfo.some(
                          (tag) => tag.tag === "Cultural and Historical Wonders"
                        )
                      ).map((destination, beachIndex) => {
                        return (
                          <Link
                            href={`/holidays/${
                              destination?.region
                                ?.toLowerCase()
                                .replace(/\s+/g, "-") + BASE_SLUG
                            }`}
                            key={beachIndex}
                            style={{ color: "#212529" }}
                          >
                            <div className="visaCard">
                              <div className="visaImg">
                                <img
                                  src={`${
                                    BASE_IMAGE_SRC + destination?.imageUrl
                                  }`}
                                />
                              </div>
                              <div className="visacardDetails">
                                <div
                                  className="title"
                                  style={{ textDecoration: "none" }}
                                >
                                  {destination?.region}
                                </div>
                              </div>
                            </div>
                          </Link>
                        );
                      })
                    : ""}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Northen Light Section */}

      <div className="customContainer my-4 my-md-5">
        <div className="row">
          {/* <div className="highlightView">
            {
              Festivals?.length > 0 ? (
                Festivals?.map((fest, index) => {
                  function convertToMonthRange(startDate, endDate) {
                    const startMonth = new Date(startDate).toLocaleString('default', { month: 'short' });
                    const endMonth = new Date(endDate).toLocaleString('default', { month: 'short' });
                    return `${startMonth} - ${endMonth}`;
                  }

                  const monthRange = convertToMonthRange(fest?.startDate, fest?.endDate);

                  return <div className="highlightPackage" key={index}>
                    <img
                      src={`https://cdn.fullontravel.com/${fest?.imageUrl}`}
                      alt=""
                    />
                    <div className="packageDetails">
                      <div className="title">
                        {fest?.title}<span className="specialTag">{monthRange}</span>
                      </div>
                      <div className="tags">{fest?.description}</div>
                      <button className="packageBtn">
                        View Packages <i className="fa-solid fa-chevron-right" />
                      </button>
                    </div>
                  </div>
                })
              ) : (
                Array.from({ length: 4 }).map((_, index) => (
                  <div className="highlightPackage" key={index}>
                    <SkeletonWrapper width="100%" />
                    <div className="packageDetails">
                      <SkeletonWrapper className="title" />
                      <SkeletonWrapper className="tags" />
                      <SkeletonWrapper className="packageBtn" />
                    </div>
                  </div>
                ))
              )
            }
          </div> */}
          <div className="col-12">
            <div className="destinationCards">
              <h5>
                <span>Luxury</span> and High-End Travel
              </h5>
              <div className="activitySecound">
                <LuxuryandhighSlider
                  destination={Destinations}
                ></LuxuryandhighSlider>
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="destinationCards">
              <h5>
                <span>Wildlife</span> and Nature Enthusiasts
              </h5>
              <div className="activitySecound">
                <WildlifeandnatureSlider
                  destination={Destinations}
                ></WildlifeandnatureSlider>
              </div>
            </div>
          </div>

          <div className="col-12">
            <div className="vacationType">
              <div className="vacationBanner bgImg_2">
                <div className="bannerOverlay"></div>
                {/* <video>
                  <source src="https://d1c8wbldjj3tey.cloudfront.net/category-section/international_(1)+(540p).mp4" type="video/mp4" />
                </video> */}
                <div className="vacationBannercontent">
                  <div className="content">
                    <div className="heading">
                      Romantic Escapes and <span>Honeymoons</span>
                    </div>
                    {/* <p className="para">Discover the world, one destination at a time</p> */}
                  </div>
                  {/* <Link href="">
                    <div className="linkText">Explore</div>
                  </Link> */}
                </div>
              </div>
              <RomanticEscapesSlider
                destination={Destinations}
              ></RomanticEscapesSlider>
            </div>
          </div>
        </div>
      </div>

      {/* Tekking and Hiking */}

      <div className="sectionBgcolor">
        <div className="customContainer">
          <div className="row">
            <div className="col-12 d-none d-sm-block">
              <div className="row">
                <div className="col-12 col-md-4 visaCards">
                  <div className="headWrapper">
                    <h5>
                      <span>Asian Treasures</span>
                    </h5>
                    <span className="subHead">
                      Unearth the Gems of the East
                    </span>
                    <div className="detailText">
                      From ancient marvels to vibrant traditions, explore the
                      heart of the East.
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-8 activityCards">
                  <AsianTreasuresSlider
                    destination={Destinations}
                  ></AsianTreasuresSlider>
                </div>
              </div>
            </div>

            <div className="col-12 d-sm-none d-block">
              <div className="mobileVisacards">
                <h5>Asian Treasures</h5>
                <span>Ideal for 5-14 days trip</span>
                <div className="mobileVisaCard">
                  {Destinations?.filter((destination) =>
                    destination?.tagInfo.some(
                      (tag) => tag.tag === "Asian Treasures"
                    )
                  ).length > 0
                    ? Destinations?.filter((destination) =>
                        destination?.tagInfo.some(
                          (tag) => tag.tag === "Asian Treasures"
                        )
                      ).map((destination, beachIndex) => {
                        return (
                          <Link
                            href={`/holidays/${
                              destination?.region
                                ?.toLowerCase()
                                .replace(/\s+/g, "-") + BASE_SLUG
                            }`}
                            key={beachIndex}
                            style={{ color: "#212529" }}
                          >
                            <div className="visaCard" key={beachIndex}>
                              <div className="visaImg">
                                <img
                                  src={`${
                                    BASE_IMAGE_SRC + destination?.imageUrl
                                  }`}
                                />
                              </div>
                              <div className="visacardDetails">
                                <div
                                  className="title"
                                  style={{ textDecoration: "none" }}
                                >
                                  {destination?.region}
                                </div>
                              </div>
                            </div>
                          </Link>
                        );
                      })
                    : ""}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Last Section Routes */}

      <div className="customContainer my-4 my-md-5">
        <div className="row">
          <div className="col-12">
            <div className="destinationCards">
              <h5>
                <span>Snow Escapes</span> & Ski Spots
              </h5>
              <div className="activitySecound">
                <SnowEscapesSlider
                  destination={Destinations}
                ></SnowEscapesSlider>
              </div>
            </div>
          </div>

          <div className="col-12">
            <div className="destinationCards">
              <h5>
                <span>Offbeat</span> and Remote Adventures
              </h5>
              <div className="activitySecound">
                <OffbeatAndRemoteSlider
                  destination={Destinations}
                ></OffbeatAndRemoteSlider>
              </div>
            </div>
          </div>

          <div className="col-12">
            <div className="budgetStyle">
              <div className="budgetstyleHeader">
                <h5>Holidays for every</h5>
                <span>Budget</span>
              </div>
              <div className="budgetTypes">
                <div className="budgetCards">
                  <Link
                    href={`/holidays/all-destinations-tour-packages?priceFrom=5000&priceTo=50000`}
                  >
                    <div className="cardsDetails">
                      <span className="budgettag">Below</span>
                      <h4 className="budgetPrize">₹ 50,000</h4>
                      <i className="fa-solid fa-star" />
                    </div>
                  </Link>
                </div>

                <div className="budgetCards">
                  <Link
                    href={`/holidays/all-destinations-tour-packages?priceFrom=5000&priceTo=75000`}
                  >
                    <div className="cardsDetails">
                      <span className="budgettag">Below</span>
                      <h4 className="budgetPrize">₹ 75,000</h4>
                      <i className="fa-solid fa-star" />
                    </div>
                  </Link>
                </div>

                <div className="budgetCards">
                  <Link
                    href={`/holidays/all-destinations-tour-packages?priceFrom=5000&priceTo=100000`}
                  >
                    <div className="cardsDetails">
                      <span className="budgettag">Below</span>
                      <h4 className="budgetPrize">₹ 1,00,000</h4>
                      <i className="fa-solid fa-star" />
                    </div>
                  </Link>
                </div>

                <div className="budgetCards">
                  <Link
                    href={`/holidays/all-destinations-tour-packages?priceFrom=5000&priceTo=200000`}
                  >
                    <div className="cardsDetails">
                      <span className="budgettag">Below</span>
                      <h4 className="budgetPrize">₹ 2,00,000</h4>
                      <i className="fa-solid fa-star" />
                    </div>
                  </Link>
                </div>

                <div className="budgetCards">
                  <Link
                    href={`/holidays/all-destinations-tour-packages?priceFrom=5000&priceTo=300000`}
                  >
                    <div className="cardsDetails">
                      <span className="budgettag">Below</span>
                      <h4 className="budgetPrize">₹ 3,00,000</h4>
                      <i className="fa-solid fa-star" />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12">
            <div className="testimonial-section">
              <h5 className="heading">
                FANBOOK <span>Testimonials</span>
              </h5>
              <TestimonialsSlider
                testimonials={Testimonials}
              ></TestimonialsSlider>
            </div>
          </div>

          <ReviewSection />

          <div className="col-12">
            <div className="whyChooseus">
              <div className="customContainer">
                <div className="row">
                  <div className="col-12">
                    <h4>Why book with us?</h4>
                  </div>
                  <div className="col-lg-3 col-sm-6 col-12 mb-3">
                    <div className="chooseUScard">
                      <div className="chooseUsimg">
                        <Image src={book} alt="" />
                        {/* <img src={book} alt="" /> */}
                      </div>
                      <div className="chooseUshead">Easy Booking</div>
                      <div className="chooseUspara">
                        Experience hassle-free booking for tailor-made holiday
                        packages that suit your preferences.
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-sm-6 col-12 mb-3">
                    <div className="chooseUScard">
                      <div className="chooseUsimg">
                        <Image src={lowest} alt="" />
                        {/* <img src={lowest} alt="" /> */}
                      </div>
                      <div className="chooseUshead"> Lowest Price</div>
                      <div className="chooseUspara">
                        Get the best value for your money with our competitively
                        priced holiday packages.
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-sm-6 col-12 mb-3">
                    <div className="chooseUScard">
                      <div className="chooseUsimg">
                        <Image src={deal} alt="" />
                        {/* <img src={deal} alt="" /> */}
                      </div>
                      <div className="chooseUshead"> Exciting Deals</div>
                      <div className="chooseUspara">
                        Explore exclusive deals and discounts on our curated
                        holiday packages to top destinations.
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-sm-6 col-12 mb-3">
                    <div className="chooseUScard">
                      <div className="chooseUsimg">
                        <Image src={support} alt="" />
                        {/* <img src={support} alt="" /> */}
                      </div>
                      <div className="chooseUshead"> 24/7 Support</div>
                      <div className="chooseUspara">
                        Our dedicated team is available around the clock to
                        assist you with all your holiday package queries.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <AfterFooter />
      </div>
    </>
  );
}
