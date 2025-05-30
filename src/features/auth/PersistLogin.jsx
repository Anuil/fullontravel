import { Outlet } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useRefreshTokenMutation } from "./authApiSlice";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./authSlice";
import { jwtDecode } from "jwt-decode";
import { useUserState } from "../../features/user/userstateSlice";
import { userApiSlice } from "../user/userApiSlice";
import { useDispatch } from "react-redux";
import SkeletonWrapper from "../../Components/SkeletonWrapper";

// import SomethingWentWrong from "../../pages/ErrorPages/SomethingWentWrong";

const PersistLogin = () => {
  const { setUserHandler } = useUserState();
  let persist = true;
  const token = useSelector(selectCurrentToken);
  const dispatch = useDispatch();
  const effectRan = useRef(false);

  const [trueSuccess, setTrueSuccess] = useState(false);

  const [refresh, { isUninitialized, isLoading, isSuccess, isError }] =
    useRefreshTokenMutation();

  useEffect(() => {
    if (effectRan.current === false) {
      const verifyRefreshToken = async () => {
        try {
          const { token } = await refresh().unwrap();

          const decodedToken = jwtDecode(token);

          const userResponse = await dispatch(
            userApiSlice.endpoints.getUser.initiate({
              id: decodedToken?.userId,
            })
          ).unwrap();

          setUserHandler(userResponse);
          setTrueSuccess(true);
        } catch (err) {
          console.error(err);
        }
      };

      if (!token && persist) verifyRefreshToken();
    }
    return () => (effectRan.current = true);
  }, []);

  let content;
  if (!persist) {
    content = <Outlet />;
  } else if (isLoading) {
    content = (
      <div className="flex items-center justify-center h-screen text-center content-center  mx-auto">
        {/* <BeatLoader color={"green"} /> */}

            <SkeletonWrapper  height={500} count={1} style={{marginTop:100}}/>
            <SkeletonWrapper  height={50} count={4} style={{marginTop:10}}/>



      </div>
    );
  } else if (isError) {
    content = <Outlet />;
  } else if (isSuccess && trueSuccess) {
    content = <Outlet />;
  } else if (token && isUninitialized) {
    content = <Outlet />;
  }

  return content;
};
export default PersistLogin;
