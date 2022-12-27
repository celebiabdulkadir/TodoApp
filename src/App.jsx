import React from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Contact from "./Pages/Contact";
import About from "./Pages/About";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import PrivateRoute from "./utils/privateRoute";

import { useDispatch, useSelector } from "react-redux";
import { logOut } from "./firebase/firebase";
import { logout as logOutAuth } from "./store/authSlicer";
import { useNavigate } from "react-router-dom";

function App() {
  const { user } = useSelector((state) => {
    console.log(state.auth);
    return state.auth;
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
      <div className="flex-flex-col">
        <nav className="flex flex-row justify-center border-2 py-2">
          <button className="bg-gray-400 rounded px-2 mr-2">
            <NavLink to="/todo">Home</NavLink>
          </button>
          {!user && (
            <button className="bg-gray-400 rounded px-2 mr-2">
              <NavLink to="/about">About</NavLink>
            </button>
          )}
          {!user && (
            <button className="bg-gray-400 rounded px-2 mr-2">
              <NavLink to="/contact">Contact</NavLink>
            </button>
          )}

          {/* {!user && (
            <button className="bg-gray-400 rounded px-2 mr-2">
              <NavLink to="/todo">Todo</NavLink>
            </button>
          )} */}

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
              className="bg-red-400 rounded px-2 mr-2"
            >
              <NavLink to="/login">Logout</NavLink>
            </button>
          )}
        </nav>
        <Routes className="flex flex-row justify-center">
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          {/* <Route path="/todo" element={<TodosPage />} /> */}
          <Route path="/login" element={<Login />} />
          <Route exact path="/todo" element={<PrivateRoute />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
