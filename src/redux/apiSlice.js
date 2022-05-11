import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const cunyFirstAPI = createApi({
  reducerPath: "cunyFirstAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["Course", "Instructor"],
  endpoints: (builder) => ({
    getCourses: builder.query({
      query: () => `/courses`,
      providesTags: (result) =>
        // is result available?
        result
          ? // successful query
            [
              ...result.map(({ id }) => ({ type: "Course", id })),
              { type: "Course", id: "courseLIST" },
            ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'Course', id: 'LIST' }` is invalidated
            [{ type: "Course", id: "courseLIST" }],
    }),
    getCourseByID: builder.query({
      query: (id) => `/courses/${id}`,
      providesTags: (result, error, id) => [{ type: "Course", id }],
    }),

    addNewCourse: builder.mutation({
      query: (initialCourse) => ({
        url: "/courses",
        method: "POST",
        body: initialCourse,
      }),
      invalidatesTags: [{ type: "Course", id: "courseLIST" }],
    }),
    updateCourse: builder.mutation({
      query: ({id, ...course}) => ({
        url: `/courses/${id}`,
        method: "PUT",
        body: course,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Course", id }],
    }),
    deleteCourse: builder.mutation({
      query: (id) => ({
        url: `/courses/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Course", id }],
    }),

    getInstructors: builder.query({
      query: () => `/instructors`,
      providesTags: (result) =>
          // is result available?
          result
              ? // successful query
              [
                ...result.map(({ id }) => ({ type: "Instructor", id })),
                { type: "Instructor", id: "instructorLIST" },
              ]
              : // an error occurred, but we still want to refetch this query when `{ type: 'Course', id: 'LIST' }` is invalidated
              [{ type: "Instructor", id: "instructorLIST" }],
    }),
    getInstructorByID: builder.query({
      query: (id) => `/instructors/${id}`,
      providesTags: (result, error, id) => [{ type: "Instructor", id }],
    }),
    addNewInstructor: builder.mutation({
      query: (initialInstructor) => ({
        url: "/instructors",
        method: "POST",
        body: initialInstructor,
      }),
      invalidatesTags: [{ type: "Instructor", id: "instructorLIST" }],
    }),
    updateInstructor: builder.mutation({
      query: ({id, ...instructor}) => ({
        url: `/instructors/${id}`,
        method: "PUT",
        body: instructor, invalidatesTags: (result, error, id) => [{ type: "Instructor", id }],
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Instructor", id }],
    }),

    deleteInstructor: builder.mutation({
      query: (id) => ({
        url: `/instructors/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Instructor", id }],
    }),

  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetCourseByIDQuery,
  useGetCoursesQuery,
  useAddNewCourseMutation,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
  useGetInstructorByIDQuery,
  useGetInstructorsQuery,
  useDeleteInstructorMutation,
  useAddNewInstructorMutation,
  useUpdateInstructorMutation,
} = cunyFirstAPI;


