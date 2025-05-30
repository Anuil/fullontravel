import { apiSlice } from "../../app/api/apiSlice";

export const homeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDestinations: builder.query({
      query: () => ({
        url: "/home",
      }),
      providesTags: ["Home"],
    }),

    getFooterLinks: builder.query({
      query: () => ({
        url: "/tour/footer-link",
        method: "GET",
        // params: { page, pageSize },
        validateStatus: (response, result) =>
          response.status === 200 && !result.isError,
      }),
      providesTags: [ "TourComponent" ],
    }),

    subscribeToNewsletter: builder.mutation({
      query: ({body}) => ({
        url: "/tour/subscribe-newsletter",
        method: "POST",
        body: body,
        validateStatus: (response, result) =>
          (response.status === 200, response.status === 201) && !result.isError,
      }),
      invalidatesTags: ["TourComponent"],
    }),
  }),
});

export const {
  useGetFooterLinksQuery,
  useSubscribeToNewsletterMutation
} = homeApiSlice;