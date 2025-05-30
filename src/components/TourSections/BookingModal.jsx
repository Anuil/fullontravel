/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserGroup, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';
import { useInitiateBookingMutation, useUpdateInitiateBookingMutation } from '../../features/booking/BookingApiSlice';
import { toast, Bounce } from 'react-toastify';
import PropTypes from 'prop-types';
import { useGetTourPricingQuery } from '../../features/tour/TourApiSlice';
import { countryList } from '../../utils/countriesList';
import Select from "react-select"

const BookingModal = ({
    tourID, tourName,
    tourItinerary,
    taxInfo,
    user,
    dates,
    isModalOpen,
    setIsModalOpen,
    currentBookingData,
    selectedBatchDate
}) => {
    const navigate = useNavigate();
    const [isFetching, setIsFetching] = useState(false);

    const [rooms, setRooms] = useState([{ adult: 1, child: 0 }]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [modalState, setModalState] = useState('booking');
    const [showCalendar, setShowCalendar] = useState(false);
    const [roomOccupancy, setRoomOccupancy] = useState(new Map());

    const roomTypeMapping = {
        1: "singleOccupancy",
        2: "doubleOccupancy",
        3: "tripleOccupancy"
    };


    const [formData, setFormData] = useState({
        name: "",
        mobile: "",
        email: "",
        countryCode: { value: "+91", label: "+91", icon: "🇮🇳" },
        // gender: null
    });

    const [errors, setErrors] = useState({});

    const validateField = (name, value) => {
        let error = "";

        if (!value.trim()) {
            error = `${name.charAt(0).toUpperCase() + name.slice(1)} is required.`;
        } else if (name === "email") {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                error = "Invalid email format.";
            }
        }

        setErrors((prev) => ({ ...prev, [name]: error }));
    };

    const roomType = {
        "SINGLE": 1,
        "DOUBLE": 2,
        "TRIPLE": 3
    };

    useEffect(() => {
        if (user) {
            const countryCodeData = countryList.find((val) => val?.phoneCode === user?.countryCode)
            setFormData({
                name: user?.name,
                mobile: user?.mobile,
                email: user?.email,
                countryCode: {label: countryCodeData?.phoneCode, value:countryCodeData?.phoneCode, icon: countryCodeData?.flagEmoji},
            });
        } else if (currentBookingData) {
            const countryCodeData = countryList.find((val) => val?.phoneCode === currentBookingData?.userInfo?.countryCode)
            setFormData({
                name: currentBookingData?.userInfo?.name,
                mobile: currentBookingData?.userInfo?.mobile,
                email: currentBookingData?.userInfo?.email,
                countryCode: { label: countryCodeData?.phoneCode, value: countryCodeData?.phoneCode, icon: countryCodeData?.flagEmoji },
            });
        }

        if (currentBookingData?.bookingInfo) {
            const bookingRooms = currentBookingData?.bookingInfo?.map((room) => ({
                adult: room?.adult,
                child: room?.child,
            }));
            setRooms(bookingRooms)

            const initialMap = new Map();
            currentBookingData?.bookingInfo?.forEach((room) => {
                if (room.roomOccupancy) {
                    initialMap.set(roomType[room.roomOccupancy], room.adult); 
                }
            });
            setRoomOccupancy(initialMap);
        }

        if (currentBookingData?.startDate) {
            setSelectedDate(new Date(currentBookingData?.startDate))

        }
    }, [user, currentBookingData]);


    const { data: TourPricing } = useGetTourPricingQuery(tourID, {
        skip: !tourID
    })


    const removeRoom = (roomIndex) => {
        setRooms((prevRooms) => prevRooms.filter((_, index) => index !== roomIndex));
    };

    const calculateMaxSharing = (tourPricingData) => {
        let maxAdults = 0;
        let maxChildren = 0;

        tourPricingData.forEach((pricing) => {
            const sharing = pricing.pricingInfo.sharing;
            const isChild = pricing?.pricingInfo?.age
            if (isChild) {
                maxChildren = Math.max(maxChildren, sharing);
            } else if (!isChild) {
                maxAdults = Math.max(maxAdults, sharing);
            }
        });

        return { maxAdults, maxChildren };
    };

    const handleCounterChange = (index, type, field) => {
        const updatedRooms = [...rooms];
        const { maxAdults, maxChildren } = calculateMaxSharing(TourPricing);
        const maxtotal = 4

        if (type === "increment") {
            if (field === "child" && updatedRooms[index].adult === 0) {
                alert("You must select at least 1 adult before adding a child.");
                return;
            }


            if (field === "adult" && updatedRooms[index].adult < maxAdults) {
                if (updatedRooms[index].adult + updatedRooms[index].child < maxtotal) {
                    updatedRooms[index].adult += 1;
                } else {
                    alert("Maximum limit reached for total guests.");
                }
            } else if (field === "child" && updatedRooms[index].child < maxChildren) {
                if (updatedRooms[index].adult + updatedRooms[index].child < maxtotal) {
                    updatedRooms[index].child += 1;
                } else {
                    alert("Maximum limit reached for total guests.");
                }

            } else {
                alert(`Maximum limit reached for ${field}s.`);
            }
        } else if (type === "decrement" && updatedRooms[index][field] > 0) {
            updatedRooms[index][field] -= 1;
        }

        setRooms(updatedRooms);
    };



    const addRoom = () => {
        setRooms([...rooms, { adult: 1, child: 0 }]);
    };

    const [initiateBooking] = useInitiateBookingMutation();
    const [updateInitiateBooking] = useUpdateInitiateBookingMutation()

    // Calender

    const [currentDate, setCurrentDate] = useState(new Date());

    const enabledDatesFromBackend = dates
        ?.filter((date) => date?.active && date?.status === "OPEN")
        .map((date) => new Date(date?.fromDate));

    // Function to check if a date is enabled
    const isDateEnabled = (date) => {
        return enabledDatesFromBackend?.some(
            (enabledDate) => enabledDate.toDateString() === date.toDateString()
        );
    };

    const handleInitiateBooking = async () => {
        try {
            setIsFetching(true);
            if (!formData.name) {
                setErrors((prev) => ({ ...prev, [ "name" ]: "Name is required" }));
                setErrors((prev) => ({ ...prev, ["name"]: "Name is required" }));
                return
            }
            if (!formData?.mobile) {
                setErrors((prev) => ({ ...prev, [ "mobile" ]: "Mobile No. is required" }));
                return
            }
            if (!formData?.email) {
                setErrors((prev) => ({ ...prev, [ "email" ]: "Email is required" }));
                return
            }
            if (!selectedDate) {
                setErrors((prev) => ({ ...prev, ["date"]: "Date is required" }));
                return
            }
            
            const roomOccupancyData = Array.from(roomOccupancy.entries()).reduce((acc, [key, value]) => {
                const roomType = roomTypeMapping[key]; 
                if (roomType) {
                    acc[roomType] = value;
                }
                return acc;
            }, {});
           
            if (!roomOccupancyData || Object.keys(roomOccupancyData).length === 0) {
                setPersonLimitError("Please select room Occupancy");
                return
            } 
            const hasZero = Object.values(roomOccupancyData).some(val => val === 0);
            if(hasZero){
                setPersonLimitError("Please select total persons");
                return
            }
            const bookingData = {
                tourId: tourID,
                startDate: selectedDate || null,
                bookingInfo: rooms,
                roomOccupancy: roomOccupancyData,
                userInfo: {
                    name: formData?.name,
                    mobile: formData?.mobile,
                    countryCode: formData.countryCode.value,
                    email: formData?.email
                }
            };
            if (user?.id) {
                bookingData.customerId = user?.id;
            }


            // const data = false
            // const error = false
            const { data, error } = await initiateBooking({ body: bookingData });

            if (data) {
                navigate(`/booking?code=${data?.code}`);
            }

            if (error) {
                throw error;
            }
        } catch (error) {
            toast.error(error?.data?.errorMessage || "An Error Occurred, Please try again", {
                position: "top-right",
                autoClose: 5000,
                theme: "colored",
                transition: Bounce,
            });
        } finally {
            setIsFetching(false);
        }
    };

    const handleInitiateBookingUpdate = async () => {
        try {
            setIsFetching(true);

            if (!formData.name) {
                setErrors((prev) => ({ ...prev, [ "name" ]: "Name is required" }));
                return
            }
            if (!formData?.mobile) {
                setErrors((prev) => ({ ...prev, [ "mobile" ]: "Mobile No. is required" }));
                return
            }
            if (!formData?.email) {
                setErrors((prev) => ({ ...prev, [ "email" ]: "Email is required" }));
                return
            }
            if (!selectedDate) {
                setErrors((prev) => ({ ...prev, [ "date" ]: "Date is required" }));
                return
            }

            const roomOccupancyData = Array.from(roomOccupancy.entries()).reduce((acc, [key, value]) => {
                const roomType = roomTypeMapping[key]; 
                if (roomType) {
                    acc[roomType] = value;
                }
                return acc;
            }, {});

            if (!roomOccupancyData || Object.keys(roomOccupancyData).length === 0) {
                setPersonLimitError("Please select room Occupancy");
                return
            } 
            const hasZero = Object.values(roomOccupancyData).some(val => val === 0);
            if(hasZero){
                setPersonLimitError("Please select total persons");
                return
            }

            const bookingData = {
                tourId: tourID,
                customerId: currentBookingData?.customerId,
                startDate: selectedDate || null,
                bookingInfo: rooms,
                roomOccupancy: roomOccupancyData,
                userInfo: {
                    name: formData?.name,
                    mobile: formData?.mobile,
                    countryCode: formData.countryCode.value,
                    email: formData?.email
                }
            };
            if (user?.id) {
                bookingData.customerId = user?.id;
            }

            const { data, error } = await updateInitiateBooking({ body: bookingData, code: currentBookingData?.bookingCode });

            if (data) {
                location.reload();
            }

            if (error) {
                throw error;
            }
        } catch (error) {
            toast.error(error?.data?.errorMessage || "An Error Occurred, Please try again", {
                position: "top-right",
                autoClose: 5000,
                theme: "colored",
                transition: Bounce,
            });
        } finally {
            setIsFetching(false);
        }
    };

    const renderCalendar = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();

        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        const cells = [];

        // Add empty cells for days before the 1st of the month
        for (let i = 0; i < firstDay; i++) {
            cells.push(<div key={`empty-${i}`} className="empty-cell"></div>);
        }

        // Add days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day);
            const isToday =
                day === new Date().getDate() &&
                year === new Date().getFullYear() &&
                month === new Date().getMonth();

            const isEnabled = isDateEnabled(date);
            const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();

            cells.push(
                <div
                    key={day}
                    className={`day-cell ${isToday ? "today" : ""} ${isEnabled ? "enabled" : "disabled"}`}
                    onClick={() => {
                        if (isEnabled) {
                            handleDateSelect(date);
                        }
                    }}
                >
                    {day}
                </div>
            );
        }

        return cells;
    };


    const getFirstEnabledDate = () => {
        let today = new Date();
        for (let i = 0; i < 365; i++) { // Check for the next year
            let date = new Date();
            date.setDate(today.getDate() + i);
            if (isDateEnabled(date)) {
                return date;
            }
        }
        return today; // Default to today if no date is enabled
    };

    useEffect(() => {
        const firstEnabledDate = getFirstEnabledDate();
        setCurrentDate(new Date(firstEnabledDate.getFullYear(), firstEnabledDate.getMonth(), 1));
    }, []);

    const handleOpenCalendar = () => {
        const firstEnabledDate = getFirstEnabledDate();
        setCurrentDate(new Date(firstEnabledDate.getFullYear(), firstEnabledDate.getMonth(), 1));
        setShowCalendar(true);
    };

    const handlePrev = () => {
        const prevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
        setCurrentDate(prevMonth);
    };

    const handleNext = () => {
        const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
        setCurrentDate(nextMonth);
    };

    useEffect(() => {
        if (isModalOpen) {
            document.body.classList.add("no-scroll");
        } else {
            document.body.classList.remove("no-scroll");
        }

        return () => {
            document.body.classList.remove("no-scroll");
        };
    }, [isModalOpen]);

    useEffect(() => {
        if (isModalOpen) {
            if (selectedBatchDate) {
                const batchDate = new Date(selectedBatchDate);
                setCurrentDate(batchDate);
                setSelectedDate(batchDate);
                setShowCalendar(true);
            } else {
                setCurrentDate(getFirstEnabledDate());
            }
        }
    }, [isModalOpen, selectedBatchDate]);

    // separate effect to manage date error
    useEffect(() => {
        if (selectedDate === "") {
            setErrors((prev) => ({
                ...prev,
                date: "Date is required."
            }));
        } else {
            setErrors((prev) => ({
                ...prev,
                date: ""
            }));
        }
    },[selectedDate])

    const handleDateSelect = (date) => {
        setSelectedDate(date);
        setShowCalendar(false);
    };

    const [debouncedData, setDebouncedData] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "mobile") {
            if (/^\d*$/.test(value)) {
                setFormData((prevData) => ({
                    ...prevData,
                    [ name ]: value,
                }));
            }
            
        }else {
            setFormData((prevData) => ({
                ...prevData,
                [ name ]: value,
            }));
        }

        

        // Remove error if field is filled
        if (value.trim() !== "") {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        } else {
            validateField(name, value);
        }

        if (name === "mobile" || name === "email") {
            setDebouncedData({ ...formData, [name]: value });
        }
    };

    useEffect(() => {
        const debounceTimeout = setTimeout(() => {
            if (debouncedData?.mobile && debouncedData?.email) {
                // console.log(debouncedData);
                // sendFormDataToBackend(debouncedData);
            }
        }, 2000); // 2 seconds debounce

        return () => clearTimeout(debounceTimeout); // Cleanup timeout on component unmount or re-trigger
    }, [debouncedData]);

    // const sendFormDataToBackend = async (data) => {
    //     try {
    //         await axios.post("/api/lead", data); // Replace with your API endpoint
    //         console.log("Data sent successfully:", data);
    //     } catch (error) {
    //         console.error("Error sending data:", error);
    //     }
    // };

    const countiresDropdown = countryList.map((country) => (
        { label: country.phoneCode, value: country.phoneCode, icon: country.flagEmoji }
    ))


    // Handle checkbox toggle
    const handleCheckboxChange = (index, roomOccupancy) => {

        setRoomOccupancy((prevState) => {
            const newMap = new Map(prevState);

            if (newMap.has(roomOccupancy)) {
                setPersonLimitError("");
                newMap.delete(roomOccupancy); // Uncheck → Remove from Map
            } else {
                newMap.set(roomOccupancy, 0); // Check → Add to Map with default value 1
            }
            return newMap;
        });
    };
    const MAX_TOTAL_PERSONS = 15;
    const [personLimitError, setPersonLimitError] = useState("");
    const handleDropdownChange = (index, roomOccupancy, value, change) => {
        setRoomOccupancy((prevState) => {
            const newMap = new Map(prevState);
            
            let total = 0;
            newMap.forEach((val, key) => {
                total += val;
            });
            console.log(value);
            // Check if total exceeds limit
            if (total + Number(change) > MAX_TOTAL_PERSONS) {
                setPersonLimitError(`Total persons cannot exceed ${MAX_TOTAL_PERSONS}.`);
                return prevState; // Do not update
            }
    
            setPersonLimitError("");
            if (newMap.has(roomOccupancy)) {
                newMap.set(roomOccupancy, Number(value));
            }
           
            return newMap;
        });
    };

    return (
        <div>

            {/* Booking Modal */}
            {isModalOpen && modalState === 'booking' && (
                <div className="modal fade show bookNowModalToggle" style={{ display: 'block' }}>
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <div className="titleHeader">
                                    <div className="heading">{tourName}</div>
                                    {/* {
                                        groupedArray.map((item, index) => (
                                            <div className="subHeading" key={index}>{item}</div>
                                        ))
                                    } */}
                                </div>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setIsModalOpen(false)}
                                ></button>
                            </div>
                            <div className="personalForm">
                                <div className="personalDetails">
                                    <h5>Personal Details</h5>
                                    <form>
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <div className="input_group">
                                                    <label htmlFor="name">Name</label>
                                                    <div>
                                                        {/* <div className="input_set prefix">
                                                            <select name="" id="" className="form-select">
                                                                <option value="">Mr.</option>
                                                                <option value="">Mrs.</option>
                                                                <option value="">Master</option>
                                                            </select>
                                                        </div> */}
                                                        <div className="input_set nameSet">
                                                            <input
                                                                className={`form-control ${errors.name ? 'input-error' : ''}`}
                                                                type="text"
                                                                name="name"
                                                                disabled={user || currentBookingData ? true : false}
                                                                placeholder="Enter full name"
                                                                value={formData.name}
                                                                onChange={handleChange}
                                                            />
                                                            {errors.name && <span className="error-text">{errors.name}</span>}
                                                            <div className="input_icons">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                                    <path d="M12 10C14.2091 10 16 8.20914 16 6C16 3.79086 14.2091 2 12 2C9.79086 2 8 3.79086 8 6C8 8.20914 9.79086 10 12 10Z" stroke="#9f9f9f" strokeWidth="1.5" />
                                                                    <path d="M20 17.5C20 19.985 20 22 12 22C4 22 4 19.985 4 17.5C4 15.015 7.582 13 12 13C16.418 13 20 15.015 20 17.5Z" stroke="#9f9f9f" strokeWidth="1.5" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="input_group">
                                                    <label htmlFor="mobile">Mobile No.</label>
                                                    <div className="input_set namePrefix">
                                                        <div className="input_set prefix">

                                                            <Select
                                                                name='countryCode'
                                                                options={countiresDropdown}
                                                                isDisabled={user || currentBookingData ? true : false}
                                                                formatOptionLabel={({ icon, label }) => (
                                                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                                                        <span style={{ marginRight: '8px' }}>{icon}</span>
                                                                        <span>{label}</span>
                                                                    </div>
                                                                )}
                                                                value={formData.countryCode}
                                                                // defaultValue={{ label: "+91", value: "+91", icon: "🇮🇳" }}
                                                                onChange={(selectedCode) => setFormData({
                                                                    ...formData,
                                                                    countryCode: selectedCode
                                                                })}
                                                            />
                                                        </div>
                                                        <div className="input_set nameSet">
                                                            <input
                                                                className={`form-control ${errors.mobile ? 'input-error' : ''}`}
                                                                type="tel"
                                                                name="mobile"
                                                                // pattern="\d{10}"
                                                                // maxLength={10}
                                                                disabled={user || currentBookingData ? true : false}
                                                                placeholder="Enter Mobile No."
                                                                value={formData.mobile}
                                                                // onChange={(e) => {
                                                                //     const value = e.target.value;
                                                                //     if (/^\d{0,10}$/.test(value)) {
                                                                //         setFormData({ ...formData, mobile: value });
                                                                //     }
                                                                // }}
                                                                onChange={handleChange}
                                                            />
                                                            {errors.mobile && <span className="error-text">{errors.mobile}</span>}
                                                            <div className="input_icons">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                                    <path d="M8 3C8.5 3 10.5 7.5 10.5 8C10.5 9 9 10 8.5 11C8 12 9 13 10 14C10.39 14.39 12 16 13 15.5C14 15 15 13.5 16 13.5C16.5 13.5 21 15.5 21 16C21 18 19.5 19.5 18 20C16.5 20.5 15.5 20.5 13.5 20C11.5 19.5 10 19 7.5 16.5C5 14 4.5 12.5 4 10.5C3.5 8.5 3.5 7.5 4 6C4.5 4.5 6 3 8 3Z" stroke="#9f9f9f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="input_group">
                                                    <label htmlFor="email">Email</label>
                                                    <div className="input_set">
                                                        <input
                                                            className={`form-control ${errors.email ? 'input-error' : ''}`}
                                                            type="email"
                                                            name="email"
                                                            disabled={user || currentBookingData ? true : false}
                                                            placeholder="Enter email"
                                                            value={formData.email}
                                                            onChange={handleChange}
                                                        />
                                                        {errors.email && <span className="error-text">{errors.email}</span>}
                                                        <div className="input_icons">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                                <path d="M4 20C3.45 20 2.97933 19.8043 2.588 19.413C2.19667 19.0217 2.00067 18.5507 2 18V6C2 5.45 2.196 4.97933 2.588 4.588C2.98 4.19667 3.45067 4.00067 4 4H20C20.55 4 21.021 4.196 21.413 4.588C21.805 4.98 22.0007 5.45067 22 6V18C22 18.55 21.8043 19.021 21.413 19.413C21.0217 19.805 20.5507 20.0007 20 20H4ZM20 8L12.525 12.675C12.4417 12.725 12.3543 12.7627 12.263 12.788C12.1717 12.8133 12.084 12.8257 12 12.825C11.916 12.8243 11.8287 12.812 11.738 12.788C11.6473 12.764 11.5597 12.7263 11.475 12.675L4 8V18H20V8ZM12 11L20 6H4L12 11ZM4 8.25V6.775V6.8V6.788V8.25Z" fill="#9f9f9f" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="dayPicker">
                                                    <h6>Date</h6>
                                                    <div className="calendar-input-wrapper">
                                                        <input
                                                            type="text"
                                                            value={selectedDate ? selectedDate.toDateString() : ""}
                                                            placeholder="Select a date"
                                                            readOnly
                                                            className={`form-control calendar-input ${errors.date ? 'input-error' : ''}`}
                                                            // className=" form-control"
                                                            onClick={handleOpenCalendar}
                                                        />
                                                        {errors.date && <span className="error-text" style={{color: "red"}}>{errors.date}</span>}
                                                        <span
                                                            className="calendar-icon"
                                                            onClick={handleOpenCalendar}
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                                <path d="M19 4H17V3C17 2.73478 16.8946 2.48043 16.7071 2.29289C16.5196 2.10536 16.2652 2 16 2C15.7348 2 15.4804 2.10536 15.2929 2.29289C15.1054 2.48043 15 2.73478 15 3V4H9V3C9 2.73478 8.89464 2.48043 8.70711 2.29289C8.51957 2.10536 8.26522 2 8 2C7.73478 2 7.48043 2.10536 7.29289 2.29289C7.10536 2.48043 7 2.73478 7 3V4H5C4.20435 4 3.44129 4.31607 2.87868 4.87868C2.31607 5.44129 2 6.20435 2 7V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.7956 22 20.5587 21.6839 21.1213 21.1213C21.6839 20.5587 22 19.7956 22 19V7C22 6.20435 21.6839 5.44129 21.1213 4.87868C20.5587 4.31607 19.7956 4 19 4ZM20 19C20 19.2652 19.8946 19.5196 19.7071 19.7071C19.5196 19.8946 19.2652 20 19 20H5C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V12H20V19ZM20 10H4V7C4 6.73478 4.10536 6.48043 4.29289 6.29289C4.48043 6.10536 4.73478 6 5 6H7V7C7 7.26522 7.10536 7.51957 7.29289 7.70711C7.48043 7.89464 7.73478 8 8 8C8.26522 8 8.51957 7.89464 8.70711 7.70711C8.89464 7.51957 9 7.26522 9 7V6H15V7C15 7.26522 15.1054 7.51957 15.2929 7.70711C15.4804 7.89464 15.7348 8 16 8C16.2652 8 16.5196 7.89464 16.7071 7.70711C16.8946 7.51957 17 7.26522 17 7V6H19C19.2652 6 19.5196 6.10536 19.7071 6.29289C19.8946 6.48043 20 6.73478 20 7V10Z" fill="#9f9f9f" />
                                                            </svg>
                                                        </span>
                                                    </div>
                                                    {showCalendar && (
                                                        <div className="calendar">
                                                            <div className="calendar-header">
                                                                <button type='button' onClick={handlePrev}>&#9664;</button>
                                                                <h4>
                                                                    {currentDate.toLocaleString("default", { month: "long" })} {currentDate.getFullYear()}
                                                                </h4>
                                                                <button type='button' onClick={handleNext}>&#9654;</button>
                                                            </div>
                                                            <div className="calendar-days">
                                                                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                                                                    <div key={day} className="day-name">
                                                                        {day}
                                                                    </div>
                                                                ))}
                                                            </div>
                                                            <div className="calendar-body">
                                                                {renderCalendar()}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            {/* <div className="modal-body">
                                {rooms.map((room, index) => (
                                    <div className="roomMembers" key={index}>
                                        <div className="roomCount">
                                            <div className="roomNumber">Room {index + 1}</div>
                                            {index !== 0 && (
                                                <div className="removeRoom" onClick={() => removeRoom(index)}>
                                                    <FontAwesomeIcon icon={faTrashCan} />
                                                </div>
                                            )}
                                        </div>
                                        <div className="counterWrapper">
                                            <div className="counterDiv">
                                                <div className="counterHead">
                                                    <span>Adults</span>
                                                </div>
                                                <div className="counter">
                                                    <button
                                                        onClick={() =>
                                                            handleCounterChange(index, "decrement", "adult")
                                                        }
                                                        disabled={room.adult === 1}
                                                    >
                                                        -
                                                    </button>
                                                    <div>{room.adult}</div>
                                                    <button
                                                        onClick={() =>
                                                            handleCounterChange(index, "increment", "adult")
                                                        }
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                            {
                                                calculateMaxSharing(TourPricing)?.maxChildren > 0 && (
                                                    <div className="counterDiv">
                                                        <div className="counterHead" style={{
                                                            display: "flex",
                                                            flexDirection: "row",
                                                            alignItems: "center",
                                                            gap:"18px"
                                                        }}>
                                                            <span>Children</span>
                                                            <span style={{fontSize: "9px"}}>*Age of Child should be less than 12 years on the last day of tour</span>
                                                        </div>
                                                        <div className="counter">
                                                            <button
                                                                onClick={() =>
                                                                    handleCounterChange(index, "decrement", "child")
                                                                }
                                                                disabled={room.child === 0}
                                                            >
                                                                -
                                                            </button>
                                                            <div>{room.child}</div>
                                                            <button
                                                                onClick={() =>
                                                                    handleCounterChange(index, "increment", "child")
                                                                }
                                                            >
                                                                +
                                                            </button>
                                                        </div>
                                                    </div>
                                                )
                                            }

                                        </div>
                                    </div>
                                ))}
                                <button type="button" className="roomAddBtn" onClick={addRoom}>
                                    + Add Room
                                </button>
                            </div>                    */}
                            <div className="modal-body py-3" >
                                {personLimitError && (
                                    <div className="alert alert-danger mt-2" role="alert">
                                        {personLimitError}
                                    </div>
                                )}
                                <div className="table-responsive rounded shadow-sm">
                                    <table className="table align-middle table-hover table-bordered mb-0">
                                        <thead className="table-light">
                                        <tr>
                                            <th style={{ width: "80px" }}>Select</th>
                                            <th>Room Type</th>
                                            <th>Basic Price</th>
                                            <th style={{ width: "180px" }}>Total Persons</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {TourPricing?.map((price, index) => {
                                            const sharing = price?.pricingInfo.sharing;
                                            const isChecked = roomOccupancy.has(sharing);
                                            const count = roomOccupancy.get(sharing) || 0;

                                            return (
                                            <tr key={index}>
                                                <td className="text-center">
                                                <input
                                                    type="checkbox"
                                                    className="form-check-input"
                                                    style={{ width: "20px", height: "20px", cursor: "pointer" }}
                                                    checked={isChecked}
                                                    onChange={() => handleCheckboxChange(index, sharing)}
                                                />
                                                </td>
                                                <td className="fw-medium">{price?.pricingInfo.title}</td>
                                                <td>₹{price?.price?.toLocaleString("en-IN")}</td>
                                                <td>
                                                <div className="input-group input-group-sm" style={{ width: "110px" }}>
                                                    <button
                                                        className="btn btn-outline-secondary px-2"
                                                        type="button"
                                                        disabled={!isChecked || count <= 1}
                                                        onClick={() =>
                                                        handleDropdownChange(index, sharing, Math.max(count - 1, 1), -1)
                                                        }
                                                    >
                                                        −
                                                    </button>
                                                    <input
                                                        type="text"
                                                        className="form-control text-center px-1"
                                                        value={count}
                                                        readOnly
                                                        disabled={!isChecked}
                                                        style={{ minWidth: "35px", maxWidth: "35px" }}
                                                    />
                                                    <button
                                                        className="btn btn-outline-secondary px-2"
                                                        type="button"
                                                        disabled={!isChecked || count >= 15}
                                                        onClick={() =>
                                                        handleDropdownChange(index, sharing, Math.min(count + 1, 15), 1)
                                                        }
                                                    >
                                                        +
                                                    </button>
                                                    </div>
                                                </td>
                                            </tr>
                                            );
                                        })}
                                        </tbody>
                                    </table>
                                </div>

                            </div>
                            <div className="modal-footer">
                                {/* <div className="noteForchild">
                                   
                                    <button
                                        className="knowMore"
                                        onClick={() => setModalState('childPolicy')}
                                    >
                                        View Pricing Table
                                       
                                    </button>
                                </div> */}
                                {
                                    currentBookingData ? <button
                                        type="button"
                                        className="btn btn-primary"
                                        disabled={isFetching}
                                        onClick={handleInitiateBookingUpdate}
                                    >
                                        {isFetching ? "Updating..." : "Update"}
                                    </button> : <a
                                        href='#Applied_Room_Selector'
                                        className="btn btn-primary"
                                        disabled={isFetching}
                                        onClick={handleInitiateBooking}
                                    >
                                        {isFetching ? "Sending..." : "Apply"}
                                    </a>
                                }

                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Child Policy Modal */}
            {isModalOpen && modalState === 'childPolicy' && (
                <div className="modal fade show bookNowModalToggle2" style={{ display: 'block' }}>
                    <div className="modal-dialog modal-dialog-scrollable">
                        <div className="modal-content">
                            <div className="modal-header">
                                <div className="modal-title">
                                    <div className="titleHead">
                                        Detailed Tour price
                                    </div>
                                    <div className="subTitle">
                                        Prices & discounts are Per Person for Indian Nationals only.
                                    </div>
                                </div>
                                <button
                                    className="btn-close"
                                    onClick={() => setModalState('booking')}
                                ></button>
                            </div>
                            <div className="modal-body py-0">
                                <table className="table table-bordered table-striped mb-0">
                                    <thead>
                                        <tr>
                                            <th className="table-info">Room Type</th>
                                            <th className="table-primary">Basic Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            TourPricing?.map((price, index) => {
                                                return <tr key={index}>
                                                    <td>{price?.pricingInfo.title}</td>
                                                    <td>₹{price?.price?.toLocaleString("en-IN")}</td>
                                                </tr>
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <div className="modal-footer">
                                <ul>
                                    <li>Terms and Conditions apply.</li>
                                    <li>{taxInfo?.[ 0 ]?.percentage}% {taxInfo?.[ 0 ]?.title} is applicable on given tour price.</li>
                                    {/* <li>Mentioned tour prices are Per Person for Indian Nationals only.</li> */}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

BookingModal.propTypes = {
    tourName: PropTypes.string,
    user: PropTypes.object,
    tourID: PropTypes.string,
    customerID: PropTypes.string,
    dates: PropTypes.array,
    isModalOpen: PropTypes.bool.isRequired,
    setIsModalOpen: PropTypes.func.isRequired,
};

export default BookingModal;
