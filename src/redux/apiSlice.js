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
              { type: "Course", id: "LIST" },
            ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'Course', id: 'LIST' }` is invalidated
            [{ type: "Course", id: "LIST" }],
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
      invalidatesTags: [{ type: "Course", id: "LIST" }],
    }),
    editCourse: builder.mutation({
      query: (id, course) => ({
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
    }),
    invalidatesTags: (result, error, id) => [{ type: "Course", id }],
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
    useDeleteCourseMutation,
} = cunyFirstAPI;


