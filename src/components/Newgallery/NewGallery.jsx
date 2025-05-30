import Slider from "react-slick";
import { useState, useRef, useEffect } from "react";
import { useAccordion } from "../AccordionContext";

function NewGallery({ openGallery }) {
    const { galleryImages } = useAccordion();
    const [currentSlide, setCurrentSlide] = useState(0);
    const sliderRef = useRef(null);
    const previewRef = useRef(null);

    const newGallery = {
        dots: false,
        infinite: false,
        arrows: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 2000,
        focusOnSelect: true,
        afterChange: (current) => {
            setCurrentSlide(current);
        },
    };

    const normalizeImageUrl = (url) => {
        if (url && !url?.startsWith("/")) {
            return "https://cdn.fullontravel.com/" + url;
        }

        return "https://cdn.fullontravel.com" + url;
    };

    const handlePreviewClick = (index) => {
        setCurrentSlide(index);
        sliderRef.current.slickGoTo(index);
    };

    const centerActiveThumbnail = () => {
        if (previewRef.current) {
            const container = previewRef.current;
            const activeThumbnail = container.querySelector(".imgView.active");
            if (activeThumbnail) {
                const containerWidth = container.offsetWidth;
                const thumbnailWidth = activeThumbnail.offsetWidth;
                const thumbnailOffsetLeft = activeThumbnail.offsetLeft;
                const scrollPosition = thumbnailOffsetLeft - (containerWidth / 2) + (thumbnailWidth / 2);

                container.scrollTo({
                    left: scrollPosition,
                    behavior: "smooth",
                });
            }
        }
    };

    useEffect(() => {
        centerActiveThumbnail();
    }, [currentSlide]);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (sliderRef.current) {
                if (event.key === "ArrowRight") {
                    sliderRef.current.slickNext();
                } else if (event.key === "ArrowLeft") {
                    sliderRef.current.slickPrev();
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    useEffect(() => {
        document.body.classList.add("no-scroll");

        return () => {
            document.body.classList.remove("no-scroll");
        };
    }, []);

    return (
        <>
            <div className="newGallery">
                <div className="customContainer">
                    <div className="galleryHeight">
                        <div className="closeBtn">
                            <button onClick={openGallery}>×</button>
                        </div>
                        <div className="imgSlider">
                            <h2>Gallery</h2>
                            <Slider ref={sliderRef} {...newGallery}>
                                {galleryImages?.length > 0 ? (
                                    galleryImages.map((item, index) => (
                                        <div className="item" key={index}>
                                            {item?.id ? (
                                                <img
                                                    src={normalizeImageUrl(item?.imageUrl)}
                                                    alt={`Gallery Image ${index}`}
                                                    className="galleryImage"
                                                />
                                            ) : (
                                                <img
                                                    src={normalizeImageUrl(item)}
                                                    alt={`Gallery Image ${index}`}
                                                    className="galleryImage"
                                                />
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    <p>No images available</p>
                                )}
                            </Slider>
                            <p className="imgcaption">
                                {galleryImages?.[currentSlide]?.description || ""}
                            </p>
                            <div className="previewWrap">
                                <div className="imgPreview" ref={previewRef}>
                                    {galleryImages?.length > 0 ? (
                                        galleryImages.map((item, index) => (
                                            <div
                                                key={index}
                                                className={`imgView ${currentSlide === index ? "active" : ""}`}
                                                onClick={() => handlePreviewClick(index)}
                                            >
                                                {item?.id ? (
                                                    <img
                                                        src={normalizeImageUrl(item?.imageUrl)}
                                                        alt={`Gallery Image ${index}`}
                                                        className="galleryImage"
                                                    />
                                                ) : (
                                                    <img
                                                        src={normalizeImageUrl(item)}
                                                        alt={`Gallery Image ${index}`}
                                                        className="galleryImage"
                                                    />
                                                )}
                                            </div>
                                        ))
                                    ) : (
                                        <p>No preview available</p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="imageCount">
                            <span className="current">{currentSlide + 1}</span>/
                            <span className="total">{galleryImages.length}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default NewGallery;
