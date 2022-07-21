import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import { isAuthenticated } from "../store/modules/auth/selectors";

const PublicRoute = ({ children }) => {
  const isAuth = useSelector(isAuthenticated);
  return isAuth ? <Navigate to='/profile' replace={true} /> : children;
};

export default PublicRoute;