import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const auth = getAuth();
  const submitReset = (event) => {
    event.preventDefault();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("Password reset email sent!");

        navigate("/login", {
          replace: true,
        });
      })
      .catch((error) => {
        alert(error.message);
        // ..
      });
  };

  return (
    <div className="flex w-full h-full mobile:w-full mt-[10%]   flex-col justify-center align-middle  items-center px-2">
      <div>
        <div>
          {" "}
          <h1 className="text-center text-3xl font-bold tracking-tight text-gray-900">
            Reset Your Password
          </h1>
        </div>
        <div className="align-center justify-center flex">
          {" "}
          <img src="./screen.svg" alt="screen"></img>
        </div>
      </div>
      <form
        onSubmit={submitReset}
        className="flex w-full h-full mobile:w-full  max-w-[600px]  flex-col justify-center  items-center"
      >
        <input
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          value={email}
          required
          type="email"
          autoComplete="true"
          className="relative block w-full justify-center appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 my-4 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 mobile:text-sm"
          placeholder="Email address"
        />
        <div>
          <button
            type="submit"
            className="group relative flex w-full justify-center rounded-md border border-transparent  bg-[#D8605B] py-2 px-4 text-sm font-medium text-white hover:bg-[#b84c48] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Reset
          </button>
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
    </div>
  );
}
