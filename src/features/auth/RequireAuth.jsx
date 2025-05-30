import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = () => {
  const location = useLocation();
  const { sub } = useAuth();

  if(!sub){
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  else{
    return <Outlet />;
  }
};
export default RequireAuth;
