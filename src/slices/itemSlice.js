import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const shoppingAPI = createApi({
  reducerPath: "shoppingAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["Item", "List"],
  endpoints: (builder) => ({
    getItems: builder.query({
      query: () => `/items`,
      providesTags: ["Item"],
    }),
    getItemByID: builder.query({
      query: (id) => `/items/${id}`,
    }),
    getLists: builder.query({
      query: () => `/lists`,
      providesTags: ["List"],
    }),
    getListByID: builder.query({
      query: (id) => `/lists/${id}`,
    }),
    addNewItem: builder.mutation({
      query: (initialItem) => ({
        url: "/items",
        method: "POST",
        body: initialItem,
      }),
      invalidatesTags: ["Item"],
    }),
    editItem: builder.mutation({
      query: (item) => ({
        url: `/items/${item.id}`,
        method: "PATCH",
        body: item,
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetItemByIDQuery, useGetItemsQuery, useGetListByIDQuery, useGetListsQuery, useAddNewItemMutation, useEditItemMutation } = shoppingAPI


// export const itemSlice = createSlice({
//   name: "items",
//   initialState: {
//     value: [],
//   },


//   reducers: {
//     addItem: (state, action) => {
//       // Redux Toolkit allows us to write "mutating" logic in reducers. It
//       // doesn't actually mutate the state because it uses the immer library,
//       // which detects changes to a "draft state" and produces a brand new
//       // immutable state based off those changes
//       state.value.concat(action.payload);
//     },
//     decrement: (state) => {
//       state.value -= 1;
//     },
//     incrementByAmount: (state, action) => {
//       state.value += action.payload;
//     },
//   },
// });
