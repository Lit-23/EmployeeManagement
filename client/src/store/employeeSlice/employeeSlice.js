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
    admin: true,
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
    signinFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    signout: (state) => {
      state.currentEmployee = null;
      state.admin = true;
      state.loading = false;
      state.error = false;
    },
  },
});

export const { 
  addEmployeeStart, 
  addEmployeeSuccess, 
  addEmployeeFailure, 
  signinStart, 
  signinSuccess,
  signinFailure,
  signout,
} = employeeSlice.actions

export default employeeSlice.reducer