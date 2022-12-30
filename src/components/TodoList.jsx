import React, { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import EmptyState from "./EmptyState";
import { db } from "../firebase/firebase";
import { getAuth } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

import {
  onSnapshot,
  collection,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";

function TodoList() {
  const [todoList, setTodoList] = useState([]);

  const { user } = useSelector((state) => {
    return state.auth;
  });
  console.log(todoList);

  useEffect(() => {
    const q = query(collection(db, "Todos"), where("userId", "==", user.uid));

    onSnapshot(q, (querySnapshot) => {
      const rawData = [];
      console.log(rawData);
      querySnapshot.forEach((doc) => {
        const cardData = { ...doc.data(), id: doc.id };
        rawData.push(cardData);
      });
      console.log(rawData);
      setTodoList(
        rawData.sort(function (a, b) {
          return new Date(b.date) - new Date(a.date);
        })
      );
    });
  }, []);

  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, "Todos", todo.id), { completed: !todo.completed });
  };

  const handleEdit = async (todo, content) => {
    await updateDoc(doc(db, "Todos", todo.id), { content: content });
    toast("Updated", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      type: "info",
    });
  };
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "Todos", id));
    toast("Deleted", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      type: "error",
    });
  };

  return (
    <>
      {todoList.length > 0 ? (
        <ul className=" flex-col  py-4 flex w-[80%]  max-w-[600px] mobile:w-full  ">
          {todoList?.map((todo) => {
            return (
              <TodoItem
                key={todo.id}
                id={todo.id}
                content={todo.content}
                todo={todo}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                toggleComplete={toggleComplete}
              />
            );
          })}
        </ul>
      ) : (
        <EmptyState />
      )}
    </>
  );
}
export default TodoList;
