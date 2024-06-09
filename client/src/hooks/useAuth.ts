import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store/store";
import { registerUser, loginUser } from "@/redux/slices/userSlice";
import { logoutUser } from "@/redux/slices/authSlice";

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
  const loading = useSelector((state: RootState) => state.auth.loading);
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const dispatch = useDispatch<AppDispatch>();

  const logout = () => {
    dispatch(logoutUser());
  };

  const login = async (data: LoginData) => {
    const response = await dispatch(loginUser(data));
    return response;
  };

  const register = async (data: RegisterData) => {
    const response = await dispatch(registerUser(data));
    return response;
  };

  return { accessToken, isLoggedIn, loading, logout, login, register };
};

export default useAuth;
