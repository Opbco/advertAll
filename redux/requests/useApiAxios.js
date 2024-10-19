import publicAxios from "./publicAxios";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UNAUTHENTICATED } from "../reducers/UserReducer";

const useApiAxios = () => {
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  useEffect(() => {
    const requestIntercept = publicAxios.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${user?.access_token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
    const responseIntercept = publicAxios.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error?.response?.status === 401) {
          dispatch(UNAUTHENTICATED());
          navigate("/login", { replace: true });
        }
        return Promise.reject(error);
      }
    );
    return () => {
      publicAxios.interceptors.request.eject(requestIntercept);
      publicAxios.interceptors.response.eject(responseIntercept);
    };
  }, [user.authenticated, user.access_token]);

  return publicAxios;
};

export default useApiAxios;
