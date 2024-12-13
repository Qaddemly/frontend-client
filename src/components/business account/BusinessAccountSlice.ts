import { createSlice } from "@reduxjs/toolkit";
import { IBusinessAccount } from "../../interfaces/BusinessAccount.interface";
import { businessAccountApi } from "../../services/businessAccountApi";

const initialState = {
  businessAccount: {} as IBusinessAccount,
};

const businessAccountSlice = createSlice({
  name: "businessAccount",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      businessAccountApi.endpoints.createBusinessAccount.matchFulfilled,
      (state, { payload }) => {
        state.businessAccount = payload.business;
      },
    );
  },
});

export default businessAccountSlice.reducer;
