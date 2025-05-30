import { apiSlice } from "../../app/api/apiSlice"

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: ({id}) => ({
        url: `/user/profile/${id}`,
        method: "GET",
      }),
      providesTags: ["getUser"],
    }),

    updateUser: builder.mutation({
      query: ({id, data}) => ({
        url: `/user/profile/${id}`,
        method: "PATCH",
        body: data,
        validateStatus: (response, result) =>
          response.status === 200 && !result.isError,

      }),
      invalidatesTags: ["getUser"],
    }),

    getUserBookings: builder.query({
      query: ({id, page, pageSize}) => ({
        url: `/user/booking/${id}`,
        method: "GET",
        params: {
          page,
          pageSize
        }
      }),
      providesTags: ["getUser"],
    }),

    addCoTraveller: builder.mutation(({
      query: ({userId, body}) => ({
        url: `/user/${userId}/co-traveller`,
        method: "POST",
        body: body,
        validateStatus: (response, result) =>
          (response.status === 201 ||response.status === 200) && !result.isError,
      }),
      providesTags: [ "getUser" ],
    })),

    updateCoTraveller: builder.mutation(({
      query: ({userId, coTravellerId, body}) => ({
        url: `/user/${userId}/co-traveller/${coTravellerId}`,
        method: "PATCH",
        body: body,
        validateStatus: (response, result) =>
          (response.status === 201 ||response.status === 200) && !result.isError,
      }),
      providesTags: [ "getUser" ],
    })),

    deleteCoTraveller: builder.mutation(({
      query: ({userId, coTravellerId}) => ({
        url: `/user/${userId}/co-traveller/${coTravellerId}`,
        method: "DELETE",
        validateStatus: (response, result) =>
          response.status === 200 && !result.isError,
      }),
      providesTags: [ "getUser" ],
    })),

    fetchCoTraveller: builder.query({
      query: ({ userId, page, pageSize }) => ({
        url: `/user/${userId}/co-traveller`,
        method: "GET",
        params: {
          page,
          pageSize
        },
        validateStatus: (response, result) =>
          response.status === 200 && !result.isError,
      }),
      providesTags: [ "getUser" ],
    })

  }),
});

export const {
  useGetUserQuery,
  useUpdateUserMutation,
  useGetUserBookingsQuery,

  useAddCoTravellerMutation,
  useUpdateCoTravellerMutation,
  useDeleteCoTravellerMutation,
  useFetchCoTravellerQuery
} = userApiSlice;
