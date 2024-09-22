import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import alertSlice from "./alertSlice";
import postSlice from "./postSlice";
import infoAlertSlice from "./infoAlertSlice";

const store = configureStore({
    reducer:{
        auth:authSlice,
        alert:alertSlice,
        posts:postSlice,
        infoAlert:infoAlertSlice,
    }
});

export default store;