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

  console.log(isLoggedIn);

  const logout = () => {
    return dispatch(logoutUser());
  };

  const login = async (data: LoginData) => {
    const response = await dispatch(loginUser(data));
    return response;
  };

  const register = async (data: RegisterData) => {
    const response = await dispatch(registerUser(data));
    return response;
  };

  return { isLoggedIn, logout, login, register };
};

export default useAuth;
