// import EmailComp from "../components/EmailComp";
// import PasswordComp from "../components/PasswordComp";
import { useState } from "react";
import { register } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const submitHandle = async (event) => {
    event.preventDefault();
    const user = await register(email, password, userName);

    console.log(user);
    return user;
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [userName, setUserName] = useState("");

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
                <img src="./screen.svg" alt="screen"></img>
              </div>
            </div>
            <div className="mt-8 space-y-6" method="">
              <input type="hidden" name="remember" value="true" />
              <div className=" space-y-4 rounded-md shadow-sm">
                <div>
                  <label htmlFor="email-address" className="sr-only">
                    User Name
                  </label>
                  <input
                    onChange={(event) => {
                      setUserName(event.target.value);
                    }}
                    value={userName}
                    type="userName"
                    required
                    className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="User Name"
                  />
                </div>
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
                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    onChange={(event) => {
                      setRePassword(event.target.value);
                    }}
                    value={rePassword}
                    autoComplete="true"
                    className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Confirm Password"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative flex w-full justify-center rounded-md border border-transparent  bg-[#D8605B] py-2 px-4 text-sm font-medium text-white hover:bg-[#b84c48] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
      <div className="text-center py-4 ">
        Already have an account?{" "}
        <button
          className="text-[#D8605B] font-bold pl-2"
          onClick={() => navigate("/")}
        >
          Login
        </button>
      </div>
    </>
  );
}
