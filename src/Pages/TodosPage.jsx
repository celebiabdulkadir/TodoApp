import React from "react";
import AddTodo from "../components/AddTodo";
import TodoList from "../components/TodoList";
import { FaClipboardList } from "react-icons/fa";

export default function TodosPage() {
  return (
    <div className=" flex flex-col px-4 bg-gray-200  justify-center align-middle   ">
      <div className=" flex justify-center flex-col items-center align-middle">
        <div className="flex my-4">
          <FaClipboardList style={{ color: "brown" }} size={60} />
        </div>
        <div className="flex">
          <h1> Todo App</h1>
        </div>
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
