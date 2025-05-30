"use client";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../auth/authSlice";
import { jwtDecode } from "jwt-decode";


const useAuth = () => {
  const token = useSelector(selectCurrentToken);
  let isUser = false;

  let status = null;
  let userVal=null
  if (token) {
    const decoded = jwtDecode(token);
    const { sub,roles } = decoded
    const hasToken = true;

    isUser = roles.includes("USER");
    if (isUser) status = "User";

    return {
      hasToken,
      sub,
      isUser,
      status
    };
  }

  return {
    sub: "",
    isUser,
    status
  };
};
export default useAuth;
