import { useState, useEffect } from "react";
import { useGetTourReviewsQuery } from "../../features/tour/TourApiSlice";
import PropTypes from 'prop-types';
import { useAccordion } from "../AccordionContext";
import camera from "../../assets/images/svg/camera.svg"
import {Link} from 'react-router-dom'

export default function TourReviews({ tourSlug }) {
    const { updateGalleryImages, toggleGallery } = useAccordion();
    const handleGalleryClick = (imageUrl) => {
        updateGalleryImages(imageUrl);
        toggleGallery();
    };
    const [page, setPage] = useState(1);
    const [allReviews, setAllReviews] = useState([]);
    const [visibleCount, setVisibleCount] = useState(6);
    const { data: reviews } = useGetTourReviewsQuery({ tourSlug: tourSlug, page: page, pageSize: 5 });

    useEffect(() => {
        if (reviews && Array.isArray(reviews?.data) && reviews?.data?.length > 0) {
            setAllReviews((prevReviews) => {
                const newReviews = reviews.data.filter(newReview =>
                    !prevReviews.some(prevReview => prevReview.id === newReview.id)
                );
                return [...prevReviews, ...newReviews];
            });
        }
    }, [reviews]);



    const handleLoadMore = () => {
        if (visibleCount < allReviews.length) {
            setVisibleCount((prevCount) => prevCount + 6);
        } else {
            setPage((prevPage) => prevPage + 1);
        }
    };

    const totalReviews = reviews?.total || 0;
    const remainingReviews = Math.max(totalReviews - allReviews.length, 0);

    const normalizeImageUrl = (url) => {
        if (url) {
            if (url && !url.startsWith('/')) {
                return 'https://cdn.fullontravel.com/' + url;
            }

            return "https://cdn.fullontravel.com" + url;
        }

        return "https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2247726673.jpg"

    };

    const getRandomImages = (images, count) => {
        if (!images || images.length === 0) return []
        const shuffled = [...images].sort(() => 0.5 - Math.random())
        return shuffled.slice(0, count)
    };
    const allReviewImages = Array.from(
        new Set(allReviews.flatMap(review => review.imageUrl || []))
    );

    const randomImages = getRandomImages(allReviewImages, 5)
    const allGalleryImages = allReviewImages.slice(0, 40)

    return <>
        <>
            {
                allReviews?.length > 0 && (
                    <>
                        <div className="reviewgallery">
                            <div className="reviewgallery">
                                {allReviews?.length > 0 && allReviews[0]?.imageUrl?.length > 0 && (
                                    <h5>Traveller Image Gallery</h5>
                                )}
                                {allReviews?.length > 0 ? (
                                    <div className="gridGallery">
                                        {allReviews[0]?.imageUrl?.length > 0 ? (
                                            <>
                                                <div className="mainImg" onClick={() => handleGalleryClick(allGalleryImages)}>
                                                    <img
                                                        src={`${normalizeImageUrl(randomImages[0])}`}
                                                        alt={`${normalizeImageUrl(randomImages[0])}`}
                                                        className="gridgalleryImg"
                                                    />
                                                    <div className="viewMorebtn">
                                                        <button className="moreBtn">
                                                            <img src={camera} alt="" />
                                                            View All
                                                            <span>({allGalleryImages?.length})</span>
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="otherGalleryimg">
                                                    {randomImages.slice(1).map((img, imgIndex) => {
                                                        return (

                                                            <div className="galleryImg" onClick={() => handleGalleryClick(allGalleryImages)} key={imgIndex}>
                                                                <img
                                                                    src={`${normalizeImageUrl(img)}`}
                                                                    alt={img}
                                                                    className="gridgalleryImg"
                                                                />
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                ) : (
                                    ""
                                )}
                            </div>
                        </div>

                        <div className="customerReview">
                            {
                                allReviews?.length > 0 ? allReviews?.map((review, reviewIndex) => {
                                    return <div className="review" key={reviewIndex}>
                                        <div className="custDetails">
                                            <div className="custInfo">
                                                <img
                                                    src={normalizeImageUrl(review?.profileImageUrl)}
                                                    alt=""
                                                />
                                                <div className="info">
                                                    <div className="reviewName">{review?.name}</div>
                                                    <p className="reviewDate">Reviewed : {new Date(review.reviewedOn).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                                                </div>
                                            </div>
                                            <div className="custRating">
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M15.4829 5.63406L10.6864 4.90408L8.54222 0.352135C8.48365 0.227506 8.38731 0.126615 8.26829 0.0652895C7.96981 -0.0890138 7.6071 0.0395723 7.45786 0.352135L5.3137 4.90408L0.517213 5.63406C0.384974 5.65384 0.26407 5.71912 0.171503 5.81803C0.0595945 5.93848 -0.0020722 6.10053 5.31712e-05 6.26856C0.00217854 6.4366 0.0679221 6.59688 0.182838 6.71418L3.65316 10.2572L2.83328 15.2602C2.81405 15.3766 2.82635 15.4963 2.86878 15.6057C2.91121 15.7151 2.98207 15.8099 3.07333 15.8793C3.16459 15.9488 3.27259 15.99 3.38509 15.9984C3.4976 16.0068 3.6101 15.982 3.70983 15.9269L8.00004 13.5648L12.2902 15.9269C12.4074 15.9922 12.5434 16.0139 12.6737 15.9902C13.0024 15.9308 13.2235 15.6044 13.1668 15.2602L12.3469 10.2572L15.8172 6.71418C15.9117 6.61724 15.974 6.49064 15.9929 6.35216C16.0439 6.00597 15.8135 5.68549 15.4829 5.63406Z" fill="#19AD6F"></path>
                                                </svg>
                                                {parseFloat(review?.rating || 0).toFixed(1)}/5.0
                                            </div>
                                        </div>
                                        <div className="booked">
                                            Booked:
                                            <Link to={`/tours/${review?.tourSlug}`} className="place" target="_blank" rel="noopener noreferrer">
                                                <span>{review?.tourName}</span>
                                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 7L14 2M14 2H10.6667M14 2V5.33333M14 9.33333V12.6667C14 13.0203 13.8595 13.3594 13.6095 13.6095C13.3594 13.8595 13.0203 14 12.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V3.33333C2 2.97971 2.14048 2.64057 2.39052 2.39052C2.64057 2.14048 2.97971 2 3.33333 2H6.66667" stroke="#202020" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                                            </Link>
                                            <a href="" className="place">
                                                
                                            </a>
                                        </div>
                                        <p className="custreview">
                                            {review?.comment}
                                        </p>
                                        <div className="sharedImg">
                                            {
                                                review?.imageUrl?.map((image, imageIndex) => {
                                                    return <img
                                                        key={imageIndex}
                                                        src={normalizeImageUrl(image)}
                                                        alt=""
                                                    />
                                                })
                                            }

                                        </div>
                                    </div>
                                }) : ""

                            }
                        </div>
                    </>
                )
            }

        </>

        {(remainingReviews > 0 || reviews?.data?.length > 0) && (
            <div className="loadBtnspace">
                <button className="loadmoreReview" onClick={handleLoadMore}>Load More reviews</button>
                {/* ({remainingReviews} +) */}
            </div>
        )}
        {/* <div className="loadBtnspace">
            <button
                className="loadmoreReview"
                onClick={handleLoadMore}
                disabled={!(remainingReviews > 0 || reviews?.data?.length > 0)}
            >
                Load More Reviews
            </button>
        </div> */}

    </>
}

TourReviews.propTypes = {
    tourSlug: PropTypes.string.isRequired,
};