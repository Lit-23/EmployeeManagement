import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentEmployee: null,
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
  },
});

export const { addEmployeeStart, addEmployeeSuccess, addEmployeeFailure } = employeeSlice.actions

export default employeeSlice.reducer