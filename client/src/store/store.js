import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from './employeeSlice/employeeSlice.js';

export const store = configureStore({
  reducer: {
    employee: employeeReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
});