import axiosClient from "@/services/axiosClient";
import { errorAlert } from "@/utils/alertUtil";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  data: {
    account: 0,
    messageLog: 0,
    user: 0,
  },
};

export const getDashbord = createAsyncThunk(
  "dashboard/getDashboard",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get("/dashboard");

      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDashbord.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getDashbord.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getDashbord.rejected, (state, action) => {
      const payload = action.payload as any;
      errorAlert(payload.message);
      state.isLoading = false;
    });
  },
});

export const {} = dashboardSlice.actions;
export default dashboardSlice.reducer;
