import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';

const calculateDiscount = (totalAmount, discountPercentage, maxDiscountCap = 0) => {
    if (maxDiscountCap) {
        const discountAmount = Math.round((totalAmount * discountPercentage) / 100);
        return discountAmount > maxDiscountCap ? maxDiscountCap : discountAmount;
    }
    return Math.round(totalAmount - discountPercentage);
};

const CouponsList = ({ TourVouchers, totalAmount, adjustPrice, currentCouponData, selectedCouponBookingData }) => {
    const [selectedCoupon, setSelectedCoupon] = useState(null);
    
    useEffect(() => {
        setSelectedCoupon(null);
    }, [ selectedCouponBookingData ]);

    const handleCouponSelect = (coupon) => {
        // console.log("coupon: ", coupon);
        
        if (totalAmount < coupon?.minimumCartValue) {
            adjustPrice(false, 0)
        } else {
            if (coupon?.flatDiscount) {
                const discount = coupon?.flatDiscount
                setSelectedCoupon({ ...coupon, discount });
                adjustPrice(true, discount, coupon?.voucherCode);
            } else {
                const discount = calculateDiscount(totalAmount, coupon?.discountPercentage, coupon.maxDiscountCap);
                setSelectedCoupon({ ...coupon, discount });
                adjustPrice(true, discount, coupon?.voucherCode);
            }
        }

    };

    const handleCouponRemove = (coupon) => {
        if (coupon?.flatDiscount) {
            const discount = coupon?.flatDiscount
            // console.log("discount::::: ", discount);
            setSelectedCoupon(null)
            adjustPrice(false, discount);
        } else {
            const discount = calculateDiscount(totalAmount, coupon?.discountPercentage, coupon.maxDiscountCap);
            // console.log("discount::::: ", discount);

            setSelectedCoupon({ ...coupon, discount });
            setSelectedCoupon(null);
            adjustPrice(false, discount);
        }

    };
    return (
        <div className="couponsList">
            {TourVouchers &&
                [...TourVouchers]
                    .map((vouch) => {
                        if (vouch?.flatDiscount) {
                            return { ...vouch, computedDiscount: vouch?.flatDiscount }; // Add computed discount to the voucher
                        }
                        const discount = calculateDiscount(totalAmount, vouch?.discountPercentage, vouch?.maxDiscountCap);
                        return { ...vouch, computedDiscount: discount }; // Add computed discount to the voucher
                    })
                    .sort((a, b) => b.computedDiscount - a.computedDiscount) // Sort by highest discount
                    .map((vouch, index) => {
                        if (vouch?.hidden === false) {
                            return (
                                <React.Fragment key={index}>
                                    <div className="coupe">
                                        <label
                                            className={`couponsOuter ${selectedCoupon?.voucherCode === vouch.voucherCode ? "active" : ""
                                                }`}
                                        >
                                            <input
                                                type="radio"
                                                name="coupon"
                                                value={vouch.voucherCode}
                                                checked={selectedCoupon?.voucherCode === vouch.voucherCode}
                                                onChange={() => handleCouponSelect(vouch)}
                                                style={{ display: "none" }}
                                                disabled={currentCouponData?.discount > 0}
                                            />
                                            <div className="couponText">
                                                <div className="couponIcon">
                                                    <svg
                                                        width={20}
                                                        height={20}
                                                        viewBox="0 0 20 20"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <rect
                                                            width={20}
                                                            height={20}
                                                            rx={4}
                                                            fill="#EAF5FF"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M9.98746 3.28496C10.8218 1.95257 12.8672 2.40647 13.0615 3.96603C13.1826 4.94838 14.1274 5.61064 15.0929 5.38912C16.6247 5.03748 17.7508 6.80429 16.7842 8.04483C16.1754 8.82551 16.3757 9.96119 17.2149 10.4874C18.5473 11.3217 18.0934 13.3671 16.5338 13.5614C15.5507 13.6827 14.8892 14.6273 15.1116 15.5926C15.4624 17.1246 13.6956 18.2507 12.456 17.2848C11.6744 16.6753 10.5387 16.8756 10.0135 17.7155C9.17735 19.0474 7.13276 18.5933 6.93928 17.0336C6.81723 16.0506 5.87177 15.3893 4.90725 15.6115C3.37529 15.9623 2.2492 14.1955 3.21588 12.9558C3.82455 12.1743 3.6243 11.0386 2.78519 10.5132C1.45265 9.67809 1.90655 7.63268 3.46626 7.4392C4.44846 7.31729 5.11058 6.37169 4.8892 5.40703C4.53756 3.87521 6.30356 2.74926 7.54491 3.71565C8.32559 4.32446 9.46127 4.12421 9.98746 3.28496Z"
                                                            fill="#008CFF"
                                                        />
                                                        <path
                                                            d="M11.8516 6.87573C12.0405 6.60587 12.4125 6.54029 12.6823 6.72925C12.9072 6.88671 12.9902 7.17125 12.9023 7.4179L12.8288 7.56001L8.22689 14.1322C8.03793 14.4021 7.66599 14.4677 7.39612 14.2787C7.17124 14.1212 7.08822 13.8367 7.17614 13.5901L7.24964 13.4479L11.8516 6.87573Z"
                                                            fill="white"
                                                        />
                                                        <path
                                                            d="M7.69953 6.84859C6.88758 6.99176 6.34577 7.76449 6.48895 8.57647C6.63201 9.38783 7.40574 9.92923 8.21749 9.78609C9.02865 9.64307 9.57029 8.86952 9.42726 8.05836C9.28413 7.24659 8.51088 6.70553 7.69953 6.84859Z"
                                                            fill="white"
                                                        />
                                                        <path
                                                            d="M11.6999 11.2052C10.8881 11.3483 10.3471 12.1215 10.4901 12.9329C10.6333 13.7448 11.4059 14.2858 12.2179 14.1427C13.0292 13.9996 13.5708 13.2267 13.4276 12.4149C13.2846 11.6038 12.511 11.0621 11.6999 11.2052Z"
                                                            fill="white"
                                                        />
                                                    </svg>
                                                </div>
                                                <div className="couponWrapper">
                                                    <div className="flexCouponContainer">
                                                        <div className="couponTitle">
                                                            <p>{vouch?.voucherCode}</p>
                                                        </div>
                                                        <p className="couponPrice">
                                                            <span>{`- ₹${vouch.computedDiscount}`}</span>
                                                        </p>
                                                    </div>
                                                    <div className="couponDetails">
                                                        <p>{vouch?.description}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </label>
                                        {selectedCoupon?.voucherCode === vouch.voucherCode && (
                                            <span
                                                className="linkText"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleCouponRemove(vouch);
                                                }}
                                            >
                                                Remove
                                            </span>
                                        )}
                                    </div>
                                </React.Fragment>
                            );
                        }
                    })}
        </div>


    );
};

CouponsList.propTypes = {
    TourVouchers: PropTypes.array,
    adjustPrice: PropTypes.func,
    totalAmount: PropTypes.number,
    currentCouponData: PropTypes.object,
    selectedCouponBookingData: PropTypes.any
};

export default CouponsList;
