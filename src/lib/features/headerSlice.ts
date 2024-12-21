import axiosClient from "@/services/axiosClient";
import { errorAlert } from "@/utils/alertUtil";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface ProfileInterface {
  id: number | null;
  name: string;
  role: string;
  username: string;
}

const initialProfile: ProfileInterface = {
  id: null,
  name: "",
  role: "",
  username: "",
};

const initialState = {
  isLoading: true,
  data: {
    profile: initialProfile,
    title: "",
  },
};

export const getProfile = createAsyncThunk(
  "profile/getProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get("/api/users/me");
      return response.data.data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const headerSlice = createSlice({
  name: "header",
  initialState,
  reducers: {
    setTitle: (state, action) => {
      state.data.title = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProfile.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.data.profile = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getProfile.rejected, (state, action: any) => {
      state.isLoading = false;
      errorAlert(action.payload.message);
    });
  },
});

export const { setTitle } = headerSlice.actions;

export default headerSlice.reducer;
