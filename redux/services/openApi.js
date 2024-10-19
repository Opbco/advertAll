import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UNAUTHENTICATED } from "../reducers/UserReducer";
import Constants from 'expo-constants';

const baseQuery = fetchBaseQuery({
  baseUrl: Constants.expoConfig?.extra?.baseUrl,
  prepareHeaders: (headers, { getState, endpoint }) => {
    const token = getState()?.auth?.access_token;
    if (endpoint.startsWith("upload")) {
      headers.set("Accept", "application/json");
    } else {
      headers.set("Content-Type", "application/json");
    }
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    // log out the user
    api.dispatch(UNAUTHENTICATED());
  }
  return result;
};

export const openApi = createApi({
  reducerPath: "openApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    "Applications",
  ],
  endpoints: (builder) => ({
    getApplications: builder.query({
      query: (params) => `/applications?status=${params.status}&list=${params.list}`,
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Applications", id })),
              { type: "Applications", id: "LIST" },
            ]
          : [{ type: "Applications", id: "LIST" }],
    }),
  }),
});

export const {
  useGetTicketsQuery,
} = openApi;
