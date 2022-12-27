import { createSlice } from "@reduxjs/toolkit";

import {
  collection,
  onSnapshot,
  addDoc,
  setDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

// import { db } from "../firebase/firebase";
// const projectsCollection = collection(db, "Todos");

// const deleteObj = async (id) => {
//   await deleteDoc(doc(db, "Projects", `${id}`));
// };
// onSnapshot(projectsCollection, (querySnapshot) => {
//   const rawData = [];
//   console.log(rawData);
//   querySnapshot.forEach((doc) => {
//     const cardData = { ...doc.data(), id: doc.id };
//     rawData.push(cardData);
//   });
//   return rawData;
// });

const initialState = {
  todoList: [],
};

const todoSlicer = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      var newTask = {
        id: new Date().toString(),
        name: action.payload.task,
      };
      state.todoList.push(newTask);
    },
    removeTodo: (state, action) => {
      state.todoList = state.todoList.filter(
        (item) => item.id !== action.payload.id
      );
    },
    editTodo: (state, action) => {},
  },
  setTodos: (state, action) => {
    state.todoList = onSnapshot(collection(db, "Todos"), (querySnapshot) => {
      const rawData = [];
      console.log(rawData);
      querySnapshot.forEach((doc) => {
        const cardData = { ...doc.data(), id: doc.id };
        rawData.push(cardData);
      });
      return rawData;
    });
  },
});

export const { addTodo, removeTodo, setTodos } = todoSlicer.actions;

export default todoSlicer.reducer;
