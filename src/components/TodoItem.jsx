import React, { useState, useRef } from "react";
// import { useDispatch } from "react-redux";
// import { removeTodo } from "../store/todoSlicer";
import { TiEdit, TiTrash, TiTick } from "react-icons/ti";
import { FaStrikethrough, FaCheckCircle } from "react-icons/fa";

function TodoItem({ todo, handleDelete, handleEdit, toggleComplete }) {
  const [newTitle, setNewTitle] = useState(todo.content);
  const inputRef = useRef();

  const removeTask = (id) => {
    handleDelete(id);
  };
  const HandleKeyUp = (e) => {
    if (e.key === "Enter" && newTitle.length > 0 && todo.content !== newTitle) {
      handleEdit(todo, newTitle);
      e.target.blur();
    }
  };
  const handleEditAction = () => {
    if (newTitle.length > 0 && todo.content !== newTitle)
      handleEdit(todo, newTitle);
  };

  const handleChange = (event) => {
    event.preventDefault();
    if (todo.complete === true) {
      setNewTitle(todo.content);
    } else {
      todo.content = "";
      setNewTitle(event.target.value);
    }
  };

  return (
    <>
      <li className="flex flex-col wrap  w-full  py-1 px-1 mb-4 justify-between space-x-2  bg-white rounded ">
        <div className="flex flex-row wrap  w-full  py-1 px-1 justify-between space-x-2  bg-white rounded ">
          {" "}
          <div className="flex flex-row justify-between">
            {" "}
            <div className="flex   w-full  py-1 px-1 justify-between  ">
              <input
                type="checkbox"
                id="topping"
                name="topping"
                className="flex justify-center align-center"
                onClick={() => toggleComplete(todo)}
              />
            </div>
            <div className="flex flex-start p-1 ">
              <input
                onSubmit={handleChange}
                style={{ textDecoration: todo.completed && "line-through" }}
                type="text"
                value={todo.content === "" ? newTitle : todo.content}
                className="list"
                onChange={handleChange}
                onKeyUp={HandleKeyUp}
                ref={inputRef}
              ></input>
            </div>
          </div>
          <div className="flex flex-row space-x-4">
            {" "}
            <div className="flex flex-end ">
              <button
                className=" rounded justify-center flex align-center p-1 hover:bg-slate-400 hover:rounded"
                onClick={() => {
                  removeTask(todo.id);
                }}
              >
                <TiTrash style={{ color: "red" }} />
              </button>
            </div>
            <div>
              <button className=" rounded justify-center flex align-center p-1 hover:bg-slate-400 hover:rounded">
                <TiEdit
                  style={{ color: "blue" }}
                  onClick={(e) => {
                    inputRef.current?.focus();
                  }}
                />
              </button>
            </div>
            <div>
              {" "}
              <button
                className="hover:bg-slate-400 hover:rounded flex align-center p-1 "
                onClick={handleEditAction}
              >
                <FaCheckCircle style={{ color: "green" }} />
              </button>
            </div>
          </div>
        </div>

        <div>
          {newTitle.length < 1 && (
            <div>
              <p className="text-red-400">This area cannot be empty</p>
            </div>
          )}
        </div>
      </li>
    </>
  );
}
export default TodoItem;
