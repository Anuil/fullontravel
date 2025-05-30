import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BookModal = ({ isModalOpen, setIsModalOpen }) => {
    const [rooms, setRooms] = useState([{ adult: 1, child: 0 }]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [modalState, setModalState] = useState('booking'); // 'booking' or 'childPolicy'

    const handleDateChange = (event) => {
        const today = new Date().toISOString().split('T')[0];
        const maxDate = new Date(new Date().setFullYear(new Date().getFullYear() + 1))
            .toISOString()
            .split('T')[0];
        const chosenDate = event.target.value;

        // Validate selected date
        if (chosenDate < today) {
            toast.error('Please select a date that is today or later.', {
                position: 'top-right',
                autoClose: 3000,
            });
            setSelectedDate(null);
        } else if (chosenDate > maxDate) {
            toast.error('Please select a date within one year from today.', {
                position: 'top-right',
                autoClose: 3000,
            });
            setSelectedDate(null);
        } else {
            toast.success('Date selected successfully!', {
                position: 'top-right',
                autoClose: 3000,
            });
            setSelectedDate(chosenDate);
        }
    };

    const handleCounterChange = (index, field, isIncrement) => {
        setRooms((prevRooms) =>
            prevRooms.map((room, i) =>
                i === index
                    ? {
                        ...room,
                        [field]: isIncrement
                            ? room[field] + 1
                            : Math.max(0, room[field] - 1),
                    }
                    : room
            )
        );
    };

    const addRoom = () => {
        setRooms((prevRooms) => [...prevRooms, { adult: 1, child: 0 }]);
    };

    const removeRoom = (index) => {
        setRooms((prevRooms) => prevRooms.filter((_, i) => i !== index));
    };

    return (
        isModalOpen && (
            <>
                {modalState === 'booking' && (
                    <div className="modal fade show bookNowModalToggle" style={{ display: 'block' }}>
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Book Your Room</h5>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        onClick={() => setIsModalOpen(false)}
                                    ></button>
                                </div>
                                <div className="modal-body">
                                    <div className="mb-3">
                                        <label>Select your trip date</label>
                                        <input
                                            type="date"
                                            value={selectedDate || ''}
                                            onChange={handleDateChange}
                                            min={new Date().toISOString().split('T')[0]}
                                            max={
                                                new Date(new Date().setFullYear(new Date().getFullYear() + 1))
                                                    .toISOString()
                                                    .split('T')[0]
                                            }
                                            className="form-control"
                                            placeholder="Select your travel date"
                                            required
                                        />
                                    </div>

                                    {rooms.map((room, index) => (
                                        <div key={index} className="roomMembers border p-3 mb-3">
                                            <div className="d-flex justify-content-between align-items-center">
                                                <h6>Room {index + 1}</h6>
                                                {rooms.length > 1 && (
                                                    <button
                                                        className="btn btn-danger btn-sm"
                                                        onClick={() => removeRoom(index)}
                                                    >
                                                        Remove
                                                    </button>
                                                )}
                                            </div>
                                            <div className="counterWrapper">
                                                <div className="counterDiv mt-2">
                                                    <label>Adults</label>
                                                    <div className="counter input-group">
                                                        <button
                                                            className="btn btn-outline-secondary"
                                                            onClick={() => handleCounterChange(index, 'adult', false)}
                                                        >
                                                            -
                                                        </button>
                                                        <input
                                                            type="text"
                                                            className="form-control text-center"
                                                            value={room.adult}
                                                            readOnly
                                                        />
                                                        <button
                                                            className="btn btn-outline-secondary"
                                                            onClick={() => handleCounterChange(index, 'adult', true)}
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="counterDiv mt-2">
                                                    <label>Children</label>
                                                    <div className="counter input-group">
                                                        <button
                                                            className="btn btn-outline-secondary"
                                                            onClick={() => handleCounterChange(index, 'child', false)}
                                                        >
                                                            -
                                                        </button>
                                                        <input
                                                            type="text"
                                                            className="form-control text-center"
                                                            value={room.child}
                                                            readOnly
                                                        />
                                                        <button
                                                            className="btn btn-outline-secondary"
                                                            onClick={() => handleCounterChange(index, 'child', true)}
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    <div className="noteForchild">
                                        <button
                                            className="knowMore"
                                            onClick={() => setModalState('childPolicy')}
                                        >
                                            Click to View Child Policy
                                        </button>
                                    </div>

                                </div>
                                <div className="modal-footer">
                                    <button className="btn btn-outline-primary" onClick={addRoom}>
                                        Add Another Room
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={() => setIsModalOpen(false)}
                                    >
                                        Apply
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {modalState === 'childPolicy' && (
                    <div className="modal fade show bookNowModalToggle2" style={{ display: 'block' }}>
                        <div className="modal-dialog modal-lg modal-dialog-scrollable">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <div className="modal-title">
                                        <div className="titleHead">CHILD POLICY</div>
                                        <div className="subTitle d-none">
                                            To view the exact price & occupancy information, please add the number of
                                            children in your group and their ages on the last day of travel.
                                        </div>
                                    </div>
                                    <button
                                        className="btn-close"
                                        onClick={() => setModalState('booking')}
                                    ></button>
                                </div>
                                <div className="modal-body">
                                    <div className="age-scale">
                                        <ul className="childAge-selector-scale">
                                            <li className="infant">0</li>
                                            <li className="infant">1</li>
                                            <p className="infantBar">
                                                <p>Up to 2 Years</p>
                                                <p className="type">infant</p>
                                            </p>
                                            <li className="child">2</li>
                                            <li className="child">3</li>
                                            <li className="child">4</li>
                                            <li className="child">5</li>
                                            <li className="child">6</li>
                                            <p className="childBar">
                                                <p>2-12 Years</p>
                                                <p className="type">child</p>
                                            </p>
                                            <li className="child">7</li>
                                            <li className="child">8</li>
                                            <li className="child">9</li>
                                            <li className="child">10</li>
                                            <li className="child">11</li>
                                            <p className="adultBar">
                                                <p>Above 12 Years</p>
                                                <p className="type">adult</p>
                                            </p>
                                            <li className="adult">12</li>
                                            <li className="adult">13</li>
                                            <li className="adult">14</li>
                                        </ul>
                                    </div>
                                    <div className="childPoliciesDetailsWrapper">
                                        <div className="childPoliciesDetails infant">
                                            <div className="type">Infant</div>
                                            <div className="childPoliciesDescription">
                                                <p className="subHeader">Up to 2 Years</p>
                                                <p className="text">
                                                    The guests should be less than 2 years old on the last day of travel.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="childPoliciesDetails child">
                                            <div className="type">Child</div>
                                            <div className="childPoliciesDescription">
                                                <p className="subHeader">2-12 Years</p>
                                                <p className="text">
                                                    Flight tickets are required and extra bed requests can be made at an
                                                    additional cost.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="childPoliciesDetails adult">
                                            <div className="type">Adult</div>
                                            <div className="childPoliciesDescription">
                                                <p className="subHeader">Above 12 Years</p>
                                                <p className="text">
                                                    The guests will be considered adults and all standard charges are
                                                    applicable.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </>
        )
    );
};

BookModal.propTypes = {
    isModalOpen: PropTypes.bool.isRequired,
    setIsModalOpen: PropTypes.func.isRequired,
};

export default BookModal;
