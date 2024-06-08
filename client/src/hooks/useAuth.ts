import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store/store";
import { registerUser, loginUser } from "@/redux/slices/userSlice";
import { setLoggedOut } from "@/redux/slices/authSlice";

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
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const dispatch = useDispatch<AppDispatch>();

  const logout = () => {
    dispatch(setLoggedOut());
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
