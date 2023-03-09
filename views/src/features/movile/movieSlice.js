import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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
  }),
});

export const { useGetMoviesQuery, useGetSingleMovieQuery } = movieAPI;
