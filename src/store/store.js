import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./todoSlicer";
import authSlicer from "./authSlicer";
import modal from "./modalSlicer.js";

export const store = configureStore({
  reducer: {
    todo: todoReducer,
    auth: authSlicer,
    modal: modal,
  },
});
