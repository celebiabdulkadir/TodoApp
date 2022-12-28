import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todoId: [],
};

const todoSlicer = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setTodoId: (state, action) => {
      state.todoId = action.payload.id;
    },
  },
});

export const { setTodoId } = todoSlicer.actions;

export default todoSlicer.reducer;
