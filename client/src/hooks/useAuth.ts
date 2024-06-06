import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store/store";
import { registerUser, loginUser, logoutUser } from "@/redux/slices/userSlice";

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

const useAuth = () => {
  const isLoggedIn = useSelector((state: RootState) => state.isLoggedIn);
  const dispatch = useDispatch<AppDispatch>();

  const logout = () => {
    return dispatch(logoutUser());
  };

  const login = (data: LoginData) => {
    return dispatch(loginUser(data));
  };

  const register = (data: RegisterData) => {
    return dispatch(registerUser(data));
  };

  return { isLoggedIn, logout, login, register };
};

export default useAuth;
