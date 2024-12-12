import { AccountAddRequest, AccountTypes } from "@/types/accountTypes";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAccounts = createAsyncThunk(
  "accounts/getAccounts",
  async () => {
    try {
      const response = await axios.get("/api/accounts");
      return response.data.data;
    } catch (error) {}
  }
);
export const addAccount = createAsyncThunk(
  "accounts/addAccount",
  async (data: AccountAddRequest) => {
    try {
      const response = await axios.post("/api/accounts", data);
      getAccounts();
      return response.data.data;
    } catch (error) {}
  }
);

export const deleteAccountById = createAsyncThunk(
  "accounts/deleteAccountById",
  async (id: number) => {
    try {
      const response = await axios.delete(`/api/accoun/${id}`);
      getAccounts();
      return response.data.data;
    } catch (error) {}
  }
);

const initialState = {
  isLoading: true,
  isLoadingAction: false,
  data: [] as AccountTypes[],
};

export const accountsSlice = createSlice({
  name: "accounts",
  initialState,
  reducers: {},
  //GET Accounts
  extraReducers: (builder) => {
    builder.addCase(getAccounts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAccounts.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getAccounts.rejected, (state, action) => {
      state.isLoading = false;
      console.log("error", action.error.message);
    });
    //POST Account
    builder.addCase(addAccount.pending, (state) => {
      state.isLoadingAction = true;
    });
    builder.addCase(addAccount.fulfilled, (state, action) => {
      state.isLoadingAction = false;
      console.log("success: ", action.payload);
    });
    builder.addCase(addAccount.rejected, (state, action) => {
      state.isLoadingAction = false;
      console.log("error", action.error.message);
    });
    //DELETE Account BY ID
    builder.addCase(deleteAccountById.pending, (state) => {
      state.isLoadingAction = true;
    });
    builder.addCase(deleteAccountById.fulfilled, (state, action) => {
      state.isLoadingAction = false;
      console.log("success: ", action.payload);
    });
    builder.addCase(deleteAccountById.rejected, (state, action) => {
      state.isLoadingAction = false;
      console.log("error: ", action.error);
    });
  },
});

export const {} = accountsSlice.actions;
export default accountsSlice.reducer;
