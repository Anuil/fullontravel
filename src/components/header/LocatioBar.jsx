import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { FreeMode, Navigation } from 'swiper/modules';
import SkeletonWrapper from "../../Components/SkeletonWrapper";
import { useGetBarDestinationsQuery } from "../../features/tour/TourApiSlice";
const BASE_IMAGE_SRC = "https://cdn.fullontravel.com/";
const BASE_SLUG = "-tour-packages";

const LocatioBar = ({ onReady }) => {
    const [destinations, setDestinations] = useState(null);
    const [visibleDestinations, setVisibleDestinations] = useState([]);
    const [isMobile, setIsMobile] = useState(false);
    const { data: Destinations } = useGetBarDestinationsQuery();

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    useEffect(() => {
        if (Destinations) {
            setDestinations(Destinations);
            onReady();
        }
    }, [Destinations]);

    useEffect(() => {
        if (destinations) {
            const initialCount = isMobile ? 5 : 11;
            setVisibleDestinations(destinations.slice(0, initialCount));

            setTimeout(() => {
                setVisibleDestinations(destinations);
            }, 100);
        }
    }, [destinations, isMobile]);

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
        modules: [ FreeMode, Navigation],
    };

    return (
        <>
            <div className="top-sticky">
                <div className="customContainer">
                    <div className="row">
                        <div className="col-12">
                            <div className="activityTop">
                                <Swiper {...swiperSettings}>
                                    {visibleDestinations.length > 0
                                        ? visibleDestinations.map((destination, index) => (
                                            <SwiperSlide key={index}>
                                                <Link
                                                    to={`holidays/${destination?.region?.toLowerCase().replace(/\s+/g, '-') + BASE_SLUG}`}
                                                    state={{ destinationId: destination?.id, description: destination?.description }}
                                                >
                                                    <div className="item">
                                                        <div className="locationCard">
                                                            {destination?.trending && (
                                                                <div className="trendTag">Trending</div>
                                                            )}
                                                            <div className="imgWrapper">
                                                                <img
                                                                    src={`${BASE_IMAGE_SRC + destination?.iconImageUrl}`}
                                                                    alt={destination?.region}
                                                                    loading={index >= (isMobile ? 5 : 11) ? "lazy" : "eager"}
                                                                />
                                                            </div>
                                                            <div className="locationnDetails">
                                                                <div className="title"><span>{destination?.region}</span></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </SwiperSlide>
                                        ))
                                        : Array.from({ length: isMobile ? 5 : 11 }).map((_, index) => (
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
                                        ))}
                                </Swiper>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LocatioBar;