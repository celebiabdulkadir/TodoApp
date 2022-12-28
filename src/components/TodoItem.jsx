import React, { useState, useRef } from "react";
// import { useDispatch } from "react-redux";
// import { removeTodo } from "../store/todoSlicer";
import { TiEdit, TiTrash } from "react-icons/ti";
import { FaCheckCircle } from "react-icons/fa";
import { openModal } from "../store/modalSlicer";
import { useDispatch } from "react-redux";
import { setTodoId } from "../store/todoSlicer";
import { ToastContainer, toast } from "react-toastify";

function TodoItem({ todo, handleEdit, toggleComplete }) {
  const [newTitle, setNewTitle] = useState(todo.content);
  const inputRef = useRef();
  const dispatch = useDispatch();

  const openRemoveModal = () => {
    dispatch(openModal());
    dispatch(setTodoId(todo));
  };
  const HandleKeyUp = (e) => {
    if (e.key === "Enter" && newTitle.length > 0 && todo.content !== newTitle) {
      handleEdit(todo, newTitle);
      e.target.blur();
    }
  };
  const handleEditAction = () => {
    if (newTitle.length > 0 && todo.content !== newTitle) {
      handleEdit(todo, newTitle);
    } else {
      toast("Please Change before update", {
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
    }
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
      <li className=" hover:scale-110 flex flex-col wrap  w-full  py-1 px-1 mb-4 justify-between space-x-2  rounded drop-shadow-xl ">
        <div className="flex flex-row wrap  w-full  py-1 px-1 justify-between space-x-2  bg-white rounded  ">
          {" "}
          <div className="flex flex-row justify-between">
            {" "}
            <div className="flex   w-full  py-1 px-1 justify-between  ">
              <input
                type="checkbox"
                id="topping"
                name="topping"
                className="flex justify-center align-center bg-white"
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
          <div className="flex flex-row space-x-4 sm:space-x-1">
            {" "}
            <div className="flex flex-end ">
              <button
                className=" rounded justify-center flex align-center p-1 hover:bg-slate-400 hover:rounded"
                onClick={() => {
                  openRemoveModal();
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
