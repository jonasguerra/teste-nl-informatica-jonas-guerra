import { createSlice } from "@reduxjs/toolkit";

interface GlobalSpinnerReducer {
  showSpinner: boolean;
}

const initialState: GlobalSpinnerReducer = {
  showSpinner: false,
};

export const globalSpinnerSlice = createSlice({
  name: "globalSpinner",
  initialState,
  reducers: {
    showSpinner: (state) => {
      state.showSpinner = true;
    },
    hideSpinner: (state) => {
      state.showSpinner = false;
    },
  },
});

export const { showSpinner, hideSpinner } = globalSpinnerSlice.actions;
export default globalSpinnerSlice.reducer;
