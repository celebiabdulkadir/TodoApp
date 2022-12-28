import React from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";

import Register from "./Pages/Register";
import Login from "./Pages/Login";
import PrivateRoute from "./utils/privateRoute";
import Modal from "./components/Modal";
import TodosPage from "./Pages/TodosPage";

import { useDispatch, useSelector } from "react-redux";
import { logOut } from "./firebase/firebase";
import { logout as logOutAuth } from "./store/authSlicer";
import { useNavigate } from "react-router-dom";
import { FaClipboardList } from "react-icons/fa";

function App() {
  const { user } = useSelector((state) => {
    console.log(state.auth);
    return state.auth;
  });
  const { modalOpen } = useSelector((state) => {
    console.log(state.auth);
    return state.modal;
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    await logOut();
    dispatch(logOutAuth());
    navigate("/login", { replace: true });
  };

  return (
    <>
      {modalOpen && <Modal />}
      <div className="flex-flex-col bg-blue-500 ">
        <nav className="flex flex-row justify-between border-2 py-4 px-12">
          {user && (
            <div className="flex flex-row justify-center align-middle text-white">
              <button className=" rounded px-2 mr-2">
                <NavLink to="/">
                  <FaClipboardList style={{ color: "white" }} size={30} />
                </NavLink>
              </button>
              <p>Project Planning</p>
            </div>
          )}

          {user && (
            <button className="text-white rounded px-2 mr-2">
              <NavLink to="/todo">Todo</NavLink>
            </button>
          )}

          {!user && (
            <button className="bg-gray-400 rounded px-2 mr-2">
              <NavLink to="/register">Register</NavLink>
            </button>
          )}

          {!user && (
            <button className="bg-gray-400 rounded px-2 mr-2">
              <NavLink to="/login">Login</NavLink>
            </button>
          )}

          {user && (
            <button
              onClick={() => logoutHandler()}
              className="text-white rounded px-2 mr-2"
            >
              <NavLink to="/login">Logout</NavLink>
            </button>
          )}
        </nav>
        <Routes className="flex flex-row justify-center">
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />

          <Route path="/todo" element={<TodosPage />} />
          <Route path="/login" element={<Login />} />
          <Route exact path="/todo" element={<PrivateRoute />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
