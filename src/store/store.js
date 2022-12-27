import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./todoSlicer";
import authSlicer from "./authSlicer";

export const store = configureStore({
  reducer: {
    todo: todoReducer,
    auth: authSlicer,
  },
});
