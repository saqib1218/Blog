// features/api/apiSlice.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Get the base URL from the environment variable
const baseUrl = process.env.REACT_APP_API_BASE_URL;

// Define the base query for main endpoints (token required)
const mainBaseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers, { getState }) => {
    // Get the token from the state (if available)
    const token = getState().auth.token;

    // Add the token to the headers if it exists
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

// Create the main API slice
export const apiSlice = createApi({
  reducerPath: "api", // Unique key for the reducer
  baseQuery: mainBaseQuery, // Use the base query with token
  tagTypes: ["Friends", "Requests", "Suggestions",'Blog',"Messages"],
  endpoints: (builder) => ({
    // Define your main endpoints here
    createBlog: builder.mutation({
      query: (blogData) => ({
        url: "/blogs",
        method: "POST",
        body: blogData,
      }),
    }),
    getBlogs: builder.query({
      query: () => ({
        url: "/blogs",
        method: "GET",
      }),
    }),
    getMyBlogs: builder.query({
      query: () => ({
        url: "/blogs/me/my",
        method: "GET",
      }),
    }),
    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `/blogs/delete/${id}`,
        method: "DELETE",
      }),
    }),
    getBlogById: builder.query({
      query: (id) => ({
        url: `/blogs/${id}`,
        method: "GET",
      }),
    }),
    updateBlog: builder.mutation({
      query: ({ id, blogData }) => ({
        url: `/blogs/${id}`,
        method: "PUT",
        body: blogData,
      }),
    }),
    // Define your main endpoints here
    updateUser: builder.mutation({
      query: ({ userId, userData }) => ({
        url: `/users/${userId}`,
        method: "PUT",
        body: userData,
      }),
    }),
    getUserProfile: builder.query({
      query: () => ({
        url: "/users/profile",
        method: "GET",
      }),
    }),
    // Friend-related endpoints
    sendFriendRequest: builder.mutation({
      query: (userId) => ({
        url: "/friends/request",
        method: "POST",
        body: { userId },
      }),
      invalidatesTags: ["Requests", "Suggestions"], // Invalidate cache for requests and suggestions
    }),
    acceptFriendRequest: builder.mutation({
      query: (userId) => ({
        url: "/friends/accept",
        method: "POST",
        body: { userId },
      }),
      invalidatesTags: ["Friends", "Requests"], // Invalidate cache for friends and requests
    }),
    rejectFriendRequest: builder.mutation({
      query: (userId) => ({
        url: "/friends/reject",
        method: "POST",
        body: { userId },
      }),
      invalidatesTags: ["Requests"], // Invalidate cache for requests
    }),
    getFriends: builder.query({
      query: () => ({
        url: "/friends",
        method: "GET",
      }),
      providesTags: ["Friends"], // Cache tag for friends
    }),
    getFriendRequests: builder.query({
      query: () => ({
        url: "/friends/requests",
        method: "GET",
      }),
      providesTags: ["Requests"], // Cache tag for requests
    }),
    getSuggestions: builder.query({
      query: () => ({
        url: "/friends/suggestions",
        method: "GET",
      }),
      providesTags: ["Suggestions"], // Cache tag for suggestions
    }),
  
   // Comment-related endpoint
   addComment: builder.mutation({
    query: ({ id, text }) => ({
      url: `/blogs/${id}/comments`,
      method: 'POST',
      body: { text },
    }),
    invalidatesTags: ['Blog'], // Invalidate cache for blogs
  }),
  // Messaging endpoints
  sendMessage: builder.mutation({
    query: ({ receiverId, text }) => ({
      url: "/messages/send",
      method: "POST",
      body: { receiverId, text },
    }),
    invalidatesTags: ["Messages"], // Invalidate cache for messages
  }),
  getMessages: builder.query({
    query: (userId) => ({
      url: `/messages/${userId}`,
      method: "GET",
    }),
    providesTags: ["Messages"], // Cache tag for messages
  }),
}),
});

// Export hooks for usage in components
export const {
  //blog related hooks
  useGetBlogsQuery,
  useCreateBlogMutation,
  useGetMyBlogsQuery,
  useDeleteBlogMutation,
  useGetBlogByIdQuery,
  useUpdateBlogMutation,
  //user related hooks
  useUpdateUserMutation,
  useGetUserProfileQuery,
 
  // Friend-related hooks
  useSendFriendRequestMutation,
  useAcceptFriendRequestMutation,
  useRejectFriendRequestMutation,
  useGetFriendsQuery,
  useGetFriendRequestsQuery,
  useGetSuggestionsQuery,
  // add comment
  useAddCommentMutation,
   // Messaging hooks
   useSendMessageMutation,
   useGetMessagesQuery, 
} = apiSlice;
