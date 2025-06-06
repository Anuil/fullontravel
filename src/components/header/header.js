// "use client";

import "bootstrap/dist/css/bootstrap.min.css";
import BootstrapClient from './BootstrapClient';

import Head from "next/head";

import Image from 'next/image'
import "../../assets/Style/index.css";

import Link from 'next/link';
// import logoImg from "../../assets/images/f_logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope, faIndustry } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
// import { useEffect, useRef, useState } from "react";
// import { useGetVacationTypesQuery } from "../../features/tour/TourApiSlice";
// import useAuth from "../features/hooks/useAuth";
import Profile from "../Profile/Profile";
import { getVacationType } from "../../lib/api";
import dynamic from "next/dynamic";
// import LoginControl from "./LoginControl";
// import LoginModal from "../LoginModal/LoginModal";


  // const isActive = (to) => {
    // const url = new URL(to, window.location.origin);
    // console.log(location.pathname , url.pathname && location.search , url.search)
    // return location.pathname === url.pathname && location.search === url.search;
  // };
    // import("bootstrap/dist/js/bootstrap.bundle.min");

// const NavDropdown = dynamic(() => import('./NavDropdown'), { ssr: false });
// import NavDropdown from './NavDropdown';

export default async function Header() {
  // const { sub, isUser } = useAuth()

    const VacationTypes = await getVacationType(1, 100);
  
  const isModalVisible = false
  // const [isModalVisible, setIsModalVisible] = useState(false);
  // const typedTextSpan = useRef(null);

  // const { data: VacationTypes } = useGetVacationTypesQuery();

    const menuItemsDynamic = Array.isArray(VacationTypes)
  ? VacationTypes.map((type) => ({
      label: `${type.type} Trips`,
      to: `/holidays/all-destinations-tour-packages?vacationTypeId=${type.type}`,
      isDropdown: true,
    }))
  : [];

    const menuItems = [
    { label: "Home", to: "/", isDropdown: false },
    { label: "Blog", to: "/blogs", isDropdown: false },
    { label: "Group Tours", to: "/holidays/all-destinations-tour-packages?groupTour=true", isDropdown: false },
    ...menuItemsDynamic
  ];
// console.log("menuItems",menuItems)
  

  // const [isMobileView, setIsMobileView] = useState(window.innerWidth < 991);

  //  const [isMobileView, setIsMobileView] = useState(false); // initially false


  // useEffect(() => {
  //   // Safe to access `window` here
  //   const handleResize = () => {
  //     setIsMobileView(window.innerWidth < 991);
  //   };

  //   handleResize(); // Call once on mount
  //   window.addEventListener("resize", handleResize); // Listen for future resizes

  //   return () => {
  //     window.removeEventListener("resize", handleResize); // Clean up
  //   };
  // }, []);


 const firstFive =  menuItems.slice(0, 5);
  const dropdownItems =  menuItems.slice(5);

  // const [isLoading, setIsLoading] = useState(true);
  // useEffect(() => {
  //   setTimeout(() => {
  //     setIsLoading(false);
  //   }, 2000);
  // }, []);

  return (
    <>
          <BootstrapClient />
{/* 
   <LoginModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible} /> */}
        
    <div className="headerbg">
      
    {/* <style jsx>{`
            @import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");
        `}</style> */}
        <div className="customContainer">
          <div className="mainHeader navbar navbar-expand-lg">
            <Link href="/"><Image src="https://cdn.fullontravel.com/dev/logo.webp-410949.webp" alt="" className="siteLogo" width={150} 
                                height={60}  loading="eager" /></Link>
            <button
              type="button"
              className="searchBox d-none"
              data-bs-toggle="modal"
              data-bs-target="#searchModal"
            >
              <div className="search">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </div>
              <div className="fancy-bg">
                {/* <p>
                  Search for{" "}
                  <span className="typed-text" ref={typedTextSpan}></span>
                  <span className="cursor typing" ref={cursorSpan}>
                    &nbsp;
                  </span>
                </p> */}
              </div>
            </button>
            {/* boot nav start*/}
            <div className="logBtnWrap">
              <div className="loginDiv d-lg-none d-block">
                        {/* <LoginControl  /> */}
                        {/* <LoginControl isUser={isUser}></LoginControl> */}

                {/* {
                  isUser ? <Profile /> : <button className="loginBtn" onClick={() => setIsModalVisible(true)}>Login</button>
                } */}
              </div>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-icon">
                 
                  <svg width="29" height="23" viewBox="0 0 29 23" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="linearGradient" x1="0.028" y1="0.5" x2="1" y2="0.5" gradientUnits="objectBoundingBox">
                        <stop offset="0" stopColor="#ef6614" />
                        <stop offset="1" stopColor="#f68e63" />
                      </linearGradient>
                    </defs>
                    <g transform="translate(-35 -28)">
                      <rect width="29" height="3" rx="1.5" transform="translate(35 28)" fill="#ef6614" />
                      <rect width="20" height="3" rx="1.5" transform="translate(44 38)" fill="url(#linearGradient)" />
                      <rect width="29" height="3" rx="1.5" transform="translate(35 48)" fill="#ef6614" />
                    </g>
                  </svg>

                </span>
              </button>
            </div>

            <div className="collapse navbar-collapse" id="navbarNav">
              <div className="navbar_header">
                <div className="contact">
                  <Link className="links" href="tel:+918076083704">
                    <div className="icon"><FontAwesomeIcon icon={faPhone} /></div>
                    <span>+91-8076083704</span>
                  </Link>
                </div>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-icon">
                    <svg width="29" height="23" viewBox="0 0 29 23" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="linearGradient" x1="0.028" y1="0.5" x2="1" y2="0.5" gradientUnits="objectBoundingBox">
                        <stop offset="0" stopColor="#ef6614" />
                        <stop offset="1" stopColor="#f68e63" />
                      </linearGradient>
                    </defs>
                    <g transform="translate(-35 -28)">
                      <rect width="29" height="3" rx="1.5" transform="translate(35 28)" fill="#ef6614" />
                      <rect width="20" height="3" rx="1.5" transform="translate(44 38)" fill="url(#linearGradient)" />
                      <rect width="29" height="3" rx="1.5" transform="translate(35 48)" fill="#ef6614" />
                    </g>
                  </svg>
                  </span>
                </button>
              </div>
              <ul className="navbar-nav">
                 {/* <NavDropdown
          firstFive={firstFive}
          dropdownItems={dropdownItems}
          isActive={isActive}
        /> */}
         {/* <li><Link href="/holidays/goa">Goa</Link></li>
        <li><Link href="/holidays/manali">Manali</Link></li>
        <li><Link href="/holidays/kerala">Kerala</Link></li> */}
        
                {firstFive.map((item, index) => (
                  <li className="nav-item" key={index}>
                    <a className={`nav-link`}  href={item.to}>
                      {item.label}
                    </a>
                  </li>
                ))}
                {dropdownItems.length > 0 && (
                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      More
                    </Link>
                    <ul className="dropdown-menu">
                      {dropdownItems.map((item, index) => (
                        <li key={index}>
                          <a className={`dropdown-item`} href={item.to}>
                            {item.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </li>
                )}
              </ul>
              <div className="navbar_footer">
                <div className="quickLinks">
                  <h6>Follow Us On</h6>
                  <div className="socialLinks">
                    <Link href="" className="facebook"> <i className="fa-brands fa-facebook-f"></i> </Link>
                    <Link href="" className="linkedin"> <i className="fa-brands fa-linkedin"></i> </Link>
                    <Link href="" className="instagram"> <i className="fa-brands fa-instagram"></i> </Link>
                  </div>
                </div>
              </div>
            </div>
            {/* boot nav end */}
            <div className="loginDiv d-none d-lg-block">
                        {/* <LoginControl  /> */}

              {/* {isLoading ? (
                <SkeletonWrapper />
              ) : isUser ? (
                <Profile />
              ) : (
                <button className="loginBtn nav-link" onClick={() => setIsModalVisible(true)}>
                  Login
                </button>
              )} */}
            </div>
          </div>
        </div>
      </div>

      </>
  );
}
