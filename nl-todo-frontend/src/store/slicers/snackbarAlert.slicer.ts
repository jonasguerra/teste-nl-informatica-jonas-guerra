import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SnackbarAlertReducer {
  snackbarData: {
    title: string;
    message: string;
    type: "success" | "error" | "info";
    open?: boolean;
  };
}

const initialState: SnackbarAlertReducer = {
  snackbarData: {
    title: "",
    message: "",
    type: "info",
    open: false,
  },
};

export const snackbarAlertSlice = createSlice({
  name: "snackbarAlertSlice",
  initialState,
  reducers: {
    showSnackbarAlert: (state, action: PayloadAction<SnackbarAlertReducer>) => {
      state.snackbarData = { ...action.payload.snackbarData, open: true };
    },
    hideSnackbarAlert: (state) => {
      state.snackbarData = initialState.snackbarData;
    },
  },
});

export const { showSnackbarAlert, hideSnackbarAlert } =
  snackbarAlertSlice.actions;
export default snackbarAlertSlice.reducer;
