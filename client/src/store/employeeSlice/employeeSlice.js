import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  employee: null,
  admin: false,
  loading: false,
  error: false,
}

const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    adminSignin: (state) => {
      state.admin = true;
    },
    adminSignout: (state) => {
      state.admin = false;
    },
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
    searchEmployeeByIdStart: (state) => {
      state.loading = true;
    },
    searchEmployeeByIdSuccess: (state, action) => {
      state.employee = action.payload;
      state.loading = false;
      state.error = false;
    },
    searchEmployeeByIdFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
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
      state.loading = false;
      state.error = false;
    },
  },
});

export const { 
  adminSignin,
  adminSignout,
  searchEmployeeByIdStart,
  searchEmployeeByIdSuccess,
  searchEmployeeByIdFailure,
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