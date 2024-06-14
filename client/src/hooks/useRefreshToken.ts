import { useDispatch } from "react-redux";
import { getRefreshAccessToken, logoutUser } from "../redux/slices/authSlice";
import { AppDispatch } from "@/redux/store/store";

const useRefreshToken = () => {
  const dispatch = useDispatch<AppDispatch>();

  const refresh = async () => {
    try {
      const token = await dispatch(getRefreshAccessToken());
      console.log(token);

      return token;
    } catch (error) {
      dispatch(logoutUser());
      throw error;
    }
  };

  return refresh;
};

export default useRefreshToken;
