import { apiSlice } from "../../app/api/apiSlice";


export const tourApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getTour: builder.query({
            query: (tourSlug) => ({
                url: `/tour/${tourSlug}`,
                method: "GET",
                validateStatus: (response, result) =>
                    response.status === 200 && !result.isError,
            }),
            providesTags: ["Tour"]
        }),

        getTourReviews: builder.query({
            query: ({ tourSlug, page, pageSize }) => ({
                url: `/tour/${tourSlug}/tour_review`,
                method: "GET",
                params: { page: page, pageSize: pageSize },
                validateStatus: (response, result) =>
                    response.status === 200 && !result.isError,
            }),
            invalidatesTags: ["Tour"]
        }),

        sendTourEnquiry: builder.mutation({
            query: (data) => ({
                url: `/tour/enquiry`,
                method: "POST",
                body: data,
                validateStatus: (response, result) =>
                    (response.status >= 200 && response.status < 300) && !result.isError,
            }),
            invalidatesTags: [ "Tour" ],
        }),

        getDestinations: builder.query({
            query: () => ({
                url: `/tour/destination`,
                method: "GET",
                validateStatus: (response, result) =>
                    response.status === 200 && !result.isError,
            }),
            providesTags: ["Destinations"]
        }),

        getBarDestinations: builder.query({
            query: () => ({
                url: `/tour/bar-destination`,
                method: "GET",
                validateStatus: (response, result) =>
                    response.status === 200 && !result.isError,
            }),
            providesTags: ["Destinations"]
        }),

        getADestination: builder.query({
            query: ({ destinationName }) => ({
                url: `/tour/destination/${destinationName}`,
                method: "GET",
                validateStatus: (response, result) =>
                    response.status === 200 && !result.isError,
            }),
            providesTags: ["Destinations"]
        }),

        getDestinationFAQ: builder.query({
            query: ({ page, pageSize, destinationId }) => ({
                url: `/tour/destination-faq`,
                method: "GET",
                params: { page, pageSize, destinationId },
                validateStatus: (response, result) =>
                    response.status === 200 && !result.isError,
            }),
            providesTags: ["Destinations"]
        }),

        getVacationTypes: builder.query({
            query: () => ({
                url: `/tour/vacation-type`,
                method: "GET",
                validateStatus: (response, result) =>
                    response.status === 200 && !result.isError,
            }),
            providesTags: ["VacationTypes"]
        }),

        getFestivals: builder.query({
            query: () => ({
                url: `/tour/festival`,
                method: "GET",
                validateStatus: (response, result) =>
                    response.status === 200 && !result.isError,
            }),
            providesTags: ["Festivals"]
        }),

        getSimilarTours: builder.query({
            query: ({tourSlug}) => ({
                url: `/tour/${tourSlug}/tour-suggestion`,
                method: "GET",
                validateStatus: (response, result) =>
                    response.status === 200 && !result.isError,
            }),
            providesTags: ["SimilarTours"]
        }),

        submitEnquiry: builder.mutation({
            query: (body) => ({
                url: `/tour/enquiry`,
                method: "POST",
                body: body,
                validateStatus: (response, result) =>
                    (response.status === 200 || response.status === 201) && !result.isError,
            }),
            providesTags: [ "Tour" ]
        }),

        getTestimonials: builder.query({
            query: ({page, pageSize}) => ({
                url: `/tour/testimonial`,
                method: "GET",
                params: { page: page, pageSize: pageSize },
                validateStatus: (response, result) =>
                    response.status === 200 && !result.isError,
            }),
            providesTags: ["Testimonials"]
        }),

        getTourAddOns: builder.query({
            query: ({ tourId }) => ({
                url: `/tour/add-on/${tourId}`,
                method: "GET",
                validateStatus: (response, result) =>
                    response.status === 200 && !result.isError,
            }),
            providesTags: [ "Tour" ]
        }),

        getTourVouchers: builder.query({
            query: ({ tourId }) => ({
                url: `/tour/voucher/${tourId}`,
                method: "GET",
                validateStatus: (response, result) =>
                    response.status === 200 && !result.isError,
            }),
            providesTags: [ "Tour" ]
        }),

        getTourPricing: builder.query({
            query: (tourId) => ({
                url: `/tour/pricing/${tourId}`,
                method: "GET",
                validateStatus: (response, result) =>
                    response.status === 200 && !result.isError,
            }),
            providesTags: [ "Tour" ]
        }),
    }),
});

export const {
    useGetTourQuery,
    useGetTourReviewsQuery,
    useSendTourEnquiryMutation,

    useGetDestinationsQuery,
    useGetBarDestinationsQuery,
    useGetADestinationQuery,
    useGetDestinationFAQQuery,
    useGetVacationTypesQuery,
    useGetFestivalsQuery,

    useGetSimilarToursQuery,

    useSubmitEnquiryMutation,

    useGetTestimonialsQuery,

    useGetTourAddOnsQuery,
    useGetTourVouchersQuery,


    useGetTourPricingQuery,
} = tourApiSlice;
