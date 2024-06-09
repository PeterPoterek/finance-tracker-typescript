import { axiosPrivateInstance } from "@/lib/axiosInstance";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { accessToken } = useAuth();

  useEffect(() => {
    const requestIntercept = axiosPrivateInstance.interceptors.request.use(
      config => {
        if (!config.headers["Authorization"]) {
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
        if (error?.response.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosPrivateInstance(prevRequest);
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivateInstance.interceptors.request.eject(requestIntercept);
      axiosPrivateInstance.interceptors.response.eject(responseIntercept);
    };
  }, [accessToken, refresh]);

  return axiosPrivateInstance;
};

export default useAxiosPrivate;
