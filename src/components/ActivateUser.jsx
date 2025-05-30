import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useVerifyUserMutation } from "../features/auth/authApiSlice";

const ActivateUser = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const user = queryParams.get("user");
  const token = queryParams.get("token");
  const expires = queryParams.get("expires");

  const payload = {
    userId: user,
    token: token,
    expires: expires,
  };

  const [verifyUser, { isLoading }] = useVerifyUserMutation();
  const [isVerified, setIsVerified] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleUserActivation = async () => {
    try {
      const response = await verifyUser(payload).unwrap();
      setIsVerified(true);
    } catch (error) {
      console.error("Error verifying user:", error);
      setErrorMessage(
        error?.data?.message || "An error occurred during verification."
      );
      setIsVerified(false);
    }
  };

  useEffect(() => {
    handleUserActivation();
  }, []); // Dependency array should remain empty to run only once on component mount

  return (
    <div className="profilePage">
      <div>
        {isLoading ? (
          <div>Loading...</div>
        ) : isVerified ? (
          <div>
            <h1>Your account has been verified successfully!</h1>
            <p>
              Thank you for verifying your account. You can now use all the
              features of our service.
            </p>
            <button onClick={() => navigate("/login")}>Go to Login</button>
          </div>
        ) : (
          <div>
            <h1>Verification Failed</h1>
            <p>{errorMessage}</p>
            <button onClick={() => navigate("/")}>Go to Home</button>
          </div>
        )}
      </div>
      <style jsx>{`
        .profilePage {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background-color: #f0f4f8;
        }
        .profilePage div {
          text-align: center;
          background: white;
          padding: 2rem;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        h1 {
          color: var(--primary-color);
          margin-bottom: 1rem;
        }
        p {
          color: #555;
          margin-bottom: 2rem;
        }
        button {
          background-color: var(--primary-color);
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        button:hover {
          background-color: var(--primary-color);
        }
      `}</style>
    </div>
  );
};

export default ActivateUser;
