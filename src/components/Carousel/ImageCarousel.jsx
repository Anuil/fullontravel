/* eslint-disable react/prop-types */
import { useMemo, useState, useEffect, useCallback } from "react";
// import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../assets/Style/index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import location from "../../assets/images/svg/location.svg"
import SkeletonWrapper from "../../Components/SkeletonWrapper";
const BASE_IMAGE_SRC = "https://cdn.fullontravel.com/"
const ImageCarousel = ({
  handleSidebarClickfunc,
  handleSlide,
  imageHide,
  currentIndex,
  closeModal,
  showAllImages,
  hideAllImages,
  isVisible,
  activeDiv,
  gallery,
  tourImage,
  imagesType
}) => {
  // Memoizing the image extraction to avoid repeated computations
  const extractImageUrls = useMemo(() => {
    let allImages = [];
    let categorizedImages = {
      activitiesMedia: [],
      propertiesMedia: [],
      destinationsMedia: [],
    };

    if (gallery !== undefined) {
      for (const cat in gallery) {
        gallery[cat]?.forEach((item) => {
          item?.media?.forEach((val) => {
            let imageObj = {
              type: cat,
              originalTitle: val?.description,
              typeId: item?.id,
              description: val?.description,
              original: BASE_IMAGE_SRC + val?.imageUrl,
              thumbnail: BASE_IMAGE_SRC + val?.imageUrl,
            };
            allImages.push(imageObj);
            if (categorizedImages[cat]) {
              categorizedImages[cat].push(imageObj);
            }
          });
        });
      }
    }

    return { allImages, ...categorizedImages };
  }, [gallery]);
  // Get the appropriate images based on imagesType
  const typeBasedRender = () => {
    let images = [];

    switch (imagesType?.imageType) {
      case "activitiesMedia":
        images =
          extractImageUrls?.activitiesMedia?.filter(
            (item) => item?.typeId === imagesType?.typeId
          ) || [];
        break;

      case "propertiesMedia":
        images =
          extractImageUrls?.propertiesMedia?.filter(
            (item) => item?.typeId === imagesType?.typeId
          ) || [];
        break;

      case "destinationsMedia":
        images =
          extractImageUrls?.destinationsMedia?.filter(
            (item) => item?.typeId === imagesType?.typeId
          ) || [];
        break;

      default:
        images = extractImageUrls?.allImages || [];
        break;
    }
    return (
      <>
        <ImageGallery
          items={images}
          onSlide={handleSlide}
          startIndex={Math.min(currentIndex, images.length - 1)} // Ensure index is within bounds
          infinite={false}
          showIndex={true}
        />
      </>
    );
  };

  useEffect(() => {
    if (isVisible) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isVisible]);

  const [selectedTitle, setSelectedTitle] = useState(null);
  const handleSidebarClickfuncMemoized = useCallback(
    (index, { imageType, typeId, title }) => {
      setSelectedTitle(title ? title : "Gallery");
      handleSidebarClickfunc(index, { imageType, typeId, title });
    },
    [handleSidebarClickfunc]
  );
  return (
    <>
      <div className="mainUltimate">
        {extractImageUrls && extractImageUrls.allImages?.length > 0 ? (
          <div className="featureImages">
            <div className="mainImage">
              {/* <div className="item" onClick={() => showAllImages(1)}>
              <img src={BASE_IMAGE_SRC + tourImage} alt="Image 1" />
            </div>
            <div className="item">
              <iframe src="https://www.youtube.com/embed/CTG6eyHWtsg" title="Ladakh Complete Travel Guide  I Leh Ladakh Tour I Manali To Ladakh I Ladakh Vlog I" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            </div> */}
              <div className="item" onClick={() => showAllImages(1)}>
                <img
                  src={BASE_IMAGE_SRC + tourImage}
                  alt="Tour Image"
                />
                {/* {tourVideo ? (
                <iframe
                  src={`https://www.youtube.com/embed/${tourVideo}`}
                  title="Tour Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              ) : (
                <img
                  src={BASE_IMAGE_SRC + tourImage}
                  alt="Tour Image"
                />
              )} */}
              </div>

              {/* <Slider {...settings} className="slick-carousel custom-slick">
              {
                extractImageUrls?.allImages?.map((imgSrc, imgIndex) => {
                  return <div className="item" onClick={() => showAllImages(1)} key={imgIndex}>
                    <img
                      src={imgSrc.original}
                      alt="Image 1"
                    />+
                  </div>
                })
              }
            </Slider> */}
            </div>

            <div className="otherFeatureimg">
              <div className="featureimgBox" onClick={() => showAllImages(2)}>
                <img
                  src={
                    extractImageUrls?.destinationsMedia?.[0]?.thumbnail ||
                    "https://wallpapers.com/images/hd/beautiful-travel-2560-x-1600-wallpaper-vw1j1mq2e1hxdk4z.jpg"
                  }
                  alt="Destination"
                />
                <p className="imageName">Destinations</p>
              </div>
              <div className="featureimgBox" onClick={() => showAllImages(4)}>
                <img
                  src={
                    extractImageUrls?.propertiesMedia?.[0]?.thumbnail ||
                    "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg"
                  }
                  alt="Property"
                />
                <p className="imageName">Properties</p>
              </div>
              <div className="featureimgBox" onClick={() => showAllImages(3)}>
                <img
                  src={
                    extractImageUrls?.activitiesMedia?.[0]?.thumbnail ||
                    "https://www.healthyeating.org/images/default-source/home-0.0/nutrition-topics-2.0/general-nutrition-wellness/2-2-1-1physicalactivity_detailfeature_thumb.jpg?sfvrsn=14643f9d_4"
                  }
                  alt="Activities"
                />
                <p className="imageName">Activities</p>
              </div>
              <div className="featureimgBox" onClick={() => showAllImages(1)}>
                <img
                  src={
                    BASE_IMAGE_SRC + tourImage ||
                    "path_to_dummy_image/dummy_tour.jpg"
                  }
                  alt="Tour"
                />
                <div className="allFeatureimg">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_420_1971)">
                      <path
                        d="M1.33203 8C1.33203 4.85734 1.33203 3.286 2.30803 2.30934C3.28536 1.33334 4.85603 1.33334 7.9987 1.33334C11.1414 1.33334 12.7127 1.33334 13.6887 2.30934C14.6654 3.28667 14.6654 4.85734 14.6654 8C14.6654 11.1427 14.6654 12.714 13.6887 13.69C12.7134 14.6667 11.1414 14.6667 7.9987 14.6667C4.85603 14.6667 3.2847 14.6667 2.30803 13.69C1.33203 12.7147 1.33203 11.1427 1.33203 8Z"
                        stroke="#202020"
                      ></path>
                      <path
                        d="M10.6654 6.66667C11.4017 6.66667 11.9987 6.06972 11.9987 5.33334C11.9987 4.59696 11.4017 4 10.6654 4C9.92898 4 9.33203 4.59696 9.33203 5.33334C9.33203 6.06972 9.92898 6.66667 10.6654 6.66667Z"
                        stroke="#202020"
                      ></path>
                      <path
                        d="M1.33203 8.33334L2.50003 7.31134C2.79279 7.05538 3.17186 6.92023 3.56051 6.93322C3.94916 6.94622 4.31836 7.1064 4.59336 7.38134L7.45336 10.2413C7.6753 10.4632 7.9684 10.5997 8.28106 10.6268C8.59373 10.6539 8.90592 10.5698 9.1627 10.3893L9.36203 10.2493C9.73243 9.98919 10.1801 9.86238 10.6319 9.88963C11.0837 9.91687 11.5129 10.0966 11.8494 10.3993L13.9987 12.3333"
                        stroke="#202020"
                        strokeLinecap="round"
                      ></path>
                    </g>
                    <defs>
                      <clipPath id="clip0_420_1971">
                        <rect width="16" height="16" fill="white"></rect>
                      </clipPath>
                    </defs>
                  </svg>
                  <span>View All Images</span>
                </div>
                <div className="imgCountM d-lg-none d-flex">
                  <div className="count">({extractImageUrls?.allImages?.length}) +</div>
                  <div className="moreText">More Photos</div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="featureImages">
            <div className="mainImage">
              <div className="item">
                <SkeletonWrapper />
              </div>
            </div>

            <div className="otherFeatureimg">
              <div className="featureimgBox">
                <SkeletonWrapper />
                <SkeletonWrapper />
              </div>
              <div className="featureimgBox">
                <SkeletonWrapper />
                <SkeletonWrapper />
              </div>
              <div className="featureimgBox">
                <SkeletonWrapper />
                <SkeletonWrapper />
              </div>
              <div className="featureimgBox">
                <SkeletonWrapper />
                <SkeletonWrapper />
              </div>
            </div>
          </div>
        )}
      </div>
      {/* ------==============----------==============--------------============---------------- */}
      {/* -------*************InnerImage-----Modal_______Code----*******__-------- */}
      {/* ------==============----------==============--------------============---------------- */}
      <div className={`allImagesmodel ${isVisible ? "visible" : ""}`}>
        <div className="allimagesHeader">
          <div className="main">
            <div className="customContainer">
              <div className="row">
                <div className="col-12 g-0 g-md-auto">
                  <div className="backSidebarbtn">
                    <button className="back-button" onClick={hideAllImages}>
                      <FontAwesomeIcon icon={faArrowLeft} />
                      &nbsp;&nbsp;Back
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="tabsnav">
              <div
                className={`nav allImages ${activeDiv === 1 ? "activeImage" : ""
                  }`}
                onClick={() => showAllImages(1)}
              >
                All Images({extractImageUrls?.allImages?.length})
              </div>
              <div
                className={`nav destinations ${activeDiv === 2 ? "activeImage" : ""
                  }`}
                onClick={() => showAllImages(2)}
              >
                Destinations({extractImageUrls?.destinationsMedia?.length})
              </div>
              <div
                className={`nav activities ${activeDiv === 3 ? "activeImage" : ""
                  }`}
                onClick={() => showAllImages(3)}
              >
                Activities({extractImageUrls?.activitiesMedia?.length})
              </div>
              <div
                className={`nav properties ${activeDiv === 4 ? "activeImage" : ""
                  }`}
                onClick={() => showAllImages(4)}
              >
                Properties({extractImageUrls?.propertiesMedia?.length})
              </div>
            </div>
          </div>
        </div>
        <div className="sidebarGallery">
          <div className="customContainer">
            {/* all images tab */}
            <div className={`imgGallery allImages ${activeDiv === 1 ? "activeImage" : ""}`}>
              <div className="colImg">
                {extractImageUrls?.allImages?.map((src, index) => (
                  <div className="imgWrapper" key={index}>
                    <img
                      src={src?.original}
                      alt={`Image ${index + 1}`}
                      onClick={() =>
                        handleSidebarClickfuncMemoized(index, {
                          title: "Gallery",
                        })
                      }
                    />
                  </div>
                ))}
              </div>
            </div>


            {/* Destination images tab */}
            <div className={`imgGallery destinations ${activeDiv === 2 ? "activeImage" : ""}`}>
              <div className="previewImg">
                {gallery?.destinationsMedia?.map((item, index) => {
                  if (item?.media?.length > 0) {
                    return (
                      <div className="imgWrapper" key={index}>
                        <img
                          src={BASE_IMAGE_SRC + item?.media?.[0]?.imageUrl}
                          alt={`Destination ${index + 1}`}
                          onClick={() =>
                            handleSidebarClickfuncMemoized(0, {
                              imageType: "destinationsMedia",
                              typeId: item?.id,
                              title: item.title,
                            })
                          }
                        />
                        <div className="imgContent">
                          <div className="location">
                            <img src={location} alt="Location" />
                            <span title={item.title}>{item.title}</span>
                          </div>
                          <div className="noOfimg">
                            <span className="totalImg">
                              {item?.media?.length}{" "}
                            </span>
                            <span>Images</span>
                            <i className="fa-solid fa-arrow-right-long"></i>
                          </div>
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
            </div>

            {/* Activities images tab */}
            <div className={`imgGallery activities ${activeDiv === 3 ? "activeImage" : ""}`}>
              <div className="previewImg">
                {gallery?.activitiesMedia?.map((item, index) => {
                  if (item?.media?.length > 0) {
                    return (
                      <div className="imgWrapper" key={index}>
                        <img
                          src={BASE_IMAGE_SRC + item?.media?.[0]?.imageUrl}
                          alt={`Activity ${index + 1}`}
                          onClick={() =>
                            handleSidebarClickfuncMemoized(0, {
                              imageType: "activitiesMedia",
                              typeId: item?.id,
                              title: item.title,
                            })
                          }
                        />
                        <div className="imgContent">
                          <div className="location">
                            <span title={item.title}>{item?.title}</span>
                          </div>
                          <div className="noOfimg">
                            <span className="totalImg">
                              {item?.media?.length}{" "}
                            </span>
                            <span>Images</span>
                            <i className="fa-solid fa-arrow-right-long"></i>
                          </div>
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
            </div>

            {/* Properties images tab */}
            <div className={`imgGallery properties ${activeDiv === 4 ? "activeImage" : ""}`}>
              <div className="previewImg">
                {gallery?.propertiesMedia.map((item, index) => {
                  if (item?.media?.length > 0) {
                    return (
                      <div className="imgWrapper" key={index}>
                        <img
                          src={BASE_IMAGE_SRC + item?.media?.[0]?.imageUrl}
                          alt={`Property ${index + 1}`}
                          onClick={() =>
                            handleSidebarClickfuncMemoized(0, {
                              imageType: "propertiesMedia",
                              typeId: item?.id,
                              title: item.title,
                            })
                          }
                        />
                        <div className="imgContent">
                          <div className="location">
                            <span title={item.title}>{item?.title}</span>
                          </div>
                          <div className="noOfimg">
                            <span className="totalImg">
                              {item?.media?.length}
                            </span>
                            <span>Images</span>
                            <i className="fa-solid fa-arrow-right-long"></i>
                          </div>
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          </div>
        </div>

        {imageHide && (
          <div id="mygalleryWindow" className="mygalleryWindow">
            <div className="mygalleryWindow-content">
              <span className="close" onClick={closeModal}>
                ×
              </span>

              <div className="galleryWindow">
                <h1 title={selectedTitle}>{selectedTitle}</h1>
                <div className="sliderContainer">{typeBasedRender()}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ImageCarousel;
