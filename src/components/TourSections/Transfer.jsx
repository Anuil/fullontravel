import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import stay from "../../assets/images/svg/stay.svg";
import car from "../../assets/images/svg/car.svg";
import routeFlight from "../../assets/images/svg/routeFlight.svg";
import LocationOrange from "../../assets/images/svg/locationOrange.svg";
import circlePoint from "../../assets/images/svg/circle.svg";
import nature from "../../assets/images/svg/nature.svg";
import updown from "../../assets/images/svg/updown.svg";

export default function Transfer({ tourData, openAccordions, toggleAccordion, activeSection, toggleSection }) {
    const [viewMoreStates, setViewMoreStates] = useState({});

    const transferText = (event, eventIndex) => {
        switch (eventIndex) {
            case 0:
                return "From";
            case event?.length - 1:
                return "To";
            default:
                return "";
        }
    };

    const transferTitleIcon = (event) => {
        switch (event?.toLowerCase()) {
            case "airport":
                return <img src={routeFlight} alt="" />;
            case "hotel":
                return <img src={stay} alt="" />;
            case "location_point":
                return <img src={nature} alt="" />;
            default:
                return <img src={car} alt="" />;
        }
    };

    const toggleViewMore = (key) => {
        setViewMoreStates((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    return (
        <div
            className={`itinerarytabContent transfers ${activeSection === "tabFive" ? "active" : ""}`}
            onClick={() => toggleSection("tabFive")}
        >
            {tourData?.itinerary?.locationDayGroup?.map((dayGroup, index) => (
                <div className="contentPart" key={index}>
                    <div className="accordion" id={`accordionGroup-${index}`}>
                        {dayGroup?.days?.map((day, valIndex) => {
                            const accordionId = `accordionItem-${index}-${valIndex}`;
                            const accordionTargetId = `collapse-${index}-${valIndex}`;
                            return (
                                <div className="accordion-item" key={valIndex}>
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
                                            {/* <p>{day?.description}</p> */}
                                            {/* Sorting and mapping events */}
                                            {day?.event?.map((transferData, eventIndex) => {
                                                if (transferData?.eventType === "TRANSFER") {
                                                    const firstIndex = 0;
                                                    const lastIndex = transferData?.eventData?.length - 1;
                                                    const viewMoreKey = `day-${index}-event-${eventIndex}`;

                                                    return (
                                                        <div className="details" key={eventIndex}>
                                                            <div className="transfer">
                                                                <div className="basicHead">
                                                                    <div className="head">
                                                                        <div className="headIcon">
                                                                            <img src={car} alt="" />
                                                                        </div>
                                                                        <div className="headTitle">
                                                                            {transferData?.transportMode} {transferData?.title.split(' ')[0]}{' '}
                                                                            <span className="lightText">{transferData?.title.substring(transferData?.title.indexOf(' ') + 1)}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="destinationTimeline">
                                                                    <div className="primeTimeLine">
                                                                        <div className="iconImage">
                                                                            <img src={LocationOrange} alt="" />
                                                                        </div>
                                                                        <div className="timeline">
                                                                            <div className="transferIndicator">
                                                                                {transferText(transferData?.eventData, firstIndex)}
                                                                            </div>
                                                                            <div className="transferWrapper">
                                                                                <div className="transferTitle">
                                                                                    <div className="icon">
                                                                                        {transferTitleIcon(transferData?.eventData[firstIndex]?.eventType)}
                                                                                    </div>
                                                                                    <div className="title">
                                                                                        <Link
                                                                                            to={transferData?.eventData[firstIndex]?.mapUrl}
                                                                                            target="blank"
                                                                                        >
                                                                                            {transferData?.eventData[firstIndex]?.title}
                                                                                        </Link>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    {transferData?.eventData?.length > 2 && (
                                                                        <>
                                                                            <div className="viewMoreBtn">
                                                                                <button
                                                                                    className="viewMoreButton"
                                                                                    onClick={() => toggleViewMore(viewMoreKey)}
                                                                                >
                                                                                    <img src={updown} alt="" />
                                                                                    <span>
                                                                                        {viewMoreStates[viewMoreKey]
                                                                                            ? transferData?.eventData?.length - 2 > 0
                                                                                                ? `Close ${transferData?.eventData?.length - 2} ${transferData?.eventData?.length - 2 === 1 ? "Stop" : "Stops"
                                                                                                }`
                                                                                                : "Close Stop"
                                                                                            : transferData?.eventData?.length - 2 > 0
                                                                                                ? `View ${transferData?.eventData?.length - 2} ${transferData?.eventData?.length - 2 === 1 ? "Stop" : "Stops"
                                                                                                }`
                                                                                                : "View Stop"}
                                                                                    </span>
                                                                                </button>
                                                                                <div className={`viewMoreContent ${viewMoreStates[viewMoreKey] ? "show" : "hide"}`}>
                                                                                    <div className="forMobileBack">
                                                                                        <button className="closeBtn" onClick={() => toggleViewMore(viewMoreKey)}>
                                                                                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="x" className="svg-inline--fa fa-x " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z"></path></svg>
                                                                                        </button>
                                                                                        {transferData?.eventData?.slice(1, -1).map((event, innerIndex) => (
                                                                                            <div className="primeTimeLine" key={innerIndex + 1}>
                                                                                                <div className="iconImage">
                                                                                                    <img src={circlePoint} alt="" />
                                                                                                </div>
                                                                                                <div className="timeline">
                                                                                                    <div className="transferWrapper">
                                                                                                        <div className="transferTitle">
                                                                                                            <div className="icon">
                                                                                                                {transferTitleIcon(event?.eventType)}
                                                                                                            </div>
                                                                                                            <div className="title">
                                                                                                                <Link
                                                                                                                    to={event?.mapUrl}
                                                                                                                    target="blank"
                                                                                                                >
                                                                                                                    {event?.title}
                                                                                                                </Link>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        ))}
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </>
                                                                    )}

                                                                    <div className="primeTimeLine">
                                                                        <div className="iconImage">
                                                                            <img src={LocationOrange} alt="" />
                                                                        </div>
                                                                        <div className="timeline">
                                                                            <div className="transferIndicator">
                                                                                {transferText(transferData?.eventData, lastIndex)}
                                                                            </div>
                                                                            <div className="transferWrapper">
                                                                                <div className="transferTitle">
                                                                                    <div className="icon">
                                                                                        {transferTitleIcon(transferData?.eventData[lastIndex]?.eventType)}
                                                                                    </div>
                                                                                    <div className="title">
                                                                                        <Link
                                                                                            to={transferData?.eventData[lastIndex]?.mapUrl}
                                                                                            target="blank"
                                                                                        >
                                                                                            {transferData?.eventData[lastIndex]?.title}
                                                                                        </Link>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
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
            ))}

        </div>
    );
}

Transfer.propTypes = {
    tourData: PropTypes.object.isRequired,
    openAccordions: PropTypes.object.isRequired,
    toggleAccordion: PropTypes.func.isRequired,
    activeSection: PropTypes.string.isRequired,
    toggleSection: PropTypes.func.isRequired,
};
