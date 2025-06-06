"use client";
import { useState } from "react";
import support from "../../assets/images/svg/support.svg";
import whatsapp from "../../assets/images/svg/whatsapp.svg";
import call from "../../assets/images/svg/call.svg";
import Link from 'next/link';
import Image from 'next/image'
import EnquiryModal from "../Enquirymodal/EnquiryModal";


function StickyButton() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [tourData] = useState({});
    return (
        <>
            <div className="sideStickybtn">
                <button className="sideBtn" onClick={() => setIsModalVisible(true)}>
                    <Image src={support} alt="" />
                    <span>Send Enquiry</span>
                </button>
                <Link
                    href="https://wa.me/+918076083704?text=Hi,%20I%20would%20like%20to%20get%20more%20information."
                    className="sideBtn"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Image src={whatsapp} alt="" />
                    <span>Whatsapp</span>
                </Link>
                <Link
                    href="tel:+918076083704"
                    className="sideBtn"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Image src={call} alt="" />
                    <span>Phone</span>
                </Link>
            </div>
            <EnquiryModal
                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
                tourID={tourData?.id}
            />
        </>
    )
}

export default StickyButton