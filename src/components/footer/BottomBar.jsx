import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import EnquiryModal from "../../Components/Enquirymodal/EnquiryModal";
export const BottomBar = () => {
    const [tourData] = useState({});
    const [isModalVisible, setIsModalVisible] = useState(false);
    const location = useLocation();

    const isSpecificPage = location.pathname.startsWith("/holidays/");

    // const { tourDateData, setTourDateDataFunc } = useTourState()
    // const isTourPage = /^\/[a-z0-9-]+$/i.test(location.pathname);

    // useEffect(() => {
    //     if (!isTourPage) {
    //         setTourDateDataFunc(null);
    //     }
    // }, [isTourPage, setTourDateDataFunc]);

    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isFooterVisible, setIsFooterVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const footer = document.getElementById("footer");
            const footerOffset = footer ? footer.offsetTop - window.innerHeight : Infinity;

            if (footer) {
                const footerRect = footer.getBoundingClientRect();
                setIsFooterVisible(footerRect.top < window.innerHeight);
            }

            if (currentScrollY > lastScrollY && !isFooterVisible) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY, isFooterVisible]);

    return (
        <>
            <EnquiryModal
                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
                tourID={tourData?.id}
            />
            <div className={`bottomBarmobile ${isVisible || isFooterVisible ? "translate-y-0" : "translate-y-full"}`}>
                <ul className="mobileNav">
                    <li className="bottomItem">
                        <Link
                            to="tel:+918076083704"
                            className="sideBtn"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {/* <img src={whatsapp} alt="" /> */}
                            <div className="svgIcon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M8 3C8.5 3 10.5 7.5 10.5 8C10.5 9 9 10 8.5 11C8 12 9 13 10 14C10.39 14.39 12 16 13 15.5C14 15 15 13.5 16 13.5C16.5 13.5 21 15.5 21 16C21 18 19.5 19.5 18 20C16.5 20.5 15.5 20.5 13.5 20C11.5 19.5 10 19 7.5 16.5C5 14 4.5 12.5 4 10.5C3.5 8.5 3.5 7.5 4 6C4.5 4.5 6 3 8 3Z" stroke="#9f9f9f" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </div>
                            Phone
                        </Link>
                    </li>
                    <li className="bottomItem">
                        <Link
                            to="https://wa.me/+918076083704?text=Hi,%20I%20would%20like%20to%20get%20more%20information."
                            className="sideBtn"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {/* <img src={whatsapp} alt="" /> */}
                            <div className="svgIcon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M19.05 4.90999C18.1331 3.9841 17.0411 3.24996 15.8376 2.75036C14.634 2.25075 13.3431 1.99568 12.04 1.99999C6.58005 1.99999 2.13005 6.44999 2.13005 11.91C2.13005 13.66 2.59005 15.36 3.45005 16.86L2.05005 22L7.30005 20.62C8.75005 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.9501 17.38 21.9501 11.92C21.9501 9.26999 20.92 6.77999 19.05 4.90999ZM12.04 20.15C10.56 20.15 9.11005 19.75 7.84005 19L7.54005 18.82L4.42005 19.64L5.25005 16.6L5.05005 16.29C4.2276 14.9771 3.79097 13.4593 3.79005 11.91C3.79005 7.36999 7.49005 3.66999 12.03 3.66999C14.23 3.66999 16.3 4.52999 17.85 6.08999C18.6177 6.85386 19.226 7.76254 19.6397 8.76332C20.0534 9.76411 20.2642 10.8371 20.26 11.92C20.28 16.46 16.58 20.15 12.04 20.15ZM16.56 13.99C16.31 13.87 15.09 13.27 14.87 13.18C14.64 13.1 14.48 13.06 14.31 13.3C14.14 13.55 13.67 14.11 13.53 14.27C13.39 14.44 13.24 14.46 12.99 14.33C12.74 14.21 11.94 13.94 11 13.1C10.26 12.44 9.77005 11.63 9.62005 11.38C9.48005 11.13 9.60005 11 9.73005 10.87C9.84005 10.76 9.98005 10.58 10.1 10.44C10.22 10.3 10.27 10.19 10.35 10.03C10.43 9.85999 10.39 9.71999 10.33 9.59999C10.27 9.47999 9.77005 8.25999 9.57005 7.75999C9.37005 7.27999 9.16005 7.33999 9.01005 7.32999H8.53005C8.36005 7.32999 8.10005 7.38999 7.87005 7.63999C7.65005 7.88999 7.01005 8.48999 7.01005 9.70999C7.01005 10.93 7.90005 12.11 8.02005 12.27C8.14005 12.44 9.77005 14.94 12.25 16.01C12.84 16.27 13.3 16.42 13.66 16.53C14.25 16.72 14.79 16.69 15.22 16.63C15.7 16.56 16.69 16.03 16.89 15.45C17.1 14.87 17.1 14.38 17.03 14.27C16.96 14.16 16.81 14.11 16.56 13.99Z" fill="#9f9f9f" />
                                </svg>
                            </div>
                            Whatsapp
                        </Link>
                    </li>
                    {/* <li className="divider"></li> */}
                    <li className="bottomItem">
                        <button className="mobileEnquiryBtn" onClick={() => setIsModalVisible(true)}>
                            <div className="svgIcon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M11 15H17V17H11V15ZM9 7H7V9H9V7ZM11 13H17V11H11V13ZM11 9H17V7H11V9ZM9 11H7V13H9V11ZM21 5V19C21 20.1 20.1 21 19 21H5C3.9 21 3 20.1 3 19V5C3 3.9 3.9 3 5 3H19C20.1 3 21 3.9 21 5ZM19 5H5V19H19V5ZM9 15H7V17H9V15Z" fill="#9f9f9f" />
                                </svg>
                            </div>
                            {/* <img src={support} alt="" /> */}
                            Enquiry
                        </button>
                    </li>
                    {/* {
                        tourDateData?.length > 0 ?
                            <li className="bottomItem">
                                <button className="enquiryBtn" onClick={() => setIsModalOpen(true)}>Book Now</button>
                            </li>
                            :
                            <li className="bottomItem">
                                <button className="mobileEnquiryBtn" onClick={() => setIsModalVisible(true)}>
                                    <img src={support} alt="" />
                                </button>
                            </li>
                    } */}
                    {/* <li className="bottomItem">
                        <button className="mobileEnquiryBtn" onClick={() => setIsModalVisible(true)}>
                            <img src={support} alt="" />
                        </button>
                    </li> */}
                </ul>
                {isSpecificPage && (
                    <>
                        <div className="mobileFilterwrap">
                            <div className="filter" data-bs-toggle="modal" data-bs-target="#sortByModal">
                                <div className="svgIcon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M10.0311 12.42L6.06206 17.21V2.26202C6.06206 2.16257 6.02255 2.06719 5.95222 1.99686C5.8819 1.92653 5.78652 1.88702 5.68706 1.88702C5.5876 1.88702 5.49222 1.92653 5.42189 1.99686C5.35157 2.06719 5.31206 2.16257 5.31206 2.26202V17.189L1.34306 12.4195C1.31158 12.3816 1.27294 12.3503 1.22935 12.3274C1.18576 12.3044 1.13808 12.2903 1.08903 12.2857C1.03998 12.2812 0.990515 12.2864 0.943464 12.301C0.896413 12.3156 0.852696 12.3393 0.81481 12.3708C0.776923 12.4023 0.745609 12.4409 0.722655 12.4845C0.699702 12.5281 0.685557 12.5758 0.681031 12.6248C0.676504 12.6739 0.681683 12.7233 0.696272 12.7704C0.710862 12.8174 0.734575 12.8611 0.76606 12.899L5.40856 18.4775C5.44374 18.5199 5.48783 18.554 5.5377 18.5775C5.58756 18.6009 5.64197 18.613 5.69706 18.613H5.69756C5.80906 18.613 5.91456 18.563 5.98606 18.4775L10.6091 12.899C10.6726 12.8224 10.703 12.7236 10.6938 12.6245C10.6845 12.5254 10.6362 12.434 10.5596 12.3705C10.4829 12.307 10.3842 12.2765 10.2851 12.2858C10.1859 12.2951 10.0946 12.3434 10.0311 12.42ZM19.2336 7.10102L14.5916 1.52252C14.5564 1.4802 14.5124 1.44612 14.4626 1.4227C14.4129 1.39929 14.3586 1.38711 14.3036 1.38702C14.1921 1.38702 14.0856 1.43702 14.0151 1.52252L9.39156 7.10102C9.32899 7.1777 9.29926 7.27601 9.30887 7.37451C9.31848 7.47302 9.36663 7.56373 9.44284 7.62687C9.51905 7.69002 9.61713 7.72047 9.71571 7.7116C9.81428 7.70273 9.90535 7.65526 9.96906 7.57952L13.9381 2.79002V17.738C13.9381 17.8375 13.9776 17.9329 14.0479 18.0032C14.1182 18.0735 14.2136 18.113 14.3131 18.113C14.4125 18.113 14.5079 18.0735 14.5782 18.0032C14.6486 17.9329 14.6881 17.8375 14.6881 17.738V2.81052L18.6571 7.58002C18.6883 7.61812 18.7268 7.64963 18.7703 7.67274C18.8138 7.69585 18.8615 7.71009 18.9106 7.71465C18.9596 7.71921 19.0091 7.71399 19.0561 7.69929C19.1032 7.68459 19.1468 7.66071 19.1846 7.62902C19.2611 7.5655 19.3092 7.47419 19.3184 7.37517C19.3276 7.27615 19.2971 7.17754 19.2336 7.10102Z" stroke="#9f9f9f" />
                                    </svg>
                                </div>
                                Sort By
                            </div>
                            {/* <div className="divider"></div> */}
                            <div className="filter" data-bs-toggle="modal" data-bs-target="#filterModal">
                                <div className="svgIcon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M4 4H20V6.172C19.9999 6.70239 19.7891 7.21101 19.414 7.586L15 12V19L9 21V12.5L4.52 7.572C4.18545 7.20393 4.00005 6.7244 4 6.227V4Z" stroke="#9f9f9f" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </div>
                                Filter
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};
