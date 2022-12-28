import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalOpen: false,
};

const modalSlicer = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.modalOpen = true;
    },
    closeModal: (state, action) => {
      state.modalOpen = false;
    },
  },
});

export const { openModal, closeModal } = modalSlicer.actions;

export default modalSlicer.reducer;
