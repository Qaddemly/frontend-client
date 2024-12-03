import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../interfaces/Auth.interfaces";
import { profileApi } from "../../services/profileApi";

const initialState = {
  user: {} as User,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      profileApi.endpoints.getUser.matchFulfilled,
      (state, { payload }) => {
        state.user = payload.user;
      },
    );
    builder.addMatcher(
      profileApi.endpoints.updateProfile.matchFulfilled,
      (state, { payload }) => {
        state.user = payload.user;
      },
    );
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
