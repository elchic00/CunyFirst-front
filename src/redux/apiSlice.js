import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const cunyFirstAPI = createApi({
  reducerPath: "cunyFirstAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["Course", "Instructor"],
  endpoints: (builder) => ({
    getCourses: builder.query({
      query: () => `/courses`,
      providesTags: (result, error, arg) =>
          result
              ? [...result.map(({ id }) => ({ type: 'Course', id })), 'Course']
              : ['Course'],
      // providesTags: ["Course"],
    }),
    getCourseByID: builder.query({
      query: (id) => `/courses/${id}`,
    }),

    addNewCourse: builder.mutation({
      query: (initialCourse) => ({
        url: "/courses",
        method: "POST",
        body: initialCourse,
      }),
      invalidatesTags: ["Course"],
    }),
    editCourse: builder.mutation({
      query: (course) => ({
        url: `/courses/${course.id}`,
        method: "PATCH",
        body: course,
      }),
      invalidatesTags: ["Course"],
    }),
    getInstructors: builder.query({
      query: () => `/instructors`,
      providesTags: ["Instructor"],
    }),
    getInstructorByID: builder.query({
      query: (id) => `/instructors/${id}`,
    }),
  }),

});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetCourseByIDQuery,
  useGetCoursesQuery,
  useGetInstructorByIDQuery,
  useGetInstructorsQuery,
  useAddNewCourseMutation,
  useEditCourseMutation,
} = cunyFirstAPI;


