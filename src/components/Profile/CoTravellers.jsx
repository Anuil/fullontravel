import { useEffect, useMemo, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCloudArrowUp,
    faTimes,
    faFile
} from "@fortawesome/free-solid-svg-icons";
import { toast, Bounce } from 'react-toastify';
import { useAddCoTravellerMutation, useDeleteCoTravellerMutation, useFetchCoTravellerQuery, useUpdateCoTravellerMutation } from '../../features/user/userApiSlice';
import { useUploadImageMutation } from '../../features/files/filesApiSlice';
import { countryList } from '../../utils/countriesList';
import Select from "react-select"
import PropTypes from "prop-types"

const BASE_FILE_SRC = "https://cdn.fullontravel.com/"
const CoTravellers = ({ user }) => {

    const [isFetching, setIsFetching] = useState(false)
    const [coPassengers, setCoPassengers] = useState([]);

    const [coTravellerprofileData, setCoTravellerProfileData] = useState({
        id: null,
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        countryCode: { label: "+91", value: "+91", icon: "🇮🇳" },
        dateOfBirth: "",
        gender: "",
        maritalStatus: "",
        profileImageUrl: "",
        anniversaryDate: "",
        mealPreference: "",
        addressDetail: {
            address: "",
            state: "",
            pinCode: "",
            country: ""
        },
        passportDetail: null,
        covidDetail: null,
    })

    const { data: CoTravellersList, refetch: refetchCoTravellers } = useFetchCoTravellerQuery({
        userId: user?.id,
        page: 1,
        pageSize: 10
    })

    const initialProfiles = useMemo(() => {
        if (!CoTravellersList?.data) return {};

        return CoTravellersList.data.reduce((acc, passenger) => {

            const countryCodeData = countryList.find(val => val?.phoneCode === passenger?.countryCode);
            const countryData = countryList.find(val => val?.name === passenger?.addressDetail?.country);

            acc[passenger.id] = {
                ...passenger,
                countryCode: countryCodeData
                    ? { label: countryCodeData.phoneCode, value: countryCodeData.phoneCode, icon: countryCodeData?.flagEmoji }
                    : null,
                addressDetail: {
                    ...passenger.addressDetail,
                    country: countryData
                        ? { label: countryData.name, value: countryData.name, icon: countryData?.flagEmoji }
                        : null
                }
            };
            return acc;
        }, {});
    }, [CoTravellersList, countryList]);

    useEffect(() => {
        if (Object.keys(initialProfiles).length > 0) {
            setCoPassengers(CoTravellersList?.data);
            setCoTravellerProfileData(initialProfiles);
        }
    }, [initialProfiles]);


    // useEffect(() => {
    //     if (CoTravellersList) {
    //         setCoPassengers(CoTravellersList?.data);

    //         // Initialize profile states for each passenger
    //         const initialProfiles = {};
    //         CoTravellersList?.data?.forEach(passenger => {
    //             const countryCodeData = countryList.find((val) => val?.phoneCode === passenger?.countryCode) 
    //             // countryCode: { label: countryCodeData.phoneCode, value: countryCodeData.phoneCode, icon: countryCodeData?.flagEmoji }
    //             initialProfiles[ passenger.id ] = { ...passenger};
    //         });

    //         setCoTravellerProfileData(initialProfiles);
    //     }
    // }, [ CoTravellersList ]);

    const handleRemoveCoPassenger = (id) => {
        setCoPassengers(coPassengers.filter((passenger) => passenger.id !== id));
    };

    const handleAddCoPassenger = () => {
        setCoPassengers([...coPassengers, {
            id: Date.now(),
            firstName: `Co-Traveller ${coPassengers.length + 1}`
        } ]);
    };

    const formattedDate = (date) => {
        if (date) {
            return new Date(date)
                .toISOString()
                .slice(0, 10);
        }
        return ""
    }
    const [addCoTraveller ] = useAddCoTravellerMutation()
    const [updateCoTraveller] = useUpdateCoTravellerMutation()

    const [updatingTraveller, setUpdatingTraveller] = useState(false)
    const [updatingPassport, setUpdatingPassport] = useState(false)
    const [updatingCovid, setUpdatingCovid] = useState(false)

    const handleAddCoTraveller = async (e, id) => {
        e.preventDefault()
        try {

            setUpdatingTraveller(true)
            if (coTravellerprofileData[id].email === undefined || coTravellerprofileData[id].email === null || coTravellerprofileData[id].email === "") {
                throw "Email is required"
            }

            const bodyData = {
                firstName: coTravellerprofileData[id].firstName,
                lastName: coTravellerprofileData[id].lastName,
                email: coTravellerprofileData[id].email,
                mobile: coTravellerprofileData[id].mobile,
                countryCode: coTravellerprofileData[id].countryCode?.value,
                dateOfBirth: coTravellerprofileData[id].dateOfBirth,
                gender: coTravellerprofileData[id].gender,
                maritalStatus: coTravellerprofileData[id].maritalStatus,
                anniversaryDate: coTravellerprofileData[id].anniversaryDate,
                mealPreference: coTravellerprofileData[id].mealPreference,
                addressDetail: {
                    address: coTravellerprofileData[id].addressDetail.address,
                    state: coTravellerprofileData[id].addressDetail.state,
                    pinCode: coTravellerprofileData[id].addressDetail.pinCode,
                    country: coTravellerprofileData[id].addressDetail.country?.value
                },
            }

            const { data, error } = await addCoTraveller({
                userId: user?.id,
                body: bodyData
            })
            if (data) {
                toast.success("CoTraveller Added", {
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
                refetchCoTravellers()
                if (error) {
                    throw error
                }
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
            // setIsFetching(false)
            setUpdatingTraveller(false)
        }
    }
    const handleUpdateCoTraveller = async (id) => {
        try {
            setUpdatingTraveller(true)
            const bodyData = {
                firstName: coTravellerprofileData[id].firstName,
                lastName: coTravellerprofileData[id].lastName,
                email: coTravellerprofileData[id].email,
                mobile: coTravellerprofileData[id].mobile,
                countryCode: coTravellerprofileData[id].countryCode?.value,
                dateOfBirth: coTravellerprofileData[id].dateOfBirth,
                gender: coTravellerprofileData[id].gender,
                maritalStatus: coTravellerprofileData[id].maritalStatus,
                ...(coTravellerprofileData[ id ].anniversaryDate ? { anniversaryDate: coTravellerprofileData[ id ].anniversaryDate } : null),
                anniversaryDate: coTravellerprofileData[ id ].anniversaryDate ? coTravellerprofileData[ id ].anniversaryDate : "",
                mealPreference: coTravellerprofileData[id].mealPreference,
                addressDetail: {
                    address: coTravellerprofileData[id].addressDetail.address,
                    state: coTravellerprofileData[id].addressDetail.state,
                    pinCode: coTravellerprofileData[id].addressDetail.pinCode,
                    country: coTravellerprofileData[id].addressDetail.country?.value
                },
            }
            const { data, error } = await updateCoTraveller({
                userId: user?.id,
                coTravellerId: id,
                body: bodyData
            })
            if (data) {
                toast.success("CoTraveller Updated", {
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
                refetchCoTravellers()
                if (error) {
                    throw error
                }
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
            setUpdatingTraveller(false)
        }
    }

    // const handleImageChange = (e, type) => {
    //     const file = e.target.files[0];

    //     if (type === "passportCertificate") {

    //         setCoTravellerProfileData({
    //             ...coTravellerprofileData,
    //             passportDetail: {
    //                 ...coTravellerprofileData.passportDetail,
    //                 passportCertificate: file
    //             }
    //         });
    //     }

    //     if (type === "covidCertificate") {
    //         setCoTravellerProfileData({
    //             ...coTravellerprofileData,
    //             covidDetail: {
    //                 ...coTravellerprofileData.covidDetail,
    //                 covidCertificate: file
    //             }
    //         });
    //     }
    // }

    const [uploadImage] = useUploadImageMutation()
    const handleFileUpload = async (type, update = false, id = null) => {
        const formData = new FormData();

        if (type === "passportCertificate") {
            if (update) {
                formData.append("files", coTravellerprofileData[id]?.passportDetail.passportCertificate);
            } else {
                formData.append("files", coTravellerprofileData?.passportDetail.passportCertificate);
            }
        }

        if (type === "covidCertificate") {
            if (update) {
                formData.append("files", coTravellerprofileData[id]?.covidDetail.covidCertificate);
            } else {
                formData.append("files", coTravellerprofileData?.covidDetail.covidCertificate);
            }
        }

        try {
            const { data, error } = await uploadImage(formData);
            if (data) {
                return data?.fileNames[0];
            }
            if (error) {
                throw error
            }
        } catch (error) {
            toast.error(error?.data?.errorMessage || "Error uploading file")
            return null
        }
        return null;
    }

    const handlePassportData = async (e, id) => {
        e.preventDefault()
        try {
            setUpdatingPassport(true)
            let uploadedCertificate;
            if (coTravellerprofileData?.passportDetail.passportCertificate) {
                const uploadedCertificate = await handleFileUpload("passportCertificate")
                if (!uploadedCertificate) {
                    throw "Error Uploading certificate"
                }
            }

            const passportData = {
                passportDetail: {
                    passportNumber: coTravellerprofileData[id]?.passportDetail?.passportNumber,
                    passportExpiryDate: coTravellerprofileData[id]?.passportDetail?.passportExpiryDate,
                    passportCertificate: uploadedCertificate
                }
            }
            const { data, error } = await addCoTraveller({
                userId: user?.id,
                body: passportData
            })

            if (data) {
                toast.success("Profile Updated", {
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
            setUpdatingPassport(false)
        }
    }
    const handleUpdatePassportData = async (id) => {
        try {
            setUpdatingPassport(true)
            let uploadedCertificate;
            if (typeof coTravellerprofileData[id]?.passportDetail?.passportCertificate !== "string") {
                uploadedCertificate = await handleFileUpload("passportCertificate", true, id)
                if (!uploadedCertificate) {
                    throw "Error Uploading certificate"
                }
            }

            const passportData = {
                passportDetail: {
                    passportNumber: coTravellerprofileData[id]?.passportDetail?.passportNumber,
                    passportExpiryDate: coTravellerprofileData[id]?.passportDetail?.passportExpiryDate,
                    passportCertificate: uploadedCertificate
                }
            }

            const { data, error } = await updateCoTraveller({
                userId: user?.id,
                coTravellerId: id,
                body: passportData
            })
            if (data) {
                toast.success("CoTraveller Passport details Updated", {
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
                refetchCoTravellers()
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
            setUpdatingPassport(false)
        }
    }


    const handleCovidData = async (e) => {
        e.preventDefault()
        try {
            setUpdatingCovid(true)
            const uploadedCertificate = await handleFileUpload("covidCertificate")

            const covidData = {
                covidDetail: {
                    noOfVaccines: coTravellerprofileData?.covidDetail?.noOfVaccines,
                    vaccinationName: coTravellerprofileData?.covidDetail?.vaccinationName,
                    lastVaccinationDate: coTravellerprofileData?.covidDetail?.lastVaccinationDate,
                    covidCertificate: uploadedCertificate
                }

            }
            const { data, error } = await addCoTraveller({
                userId: user?.id,
                body: covidData
            })

            if (data) {
                toast.success("Profile Updated", {
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
            setUpdatingCovid(false)
        }
    }

    const handleUpdateCovidData = async (id) => {
        try {
            setUpdatingCovid(true)
            let uploadedCertificate;
            if (typeof coTravellerprofileData[id]?.covidDetail?.covidCertificate !== "string") {
                uploadedCertificate = await handleFileUpload("covidCertificate", true, id)
            }

            const covidData = {
                covidDetail: {
                    noOfVaccines: coTravellerprofileData[id]?.covidDetail?.noOfVaccines,
                    vaccinationName: coTravellerprofileData[id]?.covidDetail?.vaccinationName,
                    lastVaccinationDate: coTravellerprofileData[id]?.covidDetail?.lastVaccinationDate,
                    covidCertificate: uploadedCertificate
                }

            }

            const { data, error } = await updateCoTraveller({
                userId: user?.id,
                coTravellerId: id,
                body: covidData
            })

            if (data) {
                toast.success("CoTraveller Vaccine details Updated", {
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

                refetchCoTravellers()
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
            setUpdatingCovid(false)
        }
    }

    const countiresCodeDropdown = countryList.map((country) => (
        { label: country.phoneCode, value: country.phoneCode, icon: country.flagEmoji }
    ))


    const [isDeleting, setIsDeleting] = useState(false)
    const [deleteCoTraveller] = useDeleteCoTravellerMutation()
    const handleCoTravellerDelete = async (id) => {
        try {
            setIsFetching(true)
            const { data, error } = await deleteCoTraveller({
                userId: user?.id,
                coTravellerId: id,
            })
            if (data) {
                setCoPassengers((prevCoPassengers) =>
                    prevCoPassengers.filter((coTraveller) => coTraveller.id !== id)
                );
                refetchCoTravellers()
                toast.success("CoTraveller Deleted", {
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
            setIsDeleting(false)
        }
    }
    const sortCountriesDropdown = (countries) => {
        if (!countries || !Array.isArray(countries)) return [];

        return countries.sort((a, b) => {
            if (a.label === "India") return -1; // Move "India" to the top
            if (b.label === "India") return 1;
            return 0; // Keep others in original order
        });
    };

    const countiresDropdown = countryList.map((country) => ({ value: country.name, label: country.name, icon: country.flagEmoji }))

    return (
        <div className="tab-pane fade" id="profile-page-passengers" role="tabpanel" aria-labelledby="profile-page-passengers-tab">
            <div className="pane-box">
                <div className="headerCopassenger border-bottom pb-2 mb-3 d-flex justify-content-between align-items-center">
                    <div className="heading">Add New Co-Traveller</div>
                    <button className="btn btn-primary" onClick={handleAddCoPassenger}>Add Co-Traveller</button>
                </div>
                <div className="accordion" id="coPassenger">
                    {coPassengers?.map((passenger) => (
                        <div className="accordion-item" key={passenger.id}>
                            <h2 className="accordion-header">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${passenger.id}`} aria-expanded="false" aria-controls={`#collapse${passenger.id}`}>
                                    {passenger.firstName}{`${passenger?.dateOfBirth ? ", " : ""}`}{passenger?.dateOfBirth ? `${new Date().getFullYear() - new Date(passenger?.dateOfBirth).getFullYear() -
                                        (new Date() < new Date(new Date(passenger?.dateOfBirth).setFullYear(new Date().getFullYear())) ? 1 : 0)} Years` : ""}
                                </button>
                            </h2>
                            <div id={`collapse${passenger.id}`} className="accordion-collapse collapse" data-bs-parent="#coPassenger">
                                <div className="accordion-body">
                                    <div className='d-flex justify-content-end'>
                                        {
                                            passenger?.email ? "" : <button
                                                className="btn"
                                                onClick={() => handleRemoveCoPassenger(passenger.id)}
                                            >
                                                <FontAwesomeIcon icon={faTimes} />
                                            </button>
                                        }

                                    </div>
                                    <div className="accordion" id="myProfile">
                                        <div className="accordion-item">
                                            <h2 className="accordion-header">
                                                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                                                    General Details
                                                </button>
                                            </h2>
                                            <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show">
                                                <div className="accordion-body">
                                                    <form method="POST" onSubmit={(e) => handleAddCoTraveller(e, passenger?.id)}>
                                                        <div className="row">
                                                            <div className="col-12 col-md-6 col-lg-4 mb-3">
                                                                <label>First Name<span className="text-danger">*</span>:</label>
                                                                <input
                                                                    className="form-control"
                                                                    // value={passenger?.name || ""} 
                                                                    value={coTravellerprofileData[passenger.id]?.firstName || ""}
                                                                    type="text"
                                                                    required
                                                                    onChange={(e) => {
                                                                        const value = e.target.value;
                                                                        setCoTravellerProfileData(prev => ({
                                                                            ...prev,
                                                                            [passenger.id]: {
                                                                                ...prev[passenger.id],
                                                                                firstName: value,
                                                                            }
                                                                        }));
                                                                    }}
                                                                />
                                                            </div>
                                                            <div className="col-12 col-md-6 col-lg-4 mb-3">
                                                                <label>Last Name<span className="text-danger">*</span>:</label>
                                                                <input
                                                                    className="form-control"
                                                                    // value={passenger?.name || ""} 
                                                                    value={coTravellerprofileData[passenger.id]?.lastName || ""}
                                                                    type="text"
                                                                    required
                                                                    onChange={(e) => {
                                                                        const value = e.target.value;
                                                                        setCoTravellerProfileData(prev => ({
                                                                            ...prev,
                                                                            [passenger.id]: {
                                                                                ...prev[passenger.id],
                                                                                lastName: value,
                                                                            }
                                                                        }));
                                                                    }}
                                                                />
                                                            </div>
                                                            <div className="col-12 col-md-6 col-lg-4 mb-3">
                                                                <label>Mobile<span className="text-danger">*</span>:</label>
                                                                <div className="phonediv">
                                                                    <Select
                                                                        options={countiresCodeDropdown}
                                                                        formatOptionLabel={({ icon, label }) => (
                                                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                                                <span style={{ marginRight: '8px' }}>{icon}</span>
                                                                                <span>{label}</span>
                                                                            </div>
                                                                        )}
                                                                        required
                                                                        // value={coTravellerprofileData.countryCode}
                                                                        value={coTravellerprofileData[passenger.id]?.countryCode || ""}
                                                                        onChange={(selectedCode) => {
                                                                            setCoTravellerProfileData(prev => ({
                                                                                ...prev,
                                                                                [passenger.id]: {
                                                                                    ...prev[passenger.id],
                                                                                    countryCode: selectedCode,
                                                                                }
                                                                            }));
                                                                        }}
                                                                    // onChange={(selectedCode) => setCoTravellerProfileData({
                                                                    //     ...coTravellerprofileData,
                                                                    //     countryCode: selectedCode
                                                                    // })}
                                                                    />
                                                                    <input
                                                                        className="form-control"
                                                                        // value={passenger?.mobile}
                                                                        value={coTravellerprofileData[passenger.id]?.mobile || ""}
                                                                        type="tel"
                                                                        required
                                                                        // pattern="\d{10}"
                                                                        // maxLength={10}
                                                                        onChange={(e) => {
                                                                            const value = e.target.value;
                                                                            if (/^\d*$/.test(value)) {
                                                                                setCoTravellerProfileData(prev => ({
                                                                                    ...prev,
                                                                                    [ passenger.id ]: {
                                                                                        ...prev[ passenger.id ],
                                                                                        mobile: value,
                                                                                    }
                                                                                }));
                                                                            }
                                                                            
                                                                        }}
                                                                        // onChange={(e) => {
                                                                        //     const value = e.target.value;
                                                                        //     if (/^\d{0,10}$/.test(value)) {
                                                                        //         setCoTravellerProfileData({ ...coTravellerprofileData, mobile: value });
                                                                        //     }
                                                                        // }}
                                                                        placeholder="Enter 10-digit number"
                                                                    />

                                                                </div>
                                                            </div>
                                                            <div className="col-12 col-md-6 col-lg-4 mb-3">
                                                                <label>Email</label>
                                                                <input
                                                                    className="form-control"
                                                                    // value={passenger?.email} 
                                                                    value={coTravellerprofileData[passenger.id]?.email || ""}
                                                                    type="text"
                                                                    required
                                                                    onChange={(e) => {
                                                                        const value = e.target.value;
                                                                        setCoTravellerProfileData(prev => ({
                                                                            ...prev,
                                                                            [passenger.id]: {
                                                                                ...prev[passenger.id],
                                                                                email: value,
                                                                            }
                                                                        }));
                                                                    }}
                                                                />
                                                            </div>
                                                            <div className="col-12 col-md-6 col-lg-4 mb-3">
                                                                <label>Gender:</label>
                                                                <select
                                                                    className="form-select"
                                                                    aria-label="Default select example"
                                                                    // value={passenger?.gender}
                                                                    value={coTravellerprofileData[passenger.id]?.gender || ""}
                                                                    onChange={(e) => {
                                                                        const value = e.target.value;
                                                                        setCoTravellerProfileData(prev => ({
                                                                            ...prev,
                                                                            [passenger.id]: {
                                                                                ...prev[passenger.id],
                                                                                gender: value,
                                                                            }
                                                                        }));
                                                                    }}
                                                                >
                                                                    <option selected>Select Gender</option>
                                                                    <option value="MALE">Male</option>
                                                                    <option value="FEMALE">Female</option>
                                                                    <option value="OTHER">Other</option>
                                                                </select>
                                                            </div>
                                                            <div className="col-12 col-md-6 col-lg-4 mb-3">
                                                                <label>Marital Status:</label>
                                                                <select
                                                                    className="form-select"
                                                                    aria-label="Default select example"
                                                                    // value={passenger?.maritalStatus} 
                                                                    value={coTravellerprofileData[passenger.id]?.maritalStatus || ""}
                                                                    onChange={(e) => {
                                                                        const value = e.target.value;
                                                                        setCoTravellerProfileData(prev => ({
                                                                            ...prev,
                                                                            [passenger.id]: {
                                                                                ...prev[passenger.id],
                                                                                maritalStatus: value,
                                                                            }
                                                                        }));
                                                                    }}
                                                                >
                                                                    <option selected>Select Marital Status</option>
                                                                    <option value="MARRIED">Married</option>
                                                                    <option value="UNMARRIED">Unmarried</option>
                                                                </select>
                                                            </div>
                                                            {
                                                                coTravellerprofileData[passenger.id]?.maritalStatus === "MARRIED" && (
                                                                    <div className="col-12 col-md-6 col-lg-4 mb-3">
                                                                        <label>Anniversary Date:</label>
                                                                        <input
                                                                            className="form-control"
                                                                            type="date"
                                                                            value={formattedDate(coTravellerprofileData[passenger.id]?.anniversaryDate) || "dd/mm/yyy"}
                                                                            // value={
                                                                            //     coTravellerprofileData?.anniversaryDate
                                                                            //         ? coTravellerprofileData.anniversaryDate.split("/").reverse().join("-")
                                                                            //         : ""
                                                                            // }
                                                                            onChange={(e) => {
                                                                                const value = e.target.value;
                                                                                setCoTravellerProfileData(prev => ({
                                                                                    ...prev,
                                                                                    [passenger.id]: {
                                                                                        ...prev[passenger.id],
                                                                                        anniversaryDate: value,
                                                                                    }
                                                                                }));
                                                                            }}
                                                                        />
                                                                    </div>
                                                                )
                                                            }

                                                            <div className="col-12 col-md-6 col-lg-4 mb-3">
                                                                <label>Date of Birth<span className="text-danger">*</span>:</label>
                                                                <input className="form-control" type="date"
                                                                    value={formattedDate(coTravellerprofileData[passenger.id]?.dateOfBirth)}
                                                                    // value={
                                                                    //     coTravellerprofileData?.dateOfBirth
                                                                    //         ? coTravellerprofileData?.dateOfBirth.split("/").reverse().join("-")
                                                                    //         : ""
                                                                    // }
                                                                    required
                                                                    onChange={(e) => {
                                                                        const value = e.target.value;
                                                                        setCoTravellerProfileData(prev => ({
                                                                            ...prev,
                                                                            [passenger.id]: {
                                                                                ...prev[passenger.id],
                                                                                dateOfBirth: value,
                                                                            }
                                                                        }));
                                                                    }}

                                                                />
                                                            </div>
                                                            <div className="col-12 col-md-6 col-lg-4 mb-3">
                                                                <label>Meal Preference:</label>
                                                                <select
                                                                    className="form-select"
                                                                    aria-label="Default select example"
                                                                    // value={passenger?.maritalStatus} 
                                                                    value={coTravellerprofileData[passenger.id]?.mealPreference || ""}
                                                                    onChange={(e) => {
                                                                        const value = e.target.value;
                                                                        setCoTravellerProfileData(prev => ({
                                                                            ...prev,
                                                                            [passenger.id]: {
                                                                                ...prev[passenger.id],
                                                                                mealPreference: value,
                                                                            }
                                                                        }));
                                                                    }}
                                                                >
                                                                    <option selected>Select Meal Preference</option>
                                                                    <option value="VEG">Veg</option>
                                                                    <option value="NONVEG">Non-Veg</option>
                                                                </select>
                                                            </div>
                                                            <div className="col-12 col-md-6 col-lg-4 mb-3">
                                                                <label>Address:</label>
                                                                <input
                                                                    className="form-control"
                                                                    type="text"
                                                                    // value={passenger?.addressDetail?.address} 
                                                                    value={coTravellerprofileData[passenger.id]?.addressDetail?.address || ""}
                                                                    onChange={(e) => {
                                                                        const value = e.target.value;
                                                                        setCoTravellerProfileData(prev => ({
                                                                            ...prev,
                                                                            [passenger.id]: {
                                                                                ...prev[passenger.id],
                                                                                addressDetail: {
                                                                                    ...prev[passenger.id]?.addressDetail,
                                                                                    address: value
                                                                                }
                                                                            }
                                                                        }));
                                                                    }}
                                                                />
                                                            </div>
                                                            <div className="col-12 col-md-6 col-lg-4 mb-3">
                                                                <label>Country:</label>

                                                                <Select
                                                                    options={sortCountriesDropdown(countiresDropdown)}
                                                                    // className="form-control"
                                                                    formatOptionLabel={({ icon, label }) => (
                                                                        <div style={{ display: "flex", alignItems: "center" }}>
                                                                            <span style={{ marginRight: "8px" }}>{icon}</span>
                                                                            <span>{label}</span>
                                                                        </div>
                                                                    )}
                                                                    value={coTravellerprofileData[ passenger.id ]?.addressDetail?.country || ""}
                                                                    // onChange={(selectedCode) => {
                                                                    //     setCoTravellerProfileData(prev => ({
                                                                    //         ...prev,
                                                                    //         [ passenger.id ]: {
                                                                    //             ...prev[ passenger.id ],
                                                                    //             countryCode: selectedCode,
                                                                    //         }
                                                                    //     }));
                                                                    // }}
                                                                    onChange={(selectedCountry) => {
                                                                        setCoTravellerProfileData(prev => ({
                                                                            ...prev,
                                                                            [passenger.id]: {
                                                                                ...prev[passenger.id],
                                                                                addressDetail: {
                                                                                    ...prev[passenger.id]?.addressDetail, // Preserve existing address details
                                                                                    country: selectedCountry
                                                                                }
                                                                            }
                                                                        }));
                                                                    }}
                                                                />

                                                                {/* <input
                                                                    
                                                                    required type="text"
                                                                    value={coTravellerprofileData[ passenger.id ]?.addressDetail?.country || ""}
                                                                    onChange={(e) => {
                                                                        const value = e.target.value;
                                                                        setCoTravellerProfileData(prev => ({
                                                                            ...prev,
                                                                            [ passenger.id ]: {
                                                                                ...prev[ passenger.id ],
                                                                                addressDetail: {
                                                                                    ...prev[ passenger.id ]?.addressDetail, // Preserve existing address details
                                                                                    country: value
                                                                                }
                                                                            }
                                                                        }));
                                                                    }}
                                                                /> */}
                                                            </div>
                                                            <div className="col-12 col-md-6 col-lg-4 mb-3">
                                                                <label>State:</label>
                                                                <input
                                                                    className="form-control"
                                                                    type="text"
                                                                    value={coTravellerprofileData[passenger.id]?.addressDetail?.state || ""}
                                                                    onChange={(e) => {
                                                                        const value = e.target.value;
                                                                        setCoTravellerProfileData(prev => ({
                                                                            ...prev,
                                                                            [passenger.id]: {
                                                                                ...prev[passenger.id],
                                                                                addressDetail: {
                                                                                    ...prev[passenger.id]?.addressDetail, // Preserve existing address details
                                                                                    state: value
                                                                                }
                                                                            }
                                                                        }));
                                                                    }}
                                                                // value={coTravellerprofileData[ passenger.id ]?.state || ""}
                                                                // onChange={(e) => {
                                                                //     const value = e.target.value;
                                                                //     setCoTravellerProfileData(prev => ({
                                                                //         ...prev,
                                                                //         [ passenger.id ]: {
                                                                //             ...prev[ passenger.id ],
                                                                //             state: value,
                                                                //         }
                                                                //     }));
                                                                // }}
                                                                />
                                                            </div>
                                                            <div className="col-12 col-md-6 col-lg-4 mb-3">
                                                                <label>Pin Code:</label>
                                                                <input
                                                                    className="form-control"
                                                                    type="text"
                                                                    value={coTravellerprofileData[passenger.id]?.addressDetail?.pinCode || ""}
                                                                    onChange={(e) => {
                                                                        const value = e.target.value;
                                                                        setCoTravellerProfileData(prev => ({
                                                                            ...prev,
                                                                            [passenger.id]: {
                                                                                ...prev[passenger.id],
                                                                                addressDetail: {
                                                                                    ...prev[passenger.id]?.addressDetail, // Preserve existing address details
                                                                                    pinCode: value
                                                                                }
                                                                            }
                                                                        }));
                                                                    }}
                                                                // value={passenger?.addressDetail?.pinCode}
                                                                // onChange={(e) =>
                                                                //     setCoTravellerProfileData((prev) => ({
                                                                //         ...prev,
                                                                //         addressDetail: { ...prev.addressDetail, pinCode: e.target.value },
                                                                //     }))
                                                                // } 
                                                                />
                                                            </div>
                                                            <div className="col-12 d-flex justify-content-end border-top pt-2">
                                                                {
                                                                    passenger?.email ? <button type="button" className="btn btn-primary" disabled={updatingTraveller} onClick={() => handleUpdateCoTraveller(passenger?.id)}>{updatingTraveller ? "Updating..." : "Update"}</button> : <button type="submit" className="btn btn-primary">{updatingTraveller ? "Adding..." : "Add"}</button>
                                                                }
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="accordion-item">
                                            <h2 className="accordion-header">
                                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
                                                    Passport Details
                                                </button>
                                            </h2>
                                            <div id="panelsStayOpen-collapseThree" className="accordion-collapse collapse">
                                                <div className="accordion-body">
                                                    <form method='POST' onSubmit={(e) => handlePassportData(e, passenger?.id)}>
                                                        <div className="row">
                                                            <div className="col-12 col-md-6 col-lg-4 mb-3">
                                                                <label>Passport Number<span className="text-danger">*</span>:</label>
                                                                <input
                                                                    className="form-control"
                                                                    type="text" required
                                                                    value={coTravellerprofileData[passenger.id]?.passportDetail?.passportNumber || ""}
                                                                    onChange={(e) => {
                                                                        const value = e.target.value;
                                                                        setCoTravellerProfileData(prev => ({
                                                                            ...prev,
                                                                            [passenger.id]: {
                                                                                ...prev[passenger.id],
                                                                                passportDetail: {
                                                                                    ...prev[passenger.id]?.passportDetail, // Preserve existing address details
                                                                                    passportNumber: value
                                                                                }
                                                                            }
                                                                        }));
                                                                    }}
                                                                // value={passenger?.passportDetail?.passportNumber}
                                                                // onChange={(e) => setCoTravellerProfileData({
                                                                //     ...coTravellerprofileData,
                                                                //     passportDetail: {
                                                                //         ...coTravellerprofileData.passportDetail,
                                                                //         passportNumber: e.target.value
                                                                //     }
                                                                // })}
                                                                />
                                                            </div>
                                                            <div className="col-12 col-md-6 col-lg-4 mb-3">
                                                                <label>Passport Expiry Date<span className="text-danger">*</span>:</label>
                                                                <input
                                                                    className="form-control"
                                                                    type="date"
                                                                    required
                                                                    min={new Date().toISOString().split("T")[0]}
                                                                    value={formattedDate(coTravellerprofileData[passenger.id]?.passportDetail?.passportExpiryDate) || "dd/mm/yyy"}
                                                                    // value={coTravellerprofileData[ passenger.id ]?.passportDetail?.passportExpiryDate || ""}
                                                                    onChange={(e) => {
                                                                        const value = e.target.value;
                                                                        setCoTravellerProfileData(prev => ({
                                                                            ...prev,
                                                                            [passenger.id]: {
                                                                                ...prev[passenger.id],
                                                                                passportDetail: {
                                                                                    ...prev[passenger.id]?.passportDetail, // Preserve existing address details
                                                                                    passportExpiryDate: value
                                                                                }
                                                                            }
                                                                        }));
                                                                    }}
                                                                />
                                                            </div>
                                                            <div className="col-12 col-md-6 col-lg-4 mb-3">
                                                                <label>Upload Copy of Passport:</label>
                                                                <div className="fileWrapper">
                                                                    <div className="customFileinput">
                                                                        <div className="customInput">
                                                                            <FontAwesomeIcon icon={faCloudArrowUp} />
                                                                            <span>{coTravellerprofileData[passenger?.id]?.passportDetail?.passportCertificate ? "Update" : "Choose File"}</span>
                                                                        </div>
                                                                        <input
                                                                            className="form-control"
                                                                            type="file"
                                                                            onChange={(e) => {
                                                                                const value = e.target.files[0];
                                                                                setCoTravellerProfileData(prev => ({
                                                                                    ...prev,
                                                                                    [passenger.id]: {
                                                                                        ...prev[passenger.id],
                                                                                        passportDetail: {
                                                                                            ...prev[passenger.id]?.passportDetail,
                                                                                            passportCertificate: value
                                                                                        }
                                                                                    }
                                                                                }));
                                                                            }}
                                                                        // onChange={(e) => handleImageChange(e, "passportCertificate")}
                                                                        />
                                                                    </div>

                                                                    {
                                                                        coTravellerprofileData[passenger?.id]?.passportDetail?.passportCertificate && (
                                                                            <a className="uploadedFile" href={BASE_FILE_SRC + coTravellerprofileData[passenger?.id]?.passportDetail?.passportCertificate} target='_blank'>
                                                                                <FontAwesomeIcon icon={faFile} />
                                                                            </a>
                                                                        )
                                                                    }
                                                                </div>
                                                                <div className="note"> Allowed formats: PDF & All Types of Image Files</div>
                                                            </div>
                                                            <div className="col-12 d-flex justify-content-end border-top pt-2">
                                                                {
                                                                    passenger?.email ? <button type="button" className="btn btn-primary" disabled={updatingPassport} onClick={() => handleUpdatePassportData(passenger?.id)}>{updatingPassport ? "Updating..." : "Update"}</button> : <button type="submit" className="btn btn-primary">{updatingPassport ? "Adding.." : "Add"}</button>
                                                                }

                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="accordion-item">
                                            <h2 className="accordion-header">
                                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseFour" aria-expanded="false" aria-controls="panelsStayOpen-collapseFour">
                                                    Covid-19 Vaccination Certificates
                                                </button>
                                            </h2>
                                            <div id="panelsStayOpen-collapseFour" className="accordion-collapse collapse">
                                                <div className="accordion-body">
                                                    <form method='POST' onSubmit={handleCovidData} >
                                                        <div className="row">
                                                            <div className="col-12 col-md-6 col-lg-4 mb-3">
                                                                <label>No. of Vaccines<span className="text-danger">*</span>:</label>
                                                                <input
                                                                    className="form-control"
                                                                    type="text"
                                                                    required
                                                                    value={coTravellerprofileData[passenger.id]?.covidDetail?.noOfVaccines || ""}
                                                                    onChange={(e) => {
                                                                        const value = e.target.value;
                                                                        setCoTravellerProfileData(prev => ({
                                                                            ...prev,
                                                                            [passenger.id]: {
                                                                                ...prev[passenger.id],
                                                                                covidDetail: {
                                                                                    ...prev[passenger.id]?.covidDetail,
                                                                                    noOfVaccines: value
                                                                                }
                                                                            }
                                                                        }));
                                                                    }}
                                                                // value={coTravellerprofileData?.covidDetail?.noOfVaccines}
                                                                // onChange={(e) => setCoTravellerProfileData({
                                                                //     ...coTravellerprofileData,
                                                                //     covidDetail: {
                                                                //         ...coTravellerprofileData.covidDetail,
                                                                //         noOfVaccines: e.target.value
                                                                //     }
                                                                // })}
                                                                />
                                                            </div>
                                                            <div className="col-12 col-md-6 col-lg-4 mb-3">
                                                                <label>Last Vaccination Date<span className="text-danger">*</span>:</label>
                                                                <input
                                                                    className="form-control"
                                                                    type="date"
                                                                    required
                                                                    max={new Date().toISOString().split("T")[0]}
                                                                    value={formattedDate(coTravellerprofileData[passenger.id]?.covidDetail?.lastVaccinationDate) || "dd/mm/yyy"}
                                                                    // value={coTravellerprofileData[ passenger.id ]?.covidDetail?.lastVaccinationDate || ""}
                                                                    onChange={(e) => {
                                                                        const today = new Date().toISOString().split("T")[0];
                                                                        if (value > today) {
                                                                            alert("You cannot select a future date.");
                                                                            return;
                                                                        }
                                                                        const value = e.target.value;
                                                                        setCoTravellerProfileData(prev => ({
                                                                            ...prev,
                                                                            [passenger.id]: {
                                                                                ...prev[passenger.id],
                                                                                covidDetail: {
                                                                                    ...prev[passenger.id]?.covidDetail, // Preserve existing address details
                                                                                    lastVaccinationDate: value
                                                                                }
                                                                            }
                                                                        }));
                                                                    }}
                                                                />
                                                            </div>
                                                            <div className="col-12 col-md-6 col-lg-4 mb-3">
                                                                <label>Vaccination Name<span className="text-danger">*</span>:</label>
                                                                <input
                                                                    className="form-control"
                                                                    type="text"
                                                                    required
                                                                    value={coTravellerprofileData[passenger.id]?.covidDetail?.vaccinationName || ""}
                                                                    onChange={(e) => {
                                                                        const value = e.target.value;
                                                                        setCoTravellerProfileData(prev => ({
                                                                            ...prev,
                                                                            [passenger.id]: {
                                                                                ...prev[passenger.id],
                                                                                covidDetail: {
                                                                                    ...prev[passenger.id]?.covidDetail,
                                                                                    vaccinationName: value
                                                                                }
                                                                            }
                                                                        }));
                                                                    }}
                                                                />
                                                            </div>
                                                            <div className="col-12 col-md-6 col-lg-4 mb-3">
                                                                <label>Upload Copy of Vaccination Certificates:</label>
                                                                <div className="fileWrapper">
                                                                    <div className="customFileinput">
                                                                        <div className="customInput">
                                                                            <FontAwesomeIcon icon={faCloudArrowUp} />
                                                                            <span>{coTravellerprofileData[passenger?.id]?.covidDetail?.covidCertificate ? "Update" : "Choose File"}</span>
                                                                        </div>
                                                                        <input
                                                                            className="form-control"
                                                                            type="file"
                                                                            onChange={(e) => {
                                                                                const value = e.target.files[0];
                                                                                setCoTravellerProfileData(prev => ({
                                                                                    ...prev,
                                                                                    [passenger.id]: {
                                                                                        ...prev[passenger.id],
                                                                                        covidDetail: {
                                                                                            ...prev[passenger.id]?.covidDetail,
                                                                                            covidCertificate: value
                                                                                        }
                                                                                    }
                                                                                }));
                                                                            }}
                                                                        // onChange={(e) => handleImageChange(e, "covidCertificate")}
                                                                        />
                                                                    </div>
                                                                    {
                                                                        coTravellerprofileData[passenger?.id]?.covidDetail?.covidCertificate && (
                                                                            <a className="uploadedFile" href={BASE_FILE_SRC + coTravellerprofileData[passenger?.id]?.covidDetail?.covidCertificate} target='_blank'>
                                                                                <FontAwesomeIcon icon={faFile} />
                                                                            </a>
                                                                        )
                                                                    }
                                                                </div>
                                                                <div className="note"> Allowed formats: PDF & All Types of Image Files</div>
                                                            </div>
                                                            <div className="col-12 d-flex justify-content-end border-top pt-2">
                                                                {
                                                                    passenger?.email ? <button type="button" className="btn btn-primary" disabled={updatingCovid} onClick={() => handleUpdateCovidData(passenger?.id)}>{updatingCovid ? "Updating..." : "Update"}</button> : <button type="submit" className="btn btn-primary">{updatingCovid ? "Adding..." : "Add"}</button>
                                                                }
                                                                {/* <button type="submit" disabled={addingTraveller || uploadingImage} className="btn btn-primary">{addingTraveller || uploadingImage ? "Updating..." : "Update"}</button> */}
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {
                                        isDeleting ? <div>
                                            Are you sure you want to delete this Co-Traveller?
                                            <button className='btn btn-success m-3' disabled={isFetching}>No</button>
                                            <button className='btn btn-danger' disabled={isFetching} onClick={() => handleCoTravellerDelete(passenger?.id)}>{isFetching ? "Deleting..." : "Yes"}</button>
                                        </div> : <button className='btn btn-danger mt-3' onClick={() => setIsDeleting(true)}>
                                            Delete Traveller
                                        </button>
                                    }
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {
                console.log("coPassengers:",coPassengers)
                
            }
        </div>
    )
}

CoTravellers.propTypes = {
    user: {
        id: PropTypes.string.isRequired,
    },
}



export default CoTravellers