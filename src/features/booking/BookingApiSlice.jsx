import { apiSlice } from "../../app/api/apiSlice";

export const bookingApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        initiateBooking: builder.mutation({
            query: ({ body }) => ({
                url: `/booking/initiate`,
                method: "POST",
                body: body,
                validateStatus: (response, result) =>
                    (response.status === 200 || response.status === 201) && !result.isError,
            }),
            providesTags: [ "Booking" ]
        }),

        updateInitiateBooking : builder.mutation({
            query: ({ body, code }) => ({
                url: `/booking/initiate`,
                method: "PUT",
                body: body,
                params: {code},
                validateStatus: (response, result) =>
                    (response.status === 200 || response.status === 201) && !result.isError,
            }),
            providesTags: [ "Booking" ]
        }),

        getInitiateBooking: builder.query({
            query: ({ code }) => {
                return {
                    url: `/booking/initiate`,
                    method: "GET",
                    params: { code },
                    validateStatus: (response, result) =>
                        response.status === 200 && !result.isError,
                }
            },
            providesTags: [ "Booking" ]
        }),

        addBooking: builder.mutation({
            query: ({ body }) => ({
                url: `/booking/`,
                method: "POST",
                body: body,
                validateStatus: (response, result) =>
                    (response.status === 200 || response.status === 201) && !result.isError,
            }),
            providesTags: [ "Booking" ]
        }),

       

        validateVoucher: builder.mutation({
            query: ({ body }) => ({
                url: `/tour/voucher/validate`,
                method: "POST",
                body: body,
                validateStatus: (response, result) =>
                    (response.status === 200 || response.status === 201) && !result.isError,
            }),
            providesTags: [ "Booking" ]
        }),

        initiatePayment: builder.mutation({
            query: ({ body }) => ({
                url: `/payment/initiate/prod`,
                method: "POST",
                body: body,
                responseHandler: (response) => response.text(),
                validateStatus: (response) => response.status === 200 || response.status === 201
            }),
            providesTags: [ "Booking" ]
        }),

        getUserBooking: builder.query({
            query: ({userId, bookingId, slug}) => ({
                url: `/user/${userId}/booking/${bookingId}/tour/${slug}`,
                method: "GET",
                validateStatus: (response, result) => response.status === 200 && !result.isError
            }),
            // invalidatesTags: [ "Booking" ]
        })
    }),
});

export const {
    useInitiateBookingMutation,
    useUpdateInitiateBookingMutation,
    useGetInitiateBookingQuery,
    useAddBookingMutation,

    useValidateVoucherMutation,
    useInitiatePaymentMutation,

    useGetUserBookingQuery,
} = bookingApiSlice;