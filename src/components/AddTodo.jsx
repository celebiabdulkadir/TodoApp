import React, { useState } from "react";

import { addTodo } from "../firebase/firebase";
import { getAuth } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddTodo() {
  const [todo, setTodo] = useState("");
  const auth = getAuth();
  const user = auth.currentUser;

  const submitHandler = async (event) => {
    event.preventDefault();
    if (todo.trim().length === 0) {
      alert("Enter a task before adding!!");
      setTodo("");
      return;
    }

    await addTodo({
      userMail: user.email,
      userId: user.uid,
      content: todo,
      date: Date.now(),
    });
    toast("Added", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      type: "success",
    });
    setTodo("");
  };
  return (
    <>
      <form
        onSubmit={submitHandler}
        className="flex w-[80%]  max-w-[600px]  flex-row"
      >
        <ToastContainer />
        <input
          type="text"
          value={todo}
          onChange={(event) => {
            setTodo(event.target.value);
          }}
          className=" w-[80%]  max-w-[600px] placeholder:italic placeholder:text-slate-400 block bg-white  border border-slate-300 rounded-md p-1 m-1  pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
        ></input>
        <button
          type="submit"
          className="bg-green-300 rounded p-2 my-1 hover:bg-green-500 hover:rounded hover:shadow-xl hover:scale-110"
        >
          ADD
        </button>
      </form>
    </>
  );
}
export default AddTodo;
