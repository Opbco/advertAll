import {
  AUTHENTICATED,
  SET_ERRORS,
  CLEAR_ERRORS,
  UNAUTHENTICATED,
  IS_BUSY,
} from "../reducers/UserReducer";
import Constants from 'expo-constants';

import axios from "axios";

const publicAxios = axios.create({
  baseURL: Constants.expoConfig?.extra?.baseUrl,
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
});

export const loginUser = (userData) => (dispatch) => {
  dispatch(IS_BUSY());
  publicAxios
  .post("/en/login_check", userData)
  .then((res) => {
    console.log(res);
    if (res.data.token) {
      dispatch(AUTHENTICATED(res.data));
    }else{
      dispatch(SET_ERRORS("wrong_credentials"));
    }
  })
  .catch((err) => {
    console.log(err);
    dispatch(SET_ERRORS(err.message));
  });
  
};

export const logoutUser = (navigate) => (dispatch) => {
  dispatch(UNAUTHENTICATED());
};

export const setErrors = (errors) => (dispatch) => {
  dispatch(SET_ERRORS(errors));
};

export const clearErrors = () => (dispatch) => {
  dispatch(CLEAR_ERRORS());
};

export const loading = () => (dispatch) => {
  dispatch(IS_BUSY());
};
