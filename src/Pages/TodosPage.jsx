import React from "react";
import AddTodo from "../components/AddTodo";
import TodoList from "../components/TodoList";
import { Outlet } from "react-router-dom";

export default function TodosPage() {
  return (
    <div className=" flex flex-col px-4 bg-gray-200  justify-center align-middle   ">
      <div className=" flex justify-center">
        <h1> Todo App</h1>
      </div>
      <div className="flex justify-center">
        <AddTodo />
      </div>

      <div className="justify-center flex">
        <TodoList />
      </div>
    </div>
  );
}
