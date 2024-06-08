import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { refreshAccessToken } from "../redux/slices/authSlice";
import { AppDispatch, RootState } from "@/redux/store/store";

const useRefreshToken = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { accessToken, loading } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    const refreshToken = async () => {
      await dispatch(refreshAccessToken());
    };

    if (!accessToken) {
      refreshToken();
    }

    const interval = setInterval(refreshToken, 15 * 60 * 1000);

    return () => clearInterval(interval);
  }, [accessToken, dispatch]);

  return { accessToken, loading };
};

export default useRefreshToken;
