"use client";
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { useSubmitEnquiryMutation } from '../../features/tour/TourApiSlice';
import { toast, Bounce } from "react-toastify";
import { height } from '@fortawesome/free-solid-svg-icons/fa0';

function EnquiryModal({ isModalVisible, setIsModalVisible, tourID }) {
    const [isFetching, setIsFetching] = useState(false)
    const [ errorMessage, setErrorMessage ] = useState("");
    const [ alert, setAlert ] = useState(false);

    const [enquiryFormData, setEnquiryFormData] = useState({
        tourId: tourID,
        name: "",
        enquiryType: "ENQUIRY",
        email: "",
        phoneNumber: "",
        travelDate: "",
        totalParticipant: 0,
        message: "",
    })

    const [submitEnquiry] = useSubmitEnquiryMutation()
    const handleNewEnquiry = async (e) => {
        e.preventDefault();

        const { name, email, phoneNumber, travelDate, totalParticipant } = enquiryFormData;

        if (!name || !email || !phoneNumber || !travelDate || !totalParticipant) {
            setErrorMessage("Please fill in all the fields.");
            setAlert(true);
            return;
        }
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            setErrorMessage("Please enter a valid email address.");
            setAlert(true);
            return;
        }
        // if (phoneNumber && !/^\d{10}$/.test(phoneNumber)) {
        //     setErrorMessage("Please enter a valid phone number (10 digits).");
        //     setAlert(true);
        //     return;
        // }

        // if (totalParticipant < 0) {
        //     setErrorMessage("Please enter a valid number of participants.");
        //     setAlert(true);
        //     return;
        // }

        try {
            setIsFetching(true)
            let payload = {
                tourId: tourID,
                name: enquiryFormData?.name,
                enquiryType: enquiryFormData?.enquiryType,
                email: enquiryFormData?.email,
                phoneNumber: enquiryFormData?.phoneNumber,
                travelDate: enquiryFormData?.travelDate,
                totalParticipant: enquiryFormData?.totalParticipant,
                message: enquiryFormData?.message,
            }
            const { data, error } = await submitEnquiry(payload);

            if (data) {
                toast.success("Your Request has been sent", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce,
                });

                setEnquiryFormData({
                    tourId: tourID,
                    name: "",
                    enquiryType: "ENQUIRY",
                    email: "",
                    phoneNumber: "",
                    travelDate: "",
                    totalParticipant: 0,
                    message: "",
                })
            }

            if (error) {
                throw error
            }
        } catch (error) {
            toast.error(error?.data?.errorMessage || "An Error Occured, Please try again", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
            });

        } finally {
            setIsFetching(false)
            setIsModalVisible(false)
        }
    }

    useEffect(() => {
        if (isModalVisible) {
          document.body.classList.add("no-scroll");
        } else {
          document.body.classList.remove("no-scroll");
        }
    
        return () => {
          document.body.classList.remove("no-scroll");
        };
      }, [isModalVisible]);

    return (
        <>
            {isModalVisible && (
                <div
                    className="custom-enquiry-container"
                    id="enquiryModal"
                    style={{ display: "flex" }}
                >
                    <div className="custom-enquiry">
                        <button
                            className="custom-close-btn"
                            onClick={() => setIsModalVisible(false)}
                        >
                            <FontAwesomeIcon icon={faX} />
                        </button>
                        <div className="formAssembly">
                            <div className="tripenquiryTitle">
                                <h3>We&apos;d Love to Hear From You!</h3>
                                <span>Submit Your Query Here</span>
                            </div>
                            <div className="addInput">
                                <form method='POST' onSubmit={handleNewEnquiry}>
                                    <div>
                                        {alert && (
                                            <div
                                                className="alert alert-danger alert-dismissible fade show"
                                                role="alert"
                                            >
                                                <strong>Error! </strong>
                                                {errorMessage ? errorMessage : "Something went wrong."}
                                                <button
                                                    type="button"
                                                    className="btn-close"
                                                    onClick={() => setAlert(false)}
                                                ></button>
                                            </div>
                                        )}
                                    </div>
                                    <div className="form__group field">
                                        <input type="text" className="form__field" name='name'
                                            value={enquiryFormData.name}
                                            onChange={(e) => setEnquiryFormData({ ...enquiryFormData, name: e.target.value })}
                                            required />
                                        <label className="form__label">What&apos;s your name?<span className="imp">*</span></label>
                                    </div>
                                    <div className="form__group field">
                                        <input type="email" className="form__field" name='email'
                                            value={enquiryFormData.email}
                                            onChange={(e) => setEnquiryFormData({ ...enquiryFormData, email: e.target.value })}
                                            required />
                                        <label className="form__label">Your email address?<span className="imp">*</span></label>
                                    </div>
                                    <div className="form__group field">
                                        <input type="tel" className="form__field" name='phoneNumber'
                                            value={enquiryFormData.phoneNumber}
                                            placeholder=""
                                            // pattern="\d{10}"
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                if (/^\d*$/.test(value)) {
                                                    setEnquiryFormData({ ...enquiryFormData, phoneNumber: e.target.value })
                                                }
                                            }}
                                            // onChange={(e) => setEnquiryFormData({ ...enquiryFormData, phoneNumber: e.target.value })}
                                            required />
                                        <label className="form__label">Contact number?<span className="imp">*</span></label>
                                    </div>
                                    <div className="getherInput">
                                        <div className="form__group field">
                                            <input type="date" className="form__field date_input"
                                                name='travelDate'
                                                value={enquiryFormData.travelDate}
                                                placeholder=""
                                                min={new Date().toISOString().split('T')[ 0 ]}
                                                onChange={(e) => setEnquiryFormData({ ...enquiryFormData, travelDate: e.target.value })}
                                                required />
                                            <label className="form__label">Tentative Travel Date<span className="imp">*</span></label>
                                        </div>
                                        <div className="form__group field">
                                            <input type="number" className="form__field"
                                                name='totalParticipant'
                                                min={1}
                                                max={20}
                                                value={enquiryFormData.totalParticipant}
                                                onChange={(e) => setEnquiryFormData({ ...enquiryFormData, totalParticipant: e.target.value })}
                                                required />
                                            <label className="form__label">Traveller Count<span className="imp">*</span></label>
                                        </div>
                                    </div>
                                    <div className="form__group field">
                                        <textarea
                                            className="form__field"
                                            placeholder="Tell us more about your plans!"
                                            name='message'
                                            value={enquiryFormData.message}
                                            style={{ "height": "110px" }}
                                            onChange={(e) => setEnquiryFormData({ ...enquiryFormData, message: e.target.value })}
                                        ></textarea>
                                        <label className="form__label">Tell us more about your plans!</label>
                                    </div>
                                    <button type='submit' className="enquiryBtn" disabled={isFetching ? true : false}>
                                        {isFetching ? "Sending..." : "Connect with an Expert"}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
EnquiryModal.propTypes = {
    // tourID: PropTypes.string.isRequired,
    isModalVisible: PropTypes.bool.isRequired,
    setIsModalVisible: PropTypes.func.isRequired
};

export default EnquiryModal;
