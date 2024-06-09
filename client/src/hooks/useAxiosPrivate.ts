import { axiosPrivateInstance } from "@/lib/axiosInstance";
import { useEffect, useRef } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store/store";
import { logoutUser } from "../redux/slices/authSlice";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { accessToken, isLoggedIn } = useAuth();
  const dispatch = useDispatch<AppDispatch>();
  const isLoggingOut = useRef(false);

  useEffect(() => {
    const requestIntercept = axiosPrivateInstance.interceptors.request.use(
      config => {
        if (!config.headers["Authorization"] && accessToken) {
          config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
      },
      error => Promise.reject(error)
    );

    const responseIntercept = axiosPrivateInstance.interceptors.response.use(
      response => response,
      async error => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          try {
            const newAccessToken = await refresh();
            if (newAccessToken) {
              prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
              return axiosPrivateInstance(prevRequest);
            } else {
              throw new Error("Failed to refresh access token");
            }
          } catch (refreshError) {
            if (!isLoggingOut.current && isLoggedIn) {
              isLoggingOut.current = true;
              dispatch(logoutUser());
            }
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivateInstance.interceptors.request.eject(requestIntercept);
      axiosPrivateInstance.interceptors.response.eject(responseIntercept);
    };
  }, [accessToken, refresh, dispatch, isLoggedIn]);

  return axiosPrivateInstance;
};

export default useAxiosPrivate;
