import { useDispatch } from "react-redux";
import { getRefreshAccessToken } from "../redux/slices/authSlice";
import { AppDispatch } from "@/redux/store/store";

const useRefreshToken = () => {
  const dispatch = useDispatch<AppDispatch>();

  const refresh = () => {
    const token = dispatch(getRefreshAccessToken());

    return token;
  };

  return refresh;
};

export default useRefreshToken;
