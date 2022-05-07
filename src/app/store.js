import { configureStore } from '@reduxjs/toolkit';
import itemReducer from '../features/item/itemSlice';

export const store = configureStore({
  reducer: {
    items: itemReducer,
  },
});
