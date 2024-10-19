import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {  persistReducer, persistStore } from "redux-persist";
import UserReducer from "./reducers/UserReducer";
import configReducer from "./reducers/configReducer";
import { openApi } from "./services/openApi";
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: "root",
  version: 1,
  storage: AsyncStorage,
  blacklist: [openApi.reducerPath],
  whitelist: ['auth']
};

const rootReducer = combineReducers({
  auth: UserReducer,
  config: configReducer,
  [openApi.reducerPath]: openApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(openApi.middleware),
});

const persistor = persistStore(store);

export { store, persistor };
