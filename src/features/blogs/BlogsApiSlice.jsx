import { apiSlice } from "../../app/api/apiSlice";


export const blogsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        getBlogCategories: builder.query({
            query: ({page, pageSize}) => ({
                url: `/blog/category`,
                method: "GET",
                params: {page, pageSize},
                validateStatus: (response, result) =>
                    response.status === 200 && !result.isError,
            }),
            providesTags: [ "Blogs" ]
        }),
        getBlogs: builder.query({
            query: ({ page, pageSize }) => ({
                url: `/blog/`,
                method: "GET",
                params: { page, pageSize },
                validateStatus: (response, result) =>
                    response.status === 200 && !result.isError,
            }),
            providesTags: [ "Blogs" ]
        }),

        getBlogByCategory: builder.query({
            query: ({page, pageSize, categoryId}) => ({
                url: `/blog/`,
                method: "GET",
                params: {page, pageSize, categoryId},
                validateStatus: (response, result) =>
                    response.status === 200 && !result.isError,
            }),
            providesTags: [ "Blogs" ]
        }),

        getABlog: builder.query({
            query: ({ blogId }) => ({
                url: `/blog/${blogId}/detail`,
                method: "GET",
                validateStatus: (response, result) =>
                    response.status === 200 && !result.isError,
            }),
            providesTags: [ "Blogs" ]
        }),

        likeBlog: builder.mutation({
            query: ({ blogId, userId, body }) => ({
                url: `/blog/${blogId}/user/${userId}/like`,
                method: "POST",
                body: body,
                validateStatus: (response, result) =>
                    response.status === 201 && !result.isError,
            }),
            invalidatesTags: [ "Blogs" ]
        }),

        unlikeBlog: builder.mutation({
            query: ({ blogId, userId, body }) => ({
                url: `/blog/${blogId}/user/${userId}/like`,
                method: "PATCH",
                body: body,
                validateStatus: (response, result) =>
                    (response.status === 201, response.status === 200) && !result.isError,
            }),
            invalidatesTags: [ "Blogs" ]
        }),

        getUserLike: builder.query({
            query: ({ blogId, userId }) => ({
                url: `/blog/${blogId}/user/${userId}/like`,
                method: "GET",
                validateStatus: (response, result) =>
                    response.status === 200 && !result.isError,
            }),
            providesTags: [ "Blogs" ]
        }),

        addComment: builder.mutation({
            query: ({ blogId, userId, body }) => ({
                url: `/blog/${blogId}/user/${userId}/comment`,
                method: "POST",
                body: body,
                validateStatus: (response, result) =>
                    (response.status === 200 || response.status === 201) && !result.isError,
            }),
            invalidatesTags: [ "Blogs" ]
        }),

        getComments: builder.query({
            query: ({ blogId, page, pageSize }) => ({
                url: `/blog/${blogId}/comment`,
                method: "GET",
                params: { page, pageSize },
                validateStatus: (response, result) =>
                    response.status === 200 && !result.isError,
            }),
            providesTags: [ "Blogs" ]
        }),

        deleteComment: builder.mutation({
            query: ({ blogId, userId, commentId }) => ({
                url: `/blog/${blogId}/user/${userId}/comment/${commentId}`,
                method: "DELETE",
                validateStatus: (response, result) =>
                    (response.status === 200 || response.status === 201) && !result.isError,
            }),
            invalidatesTags: [ "Blogs" ]
        }),

    }),
});

export const {
    useGetBlogCategoriesQuery,
    useGetBlogByCategoryQuery,
    useGetBlogsQuery,
    useGetABlogQuery,
    useLikeBlogMutation,
    useUnlikeBlogMutation,
    useGetUserLikeQuery,

    useAddCommentMutation,
    useGetCommentsQuery,
    useDeleteCommentMutation,

} = blogsApiSlice;