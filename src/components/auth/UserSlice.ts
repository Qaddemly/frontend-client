import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IEducation,
  IExperience,
  IUser,
} from "../../interfaces/Auth.interfaces";

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
    updateUserExperience: (state, action: PayloadAction<IExperience>) => {
      state.user.experiences = state.user.experiences.map((exp) => {
        if (exp.id === action.payload.id) {
          return action.payload;
        }
        return exp;
      });
    },
    updateUserEducation: (state, action: PayloadAction<IEducation>) => {
      state.user.educations = state.user.educations.map((edu) => {
        if (edu.id === action.payload.id) {
          return action.payload;
        }
        return edu;
      });
    },
  },
});

export const { setUser, updateUserExperience, updateUserEducation } =
  userSlice.actions;
export default userSlice.reducer;
