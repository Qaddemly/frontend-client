import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBusinesses } from "../../interfaces/BusinessAccount.interfaces";
import { IBusinessRoles } from "../../interfaces/Auth.interfaces";

const initialState = {
  businessAccount: {} as IBusinesses,
  userBusinessesAccounts: [] as IBusinessRoles[],
};

const businessAccountSlice = createSlice({
  name: "businessAccount",
  initialState,
  reducers: {
    setUserBusinessesAccounts: (
      state,
      action: PayloadAction<IBusinessRoles[]>,
    ) => {
      state.userBusinessesAccounts = action.payload;
    },
    setUserBusinessAccount: (state, action: PayloadAction<IBusinesses>) => {
      state.businessAccount = action.payload;
    },
  },
  // there is error on create business account user
  // extraReducers: (builder) => {
  //   builder.addMatcher(
  //     businessAccountApi.endpoints.createBusinessAccount.matchFulfilled,
  //     (state, { payload }) => {
  //       state.businessAccount = payload.business;
  //     },
  //   );
  // },
});

export const { setUserBusinessAccount } = businessAccountSlice.actions;
export default businessAccountSlice.reducer;
