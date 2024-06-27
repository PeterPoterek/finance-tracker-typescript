import { useDispatch, useSelector } from "react-redux";
import { getRefreshAccessToken, logoutUser } from "../redux/slices/authSlice";
import { AppDispatch, RootState } from "@/redux/store/store";

const useRefreshToken = () => {
  const dispatch = useDispatch<AppDispatch>();
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  const refresh = async () => {
    try {
      const resultAction = await dispatch(getRefreshAccessToken());
      if (getRefreshAccessToken.fulfilled.match(resultAction)) {
        const newAccessToken = resultAction.payload;
        return newAccessToken;
      } else {
        throw new Error("Failed to refresh access token");
      }
    } catch (error) {
      if (accessToken) {
        await dispatch(logoutUser());
      }
      throw error;
    }
  };

  return refresh;
};

export default useRefreshToken;
