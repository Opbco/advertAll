import { createSlice } from "@reduxjs/toolkit";
import { getLocales } from "expo-localization";
import { I18n } from "i18n-js";
import translations from "@assets/languages/translations";

const i18n = new I18n(translations);
const locales = getLocales();

i18n.enableFallback = true;
i18n.locale = locales[0].languageCode;
i18n.defaultLocale = 'fr';

const initialConfig = {
  mode: "light",
  lang: locales[0].languageCode,
  i18n: i18n
};

const configSclice = createSlice({
  name: "config",
  initialState: initialConfig,
  reducers: {
    SET_LANGUAGE: (state, action) => {
      state.i18n.locale = action.payload; 
      return {
        ...state,
        lang: action.payload
      };
    },
    SET_MODE: (state, action) => {
      return {
        ...state,
        mode: action.payload,
      };
    }
  },
});

export const {
  SET_LANGUAGE,
  SET_MODE,
} = configSclice.actions;

export default configSclice.reducer;
