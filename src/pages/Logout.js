import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logoutThunk } from "../store/modules/auth/slice";

const Logout = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(logoutThunk());
  }, [dispatch]);
  return null;
};

export default Logout; 