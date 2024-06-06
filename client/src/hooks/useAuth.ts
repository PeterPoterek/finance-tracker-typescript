import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store/store";
import { logoutUser, loginUser } from "@/redux/slices/userSlice";

interface LoginData {
  email: string;
  password: string;
}

const useAuth = () => {
  const isLoggedIn = useSelector((state: RootState) => state.isLoggedIn);
  const dispatch = useDispatch<AppDispatch>();

  const logout = () => {
    dispatch(logoutUser());
  };

  const login = (data: LoginData) => {
    return dispatch(loginUser(data));
  };

  return { isLoggedIn, logout, login };
};

export default useAuth;
