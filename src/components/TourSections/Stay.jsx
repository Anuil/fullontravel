import PropTypes from "prop-types"
import stay from "../../assets/images/svg/stay.svg";
import arrow from "../../assets/images/svg/arrow.svg";
import gallery from "../../assets/images/svg/gallery.svg";
import whiteStar from "../../assets/images/svg/whiteStar.svg";
import breakfast from "../../assets/images/svg/breakfast.svg";
import lunch from "../../assets/images/svg/lunch.svg";
import dinner from "../../assets/images/svg/dinner.svg";
import tick from "../../assets/images/svg/tick.svg";
import cross from "../../assets/images/svg/cross.svg";
import Slider from "react-slick";
import doubletick from "../../assets/images/svg/doubletick.svg"
const BASE_IMAGE_SRC = "https://cdn.fullontravel.com/"
import { useAccordion } from "../AccordionContext";
export default function Stay({ tourData, openAccordions, toggleAccordion, activeSection, toggleSection }) {

    const { updateGalleryImages, toggleGallery } = useAccordion();
    const handleGalleryClick = (media) => {
        const imagesdata = media;
        updateGalleryImages(imagesdata);
        toggleGallery();
    };

    const mealImages = {
        Breakfast: breakfast,
        Lunch: lunch,
        Dinner: dinner,
    };

    const stayArray = tourData?.itinerary?.locationDayGroup?.reduce((stay, item) => {
        item?.days?.forEach((day) => {
            let nightCount = 0
            day?.event?.forEach((eve) => {
                if (eve?.eventType === "HOTEL") {
                    nightCount += 1
                    const activity = {
                        nightCount: nightCount,
                        day: day?.dayNumber,
                        daytitle: day?.title,
                        startTime: eve?.startTime,
                        endTime: eve?.endTime,
                        ...eve
                    }
                    stay.push(activity);
                }
            });
        });
        return stay;
    }, []);

    const hotelList = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 3000,
        arrows: true,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1.5,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    // const normalizeImageUrl = (url) => {
    //     if (url && !url.startsWith('/')) {
    //         return 'https://cdn.fullontravel.com/' + url;
    //     }

    //     return "https://cdn.fullontravel.com" + url;

    // }
    return <>
        <div
            className={`itinerarytabContent stay ${activeSection === "tabFour" ? "active" : ""
                }`}
            onClick={() => toggleSection("tabFour")}
        >
            {
                stayArray?.map((stayData, index) => {
                    return (
                        <div className="contentPart" key={index}>
                            <div className="accordion" id={`accordionGroup-${index}`}>
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id={`accordionItem-${index}`}>
                                        <button
                                            className="accordion-button"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target={`#collapse-${index}`}
                                            aria-expanded="true"
                                            aria-controls={`collapse-${index}`}
                                        >
                                            <div className="accordionTitle">
                                                <div className="day">
                                                    <span>Day {stayData?.day}</span>
                                                </div>
                                                <div className="title">
                                                    <span>{stayData?.daytitle}</span>
                                                </div>
                                            </div>
                                        </button>
                                    </h2>
                                    <div
                                        id={`collapse-${index}`}
                                        className="accordion-collapse collapse show"
                                        aria-labelledby={`accordionItem-${index}`}
                                        data-bs-parent={`#accordionGroup-${index}`}
                                    >
                                        <div className="accordion-body">
                                            <div className="stay">
                                                <div className="basicHead">
                                                    <div className="head">
                                                        <div className="headIcon">
                                                            <img src={stay} alt="" />
                                                        </div>
                                                        <div className="headTitle">
                                                            {stayData?.title.split(' ')[0]}{' '}
                                                            <span className="lightText">{stayData?.title.substring(stayData?.title.indexOf(' ') + 1)}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="stayTimeline">
                                                    <div className="start">
                                                        <span className="head">Check In</span>
                                                        <span className="time">{stayData?.startTime}</span>
                                                    </div>
                                                    <div className="durationTimeline">
                                                        <span className="duration">{stayData?.nightCount} N</span>
                                                        <div className="line">
                                                            <span className="dot"></span>
                                                            <span className="dot"></span>
                                                        </div>
                                                    </div>
                                                    {/* <div className="divider"></div>
                                                    <div className="duration">{stayData?.nightCount}N</div>
                                                    <div className="divider"></div> */}
                                                    <div className="end">
                                                        <span className="head">Check Out</span>
                                                        <span className="time">{stayData?.endTime}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="hotelList">
                                                {stayData?.attachedEvents ? (
                                                    <div className="includedSection">
                                                        <div className="includeTitle">Meals :</div>
                                                        <div className="includeList">
                                                            {["Breakfast", "Lunch", "Dinner"].map((meal, index) => (
                                                                <div
                                                                    className={`wrapInclude ${stayData?.attachedEvents[ 0 ]?.inclusions?.includes(meal) ? "active" : ""}`}
                                                                    key={index}
                                                                >
                                                                    <div className="includeWrapper">
                                                                        <div className="includeName">
                                                                            {/* {stayData.inclusions.includes(meal) ? (
                                                                                <img src={tick} alt="Tick Icon" className="activeImg" />
                                                                            ) : (
                                                                                <img src={cross} alt="Cross Icon" className="inactiveImg" />
                                                                            )} */}
                                                                            <img src={mealImages[meal]} alt={meal} />
                                                                            {meal}
                                                                        </div>
                                                                    </div>
                                                                    <div className="vrLine"></div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ) : null}
                                                <div className="optionHeading">
                                                    Hotels are subject to availability; similar alternatives will be provided if unavailable
                                                </div>
                                                <div className="hotelCards">
                                                    <Slider {...hotelList}>
                                                        {stayData?.attachedEvents?.map((stayEvent, eventIndex) => (
                                                            <div className="item" key={eventIndex}>
                                                                <div
                                                                    className="hotelCard"
                                                                    onClick={() => handleGalleryClick(stayEvent?.media)}
                                                                >
                                                                    <div className="hotelImg">
                                                                        <img
                                                                            src={
                                                                                stayEvent?.media?.[0]?.imageUrl
                                                                                    ? `${BASE_IMAGE_SRC}${stayEvent.media[0].imageUrl}`
                                                                                    : '/path/to/default-gallery-image.jpg'
                                                                            }
                                                                            alt={stayEvent?.title || 'Hotel Image'}
                                                                        />
                                                                        <div className="imgContent">
                                                                            <div className="galleryTag">
                                                                                <img src={whiteStar} alt="Rating" />
                                                                                <span>4.5 / 5</span>
                                                                            </div>
                                                                            <div className="rating">
                                                                                <span>{stayEvent?.title || 'Hotel Name'}</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    {/* <div className="hotelName">
                                                                        {stayEvent?.title || 'Hotel Name'}
                                                                    </div> */}
                                                                    <div className="hotelmoreImg">
                                                                        {stayEvent?.media?.slice(-4).map((imageItem, imageIndex) => (
                                                                            <div
                                                                                className={`moreImg ${imageIndex === 3 ? 'lastmoreImg' : ''}`}
                                                                                key={imageIndex}
                                                                            >
                                                                                <img
                                                                                    src={`${BASE_IMAGE_SRC}${imageItem?.imageUrl}`}
                                                                                    alt={`Image ${imageIndex + 1}`}
                                                                                />
                                                                                {imageIndex === 3 && (
                                                                                    <div className="viewAllText">
                                                                                        <span>View All</span>
                                                                                    </div>
                                                                                )}
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </Slider>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })
            }

        </div>
    </>
}

Stay.propTypes = {
    tourData: PropTypes.object.isRequired,
    openAccordions: PropTypes.object.isRequired,
    toggleAccordion: PropTypes.func.isRequired,
    activeSection: PropTypes.string.isRequired,
    toggleSection: PropTypes.func.isRequired,
    onClick: PropTypes.func,
};