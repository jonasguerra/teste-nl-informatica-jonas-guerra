import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../models/User";

type UserReducer = {
  user: User;
};

const initialState: UserReducer = {
  user: {
    username: "",
    password: "",
    token: "",
    initials: "",
  },
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserReducer>) => {
      state.user = action.payload.user;
    },
    clearUser: (state) => {
      state.user = initialState.user;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
