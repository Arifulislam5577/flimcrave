import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setUser } from "../auth/authState";

export const movieAPI = createApi({
  reducerPath: "movieAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000",
  }),
  tagTypes: ["Movies"],
  endpoints: (builder) => ({
    getMovies: builder.query({
      query: () => "/api/movie",
      providesTags: ["Movies"],
    }),
    getSingleMovie: builder.query({
      query: (id) => `/api/movie/${id}`,
      providesTags: ["Movies"],
    }),
    addLikeInMovie: builder.mutation({
      query: (postId) => ({
        url: `/api/movie/like/${postId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Movies"],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const { data } = await queryFulfilled;
        localStorage.setItem("user", JSON.stringify(data));
        dispatch(setUser(data));
      },
    }),
    addDisLikeInMovie: builder.mutation({
      query: (postId) => ({
        url: `/api/movie/dislike/${postId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Movies"],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const { data } = await queryFulfilled;
        localStorage.setItem("user", JSON.stringify(data));
        dispatch(setUser(data));
      },
    }),
  }),
});

export const {
  useGetMoviesQuery,
  useGetSingleMovieQuery,
  useAddDisLikeInMovieMutation,
  useAddLikeInMovieMutation,
} = movieAPI;
