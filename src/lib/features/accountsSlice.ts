import { AccountAddRequest, AccountTypes } from "@/types/accountTypes";
import { errorAlert, successAlert } from "@/utils/alertUtil";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface GetAccountsParams {
  name?: string;
  phoneNumber?: string;
  isActive?: boolean;
}

export const getAccounts = createAsyncThunk(
  "accounts/getAccounts",
  async (params: GetAccountsParams | undefined) => {
    const response = await axios.get("/api/accounts", {
      params: params,
    });
    return response.data.data;
  }
);
export const addAccount = createAsyncThunk(
  "accounts/addAccount",
  async (data: AccountAddRequest, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/accounts", data);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteAccountById = createAsyncThunk(
  "accounts/deleteAccountById",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/api/accounts/${id}`);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
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
      successAlert(action.payload.message || "Delete Success");
    });
    builder.addCase(addAccount.rejected, (state, action) => {
      const payload: any = action.payload;
      state.isLoadingAction = false;
      errorAlert(payload.data.message);
    });
    //DELETE Account BY ID
    builder.addCase(deleteAccountById.pending, (state) => {
      state.isLoadingAction = true;
    });
    builder.addCase(deleteAccountById.fulfilled, (state, action) => {
      state.isLoadingAction = false;
      successAlert(action.payload.message || "Delete Success");
    });
    builder.addCase(deleteAccountById.rejected, (state, action) => {
      const payload: any = action.payload;
      state.isLoadingAction = false;
      errorAlert(payload.data.message);
    });
  },
});

export const {} = accountsSlice.actions;
export default accountsSlice.reducer;
