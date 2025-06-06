"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import error from "../assets/images/error.png";

import {
    faRedo
} from "@fortawesome/free-solid-svg-icons";
const NotFound = () => {
  return (
    <>
      <div className="no-data-found text-center">
        {/* <img src={error} alt="No Data Found" className="no-data-image mb-3" /> */}
        <h2>No Tours Available</h2>
        <p>
          We couldn't find any tours matching your criteria. Please try
          adjusting your filters or check back later.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="btn  mt-3 text-white"
          style={{ backgroundColor: "var(--primary-color)" }}
        >
          <FontAwesomeIcon icon={faRedo} />
        </button>
      </div>
    </>
  );
};

export default NotFound;
