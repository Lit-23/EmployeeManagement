import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentEmployee: null,
  admin: true,
  loading: false,
  error: false,
}

export const employeeSlice = createSlice({
  name: 'employee',
  initialState: {
    currentEmployee: null,
    loading: false,
    error: false,
  },
  reducers: {
    addEmployeeStart: (state) => {
      state.loading = true;
    },
    addEmployeeSuccess: (state, action) => {
      state.currentEmployee = action.payload;
      state.loading = false;
      state.error = false;
    },
    addEmployeeFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    signinStart: (state) => {
      state.loading = true;
    },
    signinSuccess: (state, action) => {
      state.currentEmployee = action.payload;
      state.admin = false;
      state.loading = false;
      state.error = false;
    },
    signinSuccess: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { addEmployeeStart, addEmployeeSuccess, addEmployeeFailure } = employeeSlice.actions

export default employeeSlice.reducer