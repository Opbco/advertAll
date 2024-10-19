import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authenticated: false,
  access_token: "",
  loading: false,
  errors: null,
  roles: [],
  credentials: {},
  personnel: {},
};

const UserSclice = createSlice({
  name: "user",
  initialState,
  reducers: {
    AUTHENTICATED: (state, action) => {
      return {
        ...state,
        errors: "",
        access_token: action.payload.token,
        credentials: action.payload.data,
        roles: action.payload.data.role,
        authenticated: true,
        loading: false,
      };
    },
    IS_BUSY: (state, action) => {
      return {
        ...state,
        loading: true,
      };
    },
    SET_ERRORS: (state, action) => {
      return {
        ...state,
        errors: action.payload,
        loading: false,
      };
    },
    CLEAR_ERRORS: (state, action) => {
      return {
        ...state,
        errors: "",
        loading: false,
      };
    },
    UNAUTHENTICATED: (state, action) => {
      return { ...initialState, access_token: "" };
    },
    SET_USER: (state, action) => {
      return {
        ...state,
        personnel: action.payload,
      };
    },
  },
});

export const {
  AUTHENTICATED,
  LOAD_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  SET_USER,
  UNAUTHENTICATED,
  IS_BUSY,
} = UserSclice.actions;

export default UserSclice.reducer;
