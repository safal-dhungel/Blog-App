import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  show: false,
  message: "",
  type: "",
};

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    showAlert(state, action) {
      state.show = true;
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    hideAlert(state) {
      state.show = false;
    },
  },
});

export const { showAlert, hideAlert } = alertSlice.actions;
export default alertSlice.reducer;
