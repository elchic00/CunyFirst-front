import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from "@reduxjs/toolkit/query";
// import itemReducer from '../features/item/itemSlice';
import { shoppingAPI } from '../slices/itemSlice';

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [shoppingAPI.reducerPath]: shoppingAPI.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(shoppingAPI.middleware),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);