// import car from "../../assets/images/tour_includes/transfers.png";
// import stay from "../../assets/images/tour_includes/stay.png";
// import balloon from "../../assets/images/tour_includes/adventure.png";
import balloon from "../../assets/images/svg/adventure.svg";
import car from "../../assets/images/svg/car.svg";
import stay from "../../assets/images/svg/stay.svg";

import { useEffect, useState } from "react";

import PropTypes from 'prop-types';

export default function Summery({ tourData, activeSection, toggleSection }) {
    // To manage event type counts
    const [eventCounts, setEventCounts] = useState({ activity: 0, transfer: 0, hotels: 0 });
    useEffect(() => {
        const numberOfEvents = () => {
            let transfer = 0;
            let activity = 0;
            let hotels = 0;

            tourData?.itinerary?.locationDayGroup?.forEach((val) => {
                val?.days?.forEach((day) => {
                    day?.event?.forEach((event) => {
                        switch (event?.eventType) {
                            case "HOTEL":
                                hotels += 1;
                                break;
                            case "ACTIVITY":
                                activity += 1;
                                break;
                            case "TRANSFER":
                                transfer += 1;
                                break;
                        }
                    });
                });
            });

            return { activity, transfer, hotels };
        };

        setEventCounts(numberOfEvents());
    }, [tourData]);
    return <>

        <div className={`itinerarytabContent summarised ${activeSection === "tabTwo" ? "active" : ""}`}
            onClick={() => toggleSection("tabTwo")}>
            <div className="tripSummary">
                <div className="summaryHead">
                    <h2>Trip Summary</h2>
                    <div className="bottomSection">
                        <div className="events">
                            <div className="icon">
                                <img src={balloon} alt="" />
                            </div>
                            <div className="name">{eventCounts.activity > 1 ? `${eventCounts.activity} Activities` : `${eventCounts.activity} Activity`}</div>
                        </div>
                        <div className="divider" />
                        <div className="events">
                            <div className="icon">
                                <img src={car} alt="" />
                            </div>
                            <div className="name">{eventCounts.transfer > 1 ? `${eventCounts.transfer} Transfers` : `${eventCounts.transfer} Transfer`}</div>
                        </div>
                        <div className="divider" />
                        <div className="events">
                            <div className="icon">
                                <img src={stay} alt="" />
                            </div>
                            <div className="name">{eventCounts.hotels > 1 ? `${eventCounts.hotels} Hotels` : `${eventCounts.hotels} Hotel`}</div>
                        </div>
                    </div>
                </div>
                {tourData?.itinerary?.locationDayGroup?.map((item, itemIndex) => {
                    return <div className="itineraryDay" key={itemIndex}>
                        {item?.days?.map((day, dayIndex) => {
                            const sortedEvents = [...day.event].sort((a, b) => {
                                if (a.eventType === "LEISUREDAY") return 1;
                                if (b.eventType === "LEISUREDAY") return -1;
                                return 0;
                            });
                            return <div key={dayIndex}>
                                <div className="dayHeader">
                                    <h4>Day {day?.dayNumber} - {day?.title}</h4>
                                    <div className="dayEvent">
                                        {(() => {
                                            const eventCounts = day?.event?.reduce((acc, event) => {
                                                const eventType = event?.eventType;
                                                if (eventType) {
                                                    acc[eventType] = (acc[eventType] || 0) + 1;
                                                }
                                                return acc;
                                            }, {});

                                            return Object.entries(eventCounts).map(([eventType, count]) => {
                                                
                                                const renderEventType = (type) => {
                                                    switch (type) {
                                                        case "TRANSFER":
                                                            return (
                                                                <div className="eventCount" key={type}>
                                                                    <span className="count">{count}</span>
                                                                    <img src={car} alt="Transfer Icon" />
                                                                    <div className="divider"></div>
                                                                </div>
                                                            );
                                                        case "HOTEL":
                                                            return (
                                                                <div className="eventCount" key={type}>
                                                                    <span className="count">{count}</span>
                                                                    <img src={stay} alt="Hotel Icon" />
                                                                    <div className="divider"></div>
                                                                </div>
                                                            );
                                                        case "ACTIVITY":
                                                            return (
                                                                <div className="eventCount" key={type}>
                                                                    <span className="count">{count}</span>
                                                                    <img src={balloon} alt="Activity Icon" />
                                                                    <div className="divider"></div>
                                                                </div>
                                                            );
                                                        default:
                                                            return null;
                                                    }
                                                };
                                                return renderEventType(eventType);
                                            });
                                        })()}
                                    </div>
                                </div>
                                <div className="dayContent">
                                    {sortedEvents.sort((a, b) => a.position - b.position).map((event, eventIndex) => {
                                        // console.log("eventtt: ",event);
                                        
                                        const getEventTitle = (event) => {
                                            if (event.eventType === "TRANSFER" && event?.eventData?.length) {
                                                const startLocation = event?.eventData[0]?.title;
                                                const endLocation =
                                                    event?.eventData[event?.eventData?.length - 1]?.title;
                                                return (
                                                    <div className="rightSection" key={eventIndex}>
                                                        <div className="eventTitle">
                                                            Transfer:
                                                            <span className="singleEvent">
                                                                {`${startLocation} to ${endLocation}`}
                                                            </span>
                                                        </div>
                                                    </div>
                                                );
                                            }
                                            if (event.eventType === "HOTEL" && event?.title) {
                                                return (
                                                    <div className="rightSection" key={eventIndex}>
                                                        <div className="eventTitle">
                                                            Hotel:
                                                            <span className="singleEvent">{event?.title}</span>
                                                        </div>
                                                    </div>
                                                );
                                            }
                                            if (event.eventType === "ACTIVITY") {
                                                const activities = [];
                                                event?.attachedEvents?.map((attachedEvent, index) => {
                                                    const activityDiv = (
                                                        <div className="rightSection" key={index}>
                                                            <div className="eventTitle">
                                                                Activity:
                                                                <span className="singleEvent">
                                                                    {attachedEvent?.title}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    );
                                                    activities?.push(activityDiv);
                                                });
                                                return activities;
                                            }
                                            if (event.eventType === "LEISUREDAY") {
                                                return (
                                                    <div className="rightSection" key={eventIndex}>
                                                        <div className="leisure_day">
                                                            <div className="leisureHead">
                                                                <div className="svgDiv">
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        width="13"
                                                                        height="20"
                                                                        viewBox="0 0 13 20"
                                                                        fill="none"
                                                                    >
                                                                        <path
                                                                            d="M7.29998 11.6472H6.22571V14.87H9.44852V13.7957H7.29998V11.6472Z"
                                                                            fill="#027FB1"
                                                                        ></path>
                                                                        <path
                                                                            d="M7.2999 9.52867V8.38859H10.5227V5.82878L13 0.832886H0.525513L3.00282 5.82878V8.38859H6.22563V9.52867C3.81188 9.79674 1.92855 11.8488 1.92855 14.3329C1.92855 16.9985 4.09717 19.1671 6.76276 19.1671C9.42835 19.1671 11.597 16.9985 11.597 14.3329C11.597 11.8488 9.71364 9.79674 7.2999 9.52867ZM7.09596 5.16578L5.48012 1.90716H7.50383L9.11967 5.16578H7.09596ZM9.98557 4.49382L8.70293 1.90716H11.2682L9.98557 4.49382ZM2.25731 1.90716H4.28102L5.89686 5.16578H3.87315L2.25731 1.90716ZM4.07709 6.24005H9.44844V7.31432H4.07709V6.24005ZM6.76276 18.0928C4.68953 18.0928 3.00282 16.4061 3.00282 14.3329C3.00282 12.2596 4.68953 10.5729 6.76276 10.5729C8.836 10.5729 10.5227 12.2596 10.5227 14.3329C10.5227 16.4061 8.836 18.0928 6.76276 18.0928Z"
                                                                            fill="#027FB1"
                                                                        ></path>
                                                                    </svg>
                                                                </div>
                                                                <div className="leisureLabel">
                                                                    Spend your time at leisure
                                                                </div>
                                                                <div className="svgDiv">
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        width="15"
                                                                        height="15"
                                                                        viewBox="0 0 15 15"
                                                                        fill="none"
                                                                    >
                                                                        <path
                                                                            d="M5.92105 0L6.96776 4.87435L11.8421 5.92105L6.96776 6.96776L5.92105 11.8421L4.87435 6.96776L0 5.92105L4.87435 4.87435L5.92105 0Z"
                                                                            fill="url(#paint0_linear_3598_9825)"
                                                                        ></path>
                                                                        <path
                                                                            d="M11.8454 7.89453L12.4036 10.4942L15.0033 11.0524L12.4036 11.6107L11.8454 14.2103L11.2872 11.6107L8.6875 11.0524L11.2872 10.4942L11.8454 7.89453Z"
                                                                            fill="url(#paint1_linear_3598_9825)"
                                                                        ></path>
                                                                        <defs>
                                                                            <linearGradient
                                                                                id="paint0_linear_3598_9825"
                                                                                x1="5.92105"
                                                                                y1="0"
                                                                                x2="5.92105"
                                                                                y2="11.8421"
                                                                                gradientUnits="userSpaceOnUse"
                                                                            >
                                                                                <stop stopColor="#F47625"></stop>
                                                                                <stop offset="1" stopColor="#FFBA0A"></stop>
                                                                            </linearGradient>
                                                                            <linearGradient
                                                                                id="paint1_linear_3598_9825"
                                                                                x1="11.8454"
                                                                                y1="7.89453"
                                                                                x2="11.8454"
                                                                                y2="14.2103"
                                                                                gradientUnits="userSpaceOnUse"
                                                                            >
                                                                                <stop stopColor="#F47625"></stop>
                                                                                <stop offset="1" stopColor="#FFBA0A"></stop>
                                                                            </linearGradient>
                                                                        </defs>
                                                                    </svg>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            }
                                            return null;
                                        };

                                        const eventTitle = getEventTitle(event);
                                        if (!eventTitle) return null;

                                        const getIcon = (eventType) => { switch (eventType) { case "TRANSFER": return car; case "HOTEL": return stay; case "ACTIVITY": return balloon; default: return null; } };

                                        const icon = getIcon(event?.eventType);

                                        return (
                                            <div className="dayEvent" key={event.id}>
                                                <div
                                                    className="leftSection"
                                                    style={{ display: icon ? "flex" : "none" }}
                                                >
                                                    {icon && <img src={icon} alt="" />}
                                                </div>
                                                {eventTitle}
                                            </div>
                                        );
                                    })}
                                </div>

                            </div>
                        })}

                    </div>
                })
                }
            </div>
        </div>

    </>
}


Summery.propTypes = {
    tourData: PropTypes.object.isRequired,
    activeSection: PropTypes.string.isRequired,
    toggleSection: PropTypes.func.isRequired,
};