import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../firebase/firebase";
import { logout as logOutAuth } from "../store/authSlicer";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => {
    console.log(state.auth);
    return state.auth;
  });
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    await logOut();
    dispatch(logOutAuth());
    navigate("/login", { replace: true });
  };
  if (user) {
    return (
      <>
        <div className="flex flex-col items-center justify-center w-full mt-16 ">
          <div className="flex"> Welcome {user.email}</div>
          <div className="flex">
            <button
              className="group    rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={() => {
                logoutHandler();
              }}
            >
              logout
            </button>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <div>HomePage</div>
    </>
  );
}
