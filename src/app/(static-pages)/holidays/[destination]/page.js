import Link from "next/link";
import { getAllTours, getDestination, getDestinations } from "../../../../lib/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faStar, faHeart, faXmark } from "@fortawesome/free-solid-svg-icons";
import ReviewSection from "../../../../components/Reviews/ReviewSection";
import AfterFooter from "../../../../components/footer/AfterFooter";
import SkeletonWrapper from "../../../../components/SkeletonWrapper";
import NotFound from "../../../../components/NotFound"

// File: app/(static-pages)/holidays/[destination]/page.js
export default async function FilterSection({ params, searchParams }) {
  console.log(",params",params,searchParams)
  const destination = await params.destination;
  const vacationTypeId = searchParams?.vacationTypeId
  const groupTour = searchParams?.groupTour
  console.log("vacationTypeId",searchParams?.vacationTypeId)
  console.log("groupTour",searchParams?.groupTour)


  const page = await searchParams?.page || 1;
  const pageSize = 12;
const API_BASE_URL = 'https://api.fullontravel.com/api/'
const BASE_IMAGE_SRC = "https://cdn.fullontravel.com/"
const BASE_SLUG = "-tour-packages";
const  wishlist  = 'test';  
//  const facilitiesConfig = {
//         stay: { label: "Hotel", image: hotel },
//         breakfast: { label: "Meals", image: meal },
//         transfer: { label: "Transport", image: transport },
//         sightseeing: { label: "Sightseeing", image: sightsee },
//         flight: { label: "Flight", image: flights },
//         visa: { label: "Visa", image: visa },
//     };

  const baseUrl = API_BASE_URL;
  if (!baseUrl) {
    throw new Error("API_BASE_URL is not defined in .env");
  }

  const apiUrl = new URL(`${baseUrl}tour/`);
  apiUrl.searchParams.set("page", page);
  apiUrl.searchParams.set("pageSize", pageSize);

  // if (destinationName !== "all") {
  //   apiUrl.searchParams.set("destinationId", 'destinationName');
  // }

  // Optional filters
  if (searchParams?.vacationTypeId) apiUrl.searchParams.set("vacationTypeId", searchParams.vacationTypeId);
  if (searchParams?.priceFrom) apiUrl.searchParams.set("priceFrom", searchParams.priceFrom);
  if (searchParams?.priceTo) apiUrl.searchParams.set("priceTo", searchParams.priceTo);
  if (searchParams?.dayFrom) apiUrl.searchParams.set("dayFrom", searchParams.dayFrom);
  if (searchParams?.dayTo) apiUrl.searchParams.set("dayTo", searchParams.dayTo);
  if (searchParams?.groupTour) apiUrl.searchParams.set("groupTour", searchParams.groupTour);
  if (searchParams?.groupTourMonth) apiUrl.searchParams.set("groupTourMonth", searchParams.groupTourMonth);
  if (searchParams?.sortByDayDesc) apiUrl.searchParams.set("sortByDayDesc", searchParams.sortByDayDesc);
  if (searchParams?.sortByDayAsc) apiUrl.searchParams.set("sortByDayAsc", searchParams.sortByDayAsc);

  console.log(apiUrl)
  console.log("vacationTypeId",searchParams?.vacationTypeId)
  console.log("groupTour",searchParams?.groupTour)

  // const res = await fetch(apiUrl.href, {
  //   next: { revalidate: 0 }, // disables caching
  // });

  // if (!res.ok) {
  //   throw new Error("Failed to fetch tours");
  // }

  // const data = await res.json();

   
    // API Calls
    const destinationName = destination?.split('-')
        .filter((word) => word !== 'tour' && word !== 'packages' && word !== 'destinations')
        .join(' ');

    console.log("destinationName222222",destinationName)
    let selectedDestination = "";
    if(destinationName != 'all'){
      selectedDestination = await getDestination(destinationName);
      console.log("destinationRes",selectedDestination)
    }

    const generateExcerpt = () => {

        const baseText = selectedDestination?.description || "";
        setFullText(baseText);

        const wordLimit = window.innerWidth < 992 ? 15 : 50;
        const words = baseText.split(" ");

        if (words.length > wordLimit) {
            setIsButtonVisible(true);
            setExcerpt(words.slice(0, wordLimit).join(" ") + "...");
        } else {
            setIsButtonVisible(false);
            setExcerpt(baseText);
        }
    };

    generateExcerpt

     const allToursRes = await getAllTours(selectedDestination,vacationTypeId,groupTour);
  
    const allTours = allToursRes?.data || allToursRes;
    console.log("allTours",allTours)


    const isLoadingTours = false
    const isNotFound = false;

    let filterBannerImg = "";
    if (allTours?.length > 0) {
      const randomIndex = Math.floor(Math.random() * allTours.length);
      filterBannerImg = BASE_IMAGE_SRC + allTours[randomIndex].tourImageUrl;
    }

  return (
    <div style={{ padding: '0rem 0' }}>
       <div className="filtersection_banner">
                {filterBannerImg ? (
                    <img src={filterBannerImg} alt="Filter Banner" className="filterbannerImg" />
                ) : (
                    <SkeletonWrapper />
                )}
                <div className="bannerPos">
                    <div className="customContainer">
                        <div className="banner_content">
                            {selectedDestination?.value !== "all" && (
                                <div className="banner_text">
                                    {
                                        destinationName === "all" ? "" : <h1>{params?.destination?.replace(/-/g, ' ')}</h1>
                                    }

                                </div>
                            )}
                            {/* <div className="searchCity" ref={searchCityRef}>
                                <div className="searchBar" onClick={toggleSearchForm}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && selectedDestination) {
                                            document.querySelector('.nex_btn').click();
                                        }
                                    }}
                                >
                                  </div>
                                  </div> */}
                                    {/* <div className="iconBox">
                                        <img
                                            src="https://holidays.easemytrip.com/Content/customize/img/location-icon.svg"
                                            alt="Flight"
                                        />
                                        <Select
                                            options={destinationDropdown}
                                            components={{ Option: customOption }}
                                            placeholder={(params?.destination?.replace(/-/g, " ") || "Select Destination").replace(/tour packages$/, "")}
                                            onChange={(selectedOption) => {
                                                setAllTours([]);
                                                setPage(1);
                                                setSelectedDestination(selectedOption);
                                                navigate(`/holidays/${selectedOption?.label.toLowerCase().replace(/\s+/g, '-') + BASE_SLUG}`, {
                                                    state: {
                                                        destinationId: selectedOption?.value || "",
                                                        description: selectedOption?.description || ""
                                                    }
                                                });
                                            }}
                                            styles={{
                                                control: (base) => ({
                                                    ...base,
                                                    borderRadius: '5px',
                                                    padding: '0px',
                                                    border: 'none',
                                                    width: "100%",
                                                    textAlign: 'start',
                                                    outline: 'none',
                                                    boxShadow: 'unset',
                                                    ':hover': {
                                                        borderColor: 'transparent',
                                                    },
                                                }),
                                                dropdownIndicator: (base) => ({
                                                    ...base,
                                                    color: '#333',
                                                }),
                                                option: (base, { isFocused }) => ({
                                                    ...base,
                                                    backgroundColor: isFocused ? '#e0e0e0' : '#fff',
                                                    color: 'red',
                                                    borderBottom: '1px solid #ddd',
                                                    padding: '10px',
                                                }),
                                                menu: (base) => ({
                                                    ...base,
                                                    backgroundColor: '#f9f9f9',
                                                    borderRadius: '5px',
                                                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                                    marginTop: '5px',
                                                    zIndex: 999,
                                                }),
                                                menuList: (base) => ({
                                                    ...base,
                                                    maxHeight: '262px',
                                                    overflowY: 'auto',
                                                    padding: '0',
                                                    '::-webkit-scrollbar': {
                                                        display: 'none',
                                                    },
                                                    scrollbarWidth: 'none',
                                                }),
                                                menuPortal: (base) => ({
                                                    ...base,
                                                    zIndex: 99999999,
                                                }),
                                            }}
                                        />

                                    </div> */}
                                    {/* <Link
                                        state={{ destinationId: selectedDestination ? selectedDestination?.value : "", description: selectedDestination ? selectedDestination?.description : "" }}
                                        to={`/holidays/${selectedDestination ? selectedDestination?.label.toLowerCase().replace(/\s+/g, '-') + BASE_SLUG : ""}`}
                                        className="nex_btn"
                                        onClick={() => [setAllTours([]), setPage(1)]}
                                    // target="_blank" rel="noopener noreferrer"
                                    >Go</Link> */}
                                {/* </div> */}
                                {/* <div
                                className={`searchForm ${showSearchForm ? "visible" : "hidden"}`}
                            >

                                <div className="searcityCol">
                                    <img className="searcIcn" src="https://www.easemytrip.com/holidays/Content/customize/img/icon-search.svg" alt="Flight"></img>
                                    <input
                                        type="text"
                                        className="srctinput"
                                        placeholder="Search for a City or Experience"
                                    />
                                </div>
                                <div className="ovscroll">

                                </div>
                            </div> */}
                            {/* </div> */}
                        </div>
                    </div>
                </div>
            </div>
       {/* cards  */}
       <div className="filterSection">
        <div className="customContainer">
                        <div className="aboutDestination">
                        {selectedDestination?.value !== "all" && (
                            <div className="destinationHead">

                                {destinationName === "all" ? "" : params?.destination?.replace(/-/g, ' ').replace(/\btour\b/gi, 'holiday')}

                            </div>
                        )}
                        {/* {selectedDestination?.value !== "all" && (fullText?.length > 0 || excerpt?.length > 0) && ( */}
                            <div className="destinationPara">
                              {selectedDestination?.description}
                                {/* {showFullText ? fullText : excerpt} */}
                                {/* {isButtonVisible && (
                                    <button className="toggleButton" onClick={handleToggleText}>
                                        {showFullText ? "View Less" : "View More"}
                                    </button>
                                )} */}
                            </div>
                        {/* )} */}
                    </div>              
                    <div className="cardFilterBody">
                        <div className="row cardWrapper">
                            {isLoadingTours && !isNotFound ? (
                                Array.from({ length: 9 }).map((_, index) => (
                                    <div
                                        className="col-12 col-md-6 col-lg-4 mb-4"
                                        key={index}
                                    >
                                        <div className="productCard">
                                            <div className="productImage">
                                                <SkeletonWrapper />
                                            </div>
                                            <div className="productDetails">
                                                <SkeletonWrapper />
                                                <SkeletonWrapper />
                                                <SkeletonWrapper />
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : allTours?.length > 0 ? (
                                allTours?.map((tour, tourIndex) => {
                                    const parseItineraryToArray = (itineraryInfo) => {
                                        const groupedItinerary = [];
                                        let currentPlace = null;
                                        let count = 0;

                                        for (const place of itineraryInfo) {
                                            if (place === currentPlace) {
                                                count++;
                                            } else {
                                                if (currentPlace) {
                                                    groupedItinerary.push({
                                                        place: currentPlace,
                                                        count,
                                                    });
                                                }
                                                currentPlace = place;
                                                count = 1;
                                            }
                                        }

                                        // Push the last group
                                        if (currentPlace) {
                                            groupedItinerary.push({ place: currentPlace, count });
                                        }

                                        return groupedItinerary;
                                    };

                                    const groupedArray = parseItineraryToArray(
                                        tour?.itineraryInfo
                                    );

                                    return (
                                        <div
                                            className="col-12 col-md-6 col-lg-4 mb-4"
                                            key={tourIndex}
                                        >
                                            <div className="productCard">

                                                <div className="productImage">
                                                    <Link href={`/tours/${tour?.slug}`}>
                                                        <img
                                                            src={BASE_IMAGE_SRC + tour?.tourImageUrl}
                                                            alt={tour?.name || "Tour"}
                                                            className="offerImg"
                                                        />
                                                    </Link>
                                                    {tour?.groupTour && (
                                                        <div className="tours">Group Tour</div>
                                                    )}
                                                </div>
                                                <div className="productDetails">
                                                    <div className="productDuration_reviews">
                                                        <Link href={`/tours/${tour?.slug}`}>
                                                            <div className="productName">
                                                                {tour?.name}
                                                            </div>
                                                        </Link>
                                                        <div className="duration">
                                                            {tour?.day}D/{tour?.day - 1}N
                                                        </div>
                                                    </div>
                                                    <div className="reviewWish">
                                                        <div className="product_reviews">

                                                            <div className="stars">
                                              {/* <FontAwesomeIcon icon={faStar} /> */}

                                                                {Array.from({ length: 5 }).map((_, i) => (
                                                                    <FontAwesomeIcon
                                                                        key={`star-${i}`}
                                                                        style={{
                                                                            color:
                                                                                i < 4
                                                                                    ? "#f37002"
                                                                                    : "rgb(193 193 193)",
                                                                        }}
                                                                        icon={faStar}
                                                                    />
                                                                ))}
                                                            </div>
                                                            <div className="reviewCount">
                                                                {tour.reviewCount} Reviews
                                                            </div>
                                                        </div>
                                                        <div className="wishlist">
                                                            <button
                                                              
                                                            >
                                                                <FontAwesomeIcon
                                                                    icon={faHeart}
                                                                    style={{
                                                                        color: wishlist[ tourIndex ]
                                                                            ? "red"
                                                                            : "rgb(193 193 193)",
                                                                    }}
                                                                />
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="listWrap">
                                                        <ul className="tripListWrapper">
                                                            {groupedArray.map((group, groupIndex) => (
                                                                <li key={groupIndex}>
                                                                    <div className="city">
                                                                        <span className="days">
                                                                            {group?.count}D
                                                                        </span>
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
                                                            {/* {Object.entries(facilitiesConfig).map(
                                                                ([ key, value ]) =>
                                                                    tour?.facility[ key ] ? (
                                                                        <div className="facilityType" key={key}>
                                                                            <div className="facilitySvg">
                                                                                <img
                                                                                    src={value.image}
                                                                                    alt={value.label}
                                                                                    className="svgImg"
                                                                                />
                                                                            </div>
                                                                            {value.label}
                                                                        </div>
                                                                    ) : null
                                                            )} */}
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
                                                            <div className="realPrice">
                                                                ₹ {tour?.price - tour?.discount}
                                                            </div>
                                                            <div className="tagText">Per Person</div>
                                                        </div>
                                                        <div className="calltoaction">
                                                            <div className="offer">
                                                                <Link
                                                                    href={`/tours/${tour?.slug}`}
                                                                    // target="_blank" rel="noopener noreferrer"
                                                                    className="offerButton"
                                                                >
                                                                    View Detail
                                                                </Link>
                                                            </div>
                                                            <div className="expert">
                                                                <button
                                                                    
                                                                >
                                                                    {/* <img src={comment} alt="Talk to Expert" /> */}
                                                                    Talk to a Travel Expert
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <NotFound />
                            )}
                            {/* {isTourFetching && allTours.length > 0 && (
                                Array.from({ length: 3 }).map((_, index) => (
                                    <div className="col-12 col-md-6 col-lg-4 mb-4" key={`loading-${index}`}>
                                        <div className="productCard">
                                            <div className="productImage">
                                                <SkeletonWrapper />
                                            </div>
                                            <div className="productDetails">
                                                <SkeletonWrapper />
                                                <SkeletonWrapper />
                                                <SkeletonWrapper />
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )} */}

                            {/* {TourDestinations?.total === allTours?.length ? (
                                ""
                            ) : (
                                <div className="loadBtnspace">
                                    {!isTourFetching && TourDestinations?.data?.length > 0 && (
                                        <button className="loadmoreReview" onClick={loadMoreTours}>
                                            Load More
                                        </button>
                                    )}
                                </div>
                            )} */}
                            {/* <div ref={ref} style={{ height: '150px' }}></div> */}
                        </div>

                    </div>
       <ReviewSection />
        </div>
       </div>
<AfterFooter />
    </div>

  );
}
