import {
  SET_LANGUAGE,
  SET_MODE
} from "../reducers/configReducer";

export const changeMode = (mode) => (dispatch) => {
  dispatch(SET_MODE(mode === "light" ? "dark" : "light"));
};

export const changeLanguage = (lang) => (dispatch) => {
  dispatch(SET_LANGUAGE(lang === "en" ? "fr" : "en"));
};
