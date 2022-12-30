import { login } from "../firebase/firebase";
import { useState } from "react";

import { useDispatch } from "react-redux";
import { login as loginHandler } from "../store/authSlicer";
import { useNavigate } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";

export default function Login() {
  const auth = getAuth();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const submitHandle = async (event) => {
    event.preventDefault();
    const user = await login(email, password);
    console.log(user);
    dispatch(loginHandler(user));
    if (user) {
      navigate("/todo", {
        replace: true,
      });
    }
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <form onSubmit={submitHandle}>
        <div className="flex min-h-full items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md space-y-8">
            <div>
              <div>
                {" "}
                <h1 className="text-center text-3xl font-bold tracking-tight text-gray-900">
                  Welcome to Todo App
                </h1>
              </div>
              <div className="align-center justify-center flex">
                {" "}
                <img src="./screen.svg"></img>
              </div>
            </div>
            <div className="mt-8 space-y-6" method="">
              <input type="hidden" name="remember" value="true" />
              <div className="-space-y-px rounded-md shadow-sm">
                <div>
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    onChange={(event) => {
                      setEmail(event.target.value);
                    }}
                    value={email}
                    type="email"
                    required
                    autoComplete="true"
                    className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Email address"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    onChange={(event) => {
                      setPassword(event.target.value);
                    }}
                    value={password}
                    autoComplete="true"
                    className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Password"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative flex w-full justify-center rounded-md border border-transparent  bg-[#D8605B] py-2 px-4 text-sm font-medium text-white hover:bg-[#b84c48] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
      <div className="flex justify-center">
        <button
          className="text-center"
          onClick={() => navigate("/resetPassword")}
        >
          Forgot Password
        </button>
      </div>
      <div className="text-center py-4">
        Don't have an account?{" "}
        <button
          className="text-[#D8605B] font-bold pl-2"
          onClick={() => {
            navigate("/register");
          }}
        >
          Register
        </button>
      </div>
    </>
  );
}
