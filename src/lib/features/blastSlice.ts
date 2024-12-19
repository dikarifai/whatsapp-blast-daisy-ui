import axiosClient from "@/services/axiosClient";
import { ScanBlatsResponse } from "@/types/blastTypes";
import { errorAlert, successAlert } from "@/utils/alertUtil";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

interface SendMessageTypes {
  account: string;
  number: string;
  message: string;
  numbers: string;
  filePath: string;
}

export const scanBlast = createAsyncThunk(
  "blast/scanBlast",
  async (number: string) => {
    try {
      const response = await axiosClient.post("/api/blast/scan", {
        number: number,
      });

      return response.data.data;
    } catch (error) {}
  }
);

export const sendMessage = createAsyncThunk(
  "blast/sendMessage",
  async (data: FormData, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post("/api/blast/send-message", data);
      return response.data;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }

      return rejectWithValue(error.response.data);
    }
  }
);

export const blastMessage = createAsyncThunk(
  "blast/blastMessage",
  async (data: FormData, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post("/api/blast/blast-message", data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialSendForm: SendMessageTypes = {
  account: "",
  number: "",
  message: "",
  numbers: "",
  filePath: "",
};

const initialState = {
  isLoading: true,
  isLoadingAction: false,
  data: {} as ScanBlatsResponse,
  sendForm: initialSendForm,
};

export const blastSlice = createSlice({
  name: "blast",
  initialState,
  reducers: {
    resetScan: (state) => {
      state = initialState;
    },
    setSendForm: (state, action) => {
      state.sendForm = action.payload;
      console.log("Form: ", state.sendForm);
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
    //SEND MESSAGE
    builder.addCase(sendMessage.pending, (state) => {
      state.isLoadingAction = true;
    });
    builder.addCase(sendMessage.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoadingAction = false;

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: action.payload.message || "Success",
        showConfirmButton: false,
        timer: 1500,
      });
      state.sendForm = initialSendForm;
    });
    builder.addCase(sendMessage.rejected, (state, action) => {
      const payload: any = action.payload;

      Swal.fire({
        position: "top-end",
        icon: "error",
        title: payload.data.message,
        showConfirmButton: false,
        timer: 1500,
      });

      state.isLoadingAction = false;
    });

    //BLAST MESSAGE
    builder.addCase(blastMessage.pending, (state) => {
      state.isLoadingAction = true;
    });
    builder.addCase(blastMessage.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoadingAction = false;
      successAlert(action.payload.message);
      state.sendForm = initialSendForm;
    });
    builder.addCase(blastMessage.rejected, (state, action) => {
      const payload: any = action.payload;

      errorAlert(payload.data.message);

      state.isLoadingAction = false;
    });
  },
});

export const { resetScan, setSendForm } = blastSlice.actions;
export default blastSlice.reducer;
