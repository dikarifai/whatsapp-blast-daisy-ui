import { errorAlert, successAlert } from "@/utils/alertUtil";
import { setCookie } from "@/utils/setCookieUtil";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { error } from "console";
import { usePathname, useRouter } from "next/navigation";

interface LoginTypes {
  username: string;
  password: string;
}

const initialState = { isLoading: false };

export const login = createAsyncThunk(
  "auth/login",
  async (data: LoginTypes, { rejectWithValue }) => {
    try {
      console.log("Login gak?");

      const response = await axios.post(`/api/auth/login`, data);
      setCookie("token", response.data.token, 7);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/auth/logout");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //Login
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      successAlert(`Welcome ${action.payload.data.name}`);
      state.isLoading = false;
    });
    builder.addCase(login.rejected, (state, action: any) => {
      state.isLoading = false;
      errorAlert(action.payload.data.message);
    });
    //Logout
    builder.addCase(logout.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(logout.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const {} = authSlice.actions;
export default authSlice.reducer;
