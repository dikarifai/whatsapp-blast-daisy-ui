import { ScanBlatsResponse } from "@/types/blastTypes";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const scanBlast = createAsyncThunk(
  "blast/scanBlast",
  async (number: string) => {
    try {
      const response = await axios.post("/api/blast/scan", {
        number: number,
      });

      return response.data.data;
    } catch (error) {}
  }
);

const initialState = {
  isLoading: true,
  data: {} as ScanBlatsResponse,
};

export const blastSlice = createSlice({
  name: "blast",
  initialState,
  reducers: {
    resetScan: (state) => {
      state = initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(scanBlast.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(scanBlast.fulfilled, (state, action) => {
      state.data = action.payload;
      console.log(action.payload);

      state.isLoading = false;
    });
    builder.addCase(scanBlast.rejected, (state, action) => {
      console.log("error: ", action.error.message);
      state.isLoading = false;
    });
  },
});

export const { resetScan } = blastSlice.actions;
export default blastSlice.reducer;
