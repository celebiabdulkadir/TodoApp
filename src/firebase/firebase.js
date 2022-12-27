import { initializeApp } from "firebase/app";
import { setTodos } from "../store/todoSlicer";
import { useDispatch } from "react-redux";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  addDoc,
  collection,
  getFirestore,
  onSnapshot,
} from "firebase/firestore";
import { store } from "../store/store";

const firebaseConfig = {
  apiKey: "AIzaSyCOt6cJsqnzmDGxzlaEJZ-MTMs_m5qw5Hs",
  authDomain: "todoapp-1ff75.firebaseapp.com",
  projectId: "todoapp-1ff75",
  storageBucket: "todoapp-1ff75.appspot.com",
  messagingSenderId: "701589511881",
  appId: "1:701589511881:web:3b925cf4e7cebd62087718",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const addTodo = async (data) => {
  const result = await addDoc(collection(db, "Todos"), data);
  console.log(result);
  //   return result;
};

const auth = getAuth();

const user = auth.currentUser;

export const register = async (email, password) => {
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return user;
  } catch (e) {
    console.log(e.message);
  }
};
export const login = async (email, password) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    return user;
  } catch (e) {
    alert(e.message);
  }
};
export const logOut = async () => {
  try {
    await signOut(auth);
  } catch (e) {
    alert(e.message);
  }
};
export default app;
