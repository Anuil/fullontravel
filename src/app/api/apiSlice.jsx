import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials } from "../../features/auth/authSlice";
// import SomethingWentWrong from "../../pages/ErrorPages/SomethingWentWrong";

// import { setCredentials } from "../../features/auth/authSlice";

// import { config } from "dotenv";

const baseQuery = fetchBaseQuery({
    baseUrl: "https://api.fullontravel.com/api/",
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
        const token = getState()?.auth?.token;
        if (token) {
            headers.set("authorization", `Bearer ${token}`);
        }
        return headers;
    },
    validateStatus: (response, result) =>
        response.status === 200 && !result.isError,
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
    try {
        let result = await baseQuery(args, api, extraOptions);

        if (result?.error?.status === 403) {
            const refreshResult = await baseQuery("/auth/refresh-token", api, extraOptions);

            if (refreshResult?.data) {
                api.dispatch(setCredentials({ ...refreshResult.data }));
                result = await baseQuery(args, api, extraOptions);
            } else {
                if (refreshResult?.error?.status === 403) {
                    refreshResult.error.data.message = "Your login has expired.";
                }
                return refreshResult;
            }
        }

        return result;
    } catch (error) {
        console.error(error);
        // <SomethingWentWrong />;
    }
};

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    tagTypes: [
        "Tour",
        "SignupUser",
        "Booking",
        "Blogs",
        "Files"
    ],
    endpoints: () => ({}),
});
