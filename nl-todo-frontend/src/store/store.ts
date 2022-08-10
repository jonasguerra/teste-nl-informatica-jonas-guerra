import { configureStore } from "@reduxjs/toolkit";
import globalSpinnerReducer from "./slicers/globalSpinner.slicer";
import snackbarAlertReducer from "./slicers/snackbarAlert.slicer";
import userReducer from "./slicers/user.slicer";

export const store = configureStore({
  reducer: {
    userStore: userReducer,
    globalSpinnerStore: globalSpinnerReducer,
    snackbarAlertStore: snackbarAlertReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
