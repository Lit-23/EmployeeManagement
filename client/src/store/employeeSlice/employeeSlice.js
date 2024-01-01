import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentEmployee: null,
  admin: true,
  loading: false,
  error: false,
}

const employeeSlice = createSlice({
  name: 'employee',
  initialState,
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
    updateEmployeeStart: (state) => {
      state.loading = true;
    },
    updateEmployeeSuccess: (state, action) => {
      state.currentEmployee = action.payload;
      state.loading = false;
      state.error = false;
    },
    updateEmployeeFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteEmployeeStart: (state) => {
      state.loading = true;
    },
    deleteEmployeeSuccess: (state) => {
      state.loading = false;
      state.error = false;
    },
    deleteEmployeeFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
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
  updateEmployeeStart,
  updateEmployeeSuccess,
  updateEmployeeFailure,
  deleteEmployeeStart,
  deleteEmployeeSuccess,
  deleteEmployeeFailure,
  signout,
} = employeeSlice.actions

export default employeeSlice.reducer