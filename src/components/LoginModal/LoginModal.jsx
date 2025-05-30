import { useEffect, useState } from "react";
import Link from 'next/link';
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer } from 'react-toastify';

import ReCAPTCHA from "react-google-recaptcha";
import Select from "react-select"
import {
  useLoginUserMutation,
  useSignUpMutation,
  useForgetPasswordMutation,
} from "../../features/auth/authApiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../features/auth/authSlice";
import { useUserState } from "../../features/user/userstateSlice";
import { userApiSlice } from "../../features/user/userApiSlice";
import { countryList } from "../../utils/countriesList";
// const SITE_KEY = import.meta.env.VITE_SITE_KEY;
const SITE_KEY = process.env.VITE_SITE_KEY
;

function LoginModal({ isModalVisible, setIsModalVisible }) {

  const { setUserHandler } = useUserState();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [alert, setAlert] = useState(false);
  const [userSave, setUserData] = useState(null);
  const [recaptcha, setRecaptcha] = useState(null);
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const [showPasswordType, setShowPasswordType] = useState(false);
  const [validations, setValidations] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
  });

  const validatePassword = (password) => {
    setValidations({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      specialChar: /[@$!%*?&]/.test(password),
    });
  };

  const refreshCaptcha = () => {
    setRecaptcha(null);
    if (window.grecaptcha) {
      window.grecaptcha.reset();
    }
  };
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    countryCode: "+91",
  });

  const [loginFormData, setLoginFormData] = useState({
    email: null,
    password: null,
  });

  const [signUp] = useSignUpMutation();
  const [LoginUser] = useLoginUserMutation();
  const [forgetUser] = useForgetPasswordMutation();

  const handleSignup = async (e) => {
    e.preventDefault();

    const { name, email, password, confirmPassword, phone } = formData;

    if (!name || !email || !password || !confirmPassword) {
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
    if (password.length < 8) {
      setErrorMessage("Error! Password must be at least 8 characters long.");
      setAlert(true);
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      setAlert(true);
      return;
    }

    if (!phone && phone === "") {
      setErrorMessage("Please enter a valid phone number.");
      setAlert(true);
      return;
    }

    if (recaptcha === null) {
      setErrorMessage("Please verify reCAPTCHA.");
      setAlert(true);
      return;
    }

    try {
      setIsFetching(true);
      let payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        mobile: formData?.phone,
        confirmPassword: formData.confirmPassword,
        countryCode: formData?.countryCode || "+91",
        role: "USER",
      };

      const params = {
        'recaptcha': recaptcha
      }
      const { data, error } = await signUp({ payload, params });
      if (!data && error) {

        refreshCaptcha();
        setErrorMessage(error.data.errorMessage ? error.data.errorMessage : "internal server error.");
        setAlert(true);
        return false;
      }
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
      });
      setSuccessMessage("Success! Activation link sent to your email address. Please check your inbox.");
      setAlert(true);
      if (error) {
        refreshCaptcha();
        throw error;

      }
    } catch (error) {
      setErrorMessage("internal server error.");
      refreshCaptcha();

      setAlert(true);
      //   toast.error("internal server error.");
    } finally {
      setIsFetching(false);
      //   setIsModalVisible(false);
    }
  };

  const validation = () => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!loginFormData.email || !loginFormData.password) {
      setErrorMessage(
        " All fields are required. Please fill in all the fields."
      );
      setAlert(true);
      return false;
    }
    if (!emailRegex.test(loginFormData.email)) {
      setErrorMessage(" Please enter a valid email address.");
      setAlert(true);
      return false;
    }

    if (loginFormData.password.length < 8) {
      setErrorMessage(" Password must be at least 8 characters long.");
      setAlert(true);
      return;
    }

    if (recaptcha === null) {
      setErrorMessage("Please verify reCAPTCHA.");
      setAlert(true);
      return;
    }
    return true;
  };

  const handleForget = async (e) => {
    e.preventDefault();

    const { email: forgetemail } = email;
    if (!forgetemail) {
      setErrorMessage("Please Enter Email Id.");
      setAlert(true);
      return;
    }
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(forgetemail)) {
      setErrorMessage("Please enter a valid email address.");
      setAlert(true);
      return;
    }

    try {
      setIsFetching(true);
      let payload = {
        email: forgetemail,
      };
      const { data, error } = await forgetUser(payload);
      if (!data) {
        setErrorMessage(error.data.errorMessage);
        setAlert(true);
        return false;
      }
      setSuccessMessage(
        "Forgot Password Link Sent To Your Registered Email Address. Please check your inbox."
      );
      setAlert(true);
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setEmail("");
      setIsFetching(false);
      //   setIsModalVisible(false);
    }
  };

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      const modal = document.querySelector(".custom-enquiry");
      if (modal && !modal.contains(event.target)) {
        event.stopPropagation();
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!isModalVisible) {
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
      });
      setLoginFormData({
        email: "",
        password: "",
      });
      setEmail("");
      setAlert(false);
      setErrorMessage("");
    }
  }, [isModalVisible]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (!validation()) {
        refreshCaptcha();
        return false;

      }
      setIsFetching(true);
      const payload = {
        email: loginFormData.email,
        password: loginFormData.password,
      };
      const params = {
        'recaptcha': recaptcha
      }
      const response = await LoginUser({ payload, params }).unwrap();
      const { token, id } = response;
      if (token) {
        dispatch(setCredentials({ access_token: token }));
        const userResponse = await dispatch(
          userApiSlice.endpoints.getUser.initiate({ id: id })
        ).unwrap();
        setUserHandler(userResponse);
        setIsModalVisible(false);
        // toast.success("Login Successful!");

        setLoginFormData({
          email: "",
          password: "",
        });

        setAlert(false);
        setErrorMessage("");
      }
    } catch (error) {
      setErrorMessage(error.data.errorMessage);
      refreshCaptcha();
      setAlert(true);
    } finally {
      setIsFetching(false);
    }
  };

  const [activeTab, setActiveTab] = useState("login");

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
    setAlert(false);
  };


  const [ captchaLoading, setCaptchaLoading ] = useState(false)
  const handleCaptchaChange = async (token) => {
    try {
      setCaptchaLoading(true)
      setRecaptcha(token);
    } catch (error) {
      console.error("Error occurred while handling reCAPTCHA:", error);

    }finally {
      setCaptchaLoading(false)
    }
  };

  const countiresDropdown = countryList.map((country) => (
    { label: country.phoneCode, value: country.phoneCode, icon: country.flagEmoji }
  ))


  return (
    <>
      {isModalVisible && (
        <div
          className="custom-enquiry-container"
          id="loginModal"
          style={{ display: "flex" }}
        >
          <div className="custom-enquiry">
            <button
              className="custom-close-btn"
              onClick={() => {
                setActiveTab("login");
                setIsModalVisible(false);
              }}
            >
              <FontAwesomeIcon icon={faX} />
            </button>
            <div className="formAssembly">
              <ul
                className="nav nav-tabs nav-fill"
                id="logintab"
                role="tablist"
              >
                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link ${activeTab === "login" || activeTab === "forget"
                      ? "active"
                      : ""
                      }`}
                    id="login-tab"
                    data-bs-toggle="tab"
                    type="button"
                    role="tab"
                    onClick={() => handleTabSwitch("login")}
                  >
                    {activeTab === "forget" ? "Forgot Password" : "Login"}
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link ${activeTab === "signup" ? "active" : ""
                      }`}
                    id="signup-tab"
                    data-bs-toggle="tab"
                    type="button"
                    role="tab"
                    onClick={() => handleTabSwitch("signup")}
                  >
                    Sign Up
                  </button>
                </li>
              </ul>
              <div className="tab-content" id="logintabContent">
                {activeTab === "login" && (
                  <div
                    className="tab-pane fade show active"
                    id="login-tab-pane"
                    role="tabpanel"
                    aria-labelledby="login-tab"
                  >
                    <div className="tripenquiryTitle">
                      <h3>Log into Your Account</h3>
                    </div>
                    <div className="addInput">
                      <form method="POST" onSubmit={handleLogin}>
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
                          <input
                            type="email"
                            className="form__field"
                            name="email"
                            value={loginFormData?.email}
                            placeholder="EMAIL"
                            onChange={(e) =>
                              setLoginFormData({
                                ...loginFormData,
                                email: e.target.value,
                              })
                            }
                            required=""
                          />
                          <label className="form__label">Enter Email</label>
                        </div>
                        <div className="form__group field">
                          <input
                            type="password"
                            className="form__field"
                            name="password"
                            value={loginFormData?.password}
                            placeholder="PASSWORD"
                            onChange={(e) =>
                              setLoginFormData({
                                ...loginFormData,
                                password: e.target.value,
                              })
                            }
                            required=""
                          />

                          <label className="form__label">Enter Password</label>
                        </div>

                        <div className="form__group field mb-2">
                          <ReCAPTCHA
                            sitekey={SITE_KEY}
                            onChange={handleCaptchaChange}
                          />
                        </div>

                        <button
                          className="sanText sameBtn"
                          type="button"
                          onClick={() => handleTabSwitch("forget")}
                        >
                          Forgot Password?
                        </button>
                        <button
                          className="enquiryBtn"
                          disabled={isFetching || captchaLoading}
                          type="submit"
                          onClick={(e) => handleLogin(e)}
                        >
                          {isFetching ? "Sending..." : "LOGIN"}
                        </button>
                      </form>
                    </div>
                  </div>
                )}
                {activeTab === "signup" && (
                  <div
                    className="tab-pane fade show active"
                    id="signup-tab-pane"
                    role="tabpanel"
                    aria-labelledby="signup-tab"
                  >
                    <div className="tripenquiryTitle">
                      <h3>Create Your Account</h3>
                    </div>
                    <div>
                      {alert && (
                        <div
                          className={`alert ${successMessage ? `alert-success` : `alert-danger`
                            }  alert-dismissible fade show`}
                          role="alert"
                        >
                          {/* <strong>
                            {" "}
                            {successMessage ? "Success" : "Error"}!{" "}
                          </strong> */}
                          {successMessage ? successMessage : errorMessage}
                          <button
                            type="button"
                            className="btn-close"
                            onClick={() => setAlert(false)}
                          ></button>
                        </div>
                      )}
                    </div>
                    <div className="addInput">
                      <form method="POST">
                        <div className="form__group field">
                          <input
                            type="text"
                            className="form__field"
                            value={formData.name}
                            name="name"
                            placeholder="Full Name"
                            required
                            onChange={(e) => {
                              setFormData((preState) => {
                                return {
                                  ...preState,
                                  name: e.target.value,
                                };
                              });
                            }}
                          />
                          <label className="form__label">Full Name</label>
                        </div>
                        <div className="form__group field">
                          <input
                            type="email"
                            className="form__field"
                            value={formData.email}
                            name="email"
                            placeholder="Email"
                            required
                            onChange={(e) => {
                              setFormData((preState) => {
                                return {
                                  ...preState,
                                  email: e.target.value,
                                };
                              });
                            }}
                          />
                          <label className="form__label">Email</label>
                        </div>
                        <div className="mobileCode">
                          <Select
                            options={countiresDropdown}
                            formatOptionLabel={({ icon, label }) => (
                              <div style={{ display: 'flex', alignItems: 'center' }}>
                                <span style={{ marginRight: '8px' }}>{icon}</span>
                                <span>{label}</span>
                              </div>
                            )}
                            defaultValue={{ label: "+91", value: "+91", icon: "🇮🇳" }}
                            onChange={(selectedCode) => setFormData({
                              ...formData,
                              countryCode: selectedCode.value
                            })}
                          />
                          <div className="form__group field">
                            <input
                              type="tel"
                              className="form__field"
                              value={formData.phone}
                              name="phone"
                              placeholder="Mobile Number"
                              required
                              // pattern="\d{10}"
                              // maxLength={10}
                              onChange={(e) => {
                                const value = e.target.value;
                                if (/^\d*$/.test(value)) {
                                  setFormData((preState) => ({
                                    ...preState,
                                    phone: value,
                                  }));
                                }
                                // const value = e.target.value;
                                // setFormData((preState) => {
                                //   return {
                                //     ...preState,
                                //     phone: e.target.value,
                                //   };
                                // })
                                // if (/^\d{0,10}$/.test(value)) {

                                // }
                              }}
                            />
                            <label className="form__label">Mobile Number</label>
                          </div>
                        </div>
                        <div className="passwordDiv">
                          <div className="form__group field">
                            <input
                              type="password"
                              className="form__field"
                              value={formData.password}
                              name="password"
                              placeholder="PASSWORD"
                              required
                              onChange={(e) => {
                                const newPassword = e.target.value;
                                setFormData((prevState) => ({
                                  ...prevState,
                                  password: newPassword,
                                }));
                                validatePassword(newPassword);
                              }}
                              onFocus={() => setShowPasswordType(true)}
                              onBlur={() => setShowPasswordType(false)}
                            />
                            {showPasswordType && (
                              <div className="passwordType">
                                <div className="head">Your password must have:</div>
                                <ul className="password-list">
                                  <li>
                                    <div className={`checkmark ${validations.length ? "valid" : ""}`}></div>
                                    At least 8 characters
                                  </li>
                                  <li>
                                    <div className={`checkmark ${validations.uppercase ? "valid" : ""}`}></div>
                                    At least 1 uppercase letter
                                  </li>
                                  <li>
                                    <div className={`checkmark ${validations.lowercase ? "valid" : ""}`}></div>
                                    At least 1 lowercase letter
                                  </li>
                                  <li>
                                    <div className={`checkmark ${validations.number ? "valid" : ""}`}></div>
                                    At least 1 number
                                  </li>
                                  <li>
                                    <div className={`checkmark ${validations.specialChar ? "valid" : ""}`}></div>
                                    At least 1 special character
                                  </li>
                                </ul>
                              </div>
                            )}
                            <label className="form__label">Password</label>
                          </div>
                          <div className="form__group field">
                            <input
                              type="password"
                              className="form__field"
                              name="confirmPassword"
                              value={formData.confirmPassword}
                              placeholder="Confirm PASSWORD"
                              required
                              onChange={(e) => {
                                setFormData((preStage) => {
                                  return {
                                    ...preStage,
                                    confirmPassword: e.target.value,
                                  };
                                });
                              }}
                            />
                            <label className="form__label">
                              Confirm Password
                            </label>
                          </div>
                        </div>
                        <div className="form__group field mb-2">
                          <ReCAPTCHA
                            sitekey={SITE_KEY}
                            onChange={handleCaptchaChange}
                          />
                        </div>
                        <div className="sanText">
                          By joining, you agree to the{" "}
                          <Link href="/terms-and-conditions" target="_blank">
                            Terms & Conditions
                          </Link>{" "}
                          and{" "}
                          <Link href="/privacy-policies" target="_blank">
                            Privacy Policy
                          </Link>
                        </div>
                        <button
                          className="enquiryBtn"
                          disabled={isFetching || captchaLoading}
                          onClick={(e) => handleSignup(e)}
                        >
                          {isFetching ? "Sending..." : "SIGN UP"}
                        </button>
                      </form>
                    </div>
                  </div>
                )}
                {activeTab === "forget" && (
                  <div
                    className="tab-pane fade show active"
                    id="forget-tab-pane"
                    role="tabpanel"
                  >
                    <button
                      className="sanText sameBtn"
                      type="button"
                      onClick={() => handleTabSwitch("login")}
                    >
                      <FontAwesomeIcon icon={faArrowLeft} /> Back to Login
                    </button>
                    <div className="tripenquiryTitle">
                      <h3>Forgot Your Password?</h3>
                    </div>

                    <div>
                      {alert && (
                        <div
                          className={`alert ${successMessage ? `alert-success` : `alert-danger`
                            }  alert-dismissible fade show`}
                          role="alert"
                        >
                          <strong>
                            {" "}
                            {successMessage ? "Success" : "Error"}!{" "}
                          </strong>
                          {successMessage ? successMessage : errorMessage}
                          <button
                            type="button"
                            className="btn-close"
                            onClick={() => setAlert(false)}
                          ></button>
                        </div>
                      )}
                    </div>

                    <p className="mb-2">
                      Please enter your email to reset your password.
                    </p>
                    <form>
                      <div className="form__group field">
                        <input
                          type="email"
                          className="form__field"
                          name="resetEmail"
                          placeholder="EMAIL"
                          required
                          onChange={(e) => {
                            setEmail((preStage) => {
                              return {
                                ...preStage,
                                email: e.target.value,
                              };
                            });
                          }}
                        />
                        <label className="form__label">Enter Email</label>
                      </div>
                      <button className="enquiryBtn" onClick={handleForget}>
                        {isFetching ? "Sending..." : "Reset Password"}
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

LoginModal.propTypes = {
  // tourID: PropTypes.string.isRequired,
  isModalVisible: PropTypes.bool.isRequired,
  setIsModalVisible: PropTypes.func.isRequired,
};

export default LoginModal;