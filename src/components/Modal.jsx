import { closeModal } from "../store/modalSlicer";
import { useDispatch, useSelector } from "react-redux";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Modal() {
  const dispatch = useDispatch();
  const { todoId } = useSelector((state) => {
    return state.todo;
  });
  const closeHandle = () => {
    dispatch(closeModal());
  };
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "Todos", id));
    toast("Deleted", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      type: "error",
    });
    dispatch(closeModal());
  };
  return (
    <div className="   bg-zinc-200 opacity-80 fixed inset-0 z-50   ">
      <div className="flex h-screen justify-center items-center ">
        <div className="flex-col justify-center  bg-white py-12 px-24 border-4 border-sky-500 rounded-xl ">
          <div className="flex  text-lg  text-zinc-600   mb-10">
            Are you sure ?
          </div>
          <div className="flex">
            <button
              onClick={() => handleDelete(todoId)}
              className=" rounded px-4 py-2 text-white  bg-green-400 "
            >
              Yes
            </button>
            <button
              onClick={closeHandle}
              className="rounded px-4 py-2 ml-4 text-white bg-blue-500 "
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
