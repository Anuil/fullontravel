"use client";
import Select from "react-select";
import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import SkeletonWrapper from "../../components/SkeletonWrapper";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const BASE_IMAGE_SRC = "https://cdn.fullontravel.com/";
const BASE_SLUG = "-tour-packages";

import "../../assets/Style/index.css";
import Link from "next/link";

export default function HeroLocationDropdown({
  destination,
  isDestinationLoading = false,
}) {
  const destinationDropdown = [
    ...(destination && Array.isArray(destination)
      ? destination
          .map((destination) => ({
            value: destination?.id || "unknown",
            label: destination?.region || "Unknown Region",
            description: destination?.description || "",
            icon: "https://cdn.fullontravel.com/dev/loc_srch.webp-700770.webp",
          }))
          .sort((a, b) => a.label.localeCompare(b.label))
      : []),
  ];

  // Custom Option Component
  const customOption = (props) => {
    const { data, innerRef, innerProps } = props;
    return (
      <div
        ref={innerRef}
        {...innerProps}
        style={{
          display: "flex",
          alignItems: "center",
          padding: "10px",
          cursor: "pointer",
          backgroundColor: props.isFocused ? "#f0f0f0" : "white",
          borderBottom: "1px solid hsl(0, 0%, 80%)",
        }}
      >
        <img
          src={data.icon}
          alt={data.label}
          style={{ width: 16, height: 20, borderRadius: "50%", marginRight: 8 }}
        />
        {data.label}
      </div>
    );
  };

  const searchCityRef = useRef(null);
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(true);
  const [selectedDestination, setSelectedDestination] = useState(null);
  // console.log("++++++++++++", destination);
  const toggleSearchForm = () => {
    // Client-side only logic
    setIsSearchBarVisible((prev) => !prev);
  };

  useEffect(() => {
    // Client-only safe logic
    const handleKeyPress = (e) => {
      if (e.key === "Enter" && selectedDestination) {
        const btn = document.querySelector(".nex_btn");
        if (btn) btn.click();
      }
    };

    const searchBar = searchCityRef.current;
    if (searchBar) {
      searchBar.addEventListener("keydown", handleKeyPress);
    }

    return () => {
      if (searchBar) {
        searchBar.removeEventListener("keydown", handleKeyPress);
      }
    };
  }, [selectedDestination]);

  return (
    <div className="searchCity">
      <div className="searchBar">
        <div className="iconBox">
          <img
            src="https://holidays.easemytrip.com/Content/customize/img/location-icon.svg"
            alt="Flight"
          />
          <Select
            options={destinationDropdown}
            components={{ Option: customOption }}
            placeholder="Search for Destinations"
            onChange={(selectedOption) => {
              setSelectedDestination(selectedOption);
            }}
            styles={{
              control: (base) => ({
                ...base,
                borderRadius: "5px",
                padding: "0px",
                border: "none",
                width: "100%",
                textAlign: "start",
                outline: "none",
                boxShadow: "unset",
                ":hover": {
                  borderColor: "transparent",
                },
              }),
              dropdownIndicator: (base) => ({
                ...base,
                color: "#333",
              }),
              option: (base, { isFocused }) => ({
                ...base,
                // borderColor: 'none',
                backgroundColor: isFocused ? "#e0e0e0" : "#fff",
                color: "red",
                borderBottom: "1px solid #ddd", // Add border to options
                padding: "10px",
              }),
              menu: (base) => ({
                ...base,
                backgroundColor: "#f9f9f9",
                borderRadius: "5px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                marginTop: "5px",
                zIndex: 999,
              }),
              menuList: (base) => ({
                ...base,
                maxHeight: "260px",
                overflowY: "auto",
                padding: "0",
                "::-webkit-scrollbar": {
                  display: "none", // Hides the scrollbar
                },
                scrollbarWidth: "none", // Hides scrollbar in Firefox
              }),
              menuPortal: (base) => ({
                ...base,
                zIndex: 99999999,
              }),
            }}
          />
        </div>
        <Link
          state={{
            destinationId: selectedDestination
              ? selectedDestination?.value
              : "",
          }}
          href={
            selectedDestination
              ? `/holidays/${
                  selectedDestination?.label
                    ?.toLowerCase()
                    .replace(/\s+/g, "-") + BASE_SLUG
                }`
              : "#"
          }
          className={`nex_btn ${!selectedDestination ? "disabled" : ""}`}
          onClick={(e) => {
            if (!selectedDestination) {
              e.preventDefault();
            }
          }}
        >
          <i className="fa-solid fa-magnifying-glass" />
        </Link>
      </div>
    </div>
  );
}
