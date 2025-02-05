import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../interfaces/Auth.interfaces";

const initialState = {
  user: {} as IUser,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
  },
});

// this api no longer work
// extraReducers: (builder) => {
//   builder.addMatcher(
//     profileApi.endpoints.getUser.matchFulfilled,
//     (state, { payload }) => {
//       state.user = payload.user;
//     },
//   );
//   builder.addMatcher(
//     profileApi.endpoints.updateProfile.matchFulfilled,
//     (state, { payload }) => {
//       state.user = payload.user;
//     },
//   );
// },

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
