import { apiSlice } from "../../app/api/apiSlice";

export const filesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        uploadImage: builder.mutation({
            query: (data) => ({
                url: "/file/upload/images",
                method: "POST",
                body: data,
                validateStatus: (response, result) =>
                    (response.status === 200 || response.status === 201) && !result.isError,
            }),
            providesTags: [ "Files" ],
        }),

    }),
});

export const {
    useUploadImageMutation,
} = filesApiSlice;