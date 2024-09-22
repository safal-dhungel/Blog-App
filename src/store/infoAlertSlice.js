import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  show:false,
  message: "",
};

const infoAlertSlice = createSlice({
  name: "infoAlert",
  initialState,
  reducers: {
    showInfoAlert(state, action) {
      state.show = true;
      state.message = action.payload.message;
    },
    hideInfoAlert(state) {
      state.show = false;
    },
  },
});

export const { showInfoAlert, hideInfoAlert } = infoAlertSlice.actions;
export default infoAlertSlice.reducer;
