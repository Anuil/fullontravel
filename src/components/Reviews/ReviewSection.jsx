import Link from 'next/link';
import Image from "next/image";


import goldStar from "../../assets/images/svg/goldStar.svg";


function ReviewSection() {
    return (
        <>
            <div className="reviews">
                <div className="reviewHeader">
                <h4>Reviews</h4>
                <div className="poweredBy">Powered By <span>Google</span></div>
                </div>
                <div className="allReview">
                    <div className="totalReview">
                        <div className="rateCount">
                            <div className="googleRe">
                                <div className="rate">
                                    <div className="numberCount">4.9</div>
                                    <div className="icon">
                                        <Image src={goldStar} alt="" />
                                    </div>
                                </div>
                                <div className="count">Based On <span>Google Reviews</span></div>
                            </div>
                            <Link href="https://g.co/kgs/21RWZaw" target="_blank" className="reviewsbutton commonbutton">Check Reviews</Link>
                        </div>
                    </div>
                    <div className="vrLine" />
                    <div className="rating">
                        <div className="countFrom">
                            <div className="countCat">
                                5 <img src={goldStar} alt="" />
                            </div>
                            <div className="countRate">Excellent</div>
                            <div className="progressBar">
                                <div className="progress" />
                            </div>
                        </div>
                        <div className="countFrom">
                            <div className="countCat">
                                4 <img src={goldStar} alt="" />
                            </div>
                            <div className="countRate">Good</div>
                            <div className="progressBar">
                                <div className="progress" />
                            </div>
                        </div>
                        <div className="countFrom">
                            <div className="countCat">
                                3 <img src={goldStar} alt="" />
                            </div>
                            <div className="countRate">Average</div>
                            <div className="progressBar">
                                <div className="progress" />
                            </div>
                        </div>
                        <div className="countFrom">
                            <div className="countCat">
                                2 <img src={goldStar} alt="" />
                            </div>
                            <div className="countRate">Poor</div>
                            <div className="progressBar">
                                <div className="progress" />
                            </div>
                        </div>
                        <div className="countFrom">
                            <div className="countCat">
                                1 <img src={goldStar} alt="" />
                            </div>
                            <div className="countRate">Bad</div>
                            <div className="progressBar">
                                <div className="progress" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ReviewSection;