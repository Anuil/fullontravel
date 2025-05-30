import { param } from "jquery";
import { apiSlice } from "../../app/api/apiSlice";
import { logOut,setCredentials } from "./authSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    signUp: builder.mutation({
      query: ({payload,params}) => ({
        url: `/auth/signup?g-recaptcha-response=${params.recaptcha}`,
        method: "POST",
        body: payload,
        validateStatus: (response, result) =>
            (response.status === 200 || response.status === 201) && !result.isError,
      }),
      providesTags: [ "SignupUser" ],
    }),

    loginUser: builder.mutation({
        query: ({payload,params}) => ({
          url: `/auth/login?g-recaptcha-response=${params.recaptcha}`,
          method: "POST",
          body: payload,
          validateStatus: (response, result) =>
              (response.status === 200 || response.status === 201) && !result.isError,
        }),
        providesTags: [ "loginUser" ],
      }),

      sendLogout: builder.mutation({
        query: () => ({
          url: "/auth/logout",
          method: "POST",
        }),
        async onQueryStarted(arg, { dispatch, queryFulfilled }) {
          try {
            const { data } = await queryFulfilled;
            dispatch(logOut());
            dispatch(apiSlice.util.resetApiState());
            setTimeout(() => {}, 1000);
          } catch (err) {
            console.log(err);
          }
        },
      }),

      refreshToken: builder.mutation({
        query: () => ({
          url: "/auth/refresh-token",
          method: "GET",
        }),
        async onQueryStarted(arg, { dispatch, queryFulfilled }) {
            try {
                const { data } = await queryFulfilled;
                const { token } = data;
                dispatch(setCredentials({ access_token: token }));
            } catch (err) {
                console.log(err);
            }
        },
      }),

      forgetPassword: builder.mutation({
        query: (payload) => ({
          url: "/auth/forget-password",
          method: "POST",
          body: payload,
          validateStatus: (response, result) =>
              (response.status === 200 || response.status === 201) && !result.isError,
        }),
        providesTags: [ "forgetPassword" ],
      }),

      changePassword: builder.mutation({
        query: (payload) => ({
          url: "/auth/reset-password",
          method: "PATCH",
          body: payload,
          validateStatus: (response, result) =>
              (response.status === 200 || response.status === 201) && !result.isError,
        }),
        providesTags: [ "resetPassword" ],
      }),

      verifyUser: builder.mutation({
        query: (payload) => ({
          url: "/auth/activate-user",
          method: "PATCH",
          body: payload,
          validateStatus: (response, result) =>
              (response.status === 200 || response.status === 201) && !result.isError,
        }),
        providesTags: [ "verifyUser" ],
      }),
  }),
});

export const {
  useSignUpMutation,
  useLoginUserMutation,
  useRefreshTokenMutation,
  useSendLogoutMutation,
  useForgetPasswordMutation,
  useChangePasswordMutation,
  useVerifyUserMutation
} = authApiSlice;
