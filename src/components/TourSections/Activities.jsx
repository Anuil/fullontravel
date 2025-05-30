
import Slider from "react-slick";
import { useState } from "react";
import PropTypes from 'prop-types'
import balloon from "../../assets/images/svg/adventure.svg";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Navigation, EffectCoverflow } from 'swiper/modules';
import { useAccordion } from "../../Components/AccordionContext";

const BASE_IMAGE_SRC = "https://cdn.fullontravel.com/"
export default function Activities({ tourData, openAccordions, toggleAccordion, activeSection, toggleSection }) {

    const PrevArrow = ({ onClick }) => (
        <button
            className="slick-prev"
            onClick={onClick}
        >
            &#10094;
        </button>
    );
    const NextArrow = ({ onClick }) => (
        <button
            className="slick-next"
            onClick={onClick}
        >
            &#10095;
        </button>
    );
    const settings = {
        dots: false,
        infinite: false,
        arrows: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 525,
                settings: {
                    arrows: false,
                },
            },
        ],
    };

    // const ModeSettings = {
    //     effect: 'coverflow',
    //     grabCursor: true,
    //     centeredSlides: true,
    //     initialSlide: 1,
    //     spaceBetween: -30,
    //     loop: true,
    //     coverflowEffect: {
    //         rotate: 30,
    //         stretch: 15,
    //         depth: 200,
    //         modifier: 1,
    //         slideShadows: true,
    //     },
    //     breakpoints: {
    //         767: { slidesPerView: 3 },
    //         360: { slidesPerView: 2 }
    //     },
    //     observer: true,
    //     observeParents: true,
    //     navigation: false,
    //     modules: [EffectCoverflow, Navigation],
    // };

    const ModeSettings = {
        spaceBetween: 10,
        loop: false,
        breakpoints: {
            767: { slidesPerView: 3.2 },
            576: { slidesPerView: 2.2 },
            360: { slidesPerView: 1.5 }
        },
        navigation: false,
        modules: [Navigation],
    };

    const [isExpanded, setIsExpanded] = useState(false);

    const handleshowToggle = () => {
        setIsExpanded(!isExpanded);
    };


    // const duplicateCards = (cards, targetCount) => {
    //     const cardCount = cards.length;
    //     if (cardCount >= targetCount) return cards;

    //     const duplicatedCards = [...cards];
    //     let i = 0;

    //     while (duplicatedCards.length < targetCount) {
    //         duplicatedCards.push(cards[i % cardCount]);
    //         i++;
    //     }

    //     return duplicatedCards;
    // };

    const { updateGalleryImages, toggleGallery } = useAccordion();
    const handleGalleryClick = (media) => {
        const imagesdata = media.filter((val) => val?.isAttractionPoint).map((val) => val);
        updateGalleryImages(imagesdata);
        toggleGallery();
    };

    return <>
        <div className={`itinerarytabContent activities ${activeSection === "tabThree" ? "active" : ""}`}
            onClick={() => toggleSection("tabThree")}>
            {tourData?.itinerary?.locationDayGroup?.map((dayGroup, index) => {
                // Check if the contentPart has any valid accordion data
                const hasValidContent = dayGroup?.days?.some((day) =>
                    day?.event?.some(
                        (transferData) =>
                            transferData?.eventType === "ACTIVITY" &&
                            transferData?.attachedEvents?.some((attachedEvent) =>
                                attachedEvent?.media?.some((mediaItem) => mediaItem?.isAttractionPoint === true)
                            )
                    )
                );

                // If no valid content, skip rendering this contentPart
                if (!hasValidContent) {
                    return null;
                }

                return (
                    <div className="contentPart" key={index}>
                        <div className="accordion" id={`accordionGroup-${index}`}>
                            {dayGroup?.days?.map((day, dayIndex) => {
                                const accordionId = `accordionItem-${index}-${dayIndex}`;
                                const accordionTargetId = `collapse-${index}-${dayIndex}`;

                                // Check if the accordion has any valid data
                                const hasValidAccordion = day?.event?.some(
                                    (transferData) =>
                                        transferData?.eventType === "ACTIVITY" &&
                                        transferData?.attachedEvents?.some((attachedEvent) =>
                                            attachedEvent?.media?.some((mediaItem) => mediaItem?.isAttractionPoint === true)
                                        )
                                );

                                return (
                                    <div
                                        className="accordion-item"
                                        key={dayIndex}
                                        style={{ display: hasValidAccordion ? "block" : "none" }} // Hide accordion if no valid data
                                    >
                                        <h2 className="accordion-header" id={accordionId}>
                                            <button
                                                className="accordion-button"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target={`#${accordionTargetId}`}
                                                aria-expanded="true"
                                                aria-controls={accordionTargetId}
                                            >
                                                <div className="accordionTitle">
                                                    <div className="day">
                                                        <span>Day {day?.dayNumber}</span>
                                                    </div>
                                                    <div className="title">
                                                        <span>{day?.title}</span>
                                                    </div>
                                                </div>
                                            </button>
                                        </h2>
                                        <div
                                            id={accordionTargetId}
                                            className="accordion-collapse collapse show"
                                            aria-labelledby={accordionId}
                                            data-bs-parent={`#accordionGroup-${index}`}
                                        >
                                            <div className="accordion-body">
                                                {day?.event?.map((transferData, transferIndex) => {
                                                    if (
                                                        transferData?.eventType === "ACTIVITY" &&
                                                        transferData?.attachedEvents?.some(attachedEvent =>
                                                            attachedEvent?.media?.some((mediaItem) => mediaItem?.isAttractionPoint === true)
                                                        )
                                                    ) {
                                                        return (
                                                            <div key={transferIndex}>
                                                                {transferData?.attachedEvents?.map((event, eventIndex) => (
                                                                    <div className="details" key={eventIndex}>
                                                                        <div className="activity">
                                                                            <div className="activitySilder">
                                                                                {event?.media?.filter((act) => act?.isAttractionPoint === true).length > 0 ? (
                                                                                    <div className="basicHead">
                                                                                        <div className="head">
                                                                                            <div className="headIcon">
                                                                                                <img src={balloon} alt="" />
                                                                                            </div>
                                                                                            <div className="headTitle">Activity : <span className="lightText">{event?.title}</span></div>
                                                                                        </div>
                                                                                    </div>
                                                                                ) : null}
                                                                                {event?.media?.filter((act) => act?.isAttractionPoint === true).length > 0 ? (
                                                                                    <div className="amazingExp">
                                                                                        {event?.description && (
                                                                                            <div className={`desc ${isExpanded ? 'show' : ''}`}>
                                                                                                <p>{event.description}</p>
                                                                                                <button className="readMore" onClick={handleshowToggle}>
                                                                                                    {isExpanded ? 'Read Less' : '...Read More'}
                                                                                                </button>
                                                                                            </div>
                                                                                        )}
                                                                                        <div className="optionHeading">
                                                                                            You’ll get to explore these incredible experiences
                                                                                        </div>
                                                                                        <Swiper {...ModeSettings}>
                                                                                            {event?.media?.filter((val) => val?.isAttractionPoint).map((val, valIndex) => {
                                                                                                return (
                                                                                                    <SwiperSlide key={valIndex}>
                                                                                                        <div className="lazerSubCard">
                                                                                                            <div className="lazercardImg">
                                                                                                                <img
                                                                                                                    src={`${BASE_IMAGE_SRC + val?.imageUrl}`}
                                                                                                                    alt={val?.title}
                                                                                                                />
                                                                                                            </div>
                                                                                                            {val?.description && (
                                                                                                                <p>{val?.description}</p>
                                                                                                            )}
                                                                                                        </div>
                                                                                                    </SwiperSlide>
                                                                                                )
                                                                                            }
                                                                                            )}
                                                                                            <div className="totalImgview">
                                                                                                {event?.media
                                                                                                    ?.filter((val) => val?.isAttractionPoint)
                                                                                                    .slice(-4)
                                                                                                    .map((image, index) => (
                                                                                                        <div
                                                                                                            className="imgDiv"
                                                                                                            key={index}
                                                                                                            onClick={() => handleGalleryClick(event?.media)}
                                                                                                        >
                                                                                                            <img src={`${BASE_IMAGE_SRC + image?.imageUrl}`} alt="" />
                                                                                                        </div>
                                                                                                    ))}
                                                                                            </div>
                                                                                        </Swiper>
                                                                                    </div>
                                                                                ) : null}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        );
                                                    }
                                                    return null;
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    </>
}

Activities.propTypes = {
    tourData: PropTypes.object.isRequired,
    openAccordions: PropTypes.object.isRequired,
    toggleAccordion: PropTypes.func.isRequired,
    activeSection: PropTypes.string.isRequired,
    toggleSection: PropTypes.func.isRequired,
    onClick: PropTypes.func,
};
