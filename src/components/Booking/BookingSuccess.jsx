import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom'; // Use 'useNavigate' in React Router v6

const BookingSuccess = () => {
    const params = useParams();
    const [ seconds, setSeconds ] = useState(5);
    const navigate = useNavigate(); // React Router hook for navigation

    useEffect(() => {
        if (seconds > 0) {
            const timer = setInterval(() => {
                setSeconds(prev => prev - 1);
            }, 10000000);
            return () => clearInterval(timer);
        } else {
            navigate('/'); // Redirect to home after 5 seconds
        }
    }, [ seconds, navigate ]);

    return (
        <>
            <style>
                {
                    `
                        .payment-succes-main {
                        background-color: #fff;
                        color: #fff;
                        font-family: Arial, sans-serif;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100vh;
                        margin: 0;
                        }

                        .check-main {
                        width: fit-content;
                        background-color: #00800069;
                        border-radius: 57%;
                        padding: 2px 4px;
                        }

                        .card {
                            color: #fff;
                            background-color: #1a1a1a;
                            padding: 20px;
                            border-radius: 10px;
                            text-align: center;
                            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
                            width: 300px;
                        }

                        .icon-container {
                        margin-bottom: 20px;
                        display: flex;
                        justify-content: center;
                        }

                        .title {
                        font-size: 24px;
                        font-weight: bold;
                        margin-bottom: 10px;
                        }

                        .message {
                        font-size: 14px;
                        margin-bottom: 20px;
                        line-height: 1.5;
                        }

                        .btn {
                            background-color: #f37002;
                            color: #fff;
                            border: none;
                            padding: 10px 20px;
                            font-size: 16px;
                            border-radius: 5px;
                            cursor: pointer;
                            transition: background-color 0.3s ease;
                        }

                        .btn:hover {
                        background-color: #efa261;
                        }
                    `
                }

            </style>
            <div className="payment-succes-main">
                <div className="card">
                    <div className="icon-container">
                        <div className="check-main">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="#fff"
                                viewBox="0 0 24 24"
                                width="48"
                                height="48"
                            >
                                <path d="M9 16.2l-3.5-3.5L4 14.3l5 5 10-10L17.5 7l-8.5 9.2z" />
                            </svg>
                        </div>
                    </div>
                    <h2 className="title">Payment Confirmed</h2>
                    <p className="message">
                        Congratulations! Your Booking has been successfully completed.<br></br>
                        Your can view your booking details in your profile at any time.
                    </p>
                    <Link to={"/"} className="btn">Go Back to homepage</Link>
                </div>
            </div>
        </>

    );
};

export default BookingSuccess;
