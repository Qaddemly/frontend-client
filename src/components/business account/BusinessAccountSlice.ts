import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IBusinessAccount,
  IBusinesses,
} from "../../interfaces/BusinessAccount.interfaces";
import { businessAccountApi } from "../../services/businessAccountApi";

const initialState = {
  businessAccount: {} as IBusinessAccount,
  userBusinessesAccounts: [] as IBusinesses[],
};

const businessAccountSlice = createSlice({
  name: "businessAccount",
  initialState,
  reducers: {
    setUserBusinessesAccounts: (
      state,
      action: PayloadAction<IBusinesses[]>,
    ) => {
      state.userBusinessesAccounts = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      businessAccountApi.endpoints.createBusinessAccount.matchFulfilled,
      (state, { payload }) => {
        state.businessAccount = payload.business;
      },
    );
  },
});

export const { setUserBusinessesAccounts } = businessAccountSlice.actions;
export default businessAccountSlice.reducer;
