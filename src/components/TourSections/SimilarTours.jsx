import PropTypes from "prop-types";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faHeart } from "@fortawesome/free-solid-svg-icons";
import Slider from "react-slick";
import flights from "../../assets/images/svg/flights.svg";
import hotel from "../../assets/images/svg/hotel.svg";
import meal from "../../assets/images/svg/meal.svg";
import sightsee from "../../assets/images/svg/sightsee.svg";
import transport from "../../assets/images/svg/transport.svg";
import visa from "../../assets/images/svg/visa.svg";
import comment from "../../assets/images/svg/comment.svg";
import { useGetSimilarToursQuery } from "../../features/tour/TourApiSlice";

const BASE_IMAGE_SRC = "https://cdn.fullontravel.com/"
export default function SimilarTours({ tourSlug }) {

    const { data: SimilarTours } = useGetSimilarToursQuery({ tourSlug })
    const Thrillsettings = {
        dots: false,
        infinite: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 2
                },
            },
            {
                breakpoint: 769,
                settings: {
                    slidesToShow: 1.7
                },
            },
            {
                breakpoint: 577,
                settings: {
                    slidesToShow: 1.3,
                    arrows: false,
                },
            },
            {
                breakpoint: 425,
                settings: {
                    slidesToShow: 1.1,
                    arrows: false,
                },
            },
        ],
    };

    const [wishlist, setWishlist] = useState({});

    const toggleWishlist = (tourIndex) => {
        setWishlist((prevState) => ({
            ...prevState,
            [tourIndex]: !prevState[tourIndex],
        }));
    };
    const facilitiesConfig = {
        stay: { label: "Hotel", image: hotel },
        breakfast: { label: "Meals", image: meal },
        transfer: { label: "Transport", image: transport },
        sightseeing: { label: "Sightseeing", image: sightsee },
        flight: { label: "Flight", image: flights },
        visa: { label: "Visa", image: visa },
    };

    return <>
        {
            SimilarTours?.tours?.length > 0 ? <div className="relatedProducts">
                <h4>Similar Tours</h4>
                <div className="allProducts">
                    <Slider {...Thrillsettings}>
                        {
                            SimilarTours?.tours?.map((tour, tourIndex) => {
                                function parseItineraryToArray(itineraryInfo) {
                                    const groupedItinerary = [];
                                    let currentPlace = null;
                                    let count = 0;

                                    for (const place of itineraryInfo) {
                                        if (place === currentPlace) {
                                            count++;
                                        } else {
                                            if (currentPlace) {
                                                groupedItinerary.push({ place: currentPlace, count });
                                            }
                                            currentPlace = place;
                                            count = 1;
                                        }
                                    }
                                    if (currentPlace) {
                                        groupedItinerary.push({ place: currentPlace, count });
                                    }

                                    return groupedItinerary;
                                }
                                const groupedArray = parseItineraryToArray(tour?.itineraryInfo);
                                const randomNumber = Math.floor(Math.random() * 51) + 100;
                                return <div className="item" key={tourIndex}>
                                    <div className="productCard">
                                        <div className="productImage">
                                            <Link to={`/tours/${tour?.slug}`} target="_blank">
                                                <img
                                                    src={BASE_IMAGE_SRC + tour?.tourImageUrl}
                                                    alt=""
                                                    className="offerImg"
                                                />
                                            </Link>
                                            {
                                                tour?.groupTour && (
                                                    <div className="tours">Group Tour</div>
                                                )
                                            }
                                        </div>
                                        <div className="productDetails">
                                            <div className="productDuration_reviews">
                                                <Link to={`/tours/${tour?.slug}`} target="_blank">
                                                    <div className="productName">{tour?.name}</div>
                                                </Link>
                                                <div className="duration">{tour?.day}D/{tour?.day - 1}N</div>
                                            </div>
                                            <div className="reviewWish">
                                                <div className="product_reviews">
                                                    <div className="stars">
                                                        {(() => {
                                                            const randomRating = (Math.random() * 1 + 4).toFixed(1);
                                                            const fullStars = Math.floor(randomRating);
                                                            const hasHalfStar = randomRating - fullStars >= 1;

                                                            const stars = Array(fullStars)
                                                                .fill(null)
                                                                .map((_, index) => <FontAwesomeIcon key={`full-${index}`} style={{ color: "#f37002" }} icon={faStar} />);

                                                            if (hasHalfStar) {
                                                                stars.push(<FontAwesomeIcon key="half" icon={faStar} />);
                                                            }

                                                            const emptyStarsCount = 5 - stars.length;
                                                            for (let i = 0; i < emptyStarsCount; i++) {
                                                                stars.push(<FontAwesomeIcon key={`empty-${i}`} style={{ color: "rgb(193 193 193)" }} icon={faStar} />);
                                                            }

                                                            return stars;
                                                        })()}
                                                    </div>
                                                    <div className="reviewCount">{randomNumber} Reviews</div>
                                                </div>
                                                <div className="wishlist">
                                                    <button onClick={() => toggleWishlist(tourIndex)}>
                                                        <FontAwesomeIcon
                                                            icon={wishlist[tourIndex] ? faHeart : faHeart}
                                                            style={{ color: wishlist[tourIndex] ? "red" : "rgb(193 193 193)" }} // Optional: style icon color
                                                        />
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="listWrap">
                                                <ul className="tripListWrapper">
                                                    {groupedArray?.map((group, groupIndex) => (
                                                        <li key={groupIndex}>
                                                            <div className="city">
                                                                <span className="days">{group?.count}D</span>
                                                                <span>{group?.place}</span>
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>
                                                <div className="fewmore">
                                                    ...
                                                    <div className="count">+3</div>
                                                </div>
                                            </div>
                                            <div className="facility">
                                                <div className="allFacility">
                                                    {Object.entries(facilitiesConfig).map(([key, value]) => {
                                                        if (tour?.facility[key]) {
                                                            return (
                                                                <div className="facilityType" key={key}>
                                                                    <div className="facilitySvg">
                                                                        <img src={value.image} alt="" className="svgImg" />
                                                                    </div>
                                                                    {value.label}
                                                                </div>
                                                            );
                                                        }
                                                        return null;
                                                    })}
                                                </div>
                                            </div>
                                            <div className="productButton">
                                                <div className="productPrice">
                                                    <div className="priceText">Starting from</div>
                                                    {tour?.discount > 0 && (
                                                        <div className="discountPrice">
                                                            ₹ {tour?.price}
                                                        </div>
                                                    )}
                                                    <div className="realPrice">₹ {tour?.price - tour?.discount}</div>
                                                    <div className="tagText">Per Person</div>
                                                </div>
                                                <div className="calltoaction">
                                                    <div className="offer">
                                                        <Link to={`/tours/${tour?.slug}`} target="_blank" className="offerButton">View Detail</Link>
                                                    </div>
                                                    <div className="expert">
                                                        <button onClick={() => setIsModalVisible(true)}>
                                                            <img src={comment} alt="" />
                                                            Talk to a Travel Expert
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            })
                        }
                    </Slider>
                </div>
            </div> : ""
        }

    </>
}

SimilarTours.propTypes = {
    onClick: PropTypes.func,
    tourSlug: PropTypes.string,
};