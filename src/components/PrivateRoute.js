import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import { isAuthenticated } from "../store/modules/auth/selectors";

const PrivateRoute = ({ children }) => {
  const isAuth = useSelector(isAuthenticated);
  return isAuth ? children : <Navigate to='/login' replace={true} />;
};

export default PrivateRoute;